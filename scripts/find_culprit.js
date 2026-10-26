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
      new Promise((resolve) => {
        window.scrollTo(0, 400);
        setTimeout(() => {
          let el = document.querySelector('div[class*="origin-bottom"]');
          const chain = [];
          while (el) {
            chain.push({
              tag: el.tagName,
              className: el.className,
              inlineStyle: el.getAttribute('style'),
              compOpacity: window.getComputedStyle(el).opacity
            });
            el = el.parentElement;
          }
          resolve(chain);
        }, 200);
      })
    `,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('At scrollY = 400:', res.result.value);

  const res900 = await send('Runtime.evaluate', {
    expression: `
      new Promise((resolve) => {
        window.scrollTo(0, 900);
        setTimeout(() => {
          let el = document.querySelector('div[class*="origin-bottom"]');
          const chain = [];
          while (el) {
            chain.push({
              tag: el.tagName,
              className: el.className,
              inlineStyle: el.getAttribute('style'),
              compOpacity: window.getComputedStyle(el).opacity
            });
            el = el.parentElement;
          }
          resolve(chain);
        }, 200);
      })
    `,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('At scrollY = 900:', res900.result.value);

  ws.close();
}
test();
