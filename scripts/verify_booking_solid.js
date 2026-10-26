const fs = require('fs');

async function verify() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.url && t.url.includes('localhost:3000'));
  
  if (!pageTarget) {
    console.error('Target not found:', targets);
    process.exit(1);
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');

  // --- 1. DESKTOP VIEWPORT (1440 x 900) ---
  console.log('Setting Desktop viewport: 1440x900');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  // A. Initial Hero State (scrollY = 0)
  console.log('Capturing Initial Hero State (scrollY = 0)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await new Promise(r => setTimeout(r, 400));
  const shotInitial = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/hero-booking-solid-initial.png', Buffer.from(shotInitial.data, 'base64'));

  // Verify styles at initial state
  const checkInitial = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const panel = document.querySelector('div[class*="origin-bottom"]');
        const card = panel.querySelector('.rounded-2xl');
        const body = panel.querySelector('.p-5');
        const strip = panel.querySelector('.border-t');
        const compPanel = window.getComputedStyle(panel);
        const compCard = window.getComputedStyle(card);
        const compBody = window.getComputedStyle(body);
        const compStrip = window.getComputedStyle(strip);
        return {
          panelOpacity: compPanel.opacity,
          cardBg: compCard.backgroundColor,
          bodyBg: compBody.backgroundColor,
          stripBg: compStrip.backgroundColor,
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Initial Styles:', checkInitial.result.value);

  // B. Mid-Scroll Transition (scrollY = 350)
  console.log('Capturing Mid-Scroll Transition (scrollY = 350)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 350)' });
  await new Promise(r => setTimeout(r, 400));
  const shotMid = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/hero-booking-solid-mid.png', Buffer.from(shotMid.data, 'base64'));

  const checkMid = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const panel = document.querySelector('div[class*="origin-bottom"]');
        return {
          panelOpacity: window.getComputedStyle(panel).opacity,
          transform: window.getComputedStyle(panel).transform
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mid-Scroll Styles:', checkMid.result.value);

  // C. Fully Settled Booking State (scrollY = 720)
  console.log('Capturing Settled Booking State (scrollY = 720)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 720)' });
  await new Promise(r => setTimeout(r, 400));
  const shotSettled = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/hero-booking-solid-settled.png', Buffer.from(shotSettled.data, 'base64'));

  const checkSettled = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const panel = document.querySelector('div[class*="origin-bottom"]');
        return {
          panelOpacity: window.getComputedStyle(panel).opacity,
          transform: window.getComputedStyle(panel).transform
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Settled Styles:', checkSettled.result.value);

  // D. Scrolled Beyond Transition (scrollY = 1100)
  console.log('Capturing Scrolled Beyond State (scrollY = 1100)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1100)' });
  await new Promise(r => setTimeout(r, 400));
  const shotBeyond = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/hero-booking-solid-scrolled-past.png', Buffer.from(shotBeyond.data, 'base64'));

  const checkBeyond = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const panel = document.querySelector('div[class*="origin-bottom"]');
        return {
          panelOpacity: window.getComputedStyle(panel).opacity,
          transform: window.getComputedStyle(panel).transform
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Beyond Transition Styles:', checkBeyond.result.value);

  // --- 2. MOBILE VIEWPORT (390 x 844) ---
  console.log('Setting Mobile viewport: 390x844');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 1500));

  // A. Mobile Initial State
  console.log('Capturing Mobile Initial State...');
  const shotMobInitial = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/hero-booking-solid-mobile-initial.png', Buffer.from(shotMobInitial.data, 'base64'));

  // B. Mobile Settled State
  console.log('Capturing Mobile Settled State (scrollY = 600)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 600)' });
  await new Promise(r => setTimeout(r, 400));
  const shotMobSettled = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/hero-booking-solid-mobile-settled.png', Buffer.from(shotMobSettled.data, 'base64'));

  console.log('All screenshots and verifications completed successfully!');
  ws.close();
  process.exit(0);
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
