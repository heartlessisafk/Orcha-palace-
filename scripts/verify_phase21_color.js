const http = require('http');
const fs = require('fs');

async function capture() {
  const list = await new Promise((res, rej) => {
    http.get('http://127.0.0.1:9222/json', (r) => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => res(JSON.parse(data)));
    }).on('error', rej);
  });

  const page = list.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const callbacks = {};
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (callbacks[data.id]) {
      callbacks[data.id](data.result);
      delete callbacks[data.id];
    }
  });

  const send = (method, params = {}) => new Promise(res => {
    const reqId = id++;
    callbacks[reqId] = res;
    ws.send(JSON.stringify({ id: reqId, method, params }));
  });

  await new Promise(r => ws.addEventListener('open', r));

  const viewports = [
    { name: 'desktop', width: 1440, height: 900, mobile: false },
    { name: 'tablet', width: 768, height: 1024, mobile: true },
    { name: 'mobile', width: 390, height: 844, mobile: true }
  ];

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.mobile });

    // Homepage Hero
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 2000));
    let shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
    fs.writeFileSync('after_home_hero_' + vp.name + '.jpg', Buffer.from(shot.data, 'base64'));
    console.log('Saved after_home_hero_' + vp.name + '.jpg');

    // Our Story Hero
    await send('Page.navigate', { url: 'http://localhost:3000/about' });
    await new Promise(r => setTimeout(r, 2000));
    shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
    fs.writeFileSync('after_about_hero_' + vp.name + '.jpg', Buffer.from(shot.data, 'base64'));
    console.log('Saved after_about_hero_' + vp.name + '.jpg');
  }

  // Gallery (Desktop)
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000/gallery' });
  await new Promise(r => setTimeout(r, 2000));
  let shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync('after_gallery_hero.jpg', Buffer.from(shot.data, 'base64'));
  console.log('Saved after_gallery_hero.jpg');

  // Scroll down slightly to capture gallery cards
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 550, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 1200));
  shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync('after_gallery_cards.jpg', Buffer.from(shot.data, 'base64'));
  console.log('Saved after_gallery_cards.jpg');

  await send('Emulation.clearDeviceMetricsOverride');
  ws.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
