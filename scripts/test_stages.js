(async () => {
  const tabs = await (await fetch('http://127.0.0.1:9222/json')).json();
  const pageTab = tabs.find(t => t.type === 'page');
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  let id = 1;
  const send = (method, params = {}) => new Promise((res, rej) => {
    const curId = id++;
    const handler = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.id === curId) {
        ws.removeEventListener('message', handler);
        if (data.error) rej(data.error);
        else res(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000/?t=' + Date.now() });
  await new Promise(r => setTimeout(r, 1500));

  const elemPos = (await send('Runtime.evaluate', {
    expression: 'document.getElementById("map-experience").getBoundingClientRect().top + window.scrollY'
  })).result.value;

  const trackHeight = (await send('Runtime.evaluate', {
    expression: 'document.getElementById("map-experience").offsetHeight'
  })).result.value;

  console.log('map-experience top:', elemPos, 'height:', trackHeight);

  const stages = [
    { name: '01_stage1_dialog_intro', progress: 0.02 },
    { name: '02_stage2_blueprint_grid', progress: 0.18 },
    { name: '03_stage3_map_revealed', progress: 0.50 },
    { name: '04_stage5_booking_card', progress: 0.88 },
  ];

  for (const s of stages) {
    const targetY = elemPos + (trackHeight - 900) * s.progress;
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${targetY}, behavior: "instant" })` });
    await new Promise(r => setTimeout(r, 600));

    const shot = await send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 90,
      clip: { x: 0, y: targetY, width: 1440, height: 900, scale: 1 }
    });

    require('fs').writeFileSync(`audit/screenshots/phase20_map/${s.name}.jpg`, Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${s.name}.jpg at targetY: ${targetY}`);
  }

  // Also test Mobile Viewport (390px)
  console.log('Testing Mobile 390px ...');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
  await send('Page.navigate', { url: 'http://localhost:3000/#map-experience' });
  await new Promise(r => setTimeout(r, 1200));

  const mobilePos = (await send('Runtime.evaluate', {
    expression: 'document.getElementById("map-experience").getBoundingClientRect().top + window.scrollY'
  })).result.value;

  await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${mobilePos}, behavior: "instant" })` });
  await new Promise(r => setTimeout(r, 600));

  const mobileShot = await send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 90,
    clip: { x: 0, y: mobilePos, width: 390, height: 844, scale: 1 }
  });
  require('fs').writeFileSync('audit/screenshots/phase20_map/05_mobile_map_experience.jpg', Buffer.from(mobileShot.data, 'base64'));
  console.log('Saved 05_mobile_map_experience.jpg');

  ws.close();
})();
