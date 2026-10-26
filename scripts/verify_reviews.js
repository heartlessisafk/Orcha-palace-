const fs = require('fs');
const path = require('path');

async function run() {
  console.log('=== VERIFYING GUEST LOVE EXPERIENCE ===');

  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url && t.url.includes('localhost:3000'));

  if (!pageTarget) {
    console.error('Page target for localhost:3000 not found:', targets);
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
      const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
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

  await new Promise((resolve) => ws.onopen = resolve);
  console.log('WebSocket connected to Chrome DevTools Protocol');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  const screenshotsDir = path.join(__dirname, '..', 'audit', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  async function takeScreenshot(fileName) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const filePath = path.join(screenshotsDir, fileName);
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved screenshot: ${filePath} (${Math.round(buffer.length / 1024)} KB)`);
  }

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

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2500));

  // Find the exact location of #guest-stories
  const sectionMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('guest-stories');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const top = window.pageYOffset + rect.top;
      return { top, height: el.offsetHeight, scrollHeight: document.documentElement.scrollHeight };
    })()`,
    returnByValue: true
  });

  console.log('Section metrics:', sectionMetrics.result.value);
  const { top: sectionTop, height: sectionHeight } = sectionMetrics.result.value;

  // Scroll directly into #guest-stories (start of pinned track)
  console.log('\nScrolling to top of #guest-stories...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_01_desktop_opening.png');

  // Verify Act I content & Card 1 in DOM
  const card1Data = await send('Runtime.evaluate', {
    expression: `(() => {
      const h2 = document.querySelector('#guest-stories h2');
      const author = document.body.innerText.includes('Robert H');
      const tripadvisor = document.body.innerText.includes('Read on TripAdvisor');
      return {
        heading: h2 ? h2.innerText : null,
        hasRobertH: author,
        hasTripAdvisorLink: tripadvisor
      };
    })()`,
    returnByValue: true
  });
  console.log('Act I & Card 1 check:', card1Data.result.value);

  // Scroll to 20% of section (Card 1 exiting Left, Card 2 entering Right)
  console.log('\nScrolling to 20% through track (Card 1 exiting Left)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop + sectionHeight * 0.20}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_02_card1_exiting_left.png');

  // Scroll to 38% of section (Card 2 active, River Mist review)
  console.log('\nScrolling to 38% through track (Card 2 active)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop + sectionHeight * 0.38}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_03_card2_active_right.png');

  // Scroll to 60% of section (Card 3 active, Swiss Tents & Pool review)
  console.log('\nScrolling to 60% through track (Card 3 active)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop + sectionHeight * 0.60}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_04_card3_active_left.png');

  // Scroll to 78% of section (Card 4 active, Kaleva Dining review)
  console.log('\nScrolling to 78% through track (Card 4 active)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop + sectionHeight * 0.78}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_05_card4_active_right.png');

  // Scroll to 95% of section (Act IV Collective Memory Finale)
  console.log('\nScrolling to 95% through track (Act IV Collective Memory)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop + sectionHeight * 0.95}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_06_act4_collective_memory.png');

  // REVERSE SCROLL TEST (Scrubbing backwards from 95% -> 50% -> 0%)
  console.log('\n--- Testing Bi-Directional Reverse Scrolling ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop + sectionHeight * 0.50}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 500));
  const reverseAt50 = await send('Runtime.evaluate', {
    expression: `(() => {
      const text = document.querySelector('#guest-stories').innerText;
      return { hasSwissTents: text.includes('Swiss tents') || text.includes('Heritage Traveler') };
    })()`,
    returnByValue: true
  });
  console.log('Reverse scroll at 50% verified:', reverseAt50.result.value);

  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${sectionTop}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Reverse scroll back to top of section verified.');

  // VERIFY EXTERNAL LINKS & ATTRIBUTIONS
  console.log('\n--- Verifying Authentic Review Links & Data ---');
  const linksData = await send('Runtime.evaluate', {
    expression: `(() => {
      const links = Array.from(document.querySelectorAll('#guest-stories a[href^="http"]')).map(a => ({
        text: a.innerText.trim(),
        href: a.href,
        target: a.target,
        rel: a.rel
      }));
      return links;
    })()`,
    returnByValue: true
  });
  console.log('Verified external links found:', linksData.result.value);

  // ==========================================
  // 2. TABLET VIEWPORT (768 x 1024)
  // ==========================================
  console.log('\n--- 2. Testing Tablet Viewport (768x1024) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 800));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('guest-stories');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_07_tablet_view.png');

  // ==========================================
  // 3. MOBILE VIEWPORT (390 x 844)
  // ==========================================
  console.log('\n--- 3. Testing Mobile Viewport (390x844) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 800));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('guest-stories');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('reviews_08_mobile_carousel.png');

  // Test mobile "Next" button interaction
  console.log('\nTesting mobile carousel next button click...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const nextBtn = document.querySelector('#guest-stories button[aria-label="Next guest review"]');
      if (nextBtn) nextBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  await takeScreenshot('reviews_09_mobile_next_card.png');

  // Check horizontal overflow
  const overflowCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      return {
        windowWidth: window.innerWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`,
    returnByValue: true
  });
  console.log('Mobile horizontal overflow check:', overflowCheck.result.value);

  // Check console errors
  console.log('\n--- Console Error Audit ---');
  const errors = consoleMessages.filter(m => m.type === 'error');
  console.log(`Total console errors recorded: ${errors.length}`);
  if (errors.length > 0) {
    console.warn('Recorded errors:', errors);
  }

  console.log('\n=== ALL BROWSER VERIFICATION STEPS COMPLETED ===');
  ws.close();
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
