const http = require('http');
const fs = require('fs');
const path = require('path');

const CDP_PORT = 9222;
const OUTPUT_DIR = path.resolve(__dirname, '../.planning/phases/24-tablet-mobile-booking-modal-responsiveness');

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
  { name: 'ipad_portrait_768', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true },
  { name: 'ipad_landscape_1024', width: 1024, height: 768, deviceScaleFactor: 2, isMobile: true },
  { name: 'ipad_air_820', width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true },
  { name: 'iphone_se_375', width: 375, height: 667, deviceScaleFactor: 2, isMobile: true },
  { name: 'iphone_14_390', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  { name: 'iphone_max_430', width: 430, height: 932, deviceScaleFactor: 3, isMobile: true },
  { name: 'desktop_1440', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false }
];

async function run() {
  console.log('Testing Phase 24: Tablet & Mobile Booking & Modal Responsiveness...');
  const targets = await getJson(`http://localhost:${CDP_PORT}/json`);
  const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  if (!pageTarget) {
    throw new Error('No localhost:3000 page target found');
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
    await cdp.send('Page.navigate', { url: `http://localhost:3000?t=${Date.now()}` });
    await new Promise(r => setTimeout(r, 1800));

    // Scroll booking widget into view
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('booking-sequence');
          if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
        })()
      `
    });
    await new Promise(r => setTimeout(r, 800));

    // Test 1: Open Occupancy Dropdown
    const occupancyTest = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-haspopup="dialog"]');
          if (!btn) return { error: 'Occupancy button not found' };
          btn.click();
          return { clicked: true };
        })()
      `,
      returnByValue: true
    });

    await new Promise(r => setTimeout(r, 500));

    // Measure occupancy popover dimensions and bounds
    const popoverBounds = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const popover = document.querySelector('.animate-fade-in');
          if (!popover) return { found: false };
          const rect = popover.getBoundingClientRect();
          return {
            found: true,
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            isWithinHorizontalBounds: rect.left >= 0 && rect.right <= window.innerWidth + 2
          };
        })()
      `,
      returnByValue: true
    });

    // Capture screenshot of occupancy open
    const popoverScreenshot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `occupancy_${vp.name}.jpg`),
      Buffer.from(popoverScreenshot.data, 'base64')
    );

    // Close occupancy dropdown by clicking outside or pressing Escape
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        })()
      `
    });
    await new Promise(r => setTimeout(r, 400));

    // Test 2: Click "Check Rates & Book" to open the Reservation Modal
    const modalTest = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const bookBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Check Rates & Book'));
          if (!bookBtn) return { error: 'Book button not found' };
          bookBtn.click();
          return { clicked: true };
        })()
      `,
      returnByValue: true
    });

    await new Promise(r => setTimeout(r, 600));

    // Inspect the reservation modal
    const modalInspection = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const modal = document.querySelector('[role="dialog"][aria-labelledby="booking-modal-title"]');
          if (!modal) return { found: false };

          // Verify portal mounting: modal parent must be document.body
          const parentIsBody = modal.parentElement === document.body;

          // Check dialog card
          const card = modal.querySelector('#booking-modal-title')?.closest('.relative');
          if (!card) return { found: true, cardFound: false };

          const cardRect = card.getBoundingClientRect();
          const modalRect = modal.getBoundingClientRect();

          // Check navbar collision
          const navbar = document.querySelector('header, nav');
          const navZIndex = navbar ? window.getComputedStyle(navbar).zIndex : 'auto';
          const modalZIndex = window.getComputedStyle(modal).zIndex;

          // Check close button
          const closeBtn = modal.querySelector('button[aria-label="Close reservation dialog"]');
          const closeRect = closeBtn ? closeBtn.getBoundingClientRect() : null;

          // Check channel links
          const waLink = modal.querySelector('a[href*="api.whatsapp.com"], a[href*="wa.me"]');
          const emailLink = modal.querySelector('a[href^="mailto:"]');
          const otaLink = modal.querySelector('a[href*="makemytrip.com"]');
          const returnBtn = Array.from(modal.querySelectorAll('button')).find(b => b.textContent.includes('Return to Site'));

          return {
            found: true,
            parentIsBody,
            modalZIndex,
            navZIndex,
            cardRect: {
              top: Math.round(cardRect.top),
              bottom: Math.round(cardRect.bottom),
              left: Math.round(cardRect.left),
              right: Math.round(cardRect.right),
              width: Math.round(cardRect.width),
              height: Math.round(cardRect.height)
            },
            closeButtonAccessible: !!closeBtn && closeRect.top >= 0,
            hasWhatsApp: !!waLink && waLink.href.includes('9926219900'),
            hasEmail: !!emailLink && emailLink.href.includes('orchha@orchharesort.com'),
            hasMakeMyTrip: !!otaLink,
            hasReturnButton: !!returnBtn,
            windowHeight: window.innerHeight,
            fitsInViewport: cardRect.height <= window.innerHeight,
            bodyScrollLocked: document.body.style.overflow === 'hidden'
          };
        })()
      `,
      returnByValue: true
    });

    // Capture screenshot of the modal
    const modalScreenshot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `modal_${vp.name}.jpg`),
      Buffer.from(modalScreenshot.data, 'base64')
    );

    // Close modal
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        })()
      `
    });
    await new Promise(r => setTimeout(r, 400));

    results.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      popover: popoverBounds.result?.value,
      modal: modalInspection.result?.value
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
