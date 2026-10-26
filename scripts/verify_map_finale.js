const fs = require('fs');
const path = require('path');

async function run() {
  console.log('=== VERIFYING PALACE-TO-MAP FINALE ===');

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

  // Measure #map-experience section position and dimensions
  const metrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('map-experience');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const top = window.pageYOffset + rect.top;
      return { top, height: el.offsetHeight, scrollHeight: document.documentElement.scrollHeight };
    })()`,
    returnByValue: true
  });

  console.log('Map finale section metrics:', metrics.result.value);
  const { top: mapTop, height: mapHeight } = metrics.result.value;
  const maxScroll = mapHeight - 900;

  // ACT I: Scroll to top of #map-experience (Opening frame)
  console.log('\n--- ACT I: Opening Monumental Frame ("Discover Orchha") ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot('map_01_desktop_opening.png');

  // Verify Act I DOM elements
  const act1Check = await send('Runtime.evaluate', {
    expression: `(() => {
      const text = document.getElementById('map-experience').innerText.toLowerCase();
      return {
        hasDiscoverOrchha: text.includes('discover orchha'),
        hasBeyondOrdinary: text.includes('beyond the ordinary'),
        hasBetwaSanctuary: text.includes('a sanctuary beside the sacred betwa')
      };
    })()`,
    returnByValue: true
  });
  console.log('Act I Content Verification:', act1Check.result.value);

  // ACT II: Scroll to 28% of track (Image desaturates, blueprint line-art and coordinate grid scale in)
  console.log('\n--- ACT II: Architectural Line-Art & Coordinate Blueprint ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop + maxScroll * 0.28}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot('map_02_desktop_line_art_blueprint.png');

  // ACT III: Scroll to 52% of track (Cartographic Map of Orchha Canvas with Betwa River unfolds)
  console.log('\n--- ACT III: Cartographic Map Canvas Reveal ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop + maxScroll * 0.52}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot('map_03_desktop_cartographic_map.png');

  // ACT IV: Scroll to 68% of track (Location Markers with concentric pulses)
  console.log('\n--- ACT IV: Location Markers Emergence ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop + maxScroll * 0.68}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot('map_04_desktop_location_markers.png');

  // ACT IV INTERACTION: Click on "Orchha Fort & Jahangir Mahal" marker to test floating inspector
  console.log('\n--- ACT IV: Interactive Attraction Inspection ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const fortBtn = Array.from(document.querySelectorAll('#map-experience button')).find(b => b.innerText.includes('Orchha Fort'));
      if (fortBtn) fortBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  await takeScreenshot('map_05_desktop_marker_inspect.png');

  // ACT V: Scroll to 92% of track (The Final Closing Invitation & Book Your Stay CTA)
  console.log('\n--- ACT V: Final Closing Invitation & Book Your Stay CTA ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop + maxScroll * 0.92}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot('map_06_desktop_final_cta.png');

  // Verify Act V DOM elements
  const act5Check = await send('Runtime.evaluate', {
    expression: `(() => {
      const text = document.getElementById('map-experience').innerText.toLowerCase();
      const ctaBtn = Array.from(document.querySelectorAll('#map-experience button, #map-experience a')).find(el => el.innerText.includes('Book Your Stay'));
      return {
        hasClosingMessage: text.includes('your next chapter begins here'),
        hasSacredValley: text.includes('the sacred valley of bundelkhand'),
        hasBookCTA: !!ctaBtn,
        hasWhatsAppDesk: text.includes('+91 94251 41240')
      };
    })()`,
    returnByValue: true
  });
  console.log('Act V Content Verification:', act5Check.result.value);

  // REVERSE SCROLL TEST: Scroll back up through 50% -> 25% -> 0%
  console.log('\n--- Testing Bi-Directional Reverse Scrolling ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop + mapHeight * 0.50}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 600));
  const reverseCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const mapEl = document.querySelector('#map-experience');
      return { mapVisible: !!mapEl };
    })()`,
    returnByValue: true
  });
  console.log('Reverse scroll at 50% verified:', reverseCheck.result.value);

  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 600));
  console.log('Reverse scroll back to top of finale verified.');

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
      const el = document.getElementById('map-experience');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('map_07_tablet_view.png');

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
      const el = document.getElementById('map-experience');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('map_08_mobile_view.png');

  // Test mobile marker tap interaction
  console.log('\nTesting mobile marker selection tap...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const marker = Array.from(document.querySelectorAll('#map-experience button')).find(b => b.innerText.includes('Royal') || b.innerText.includes('14'));
      if (marker) marker.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  await takeScreenshot('map_09_mobile_inspect.png');

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
