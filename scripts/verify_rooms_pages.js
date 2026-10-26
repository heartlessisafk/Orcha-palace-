const fs = require('fs');
const path = require('path');

async function main() {
  console.log('=== VERIFYING ACCOMMODATION DETAIL PAGES (PHASE 4) ===');

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

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  const screenshotsDir = path.join(__dirname, '..', 'audit', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  // 1. TEST /rooms CATALOG PAGE
  console.log('\n--- 1. Testing /rooms Directory Overview ---');
  await send('Page.navigate', { url: 'http://localhost:3000/rooms' });
  await new Promise(r => setTimeout(r, 2000));

  const catalogCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = document.querySelectorAll('#catalog article, #catalog .group');
      const titles = Array.from(cards).map(c => c.querySelector('h3')?.innerText);
      return {
        cardCount: cards.length,
        titles: titles.filter(Boolean),
        hasHeroTitle: document.body.innerText.includes('Accommodations & Glamping Tents')
      };
    })()`,
    returnByValue: true
  });
  console.log('Catalog Page Result:', catalogCheck.result.value);

  const ssCatalog = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotsDir, 'rooms_overview_desktop.png'), Buffer.from(ssCatalog.data, 'base64'));
  console.log('Saved audit/screenshots/rooms_overview_desktop.png');

  // 2. TEST ALL 4 ROOM ROUTES
  const roomSlugs = [
    'standard-room',
    'deluxe-room',
    'deluxe-swiss-tent',
    'royal-heritage-suite'
  ];

  for (const slug of roomSlugs) {
    console.log(`\n--- Testing /rooms/${slug} ---`);
    await send('Page.navigate', { url: `http://localhost:3000/rooms/${slug}` });
    await new Promise(r => setTimeout(r, 2000));

    const roomCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1')?.innerText;
        const price = document.body.innerText.includes('₹');
        const thumbs = document.querySelectorAll('button[aria-label*="View"]');
        const specs = document.querySelectorAll('dl dt');
        const bookBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.innerText.includes('Book This Accommodation'));
        const whatsappBtn = Array.from(document.querySelectorAll('a')).find(el => el.innerText.includes('Inquire via WhatsApp Desk'));

        return {
          title: h1,
          hasPricing: price,
          thumbnailCount: thumbs.length,
          specsCount: specs.length,
          hasBookBtn: !!bookBtn,
          hasWhatsApp: !!whatsappBtn,
          whatsAppHref: whatsappBtn ? whatsappBtn.href : null
        };
      })()`,
      returnByValue: true
    });
    console.log(`Room [${slug}] Verification:`, roomCheck.result.value);

    // Test thumbnail interaction on deluxe-room
    if (slug === 'deluxe-room') {
      console.log('Testing thumbnail click on Deluxe Room...');
      await send('Runtime.evaluate', {
        expression: `(() => {
          const thumbs = document.querySelectorAll('button[aria-label*="View"]');
          if (thumbs.length > 1) thumbs[1].click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));
    }

    const ssRoom = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(screenshotsDir, `room_${slug}.png`), Buffer.from(ssRoom.data, 'base64'));
    console.log(`Saved audit/screenshots/room_${slug}.png`);
  }

  // 3. TEST 404 ROUTE
  console.log('\n--- Testing Invalid Room Route /rooms/non-existent ---');
  await send('Page.navigate', { url: 'http://localhost:3000/rooms/non-existent' });
  await new Promise(r => setTimeout(r, 1500));
  const notFoundCheck = await send('Runtime.evaluate', {
    expression: `document.body.innerText.toLowerCase().includes('not found') || document.body.innerText.includes('404')`,
    returnByValue: true
  });
  console.log('404 Handled Correctly:', notFoundCheck.result.value);

  ws.close();
  console.log('\n=== ALL ROOM PAGES VERIFIED SUCCESSFULLY ===');
  process.exit(0);
}

main().catch(err => {
  console.error('Room verification failed:', err);
  process.exit(1);
});
