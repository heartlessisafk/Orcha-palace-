const http = require('http');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const OUTPUT_DIR = path.resolve(__dirname, '../.planning/phases/28-wedding-hero-color-correction');

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
  console.log('Testing Phase 28: Wedding Hero Background Color Correction...');
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
    await cdp.send('Page.navigate', { url: `http://localhost:3000/weddings?t=${Date.now()}` });
    await new Promise(r => setTimeout(r, 2000));

    // Inspect wedding hero section & overlays
    const inspection = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const section = document.querySelector('section');
          if (!section) return { found: false, error: 'Hero section not found' };

          const img = section.querySelector('img');
          const overlays = Array.from(section.querySelectorAll('div.absolute.inset-0')).filter(d => !d.querySelector('img'));
          
          const overlayStyles = overlays.map(o => ({
            className: o.className,
            computedBackground: window.getComputedStyle(o).backgroundImage,
            computedColor: window.getComputedStyle(o).backgroundColor,
            opacity: window.getComputedStyle(o).opacity
          }));

          const title = section.querySelector('h1')?.textContent?.trim();
          const subtitle = section.querySelector('p')?.textContent?.trim();
          const badge = section.querySelector('span')?.textContent?.trim();

          const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

          // Check if any overlay has brand-navy (rgb(12, 23, 49))
          const hasNavyOverlay = overlayStyles.some(s => s.computedBackground.includes('12, 23, 49') || s.computedColor.includes('12, 23, 49'));

          return {
            found: true,
            title,
            subtitle,
            badge,
            hasImage: !!img,
            imgSrc: img ? img.getAttribute('src') : null,
            imgComplete: img ? img.complete : false,
            imgNaturalWidth: img ? img.naturalWidth : 0,
            imgNaturalHeight: img ? img.naturalHeight : 0,
            overlayStyles,
            hasNavyOverlay,
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
      path.join(OUTPUT_DIR, `after_wedding_hero_${vp.name}.jpg`),
      Buffer.from(screenshot.data, 'base64')
    );

    console.log(`Saved screenshot: after_wedding_hero_${vp.name}.jpg`);
    console.log(`Image complete: ${inspection.result?.value?.imgComplete}`);
    console.log(`Has navy overlay: ${inspection.result?.value?.hasNavyOverlay}`);
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
