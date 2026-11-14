const http = require('http');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const OUTPUT_DIR = path.resolve(__dirname, '../.planning/phases/26-footer-attribution-update');

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
  { name: 'tablet_768', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true },
  { name: 'mobile_390', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true }
];

async function run() {
  console.log('Testing Phase 26: Website Footer Attribution Update...');
  const targets = await getJson(`http://localhost:${CDP_PORT}/json`);
  const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  if (!pageTarget) {
    throw new Error('No localhost:3000 page target found');
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
    await cdp.send('Page.navigate', { url: `http://localhost:3000?t=${Date.now()}` });
    await new Promise(r => setTimeout(r, 1800));

    // Scroll to the bottom of the page
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const footer = document.querySelector('footer.bg-brand-navy');
          if (footer) footer.scrollIntoView({ block: 'end', behavior: 'instant' });
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1000));

    // Inspect the bottom attribution bar
    const footerInspection = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const footer = document.querySelector('footer.bg-brand-navy');
          if (!footer) return { found: false };

          const footerText = footer.textContent || '';
          const hasOldAttribution = footerText.includes('Architect Yogesh Chandra') || footerText.includes('Heritage Redesign v2.0');
          const hasNewAttribution = footerText.includes('Designed & Developed by') && footerText.includes('Samarth Shukla') && footerText.includes('Web Developer');

          const nameSpan = Array.from(footer.querySelectorAll('span')).find(s => s.textContent.trim() === 'Samarth Shukla');
          const webDevP = Array.from(footer.querySelectorAll('p')).find(p => p.textContent.trim() === 'Web Developer');

          const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

          return {
            found: true,
            hasOldAttribution,
            hasNewAttribution,
            nameFound: !!nameSpan,
            nameClasses: nameSpan ? nameSpan.className : null,
            nameColor: nameSpan ? window.getComputedStyle(nameSpan).color : null,
            webDevFound: !!webDevP,
            webDevClasses: webDevP ? webDevP.className : null,
            webDevColor: webDevP ? window.getComputedStyle(webDevP).color : null,
            hasHorizontalOverflow,
            windowWidth: window.innerWidth
          };
        })()
      `,
      returnByValue: true
    });

    // Capture screenshot of footer
    const screenshot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `footer_${vp.name}.jpg`),
      Buffer.from(screenshot.data, 'base64')
    );

    results.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      inspection: footerInspection.result?.value
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
