async function inspect() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.url && t.url.includes('localhost:3000'));
  
  if (!pageTarget) {
    console.error('Target not found:', targets);
    process.exit(1);
  }

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
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  const scrollOffsets = [0, 200, 400, 600, 800, 1000];
  for (const scrollY of scrollOffsets) {
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${scrollY})`
    });
    await new Promise(r => setTimeout(r, 300));

    const result = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const panelMotion = document.querySelector('div[class*="origin-bottom"]');
          const panelCard = panelMotion ? panelMotion.querySelector('div.rounded-2xl') : null;
          const searchBody = panelMotion ? panelMotion.querySelector('div.p-5') : null;
          const compMotion = panelMotion ? window.getComputedStyle(panelMotion) : null;
          const compCard = panelCard ? window.getComputedStyle(panelCard) : null;
          const compBody = searchBody ? window.getComputedStyle(searchBody) : null;
          return {
            scrollY: window.scrollY,
            motionStyle: {
              opacity: compMotion ? compMotion.opacity : null,
              transform: compMotion ? compMotion.transform : null,
              backgroundColor: compMotion ? compMotion.backgroundColor : null,
            },
            cardStyle: {
              opacity: compCard ? compCard.opacity : null,
              backgroundColor: compCard ? compCard.backgroundColor : null,
              backdropFilter: compCard ? compCard.backdropFilter : null,
            },
            bodyStyle: {
              backgroundColor: compBody ? compBody.backgroundColor : null,
            }
          };
        })()
      `,
      returnByValue: true
    });
    console.log(`--- ScrollY: ${scrollY} ---`);
    console.log(JSON.stringify(result.result.value, null, 2));
  }

  ws.close();
}

inspect().catch(console.error);
