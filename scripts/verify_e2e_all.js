const fs = require('fs');
const path = require('path');

async function main() {
  console.log('=== PHASE 6: FINAL END-TO-END INTEGRATION & VERIFICATION AUDIT ===\n');

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
  const consoleErrors = [];

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
      consoleErrors.push(text);
      console.warn('Console Error Caught:', text);
    }
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

  const routes = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'Heritage About Page' },
    { path: '/rooms', name: 'Accommodations Overview' },
    { path: '/rooms/deluxe-room', name: 'Deluxe Marble Room Detail' },
    { path: '/rooms/deluxe-swiss-tent', name: 'Deluxe AC Swiss Tent Detail' },
    { path: '/gallery', name: 'Curated Photo Gallery' },
    { path: '/spa', name: 'Kairali Ayurvedic Spa' },
    { path: '/weddings', name: 'Weddings & Celebrations' }
  ];

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900, dsf: 1, mobile: false },
    { name: 'Tablet', width: 768, height: 1024, dsf: 1, mobile: false },
    { name: 'Mobile', width: 390, height: 844, dsf: 2, mobile: true }
  ];

  const results = [];

  for (const route of routes) {
    console.log(`\n========================================`);
    console.log(`Auditing: ${route.name} (${route.path})`);
    console.log(`========================================`);

    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile
      });

      await send('Page.navigate', { url: `http://localhost:3000${route.path}` });
      await new Promise(r => setTimeout(r, 2000));

      const audit = await send('Runtime.evaluate', {
        expression: `(() => {
          const w = window.innerWidth;
          const sw = document.documentElement.scrollWidth;
          const h1 = document.querySelector('h1')?.innerText || document.querySelector('h2')?.innerText || 'No Title';
          const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            complete: img.complete,
            naturalWidth: img.naturalWidth
          }));
          const brokenImages = images.filter(i => !i.complete || i.naturalWidth === 0);

          return {
            title: h1.replace(/\\n/g, ' ').substring(0, 45),
            windowWidth: w,
            scrollWidth: sw,
            hasOverflow: sw > w,
            totalImages: images.length,
            brokenImagesCount: brokenImages.length
          };
        })()`,
        returnByValue: true
      });

      const data = audit.result.value;
      const status = (!data.hasOverflow && data.brokenImagesCount === 0) ? 'PASS' : 'WARN';

      results.push({
        route: route.path,
        viewport: `${vp.name} (${vp.width}px)`,
        status,
        overflow: data.hasOverflow ? `YES (${data.scrollWidth}px)` : 'No',
        brokenImages: data.brokenImagesCount,
        title: data.title
      });

      // Capture screenshots for Desktop & Mobile on key routes
      if (vp.name === 'Desktop' || vp.name === 'Mobile') {
        const safeSlug = route.path === '/' ? 'home' : route.path.replace(/\//g, '_').substring(1);
        const fileName = `e2e_${safeSlug}_${vp.name.toLowerCase()}.png`;
        const ss = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(screenshotsDir, fileName), Buffer.from(ss.data, 'base64'));
      }
    }
  }

  // ACCESSIBILITY: prefers-reduced-motion test
  console.log('\n--- Auditing prefers-reduced-motion support ---');
  await send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 1500));
  const reducedMotionCheck = await send('Runtime.evaluate', {
    expression: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`,
    returnByValue: true
  });
  console.log('Reduced Motion media query active in browser:', reducedMotionCheck.result.value);

  // SUMMARY TABLE
  console.log('\n=== END-TO-END AUDIT MATRIX ===');
  console.table(results);

  console.log('\nTotal Console Errors Caught:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn('Console Errors:', consoleErrors);
  }

  ws.close();
  console.log('\n=== AUDIT COMPLETE ===');
  process.exit(consoleErrors.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('E2E Audit Failed:', err);
  process.exit(1);
});
