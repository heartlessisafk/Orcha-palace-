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

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const container = document.querySelector('[class*="190vh"]');
        return {
          containerHeight: container ? container.offsetHeight : 0,
          containerTop: container ? container.offsetTop : 0,
          windowHeight: window.innerHeight,
          totalDocHeight: document.documentElement.scrollHeight
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Metrics:', res.result.value);

  ws.close();
}
test();
