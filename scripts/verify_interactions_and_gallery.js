const fs = require('fs');
const path = require('path');

async function run() {
  console.log('=== VERIFYING PREMIUM INTERACTION SYSTEM & GALLERY REFINEMENT (PHASE 8) ===');

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

  async function evaluate(expression) {
    const res = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval error: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result.value;
  }

  // Set Desktop Viewport
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // =========================================================================
  // TEST 1: TILE HOVER & SELECTION POLISH (HOMEPAGE & SPA)
  // =========================================================================
  console.log('\n--- 1. Testing Tile Hover & Selection Interactions ---');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to room cards
  await evaluate(`(() => {
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) roomsSection.scrollIntoView({ behavior: 'instant', block: 'center' });
  })()`);
  await new Promise(r => setTimeout(r, 600));

  // Hover over the first room card
  console.log('Simulating hover on Deluxe Room card...');
  const roomCardCenter = await evaluate(`(() => {
    const card = document.querySelector('a[href="/rooms/deluxe-room"]')?.closest('.group');
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  })()`);

  if (roomCardCenter) {
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: roomCardCenter.x,
      y: roomCardCenter.y
    });
    await new Promise(r => setTimeout(r, 400));
    console.log('Captured hover state on Deluxe Room card.');
    await takeScreenshot('interaction_01_hover_tile.png');
  }

  // Navigate to Spa to test interactive selection state
  console.log('\nNavigating to /spa to test selection state...');
  await send('Page.navigate', { url: 'http://localhost:3000/spa' });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to treatment cards
  await evaluate(`(() => {
    const el = document.getElementById('catalog') || document.querySelector('article');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  })()`);
  await new Promise(r => setTimeout(r, 600));

  // Find a treatment card and click its select button
  const selectionTest = await evaluate(`(() => {
    const selectBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Select');
    if (!selectBtn) return { success: false, reason: 'Select button not found' };
    selectBtn.click();
    return { success: true };
  })()`);
  console.log('Spa selection click result:', selectionTest);
  await new Promise(r => setTimeout(r, 500));
  await takeScreenshot('interaction_02_selected_state.png');

  // =========================================================================
  // TEST 2: TYPOGRAPHY ENTRANCE (GALLERY HERO)
  // =========================================================================
  console.log('\n--- 2. Testing Typography Entrance on /gallery ---');
  await send('Page.navigate', { url: 'http://localhost:3000/gallery' });
  await new Promise(r => setTimeout(r, 1500));

  const typoStatus = await evaluate(`(() => {
    const h1 = document.querySelector('h1');
    const p = document.querySelector('main p');
    return {
      h1Text: h1 ? h1.innerText.replace(/\\n/g, ' ') : null,
      pText: p ? p.innerText.substring(0, 60) + '...' : null
    };
  })()`);
  console.log('Gallery Typography inspection:', typoStatus);
  await takeScreenshot('interaction_03_animated_headline.png');

  // =========================================================================
  // TEST 3: THREE-AT-A-TIME PROGRESSIVE GALLERY REVEAL & DEDUPLICATION
  // =========================================================================
  console.log('\n--- 3. Testing 3-Photos-at-a-Time Progressive Reveal ---');
  // Scroll down to the gallery grid
  await evaluate(`(() => {
    const filterBar = document.querySelector('section.py-6');
    if (filterBar) filterBar.scrollIntoView({ behavior: 'instant', block: 'start' });
  })()`);
  await new Promise(r => setTimeout(r, 600));

  // Check initial batch: exactly 3 photos
  const initialBatch = await evaluate(`(() => {
    const photos = document.querySelectorAll('[aria-label^="Open photo:"]');
    const counterText = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Displaying'))?.innerText;
    return {
      count: photos.length,
      counterText
    };
  })()`);
  console.log('Initial Gallery Batch:', initialBatch);
  if (initialBatch.count !== 3) {
    console.error(`FAILED: Expected exactly 3 initial photos, got ${initialBatch.count}`);
  } else {
    console.log('PASS: Exactly 3 initial curated photos displayed.');
  }
  await takeScreenshot('gallery_01_initial_three.png');

  // Click "Discover More Photographs"
  console.log('\nClicking "Discover More Photographs"...');
  const discoverClick1 = await evaluate(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Discover More Photographs'));
    if (!btn) return { success: false };
    btn.click();
    return { success: true };
  })()`);
  console.log('Discover click 1:', discoverClick1);
  await new Promise(r => setTimeout(r, 800));

  // Check second batch: exactly 6 photos
  const secondBatch = await evaluate(`(() => {
    const photos = document.querySelectorAll('[aria-label^="Open photo:"]');
    const counterText = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Displaying'))?.innerText;
    return {
      count: photos.length,
      counterText
    };
  })()`);
  console.log('Second Gallery Batch:', secondBatch);
  if (secondBatch.count !== 6) {
    console.error(`FAILED: Expected exactly 6 photos after first reveal, got ${secondBatch.count}`);
  } else {
    console.log('PASS: Exactly 6 photos (3 + 3) now visible.');
  }
  await takeScreenshot('gallery_02_next_three_reveal.png');

  // Test Category Switch & Final Partial Group (Lotus Pool category: 5 total photos -> 3 then 2)
  console.log('\nSwitching category to "Lotus Pool" (5 photos total)...');
  await evaluate(`(() => {
    const poolBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Lotus Pool'));
    if (poolBtn) poolBtn.click();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  const poolInitial = await evaluate(`(() => {
    const photos = document.querySelectorAll('[aria-label^="Open photo:"]');
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Discover More Photographs'));
    return {
      count: photos.length,
      buttonText: btn ? btn.innerText.replace(/\\n/g, ' ') : null
    };
  })()`);
  console.log('Pool initial batch (should be 3):', poolInitial);

  // Click Discover More for the remaining 2 photos
  console.log('Clicking Discover More for the remaining partial group of 2...');
  await evaluate(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Discover More Photographs'));
    if (btn) btn.click();
  })()`);
  await new Promise(r => setTimeout(r, 800));

  const poolComplete = await evaluate(`(() => {
    const photos = document.querySelectorAll('[aria-label^="Open photo:"]');
    const allDoneText = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('All 5 curated photographs'))?.innerText;
    const hasMoreBtn = !!Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Discover More Photographs'));
    return {
      count: photos.length,
      allDoneText,
      hasMoreBtn
    };
  })()`);
  console.log('Pool complete state (should be 5, no more button):', poolComplete);
  if (poolComplete.count === 5 && !poolComplete.hasMoreBtn) {
    console.log('PASS: Final partial group of 2 revealed smoothly; Discover More button correctly hidden.');
  } else {
    console.error('FAILED: Final partial group state mismatch:', poolComplete);
  }
  await takeScreenshot('gallery_03_final_group.png');

  // Test Lightbox on the pool photos
  console.log('\nTesting Lightbox on photo 2...');
  await evaluate(`(() => {
    const photos = document.querySelectorAll('[aria-label^="Open photo:"]');
    if (photos[1]) photos[1].click();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  const lightboxState = await evaluate(`(() => {
    const title = document.querySelector('h2.font-serif')?.innerText;
    const counter = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Photo 2 of 5'))?.innerText;
    return {
      isOpen: !!document.querySelector('button[aria-label="Close Lightbox"]'),
      title,
      counter
    };
  })()`);
  console.log('Lightbox state:', lightboxState);

  // Close lightbox
  await evaluate(`(() => {
    const closeBtn = document.querySelector('button[aria-label="Close Lightbox"]');
    if (closeBtn) closeBtn.click();
  })()`);
  await new Promise(r => setTimeout(r, 400));

  // =========================================================================
  // TEST 4: RESPONSIVE VIEWPORTS
  // =========================================================================
  console.log('\n--- 4. Testing Tablet Viewport (768x1024) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  const tabletMetrics = await evaluate(`(() => {
    return {
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    };
  })()`);
  console.log('Tablet metrics:', tabletMetrics);
  await takeScreenshot('gallery_tablet.png');

  console.log('\n--- 5. Testing Mobile Viewport (390x844 - iPhone 14) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileMetrics = await evaluate(`(() => {
    return {
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    };
  })()`);
  console.log('Mobile metrics:', mobileMetrics);
  await takeScreenshot('gallery_mobile.png');

  // Check console errors
  const errors = consoleMessages.filter(m => m.type === 'error');
  console.log(`\nBrowser Console Errors: ${errors.length}`);
  if (errors.length > 0) {
    console.error('Console errors:', errors);
  }

  console.log('\n=== ALL PHASE 8 VERIFICATIONS COMPLETE ===');
  ws.close();
}

run().catch(err => {
  console.error('Verification script error:', err);
  process.exit(1);
});
