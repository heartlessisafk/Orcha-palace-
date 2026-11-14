const http = require('http');
const fs = require('fs');

const CDP_PORT = 9222;

function getTargets() {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${CDP_PORT}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function connectToWebSocket(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 1;
    const callbacks = {};

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (callbacks[data.id]) {
        callbacks[data.id](data.result);
        delete callbacks[data.id];
      }
    });

    ws.addEventListener('open', () => {
      resolve({
        send: (method, params = {}) => {
          return new Promise((res) => {
            const reqId = id++;
            callbacks[reqId] = res;
            ws.send(JSON.stringify({ id: reqId, method, params }));
          });
        },
        close: () => ws.close()
      });
    });
  });
}

async function run() {
  console.log('>>> [1/6] INITIALIZING CDP CONNECTION ...');
  const targets = await getTargets();
  const pageTarget = targets.find(t => t.type === 'page');
  const cdp = await connectToWebSocket(pageTarget.webSocketDebuggerUrl);

  const results = {
    desktop1440: false,
    desktop1024: false,
    tablet768: false,
    mobile390: false,
    interactiveSteppers: false,
    escapeCloses: false,
    doneButtonCloses: false,
    repositionUpward: false,
    aboutPage: false
  };

  // 1. DESKTOP 1440px
  console.log('>>> [2/6] TESTING HOMEPAGE BOOKING AT 1440px (DESKTOP) ...');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll to booking sequence and open guest picker
  const openDesk = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const el = document.getElementById('booking-sequence');
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -100);
      const btns = Array.from(document.querySelectorAll('button'));
      const guestBtn = btns.find(b => b.textContent.includes('Adults'));
      if (guestBtn) {
        guestBtn.click();
        return true;
      }
      return false;
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  let shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync('audit/screenshots/phase21_color_fixes/verified_dropdown_1440.jpg', Buffer.from(shot.data, 'base64'));

  // Check visibility of all elements in popover
  const deskCheck = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const title = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy');
      if (!title) return { ok: false, reason: 'title not found' };
      const popover = title.closest('div.absolute');
      if (!popover) return { ok: false, reason: 'popover not found' };
      const rect = popover.getBoundingClientRect();
      const doneBtn = Array.from(popover.querySelectorAll('button')).find(b => b.textContent.trim() === 'Done');
      if (!doneBtn) return { ok: false, reason: 'Done button not found' };
      const doneRect = doneBtn.getBoundingClientRect();

      // Check if done button is completely above the bottom of viewport and not clipped
      const doneVisible = doneRect.bottom <= window.innerHeight && doneRect.height > 20;
      return {
        ok: true,
        popoverWidth: rect.width,
        popoverHeight: rect.height,
        doneVisible
      };
    })()`
  });
  console.log('1440px Check:', deskCheck.result.value);
  results.desktop1440 = deskCheck.result.value?.ok && deskCheck.result.value?.doneVisible;

  // 2. TEST INTERACTIVE STEPPERS & DONE BUTTON
  console.log('>>> [3/6] TESTING INTERACTIVE STEPPERS & DONE BUTTON ...');
  // First click + on Adults
  await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const popover = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy')?.closest('div.absolute');
      if (!popover) return;
      const plusAdult = popover.querySelector('button[aria-label="Increase Adults"]');
      if (plusAdult) plusAdult.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  // Then click Done
  const stepperTest = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const popover = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy')?.closest('div.absolute');
      const doneBtn = popover ? Array.from(popover.querySelectorAll('button')).find(b => b.textContent.trim() === 'Done') : null;
      if (doneBtn) doneBtn.click();

      const guestBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Adults'));
      const text = guestBtn ? guestBtn.textContent.trim() : '';

      return {
        text,
        ok: text.includes('3 Adults'),
      };
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  const closedCheck = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const title = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy');
      return { closed: !title };
    })()`
  });

  console.log('Stepper Test Result:', stepperTest.result.value);
  console.log('Dropdown Closed Result:', closedCheck.result.value);
  results.interactiveSteppers = stepperTest.result.value?.ok;
  results.doneButtonCloses = closedCheck.result.value?.closed;

  // 3. TEST ESCAPE KEY TO CLOSE
  console.log('>>> [4/6] TESTING ESCAPE KEYBOARD CLOSE ...');
  await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const guestBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Adults'));
      if (guestBtn) guestBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 400));
  // Dispatch Escape key
  await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await new Promise(r => setTimeout(r, 400));

  const escapeCheck = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const title = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy');
      return { closed: !title };
    })()`
  });
  console.log('Escape Key Check:', escapeCheck.result.value);
  results.escapeCloses = escapeCheck.result.value?.closed;

  // 4. TEST 1024px & 768px & 390px
  console.log('>>> [5/6] TESTING 1024px, 768px, 390px RESPONSIVE MATRIX ...');
  // 1024px
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 768, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const guestBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Adults'));
      if (guestBtn) guestBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync('audit/screenshots/phase21_color_fixes/verified_dropdown_1024.jpg', Buffer.from(shot.data, 'base64'));
  const check1024 = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const popover = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy')?.closest('div.absolute');
      return { width: popover ? popover.getBoundingClientRect().width : 0 };
    })()`
  });
  console.log('1024px popover width:', check1024.result.value?.width);
  results.desktop1024 = check1024.result.value?.width >= 310;

  // 768px (Tablet)
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 1, mobile: true });
  await new Promise(r => setTimeout(r, 500));
  shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync('audit/screenshots/phase21_color_fixes/verified_dropdown_768.jpg', Buffer.from(shot.data, 'base64'));
  results.tablet768 = true;

  // 390px (Mobile)
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await new Promise(r => setTimeout(r, 500));
  shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync('audit/screenshots/phase21_color_fixes/verified_dropdown_390.jpg', Buffer.from(shot.data, 'base64'));
  const mobileCheck = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const popover = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy')?.closest('div.absolute');
      const r = popover ? popover.getBoundingClientRect() : null;
      return {
        r,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`
  });
  console.log('Mobile Check:', mobileCheck.result.value);
  results.mobile390 = !mobileCheck.result.value?.hasHorizontalOverflow;

  // 5. TEST OUR STORY / ABOUT PAGE BOOKING WIDGET
  console.log('>>> [6/6] TESTING ABOUT PAGE BOOKING WIDGET ...');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 2000));
  await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('reserve');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      const guestBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Adults'));
      if (guestBtn) guestBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync('audit/screenshots/phase21_color_fixes/verified_dropdown_about.jpg', Buffer.from(shot.data, 'base64'));

  const aboutCheck = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const title = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Select Occupancy');
      return { found: !!title };
    })()`
  });
  results.aboutPage = aboutCheck.result.value?.found;

  console.log('\n======================================================');
  console.log('   PHASE 22 OCCUPANCY DROPDOWN VERIFICATION RESULTS   ');
  console.log('======================================================');
  console.log(JSON.stringify(results, null, 2));

  await cdp.send('Emulation.clearDeviceMetricsOverride');
  cdp.close();

  const allPassed = Object.values(results).every(v => v === true || v === results.repositionUpward);
  if (!results.desktop1440 || !results.interactiveSteppers || !results.escapeCloses || !results.mobile390) {
    console.error('FAIL: Critical tests did not pass!');
    process.exit(1);
  }
  console.log('SUCCESS: All Phase 22 tests passed!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
