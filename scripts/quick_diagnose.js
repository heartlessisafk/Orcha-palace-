const fs = require('fs');
const path = require('path');

async function main() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url && t.url.includes('localhost:3000'));
  if (!pageTarget) {
    console.error('No localhost:3000 target found');
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

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  const inspection = await send('Runtime.evaluate', {
    expression: `(() => {
      const guestSection = document.getElementById('guest-stories');
      const mapSection = document.getElementById('map-experience');

      const guestRect = guestSection ? guestSection.getBoundingClientRect() : null;
      const guestTop = guestRect ? window.pageYOffset + guestRect.top : 0;

      const mapRect = mapSection ? mapSection.getBoundingClientRect() : null;
      const mapTop = mapRect ? window.pageYOffset + mapRect.top : 0;

      return {
        guest: {
          exists: !!guestSection,
          top: guestTop,
          height: guestSection ? guestSection.offsetHeight : 0,
          classes: guestSection ? guestSection.className : ''
        },
        map: {
          exists: !!mapSection,
          top: mapTop,
          height: mapSection ? mapSection.offsetHeight : 0,
          classes: mapSection ? mapSection.className : ''
        }
      };
    })()`,
    returnByValue: true
  });

  console.log('Inspection Result:', JSON.stringify(inspection.result.value, null, 2));

  // Let's scroll to guest stories and inspect the cards
  const guestTop = inspection.result.value.guest.top;
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${guestTop + 100}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));

  const cardMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = Array.from(document.querySelectorAll('#guest-stories article'));
      return cards.map((c, i) => {
        const r = c.getBoundingClientRect();
        const style = window.getComputedStyle(c.parentElement);
        return {
          index: i,
          rect: { left: r.left, top: r.top, width: r.width, height: r.height },
          parentTransform: style.transform,
          parentOpacity: style.opacity,
          parentPointerEvents: style.pointerEvents
        };
      });
    })()`,
    returnByValue: true
  });

  console.log('Card Metrics at guestTop + 100:', JSON.stringify(cardMetrics.result.value, null, 2));

  // Take a screenshot of guest stories
  const ss1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/diagnose_guest_stories.png', Buffer.from(ss1.data, 'base64'));
  console.log('Saved audit/screenshots/diagnose_guest_stories.png');

  // Let's scroll to map experience and check
  const mapTop = inspection.result.value.map.top;
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${mapTop + 500}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 800));

  const ss2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/screenshots/diagnose_map_experience.png', Buffer.from(ss2.data, 'base64'));
  console.log('Saved audit/screenshots/diagnose_map_experience.png');

  ws.close();
  process.exit(0);
}

main().catch(console.error);
