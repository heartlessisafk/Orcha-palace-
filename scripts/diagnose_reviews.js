const fs = require('fs');

async function main() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find((t) => t.type === 'page' && t.url && t.url.includes('localhost:3000'));
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

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
      const { resolve } = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg.result);
    }
  };

  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise((r) => setTimeout(r, 2000));

  const metrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('guest-stories');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const top = window.pageYOffset + rect.top;
      return { top, height: el.offsetHeight, windowHeight: window.innerHeight };
    })()`,
    returnByValue: true,
  });
  console.log('Reviews metrics:', metrics.value);

  const { top, height, windowHeight } = metrics.value;
  const maxScroll = height - windowHeight;

  // Let's test scroll positions
  for (const p of [0, 0.2, 0.4, 0.6, 0.8, 1.0]) {
    const scrollY = Math.round(top + maxScroll * p);
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' })` });
    await new Promise((r) => setTimeout(r, 600));

    const cardStates = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('#guest-stories .sticky .relative.z-20 > div'));
        return cards.map((c, idx) => {
          const rect = c.getBoundingClientRect();
          return {
            idx,
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            opacity: window.getComputedStyle(c).opacity,
            transform: window.getComputedStyle(c).transform,
            left: c.style.left,
            right: c.style.right
          };
        });
      })()`,
      returnByValue: true,
    });
    console.log(`Reviews at progress ${p} (${scrollY}px):`, cardStates.value);

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`audit/screenshots/review_progress_${Math.round(p * 100)}.png`, Buffer.from(shot.data, 'base64'));
  }

  ws.close();
}

main().catch(console.error);
