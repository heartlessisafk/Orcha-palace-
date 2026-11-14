const http = require('http');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const OUTPUT_DIR = path.resolve(__dirname, '../.planning/phases/30-phone-nav-backdrop');

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
  console.log('Testing Phase 30: Phone Number Navigation Backdrop Styling...');
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
    await cdp.send('Page.navigate', { url: `http://localhost:3000?t=${Date.now()}` });
    await new Promise(r => setTimeout(r, 2000));

    // Inspect navigation and phone contact styling
    const inspection = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const links = Array.from(document.querySelectorAll('a')).filter(l => l.href && l.href.startsWith('tel:'));
          const headerPhone = links[0];
          
          let headerPhoneStyles = null;
          if (headerPhone) {
            const cs = window.getComputedStyle(headerPhone);
            const icon = headerPhone.querySelector('svg');
            const iconCs = icon ? window.getComputedStyle(icon) : null;
            headerPhoneStyles = {
              href: headerPhone.href,
              text: headerPhone.textContent.trim(),
              backgroundColor: cs.backgroundColor,
              backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
              borderRadius: cs.borderRadius,
              border: cs.border,
              color: cs.color,
              padding: cs.padding,
              display: cs.display,
              iconColor: iconCs ? iconCs.color : null,
              iconWidth: iconCs ? iconCs.width : null
            };
          }

          const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

          return {
            found: !!headerPhone,
            headerPhoneStyles,
            hasHorizontalOverflow,
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth
          };
        })()
      `,
      returnByValue: true
    });

    if (vp.name === 'desktop_1440') {
      // Capture close-up of header
      const headerClip = await cdp.send('Page.captureScreenshot', {
        format: 'jpeg',
        quality: 90,
        clip: { x: 0, y: 0, width: 1440, height: 130, scale: 1 }
      });
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `after_nav_header_desktop_1440.jpg`),
        Buffer.from(headerClip.data, 'base64')
      );

      // Capture full hero view
      const fullScreenshot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `after_nav_header_hero_desktop.jpg`),
        Buffer.from(fullScreenshot.data, 'base64')
      );
    }

    if (vp.name === 'iphone_14_390') {
      // Open mobile drawer
      await cdp.send('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('header button[aria-label="Open menu"]');
            if (btn) btn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      const drawerScreenshot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `after_nav_mobile_drawer_390.jpg`),
        Buffer.from(drawerScreenshot.data, 'base64')
      );
    }

    console.log(`Horizontal overflow: ${inspection.result?.value?.hasHorizontalOverflow}`);
    if (vp.name === 'desktop_1440') {
      console.log('Header phone styles:', JSON.stringify(inspection.result?.value?.headerPhoneStyles, null, 2));
    }

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
