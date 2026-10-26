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

  for (let y = 0; y <= 1500; y += 150) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
    await new Promise(r => setTimeout(r, 100));

    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const container = document.querySelector('[class*="190vh"]');
          const panel = document.querySelector('div[class*="origin-bottom"]');
          const panelCard = panel ? panel.querySelector('.rounded-2xl') : null;
          return {
            scrollY: window.scrollY,
            panelStyleAttr: panel ? panel.getAttribute('style') : null,
            panelComputedOpacity: panel ? window.getComputedStyle(panel).opacity : null,
            cardBg: panelCard ? window.getComputedStyle(panelCard).backgroundColor : null,
          };
        })()
      `,
      returnByValue: true
    });
    console.log(res.result.value);
  }

  ws.close();
}
test();
