const fs = require('fs');
const path = require('path');

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('=== VERIFYING ORCHHA RESORT GALLERY & IMAGE CURATION ===');

  fs.mkdirSync('audit/screenshots', { recursive: true });

  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  let pageTarget = targets.find((t) => t.type === 'page' && t.url && t.url.includes('localhost:3000'));

  if (!pageTarget) {
    pageTarget = targets.find((t) => t.type === 'page');
  }

  if (!pageTarget) {
    console.error('No page target found on Chrome 9222:', targets);
    process.exit(1);
  }

  console.log('Connecting to target:', pageTarget.webSocketDebuggerUrl);
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();
  const consoleMessages = [];

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map((a) => a.value || a.description || '').join(' ');
      consoleMessages.push({ type: msg.params.type, text });
      if (msg.params.type === 'error') {
        console.warn('Browser Console Error:', text);
      }
    }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) {
        reject(msg.error);
      } else {
        resolve(msg.result);
      }
    }
  };

  await new Promise((resolve) => (ws.onopen = resolve));
  console.log('WebSocket connected successfully.');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // Set Desktop viewport (1440x900)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  console.log('Navigating to http://localhost:3000/gallery...');
  await send('Page.navigate', { url: 'http://localhost:3000/gallery' });
  await sleep(2500);

  // Capture Desktop Hero screenshot
  const heroShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/gallery_desktop_hero.png', Buffer.from(heroShot.data, 'base64'));
  console.log('Captured audit/screenshots/gallery_desktop_hero.png');

  // Verify page title & heading
  const titleEval = await send('Runtime.evaluate', {
    expression: 'document.title',
  });
  console.log('Page Title:', titleEval.result.value);

  const headingEval = await send('Runtime.evaluate', {
    expression: 'document.querySelector("h1")?.innerText',
  });
  console.log('Main Heading:', headingEval.result.value);

  // Scroll down to grid
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 500, behavior: "instant" })',
  });
  await sleep(1000);

  const gridShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/gallery_desktop_grid.png', Buffer.from(gridShot.data, 'base64'));
  console.log('Captured audit/screenshots/gallery_desktop_grid.png');

  // Click on the first photo card to open lightbox
  console.log('Testing Lightbox Modal...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelectorAll("h3")[0]?.closest(".group")?.click()',
  });
  await sleep(1200);

  const lightboxShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/gallery_lightbox_open.png', Buffer.from(lightboxShot.data, 'base64'));
  console.log('Captured audit/screenshots/gallery_lightbox_open.png');

  // Check lightbox title
  const lightboxTitle = await send('Runtime.evaluate', {
    expression: 'document.querySelector(".fixed.inset-0.z-50 h2")?.innerText',
    returnByValue: true,
  });
  console.log('Lightbox Active Photo Title:', lightboxTitle.result?.value);

  // Press ArrowRight to test next photo
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' });
  await sleep(800);

  const nextTitle = await send('Runtime.evaluate', {
    expression: 'document.querySelector(".fixed.inset-0.z-50 h2")?.innerText',
    returnByValue: true,
  });
  console.log('Lightbox Next Photo Title (ArrowRight):', nextTitle.result?.value);

  // Press Escape to close lightbox
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await sleep(600);

  const isLightboxClosed = await send('Runtime.evaluate', {
    expression: '!document.querySelector(".fixed.inset-0.z-50")',
    returnByValue: true,
  });
  console.log('Lightbox Closed after Escape:', isLightboxClosed.result?.value);

  // Test Tablet viewport (768x1024)
  console.log('Testing Tablet Viewport (768x1024)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 300, behavior: "instant" })',
  });
  await sleep(1000);
  const tabletShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/gallery_tablet.png', Buffer.from(tabletShot.data, 'base64'));
  console.log('Captured audit/screenshots/gallery_tablet.png');

  // Test Mobile viewport (390x844)
  console.log('Testing Mobile Viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 200, behavior: "instant" })',
  });
  await sleep(1000);
  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/gallery_mobile.png', Buffer.from(mobileShot.data, 'base64'));
  console.log('Captured audit/screenshots/gallery_mobile.png');

  // Test Homepage Gallery Teaser
  console.log('Testing Homepage Gallery Teaser...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send('Page.navigate', { url: 'http://localhost:3000/#gallery-preview' });
  await sleep(2500);

  const teaserShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/homepage_gallery_teaser.png', Buffer.from(teaserShot.data, 'base64'));
  console.log('Captured audit/screenshots/homepage_gallery_teaser.png');

  ws.close();
  console.log('=== VERIFICATION COMPLETED SUCCESSFULLY ===');
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
