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

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        let el = document.querySelector('div[class*="origin-bottom"]');
        const chain = [];
        while (el && el !== document.body) {
          const comp = window.getComputedStyle(el);
          chain.push({
            tag: el.tagName,
            className: el.className,
            styleAttr: el.getAttribute('style'),
            computedOpacity: comp.opacity,
            computedBg: comp.backgroundColor,
          });
          el = el.parentElement;
        }
        return chain;
      })()
    `,
    returnByValue: true
  });
  console.log('Ancestry chain:', JSON.stringify(res.result.value, null, 2));

  ws.close();
}
test();
