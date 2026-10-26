async function test() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.url && t.url.includes('localhost:3000'));
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error); else resolve(msg.result);
    }
  };
  await new Promise(r => ws.onopen = r);

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  // Let's hook into window or inspect the motion values
  const info = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const results = [];
        const panel = document.querySelector('div[class*="origin-bottom"]');
        for (let y = 0; y <= 1200; y += 100) {
          window.scrollTo(0, y);
          // force reflow
          const comp = window.getComputedStyle(panel);
          results.push({
            y: y,
            style: panel.style.cssText,
            opacity: comp.opacity,
            transform: comp.transform
          });
        }
        return results;
      })()
    `,
    returnByValue: true
  });
  console.log(info.result.value);

  ws.close();
}
test();
