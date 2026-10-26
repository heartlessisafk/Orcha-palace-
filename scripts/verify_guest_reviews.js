const fs = require('fs');
const path = require('path');

async function main() {
  console.log('=== VERIFYING GUEST LOVE EXPERIENCE (PHASE 2) ===');

  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url && t.url.includes('localhost:3000'));
  if (!pageTarget) {
    console.error('No page target found');
    process.exit(1);
  }

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
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // 1. DESKTOP VIEWPORT (1440 x 900)
  console.log('\n--- 1. Testing Desktop Viewport (1440x900) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2500));

  const initCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const sec = document.getElementById('guest-stories');
      const r = sec.getBoundingClientRect();
      return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        top: window.pageYOffset + r.top,
        height: sec.offsetHeight
      };
    })()`,
    returnByValue: true
  });

  console.log('Viewport & Section Init:', initCheck.result.value);
  const { top, height } = initCheck.result.value;
  const maxScroll = height - 900;

  const steps = [
    { name: 'Card 1 (Robert H - River Tranquility)', pct: 0.05 },
    { name: 'Card 1 Exit Left / Card 2 Enter Right', pct: 0.25 },
    { name: 'Card 2 (Verified Traveler - Heritage Suite)', pct: 0.38 },
    { name: 'Card 2 Exit Right / Card 3 Enter Left', pct: 0.52 },
    { name: 'Card 3 (Heritage Traveler - Swiss Tents)', pct: 0.65 },
    { name: 'Card 3 Exit Left / Card 4 Enter Right', pct: 0.76 },
    { name: 'Card 4 (Family Guest - Lotus Pool & Dining)', pct: 0.85 },
    { name: 'Collective Memory Finale', pct: 0.96 }
  ];

  const screenshotsDir = path.join(__dirname, '..', 'audit', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const scrollPos = top + maxScroll * step.pct;
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${scrollPos}, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 600));

    const cardStates = await send('Runtime.evaluate', {
      expression: `(() => {
        // Find the 4 desktop cards and the collective memory card inside .sticky
        const sticky = document.querySelector('#guest-stories .sticky');
        if (!sticky) return [];

        const stage = sticky.querySelector('.relative.z-20');
        if (!stage) return [];

        const motionDivs = Array.from(stage.children);
        return motionDivs.map((div, idx) => {
          const r = div.getBoundingClientRect();
          const s = window.getComputedStyle(div);
          return {
            index: idx + 1,
            opacity: parseFloat(s.opacity).toFixed(2),
            pointerEvents: s.pointerEvents,
            left: Math.round(r.left),
            top: Math.round(r.top),
            width: Math.round(r.width),
            height: Math.round(r.height),
            transform: s.transform === 'none' ? 'none' : s.transform.substring(0, 30) + '...'
          };
        });
      })()`,
      returnByValue: true
    });

    console.log(`\nStep ${i + 1}: ${step.name} (at ${(step.pct * 100).toFixed(0)}% scroll)`);
    console.table(cardStates.result.value);

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    const ssPath = path.join(screenshotsDir, `review_step_${i + 1}.png`);
    fs.writeFileSync(ssPath, Buffer.from(ss.data, 'base64'));
    console.log(`Saved screenshot: ${ssPath}`);
  }

  // 2. TABLET VIEWPORT (768 x 1024)
  console.log('\n--- 2. Testing Tablet Viewport (768x1024) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  const tabMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const sec = document.getElementById('guest-stories');
      const r = sec.getBoundingClientRect();
      return { top: window.pageYOffset + r.top };
    })()`,
    returnByValue: true
  });
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${tabMetrics.result.value.top}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 600));
  const tabSS = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotsDir, 'review_tablet.png'), Buffer.from(tabSS.data, 'base64'));
  console.log('Saved tablet review screenshot: audit/screenshots/review_tablet.png');

  // 3. MOBILE VIEWPORT (390 x 844)
  console.log('\n--- 3. Testing Mobile Viewport (390x844) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  const mobMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const sec = document.getElementById('guest-stories');
      const r = sec.getBoundingClientRect();
      return { top: window.pageYOffset + r.top };
    })()`,
    returnByValue: true
  });
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mobMetrics.result.value.top}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 600));

  // Test mobile carousel click next button
  await send('Runtime.evaluate', {
    expression: `(() => {
      const nextBtn = document.querySelector('#guest-stories button[aria-label="Next guest review"]');
      if (nextBtn) nextBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  const mobSS = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotsDir, 'review_mobile.png'), Buffer.from(mobSS.data, 'base64'));
  console.log('Saved mobile review screenshot: audit/screenshots/review_mobile.png');

  ws.close();
  console.log('\n=== ALL GUEST REVIEW VERIFICATION CHECKS COMPLETED ===');
  process.exit(0);
}

main().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
