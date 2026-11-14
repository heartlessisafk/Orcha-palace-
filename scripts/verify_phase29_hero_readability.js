const http = require('http');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const OUTPUT_DIR = path.resolve(__dirname, '../.planning/phases/29-hero-readability-fix');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function createCdpSession(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();

  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      resolve({
        send: (method, params = {}) => new Promise((res, rej) => {
          const reqId = id++;
          callbacks.set(reqId, { res, rej });
          ws.send(JSON.stringify({ id: reqId, method, params }));
        }),
        close: () => ws.close()
      });
    });
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const { res, rej } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) rej(data.error);
        else res(data.result);
      }
    });
    ws.addEventListener('error', reject);
  });
}

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  { name: 'ipad_portrait_768', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true },
  { name: 'ipad_air_820', width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true },
  { name: 'iphone_14_390', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  { name: 'iphone_se_375', width: 375, height: 667, deviceScaleFactor: 2, isMobile: true }
];

async function run() {
  console.log('Testing Phase 29: Hero Text Readability & Contrast Fix on About Page...');
  const targets = await getJson(`http://localhost:${CDP_PORT}/json`);
  let pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:3000')) || targets[0];
  if (!pageTarget) {
    throw new Error('No valid page target found on port ' + CDP_PORT);
  }

  const cdp = await createCdpSession(pageTarget.webSocketDebuggerUrl);
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.deviceScaleFactor,
      mobile: vp.isMobile
    });

    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Page.navigate', { url: `http://localhost:3000/about?t=${Date.now()}` });
    await new Promise(r => setTimeout(r, 2000));

    // Inspect about hero elements & contrast
    const inspection = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const section = document.querySelector('section');
          if (!section) return { found: false, error: 'About hero section not found' };

          const img = section.querySelector('img');
          const badge = section.querySelector('div.inline-flex.items-center');
          const h1 = section.querySelector('h1');
          const goldSpan = h1?.querySelector('span');
          const subtitle = section.querySelector('p');
          const cards = Array.from(section.querySelectorAll('div.grid > div')).map(c => ({
            title: c.querySelector('span.font-serif')?.textContent?.trim(),
            desc: c.querySelector('span.font-sans')?.textContent?.trim(),
            titleColor: window.getComputedStyle(c.querySelector('span.font-serif')).color,
            bgColor: window.getComputedStyle(c).backgroundColor
          }));
          const buttons = Array.from(section.querySelectorAll('button')).map(b => b.textContent?.trim());
          const attribution = section.querySelector('div.pt-6, div.pt-10')?.textContent?.trim();

          const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

          return {
            found: true,
            hasImage: !!img,
            imgComplete: img ? img.complete : false,
            badgeText: badge?.textContent?.trim(),
            badgeColor: badge ? window.getComputedStyle(badge).color : null,
            badgeBg: badge ? window.getComputedStyle(badge).backgroundColor : null,
            h1Text: h1?.textContent?.trim(),
            goldSpanText: goldSpan?.textContent?.trim(),
            goldSpanColor: goldSpan ? window.getComputedStyle(goldSpan).color : null,
            subtitleText: subtitle?.textContent?.trim(),
            subtitleColor: subtitle ? window.getComputedStyle(subtitle).color : null,
            cards,
            buttons,
            attribution,
            hasHorizontalOverflow,
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth
          };
        })()
      `,
      returnByValue: true
    });

    // Capture screenshot
    const screenshot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `after_about_hero_${vp.name}.jpg`),
      Buffer.from(screenshot.data, 'base64')
    );

    console.log(`Saved screenshot: after_about_hero_${vp.name}.jpg`);
    console.log(`Image complete: ${inspection.result?.value?.imgComplete}`);
    console.log(`H1 text: ${inspection.result?.value?.h1Text}`);
    console.log(`Gold span color: ${inspection.result?.value?.goldSpanColor}`);
    console.log(`Horizontal overflow: ${inspection.result?.value?.hasHorizontalOverflow}`);

    results.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      inspection: inspection.result?.value
    });
  }

  // Restore desktop viewport
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  cdp.close();

  console.log('\n--- VERIFICATION RESULTS SUMMARY ---');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'verification_summary.json'),
    JSON.stringify(results, null, 2)
  );

  return results;
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
