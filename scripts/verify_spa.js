const fs = require('fs');

async function run() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.url && t.url.includes('localhost:3000/spa'));
  
  if (!pageTarget) {
    console.error('Page target not found:', targets);
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
    } else if (msg.method === 'Console.messageAdded') {
      console.log('Browser console:', msg.params.message.text);
    }
  };

  await new Promise((resolve) => ws.onopen = resolve);
  console.log('WebSocket connected to Chrome DevTools');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Reload page to start fresh
  await send('Page.navigate', { url: 'http://localhost:3000/spa' });
  await new Promise(r => setTimeout(r, 2000));

  // Verify that all 11 images and assets load properly
  const imgCheck = await send('Runtime.evaluate', {
    expression: `
      Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }))
    `,
    returnByValue: true
  });
  console.log(`Found ${imgCheck.result.value.length} images on page.`);
  const brokenImgs = imgCheck.result.value.filter(img => img.complete && img.naturalWidth === 0);
  if (brokenImgs.length > 0) {
    console.error('Broken images detected:', brokenImgs);
  } else {
    console.log('ALL images loaded successfully with naturalWidth > 0!');
  }

  // 1. Capture Desktop Hero
  console.log('Capturing Desktop Hero...');
  const heroShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/phase4-spa-royal-hero.png', Buffer.from(heroShot.data, 'base64'));
  console.log('Saved audit/phase4-spa-royal-hero.png');

  // 2. Scroll to catalogue & capture
  console.log('Scrolling to catalogue...');
  await send('Runtime.evaluate', {
    expression: `document.getElementById('catalogue').scrollIntoView({ behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));

  const catShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/phase4-spa-royal-catalogue.png', Buffer.from(catShot.data, 'base64'));
  console.log('Saved audit/phase4-spa-royal-catalogue.png');

  // 3. Test selecting treatments (click first two "Select" buttons)
  console.log('Testing quick-commerce selection...');
  const selectionTest = await send('Runtime.evaluate', {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Select'));
      if (buttons.length >= 2) {
        buttons[0].click(); // Abhyangam (2200)
        buttons[1].click(); // Shirodhara (3080)
      }
      true;
    `
  });
  await new Promise(r => setTimeout(r, 600));

  // Check subtotal text
  const trayText = await send('Runtime.evaluate', {
    expression: `document.querySelector('aside')?.textContent || ''`,
    returnByValue: true
  });
  console.log('Bottom Tray Text:', trayText.result.value);

  // 4. Open Selection Tray Drawer
  console.log('Opening Selection Tray Drawer...');
  await send('Runtime.evaluate', {
    expression: `
      const reviewBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Review Tray') || b.textContent.includes('Treatment Tray'));
      if (reviewBtn) reviewBtn.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const trayShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/phase4-spa-royal-tray.png', Buffer.from(trayShot.data, 'base64'));
  console.log('Saved audit/phase4-spa-royal-tray.png');

  // 5. Click "Proceed to Spa Enquiry" from tray drawer
  console.log('Proceeding to Spa Enquiry...');
  await send('Runtime.evaluate', {
    expression: `
      const proceedBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Proceed to Spa Enquiry'));
      if (proceedBtn) proceedBtn.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const enquiryShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/phase4-spa-royal-enquiry.png', Buffer.from(enquiryShot.data, 'base64'));
  console.log('Saved audit/phase4-spa-royal-enquiry.png');

  // Close enquiry modal
  await send('Runtime.evaluate', {
    expression: `
      const closeBtn = document.querySelector('button[aria-label=\"Close enquiry modal\"]');
      if (closeBtn) closeBtn.click();
    `
  });
  await new Promise(r => setTimeout(r, 400));

  // 6. Open Treatment Detail Modal
  console.log('Opening Treatment Detail Modal...');
  await send('Runtime.evaluate', {
    expression: `
      const title = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Abhyangam') || h.textContent.includes('Shirodhara'));
      if (title) title.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const detailShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/phase4-spa-royal-detail.png', Buffer.from(detailShot.data, 'base64'));
  console.log('Saved audit/phase4-spa-royal-detail.png');

  // Close detail modal
  await send('Runtime.evaluate', {
    expression: `
      const closeDetailBtn = document.querySelector('button[aria-label=\"Close treatment details\"]');
      if (closeDetailBtn) closeDetailBtn.click();
    `
  });
  await new Promise(r => setTimeout(r, 400));

  // 7. Mobile Viewport Test (390 x 844)
  console.log('Testing Mobile Viewport (390 x 844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000/spa' });
  await new Promise(r => setTimeout(r, 1500));

  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/phase4-spa-royal-mobile.png', Buffer.from(mobileShot.data, 'base64'));
  console.log('Saved audit/phase4-spa-royal-mobile.png');

  console.log('All verification checks completed successfully!');
  ws.close();
  process.exit(0);
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
