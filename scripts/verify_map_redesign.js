const fs = require('fs');
const path = require('path');

async function run() {
  console.log('=== VERIFYING EDITORIAL CARTOGRAPHIC MAP FINALE REDESIGN (PHASE 7) ===');

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

  // Navigate to homepage
  console.log('Navigating to http://localhost:3000/ ...');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 1500));

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
  await new Promise(r => setTimeout(r, 800));

  // Locate the section
  const sectionMetrics = await evaluate(`(() => {
    const el = document.getElementById('map-experience');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      height: el.offsetHeight,
      scrollHeight: document.documentElement.scrollHeight
    };
  })()`);

  console.log('Section metrics:', sectionMetrics);
  if (!sectionMetrics) {
    console.error('FAILED: #map-experience section not found in DOM');
    process.exit(1);
  }

  const { top: sectionTop, height: sectionHeight } = sectionMetrics;
  const scrollRange = sectionHeight - 900; // Total scrollable distance within section

  // STAGE A: Scroll to 0% of section
  console.log('\n[STAGE A] Scroll to 0% (Hero Resort Photo & Headline)');
  await evaluate(`window.scrollTo({ top: ${sectionTop}, behavior: 'instant' })`);
  await new Promise(r => setTimeout(r, 600));

  const stageA = await evaluate(`(() => {
    const section = document.getElementById('map-experience');
    const h2 = section.querySelector('h2');
    const computedH2 = h2 ? window.getComputedStyle(h2) : null;
    return {
      h2Text: h2 ? h2.textContent.trim() : null,
      h2Opacity: computedH2 ? computedH2.opacity : null,
    };
  })()`);
  console.log('Stage A inspection:', stageA);
  await takeScreenshot('map_redesign_01_hero.png');

  // STAGE A EXIT: Scroll to 15% of section (Headline must be 100% hidden)
  console.log('\n[STAGE A EXIT] Scroll to 15% (Headline must be fully gone)');
  const scroll15 = sectionTop + scrollRange * 0.15;
  await evaluate(`window.scrollTo({ top: ${scroll15}, behavior: 'instant' })`);
  await new Promise(r => setTimeout(r, 600));

  const headlineExitStatus = await evaluate(`(() => {
    const section = document.getElementById('map-experience');
    const stageAContainer = section.querySelector('h2')?.closest('[style*="visibility"]');
    if (!stageAContainer) return { found: false };
    const style = window.getComputedStyle(stageAContainer);
    return {
      found: true,
      visibility: style.visibility,
      opacity: parseFloat(style.opacity || '1'),
      pointerEvents: style.pointerEvents,
      isGone: style.visibility === 'hidden' || parseFloat(style.opacity) <= 0.01
    };
  })()`);
  console.log('Headline exit status at 15% scroll:', headlineExitStatus);
  if (!headlineExitStatus.isGone) {
    console.warn('WARNING: Headline not fully hidden at 15% scroll!');
  } else {
    console.log('PASS: Headline cleanly exited before map reveal.');
  }

  // STAGE B: Scroll to 22% of section (Architectural Line-Art Blueprint)
  console.log('\n[STAGE B] Scroll to 22% (Architectural Blueprint Transformation)');
  const scroll22 = sectionTop + scrollRange * 0.22;
  await evaluate(`window.scrollTo({ top: ${scroll22}, behavior: 'instant' })`);
  await new Promise(r => setTimeout(r, 600));
  await takeScreenshot('map_redesign_02_blueprint.png');

  // STAGE C & D: Scroll to 55% of section (Cartographic Atlas & Anti-Collision Landmarks)
  console.log('\n[STAGE C & D] Scroll to 55% (Cartographic Atlas & Landmark System)');
  const scroll55 = sectionTop + scrollRange * 0.55;
  await evaluate(`window.scrollTo({ top: ${scroll55}, behavior: 'instant' })`);
  await new Promise(r => setTimeout(r, 600));

  // Anti-Collision Verification: Check bounding boxes of all landmark callout labels
  const collisionReport = await evaluate(`(() => {
    const labels = Array.from(document.querySelectorAll('[data-landmark-label]'));
    const boxes = labels.map(el => {
      const rect = el.getBoundingClientRect();
      return {
        id: el.getAttribute('data-landmark-label'),
        text: el.innerText.split('\\n')[1] || el.innerText,
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    });

    const collisions = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const overlaps = !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
        if (overlaps) {
          collisions.push({ a: a.id, b: b.id });
        }
      }
    }

    return {
      labelCount: boxes.length,
      boxes,
      collisions,
      hasOverlap: collisions.length > 0
    };
  })()`);

  console.log('\nAnti-Collision Report:');
  console.log(`- Verified ${collisionReport.labelCount} landmark callout labels`);
  collisionReport.boxes.forEach(b => {
    console.log(`  • [${b.id}] "${b.text}" -> (${b.left}, ${b.top}) w:${b.width} h:${b.height}`);
  });

  if (collisionReport.hasOverlap) {
    console.error('FAILED: Landmark labels collide:', collisionReport.collisions);
  } else {
    console.log('PASS: ZERO landmark label collisions detected! Perfect quadrant separation.');
  }

  await takeScreenshot('map_redesign_03_atlas.png');

  // Test Selection Interaction (Click on Orchha Fort)
  console.log('\nTesting interactive landmark click (Orchha Fort)...');
  await evaluate(`(() => {
    const fortBtn = document.querySelector('button[aria-label="Inspect Orchha Fort & Jahangir Mahal"]');
    if (fortBtn) fortBtn.click();
  })()`);
  await new Promise(r => setTimeout(r, 500));

  const inspectorStatus = await evaluate(`(() => {
    const section = document.getElementById('map-experience');
    const h4 = section.querySelector('h4');
    return {
      hasInspector: !!h4,
      inspectorTitle: h4 ? h4.textContent.trim() : null
    };
  })()`);
  console.log('Curatorial Inspector status:', inspectorStatus);
  await takeScreenshot('map_redesign_04_inspector.png');

  // STAGE E: Scroll to 90% (Final Luxury Booking Invitation)
  console.log('\n[STAGE E] Scroll to 90% (Closing Booking Invitation)');
  const scroll90 = sectionTop + scrollRange * 0.90;
  await evaluate(`window.scrollTo({ top: ${scroll90}, behavior: 'instant' })`);
  await new Promise(r => setTimeout(r, 600));

  const stageEStatus = await evaluate(`(() => {
    const section = document.getElementById('map-experience');
    const ctaHeading = Array.from(section.querySelectorAll('h3')).find(h => h.textContent.includes('next chapter'));
    const bookBtn = Array.from(section.querySelectorAll('button')).find(b => b.textContent.includes('Book Your Stay'));
    return {
      hasCTA: !!ctaHeading,
      ctaText: ctaHeading ? ctaHeading.textContent.trim() : null,
      hasBookBtn: !!bookBtn
    };
  })()`);
  console.log('Stage E status:', stageEStatus);
  await takeScreenshot('map_redesign_05_booking_cta.png');

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
  await new Promise(r => setTimeout(r, 600));

  const tabletMetrics = await evaluate(`(() => {
    const el = document.getElementById('map-experience');
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
    return {
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    };
  })()`);
  console.log('Tablet metrics:', tabletMetrics);
  await new Promise(r => setTimeout(r, 500));
  await takeScreenshot('map_redesign_tablet.png');

  // ==========================================
  // 3. MOBILE VIEWPORT (390 x 844)
  // ==========================================
  console.log('\n--- 3. Testing Mobile Viewport (390x844 - iPhone 14) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileMetrics = await evaluate(`(() => {
    const el = document.getElementById('map-experience');
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
    return {
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    };
  })()`);
  console.log('Mobile metrics:', mobileMetrics);
  await new Promise(r => setTimeout(r, 500));
  await takeScreenshot('map_redesign_mobile.png');

  // Check console errors
  const errors = consoleMessages.filter(m => m.type === 'error');
  console.log(`\nBrowser Console Errors: ${errors.length}`);
  if (errors.length > 0) {
    console.error('Console errors:', errors);
  }

  console.log('\n=== ALL PHASE 7 VERIFICATIONS COMPLETE ===');
  ws.close();
}

run().catch(err => {
  console.error('Verification script error:', err);
  process.exit(1);
});
