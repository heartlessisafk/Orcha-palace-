const fs = require('fs');
const path = require('path');

async function main() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url && t.url.includes('localhost:3000'));

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

  await send('Page.reload');
  await new Promise(r => setTimeout(r, 2000));

  const secMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('guest-stories');
      const r = el.getBoundingClientRect();
      return { top: window.pageYOffset + r.top, height: el.offsetHeight };
    })()`,
    returnByValue: true
  });

  const { top, height } = secMetrics.result.value;
  const maxScroll = height - 900;
  console.log('Guest stories top:', top, 'height:', height, 'maxScroll:', maxScroll);

  for (const pct of [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]) {
    const scrollPos = top + maxScroll * pct;
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${scrollPos}, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 600));

    const state = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('#guest-stories article'));
        return cards.map((c, i) => {
          const r = c.getBoundingClientRect();
          const p = c.parentElement;
          const s = window.getComputedStyle(p);
          return {
            card: i + 1,
            visible: r.top < 900 && r.bottom > 0 && r.left < 1440 && r.right > 0,
            rect: { left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width) },
            opacity: parseFloat(s.opacity).toFixed(2),
            transform: s.transform
          };
        });
      })()`,
      returnByValue: true
    });

    console.log(`\n--- At ${(pct * 100).toFixed(0)}% scroll (top: ${Math.round(scrollPos)}) ---`);
    console.table(state.result.value);

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`audit/screenshots/review_step_${(pct * 100).toFixed(0)}.png`, Buffer.from(ss.data, 'base64'));
  }

  ws.close();
  process.exit(0);
}

main().catch(console.error);
