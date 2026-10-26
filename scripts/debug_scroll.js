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

  // Let's inspect what framer motion has attached to window or elements
  // We can evaluate in browser
  const evalRes = await send('Runtime.evaluate', {
    expression: `
      new Promise((resolve) => {
        let scrollY = 0;
        const panel = document.querySelector('div[class*="origin-bottom"]');
        const logs = [];

        function step(y) {
          window.scrollTo(0, y);
          setTimeout(() => {
            const comp = window.getComputedStyle(panel);
            logs.push({
              y,
              styleAttr: panel.getAttribute('style'),
              compOpacity: comp.opacity,
              compTransform: comp.transform
            });
            if (y < 900) {
              step(y + 100);
            } else {
              resolve(logs);
            }
          }, 150);
        }
        step(0);
      })
    `,
    awaitPromise: true,
    returnByValue: true
  });

  console.log('Scroll step results:');
  console.log(evalRes.result.value);

  ws.close();
}
test();
