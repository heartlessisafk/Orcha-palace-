const fs = require('fs');
const path = require('path');

async function main() {
  console.log('=== VERIFYING GALLERY EXPERIENCE (PHASE 5) ===');

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

  const screenshotsDir = path.join(__dirname, '..', 'audit', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  // 1. DESKTOP VIEWPORT (1440x900)
  console.log('\n--- 1. Testing Gallery Desktop (1440x900) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000/gallery' });
  await new Promise(r => setTimeout(r, 2000));

  const initialCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = document.querySelectorAll('section .grid > div');
      const tabs = document.querySelectorAll('button[class*="rounded-full"]');
      return {
        cardCount: cards.length,
        tabCount: tabs.length
      };
    })()`,
    returnByValue: true
  });
  console.log('Initial Gallery Load:', initialCheck.result.value);

  // 2. TEST STICKY FILTER BAR UNDER SCROLL
  console.log('\n--- 2. Testing Sticky Filter Bar Pinning ---');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 800, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 600));

  const stickyCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const filterBar = document.querySelector('.sticky');
      if (!filterBar) return null;
      const rect = filterBar.getBoundingClientRect();
      const style = window.getComputedStyle(filterBar);
      return {
        isSticky: style.position === 'sticky',
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height)
      };
    })()`,
    returnByValue: true
  });
  console.log('Sticky Filter Bar Metrics:', stickyCheck.result.value);

  const ssSticky = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotsDir, 'gallery_sticky_filter.png'), Buffer.from(ssSticky.data, 'base64'));
  console.log('Saved audit/screenshots/gallery_sticky_filter.png');

  // 3. TEST FILTER TAB CLICK
  console.log('\n--- 3. Testing Category Filter Switching ("Lotus Pool") ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const poolBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Lotus Pool'));
      if (poolBtn) poolBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  const poolFilterCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = document.querySelectorAll('section .grid > div');
      return {
        cardCount: cards.length
      };
    })()`,
    returnByValue: true
  });
  console.log('Photos under "Lotus Pool" filter:', poolFilterCheck.result.value);

  const ssPool = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotsDir, 'gallery_filtered_pool.png'), Buffer.from(ssPool.data, 'base64'));
  console.log('Saved audit/screenshots/gallery_filtered_pool.png');

  // 4. TEST LIGHTBOX OPEN & CONTROLS
  console.log('\n--- 4. Testing Lightbox Modal ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const firstCard = document.querySelector('section .grid > div');
      if (firstCard) firstCard.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  const lightboxCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      if (!modal) return null;
      const title = modal.querySelector('h2')?.innerText;
      const info = modal.innerText;
      return {
        isOpen: true,
        title,
        hasScore: info.includes('Score'),
        hasCloseBtn: !!modal.querySelector('button[aria-label="Close Lightbox"]'),
        hasNextBtn: !!modal.querySelector('button[aria-label="Next Photo"]')
      };
    })()`,
    returnByValue: true
  });
  console.log('Lightbox Open Verification:', lightboxCheck.result.value);

  const ssLightbox = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotsDir, 'gallery_lightbox_open.png'), Buffer.from(ssLightbox.data, 'base64'));
  console.log('Saved audit/screenshots/gallery_lightbox_open.png');

  // 5. TEST KEYBOARD ARROW RIGHT NAVIGATION
  console.log('\n--- 5. Testing Keyboard ArrowRight Navigation ---');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' });
  await new Promise(r => setTimeout(r, 500));

  const nextCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      return modal?.querySelector('h2')?.innerText;
    })()`,
    returnByValue: true
  });
  console.log('After ArrowRight, active photo title:', nextCheck.result.value);

  // 6. TEST KEYBOARD ESCAPE TO CLOSE
  console.log('\n--- 6. Testing Keyboard Escape Close ---');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await new Promise(r => setTimeout(r, 500));

  const closeCheck = await send('Runtime.evaluate', {
    expression: `!document.querySelector('.fixed.inset-0.z-50')`,
    returnByValue: true
  });
  console.log('Lightbox closed successfully via Escape:', closeCheck.result.value);

  // 7. TEST MOBILE VIEWPORT (390x844)
  console.log('\n--- 7. Testing Mobile Gallery Viewport ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000/gallery' });
  await new Promise(r => setTimeout(r, 2000));

  const mobSS = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotsDir, 'gallery_mobile_view.png'), Buffer.from(mobSS.data, 'base64'));
  console.log('Saved audit/screenshots/gallery_mobile_view.png');

  ws.close();
  console.log('\n=== ALL GALLERY VERIFICATION CHECKS COMPLETED ===');
  process.exit(0);
}

main().catch(err => {
  console.error('Gallery verification failed:', err);
  process.exit(1);
});
