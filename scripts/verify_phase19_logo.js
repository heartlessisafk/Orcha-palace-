const http = require('http');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;

function getTargets() {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${CDP_PORT}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function connectToWebSocket(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 1;
    const callbacks = {};

    ws.addEventListener('open', () => {
      resolve({
        send: (method, params = {}) => {
          return new Promise((res, rej) => {
            const reqId = id++;
            callbacks[reqId] = { res, rej };
            ws.send(JSON.stringify({ id: reqId, method, params }));
          });
        },
        close: () => ws.close()
      });
    });

    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id && callbacks[msg.id]) {
        if (msg.error) {
          callbacks[msg.id].rej(new Error(msg.error.message || JSON.stringify(msg.error)));
        } else {
          callbacks[msg.id].res(msg.result);
        }
        delete callbacks[msg.id];
      }
    });

    ws.addEventListener('error', reject);
  });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('================================================================================');
  console.log('   ORCHHA RESORT — PHASE 19: HEADER BRANDING UPGRADE & VERIFICATION            ');
  console.log('================================================================================\n');

  const targets = await getTargets();
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) throw new Error('No browser page target found');

  const client = await connectToWebSocket(pageTarget.webSocketDebuggerUrl);
  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('CSS.enable');

  const outDir = path.join(process.cwd(), 'audit', 'screenshots', 'phase19_logo');
  fs.mkdirSync(outDir, { recursive: true });

  const results = {};

  // 1. DESKTOP AUDIT (1440x900)
  console.log('>>> [1/5] AUDITING DESKTOP HEADER & LOGO CONTAINER (1440x900) ...');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false
  });

  await client.send('Page.navigate', { url: 'http://localhost:3000/' });
  await sleep(1500);

  // Check default styles
  const defaultStyles = await client.send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('header a[href="/"]');
      const maskSpan = link ? link.querySelector('span') : null;
      if (!link || !maskSpan) return { found: false };

      const linkRect = link.getBoundingClientRect();
      const maskRect = maskSpan.getBoundingClientRect();
      const linkStyle = window.getComputedStyle(link);
      const maskStyle = window.getComputedStyle(maskSpan);

      return {
        found: true,
        container: {
          bg: linkStyle.backgroundColor,
          border: linkStyle.borderColor,
          borderRadius: linkStyle.borderRadius,
          width: Math.round(linkRect.width),
          height: Math.round(linkRect.height),
          top: Math.round(linkRect.top),
          left: Math.round(linkRect.left)
        },
        logoMask: {
          bg: maskStyle.backgroundColor,
          maskImage: maskStyle.maskImage || maskStyle.webkitMaskImage,
          width: Math.round(maskRect.width),
          height: Math.round(maskRect.height)
        }
      };
    })()`,
    returnByValue: true
  });

  console.log('  Default State Metrics:', defaultStyles.result.value);
  results.defaultState = defaultStyles.result.value;

  // Capture Screenshot of Default State (Initial Landing Header)
  const defaultShot = await client.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 1440, height: 250, scale: 1 }
  });
  fs.writeFileSync(path.join(outDir, '01_desktop_header_default.jpg'), Buffer.from(defaultShot.data, 'base64'));
  console.log('  Saved: 01_desktop_header_default.jpg');

  // 2. HOVER STATE INTERACTION TEST
  console.log('\n>>> [2/5] TESTING INTERACTIVE HOVER STATE (WHITE -> BLUE) ...');
  // Dispatch mouse move over the logo link
  const linkPos = await client.send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('header a[href="/"]');
      const rect = link.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    })()`,
    returnByValue: true
  });

  await client.send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: linkPos.result.value.x,
    y: linkPos.result.value.y
  });

  // Wait 350ms for the 300ms transition to complete
  await sleep(400);

  const hoverStyles = await client.send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('header a[href="/"]');
      const maskSpan = link ? link.querySelector('span') : null;
      if (!link || !maskSpan) return { found: false };

      const linkStyle = window.getComputedStyle(link);
      const maskStyle = window.getComputedStyle(maskSpan);

      return {
        containerBg: linkStyle.backgroundColor,
        maskBg: maskStyle.backgroundColor
      };
    })()`,
    returnByValue: true
  });

  console.log('  Hover State Metrics:', hoverStyles.result.value);
  results.hoverState = hoverStyles.result.value;

  // Capture Screenshot of Hover State
  const hoverShot = await client.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 1440, height: 250, scale: 1 }
  });
  fs.writeFileSync(path.join(outDir, '02_desktop_header_hover.jpg'), Buffer.from(hoverShot.data, 'base64'));
  console.log('  Saved: 02_desktop_header_hover.jpg');

  // 3. MOUSEOUT STATE TEST (RETURN TO DEFAULT)
  console.log('\n>>> [3/5] TESTING MOUSEOUT RESET TO DEFAULT ...');
  await client.send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: 10,
    y: 10
  });
  await sleep(400);

  const mouseOutStyles = await client.send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('header a[href="/"]');
      const maskSpan = link ? link.querySelector('span') : null;
      const linkStyle = window.getComputedStyle(link);
      const maskStyle = window.getComputedStyle(maskSpan);
      return {
        containerBg: linkStyle.backgroundColor,
        maskBg: maskStyle.backgroundColor
      };
    })()`,
    returnByValue: true
  });
  console.log('  Mouse-out State Metrics:', mouseOutStyles.result.value);
  results.mouseOutState = mouseOutStyles.result.value;

  // 4. SCROLLED HEADER STATE TEST
  console.log('\n>>> [4/5] TESTING SCROLLED HEADER STATE ...');
  await client.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 300, behavior: 'instant' })`
  });
  await sleep(400);

  const scrolledShot = await client.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 1440, height: 200, scale: 1 }
  });
  fs.writeFileSync(path.join(outDir, '03_desktop_header_scrolled.jpg'), Buffer.from(scrolledShot.data, 'base64'));
  console.log('  Saved: 03_desktop_header_scrolled.jpg');

  // 5. RESPONSIVE MATRIX: TABLET & MOBILE
  console.log('\n>>> [5/5] TESTING TABLET (768px) & MOBILE (390px) ...');
  // Scroll back to top
  await client.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 0, behavior: 'instant' })`
  });

  // Tablet 768px
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(500);

  const tabletAudit = await client.send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('header a[href="/"]');
      const rect = link ? link.getBoundingClientRect() : null;
      return {
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        containerWidth: rect ? Math.round(rect.width) : 0,
        containerHeight: rect ? Math.round(rect.height) : 0
      };
    })()`,
    returnByValue: true
  });
  console.log('  Tablet (768px) Metrics:', tabletAudit.result.value);
  results.tablet = tabletAudit.result.value;

  const tabletShot = await client.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 768, height: 200, scale: 1 }
  });
  fs.writeFileSync(path.join(outDir, '04_tablet_header.jpg'), Buffer.from(tabletShot.data, 'base64'));
  console.log('  Saved: 04_tablet_header.jpg');

  // Mobile 390px
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await sleep(500);

  const mobileAudit = await client.send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector('header a[href="/"]');
      const rect = link ? link.getBoundingClientRect() : null;
      return {
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        containerWidth: rect ? Math.round(rect.width) : 0,
        containerHeight: rect ? Math.round(rect.height) : 0
      };
    })()`,
    returnByValue: true
  });
  console.log('  Mobile (390px) Metrics:', mobileAudit.result.value);
  results.mobile = mobileAudit.result.value;

  const mobileShot = await client.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 390, height: 180, scale: 1 }
  });
  fs.writeFileSync(path.join(outDir, '05_mobile_header.jpg'), Buffer.from(mobileShot.data, 'base64'));
  console.log('  Saved: 05_mobile_header.jpg');

  // Reset viewport
  await client.send('Emulation.clearDeviceMetricsOverride');

  // Write JSON report
  fs.writeFileSync(
    path.join(process.cwd(), 'audit', 'phase19_results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n================================================================================');
  console.log('   PHASE 19 VERIFICATION COMPLETE!                                              ');
  console.log('================================================================================');

  client.close();
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
