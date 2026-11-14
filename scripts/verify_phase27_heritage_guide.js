const http = require('http');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const OUTPUT_DIR = path.resolve(__dirname, '../.planning/phases/27-heritage-guide-photos');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function createCdpSession(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();

  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      resolve({
        send: (method, params = {}) => new Promise((res, rej) => {
          const reqId = id++;
          callbacks.set(reqId, { res, rej });
          ws.send(JSON.stringify({ id: reqId, method, params }));
        }),
        close: () => ws.close()
      });
    });
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const { res, rej } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) rej(data.error);
        else res(data.result);
      }
    });
    ws.addEventListener('error', reject);
  });
}

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  { name: 'ipad_portrait_768', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true },
  { name: 'ipad_air_820', width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true },
  { name: 'iphone_14_390', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  { name: 'iphone_se_375', width: 375, height: 667, deviceScaleFactor: 2, isMobile: true }
];

async function run() {
  console.log('Testing Phase 27: Heritage Guide Destination Photographs Integration...');
  const targets = await getJson(`http://localhost:${CDP_PORT}/json`);
  let pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  if (!pageTarget) {
    pageTarget = targets.find(t => t.type === 'page');
  }
  if (!pageTarget) {
    throw new Error('No valid page target found on port ' + CDP_PORT);
  }

  const cdp = await createCdpSession(pageTarget.webSocketDebuggerUrl);
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.deviceScaleFactor,
      mobile: vp.isMobile
    });

    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Page.navigate', { url: `http://localhost:3000/about?t=${Date.now()}#heritage` });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll #heritage section into view
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('heritage');
          if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1200));

    // Inspect Heritage Guide cards and images
    const sectionInspection = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const section = document.getElementById('heritage');
          if (!section) return { found: false, error: 'Section #heritage not found' };

          const heading = section.querySelector('h2')?.textContent?.trim();
          const subtitle = section.querySelector('p')?.textContent?.trim();

          // Find the attraction cards
          const grid = section.querySelector('.grid');
          if (!grid) return { found: true, error: 'Grid container not found' };

          const cardElements = Array.from(grid.children);
          const cards = cardElements.map((card, idx) => {
            const img = card.querySelector('img');
            const heading = card.querySelector('h3')?.textContent?.trim();
            const badges = Array.from(card.querySelectorAll('span'));
            const tag = badges[0]?.textContent?.trim();
            const time = badges[1]?.textContent?.trim();
            const distance = card.querySelector('.font-medium span')?.textContent?.trim();
            const highlight = card.querySelector('p')?.textContent?.trim();
            const tourBadge = badges[badges.length - 1]?.textContent?.trim();

            const imgRect = img ? img.getBoundingClientRect() : null;
            const cardRect = card.getBoundingClientRect();

            return {
              index: idx,
              heading,
              tag,
              time,
              distance,
              tourBadge,
              hasImage: !!img,
              imgSrc: img ? img.getAttribute('src') : null,
              imgCurrentSrc: img ? img.currentSrc : null,
              imgComplete: img ? img.complete : false,
              imgNaturalWidth: img ? img.naturalWidth : 0,
              imgNaturalHeight: img ? img.naturalHeight : 0,
              imgRenderedWidth: imgRect ? Math.round(imgRect.width) : 0,
              imgRenderedHeight: imgRect ? Math.round(imgRect.height) : 0,
              cardWidth: Math.round(cardRect.width),
              cardHeight: Math.round(cardRect.height)
            };
          });

          const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

          return {
            found: true,
            heading,
            subtitle,
            cardCount: cards.length,
            cards,
            hasHorizontalOverflow,
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth
          };
        })()
      `,
      returnByValue: true
    });

    if (sectionInspection.exceptionDetails) {
      console.error('JS Error in sectionInspection:', sectionInspection.exceptionDetails);
    }

    // Capture screenshot
    const screenshot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `guide_${vp.name}.jpg`),
      Buffer.from(screenshot.data, 'base64')
    );

    console.log(`Saved screenshot: guide_${vp.name}.jpg`);
    console.log(`Card count: ${sectionInspection.result?.value?.cardCount}`);
    console.log(`Horizontal overflow: ${sectionInspection.result?.value?.hasHorizontalOverflow}`);

    results.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      inspection: sectionInspection.result?.value
    });
  }

  // Restore desktop viewport
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  cdp.close();

  console.log('\n--- VERIFICATION RESULTS SUMMARY ---');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'verification_summary.json'),
    JSON.stringify(results, null, 2)
  );

  return results;
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
