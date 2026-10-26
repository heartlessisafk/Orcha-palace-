const fs = require('fs');

async function run() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.url && t.url.includes('localhost:3000/about'));

  if (!pageTarget) {
    console.error('Page target for /about not found:', targets);
    process.exit(1);
  }

  console.log('Connecting to target:', pageTarget.webSocketDebuggerUrl);
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
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

  await new Promise((resolve) => ws.onopen = resolve);
  console.log('WebSocket connected to Chrome DevTools Protocol');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // ==========================================
  // 1. DESKTOP VIEWPORT (1440 x 900)
  // ==========================================
  console.log('\n--- 1. Testing Desktop Viewport (1440x900) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 2000));

  // Trigger lazy loading of images across the document
  for (let y = 0; y <= 9000; y += 1200) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
    await new Promise(r => setTimeout(r, 120));
  }
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 1000));

  // Dynamically query section positions
  const sectionPositions = await send('Runtime.evaluate', {
    expression: `(() => {
      return Array.from(document.querySelectorAll('section')).map(s => {
        const rect = s.getBoundingClientRect();
        return {
          id: s.id || 'hero',
          top: Math.round(rect.top + window.scrollY),
          height: Math.round(rect.height)
        };
      });
    })()`,
    returnByValue: true
  });

  console.log('Detected section positions:', sectionPositions.result.value);

  const sectionsToCapture = [
    { id: 'hero', file: 'audit/about-hero-desktop.png' },
    { id: 'betwa-setting', file: 'audit/about-betwa-desktop.png' },
    { id: 'spirit', file: 'audit/about-spirit-desktop.png' },
    { id: 'architecture', file: 'audit/about-architecture-desktop.png' },
    { id: 'hospitality', file: 'audit/about-hospitality-desktop.png' },
    { id: 'heritage', file: 'audit/about-guide-desktop.png' },
    { id: 'reserve', file: 'audit/about-booking-desktop.png' },
  ];

  for (const item of sectionsToCapture) {
    const pos = sectionPositions.result.value.find(p => p.id === item.id);
    const top = pos ? pos.top : 0;
    
    // Scroll window
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${top})` });
    await new Promise(r => setTimeout(r, 400));

    // Optional interactive state switches
    if (item.id === 'betwa-setting') {
      await send('Runtime.evaluate', {
        expression: `
          const buttons = Array.from(document.querySelectorAll('#betwa-setting button'));
          const daylightBtn = buttons.find(b => b.innerText.includes('Daylight Flora'));
          if (daylightBtn) daylightBtn.click();
        `
      });
      await new Promise(r => setTimeout(r, 300));
    } else if (item.id === 'architecture') {
      await send('Runtime.evaluate', {
        expression: `
          const spaceBtns = Array.from(document.querySelectorAll('#architecture button'));
          const tentBtn = spaceBtns.find(b => b.innerText.includes('Swiss Tents'));
          if (tentBtn) tentBtn.click();
        `
      });
      await new Promise(r => setTimeout(r, 300));
    } else if (item.id === 'heritage') {
      await send('Runtime.evaluate', {
        expression: `
          const guideBtns = Array.from(document.querySelectorAll('#heritage button'));
          const transitBtn = guideBtns.find(b => b.innerText.includes('Getting Here'));
          if (transitBtn) transitBtn.click();
        `
      });
      await new Promise(r => setTimeout(r, 300));
    }

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: top, width: 1440, height: 900, scale: 1 },
      captureBeyondViewport: true
    });
    fs.writeFileSync(item.file, Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${item.file} at document y=${top}`);
  }

  // ==========================================
  // 2. TABLET VIEWPORT (768 x 1024)
  // ==========================================
  console.log('\n--- 2. Testing Tablet Viewport (768x1024) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 800));
  
  // Capture full tablet page
  const tabletMetrics = await send('Page.getLayoutMetrics');
  const tabletHeight = Math.min(tabletMetrics.contentSize.height, 12000);
  const tabletShot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 768, height: tabletHeight, scale: 1 },
    captureBeyondViewport: true
  });
  fs.writeFileSync('audit/about-tablet.png', Buffer.from(tabletShot.data, 'base64'));
  console.log(`Saved audit/about-tablet.png (768x${tabletHeight})`);

  // ==========================================
  // 3. MOBILE VIEWPORT (390 x 844, scale 2)
  // ==========================================
  console.log('\n--- 3. Testing Mobile Viewport (390x844) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 800));
  
  // Capture full mobile page
  const mobileMetrics = await send('Page.getLayoutMetrics');
  const mobileHeight = Math.min(mobileMetrics.contentSize.height, 16000);
  const mobileShot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: mobileHeight, scale: 1 },
    captureBeyondViewport: true
  });
  fs.writeFileSync('audit/about-mobile.png', Buffer.from(mobileShot.data, 'base64'));
  console.log(`Saved audit/about-mobile.png (390x${mobileHeight})`);

  console.log('\n✅ All precision screenshots and responsive validations complete!');
  ws.close();
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
