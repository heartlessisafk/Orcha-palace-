const fs = require('fs');

async function run() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.url && t.url.includes('localhost:3000/weddings'));

  if (!pageTarget) {
    console.error('Page target for /weddings not found:', targets);
    process.exit(1);
  }

  console.log('Connecting to target:', pageTarget.webSocketDebuggerUrl);
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const consoleErrors = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) {
        reject(msg.error);
      } else {
        resolve(msg.result);
      }
    } else if (msg.method === 'Console.messageAdded') {
      const text = msg.params.message.text;
      if (msg.params.message.level === 'error') {
        consoleErrors.push(text);
      }
      console.log('Browser console [' + msg.params.message.level + ']:', text);
    }
  };

  await new Promise((resolve) => ws.onopen = resolve);
  console.log('WebSocket connected to Chrome DevTools Protocol');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // ==========================================
  // 1. NAVIGATION & DESIGN SYSTEM REMOVAL AUDIT
  // ==========================================
  console.log('\n--- 1. Auditing Navigation & Design System Tab Removal ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000/weddings' });
  await new Promise(r => setTimeout(r, 2000));

  const navCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const headerLinks = Array.from(document.querySelectorAll('header nav a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      }));
      const footerLinks = Array.from(document.querySelectorAll('footer a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      }));
      const hasDesignSystemInHeader = headerLinks.some(l => l.text.toLowerCase().includes('design system') || (l.href && l.href.includes('design-system')));
      const hasDesignSystemInFooter = footerLinks.some(l => l.text.toLowerCase().includes('design system') || (l.href && l.href.includes('design-system')));
      const hasWeddingsInHeader = headerLinks.some(l => l.text.toLowerCase().includes('wedding') && l.href === '/weddings');
      const hasWeddingsInFooter = footerLinks.some(l => l.text.toLowerCase().includes('wedding') && l.href === '/weddings');
      return {
        headerLinks,
        footerLinksCount: footerLinks.length,
        hasDesignSystemInHeader,
        hasDesignSystemInFooter,
        hasWeddingsInHeader,
        hasWeddingsInFooter
      };
    })()`,
    returnByValue: true
  });

  console.log('Navigation Audit Result:', navCheck.result.value);

  if (navCheck.result.value.hasDesignSystemInHeader) {
    console.error('❌ FAILED: Design System link is still present in header!');
  } else {
    console.log('✅ PASSED: Design System link is completely removed from header navigation.');
  }

  if (navCheck.result.value.hasDesignSystemInFooter) {
    console.error('❌ FAILED: Design System link is still present in footer!');
  } else {
    console.log('✅ PASSED: Design System link is completely removed from footer navigation.');
  }

  if (navCheck.result.value.hasWeddingsInHeader && navCheck.result.value.hasWeddingsInFooter) {
    console.log('✅ PASSED: "Weddings" is successfully present in both header and footer.');
  } else {
    console.error('❌ FAILED: "Weddings" link missing from header or footer.');
  }

  // ==========================================
  // 2. IMAGE PRE-LOADING & INTEGRITY CHECK
  // ==========================================
  console.log('\n--- 2. Checking Genuine Wedding Images & Dimension Integrity ---');
  // Scroll through page to trigger lazy loading
  for (let y = 0; y <= 8000; y += 1000) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
    await new Promise(r => setTimeout(r, 150));
  }
  await new Promise(r => setTimeout(r, 1000));
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 800));

  const imgCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: (img.currentSrc || img.src).replace(/^http:\\/\\/localhost:3000/, ''),
        alt: img.alt.slice(0, 40),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        broken: img.naturalWidth === 0
      }));
    })()`,
    returnByValue: true
  });

  console.log(`Found ${imgCheck.result.value.length} images on /weddings page:`);
  let brokenCount = 0;
  for (const img of imgCheck.result.value) {
    if (img.broken) {
      console.error(`❌ BROKEN: ${img.src} (alt: "${img.alt}")`);
      brokenCount++;
    } else {
      console.log(`✓ Loaded: ${img.src.slice(0, 60)} (${img.naturalWidth}x${img.naturalHeight}) - "${img.alt}..."`);
    }
  }

  if (brokenCount === 0) {
    console.log('✅ PASSED: All wedding images loaded with authentic natural dimensions!');
  } else {
    console.error(`❌ FAILED: ${brokenCount} images failed to load.`);
  }

  // ==========================================
  // 3. TESTING ENQUIRY FORM VALIDATION & HANDOFF
  // ==========================================
  console.log('\n--- 3. Testing Wedding Enquiry Form Validation & Handoff ---');

  // Query section positions
  const sectionPositions = await send('Runtime.evaluate', {
    expression: `(() => {
      return Array.from(document.querySelectorAll('section')).map(s => {
        const rect = s.getBoundingClientRect();
        return {
          id: s.id || 'hero',
          top: Math.round(rect.top + window.scrollY),
          height: Math.round(rect.height)
        };
      });
    })()`,
    returnByValue: true
  });
  console.log('Detected section positions:', sectionPositions.result.value);

  // Scroll to form
  const enquiryPos = sectionPositions.result.value.find(p => p.id === 'wedding-enquiry');
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${enquiryPos ? enquiryPos.top : 3500})` });
  await new Promise(r => setTimeout(r, 600));

  // Test submit empty form
  console.log('Testing empty form submit validation...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const form = document.querySelector('#wedding-enquiry form');
      if (form) form.requestSubmit();
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  const validationResult = await send('Runtime.evaluate', {
    expression: `(() => {
      const errorText = document.querySelector('#wedding-enquiry .text-rose-600')?.innerText;
      return { hasError: !!errorText, errorText };
    })()`,
    returnByValue: true
  });
  console.log('Empty form validation output:', validationResult.result.value);

  // Fill in form with real couple data using React native property setter
  console.log('Filling form with wedding details...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      const inputs = Array.from(document.querySelectorAll('#wedding-enquiry input'));
      const nameInput = inputs.find(i => i.placeholder && i.placeholder.includes('Radhika'));
      const phoneInput = inputs.find(i => i.placeholder && i.placeholder.includes('+91'));
      const emailInput = inputs.find(i => i.placeholder && i.placeholder.includes('name@example'));
      const dateInput = inputs.find(i => i.placeholder && i.placeholder.includes('November'));

      if (nameInput) {
        nativeSetter.call(nameInput, 'Aanya Kapoor & Vihaan Singhania');
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (phoneInput) {
        nativeSetter.call(phoneInput, '+91 98200 12345');
        phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (emailInput) {
        nativeSetter.call(emailInput, 'aanya.kapoor@example.com');
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (dateInput) {
        nativeSetter.call(dateInput, 'December 2026');
        dateInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  // Submit valid form
  console.log('Submitting valid form to trigger Honest Handoff Modal...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const form = document.querySelector('#wedding-enquiry form');
      if (form) form.requestSubmit();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  // Check if Handoff Modal opened and capture it
  const modalCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      const waLink = modal?.querySelector('a[href*="wa.me"]')?.getAttribute('href');
      const mailLink = modal?.querySelector('a[href*="mailto"]')?.getAttribute('href');
      return {
        isModalOpen: !!modal,
        hasWhatsAppLink: !!waLink,
        whatsAppSample: waLink?.slice(0, 75),
        hasEmailLink: !!mailLink
      };
    })()`,
    returnByValue: true
  });
  console.log('Handoff Modal Check:', modalCheck.result.value);

  // Capture screenshot of Handoff Modal
  const modalShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('audit/weddings-handoff-modal.png', Buffer.from(modalShot.data, 'base64'));
  console.log('Saved audit/weddings-handoff-modal.png');

  // Close modal to resume section captures
  await send('Runtime.evaluate', {
    expression: `(() => {
      const closeBtn = document.querySelector('.fixed.inset-0.z-50 button[aria-label="Close dialog"]');
      if (closeBtn) closeBtn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  // ==========================================
  // 4. CAPTURING PRECISION SECTION SCREENSHOTS
  // ==========================================
  console.log('\n--- 4. Capturing Desktop Section Screenshots ---');

  const sectionsToCapture = [
    { id: 'hero', file: 'audit/weddings-hero-desktop.png' },
    { id: 'wedding-story', file: 'audit/weddings-story-desktop.png' },
    { id: 'wedding-venues', file: 'audit/weddings-venues-desktop.png' },
    { id: 'wedding-experiences', file: 'audit/weddings-experiences-desktop.png' },
    { id: 'wedding-enquiry', file: 'audit/weddings-enquiry-desktop.png' },
  ];

  for (const item of sectionsToCapture) {
    const pos = sectionPositions.result.value.find(p => p.id === item.id);
    const top = pos ? pos.top : 0;

    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${top})` });
    await new Promise(r => setTimeout(r, 400));

    // For venues, test tab click
    if (item.id === 'wedding-venues') {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('#wedding-venues button'));
          const stageBtn = btns.find(b => b.innerText.includes('Royal Reception Stage'));
          if (stageBtn) stageBtn.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 300));
    }

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: top, width: 1440, height: 900, scale: 1 },
      captureBeyondViewport: true
    });
    fs.writeFileSync(item.file, Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${item.file} at document y=${top}`);
  }

  // Romantic CTA (last section)
  console.log('Capturing Final Romantic CTA...');
  const ctaPos = await send('Runtime.evaluate', {
    expression: `(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const lastSection = sections[sections.length - 1];
      const rect = lastSection.getBoundingClientRect();
      return Math.round(rect.top + window.scrollY);
    })()`,
    returnByValue: true
  });
  const ctaTop = ctaPos.result.value;
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${ctaTop})` });
  await new Promise(r => setTimeout(r, 500));
  const ctaShot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: ctaTop, width: 1440, height: 900, scale: 1 },
    captureBeyondViewport: true
  });
  fs.writeFileSync('audit/weddings-cta-desktop.png', Buffer.from(ctaShot.data, 'base64'));
  console.log(`Saved audit/weddings-cta-desktop.png at document y=${ctaTop}`);

  // ==========================================
  // 5. TABLET VIEWPORT (768 x 1024)
  // ==========================================
  console.log('\n--- 5. Testing Tablet Viewport (768x1024) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 800));

  const tabletMetrics = await send('Page.getLayoutMetrics');
  const tabletHeight = Math.min(tabletMetrics.contentSize.height, 12000);
  const tabletShot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 768, height: tabletHeight, scale: 1 },
    captureBeyondViewport: true
  });
  fs.writeFileSync('audit/weddings-tablet.png', Buffer.from(tabletShot.data, 'base64'));
  console.log(`Saved audit/weddings-tablet.png (768x${tabletHeight})`);

  // ==========================================
  // 6. MOBILE VIEWPORT (390 x 844, scale 2)
  // ==========================================
  console.log('\n--- 6. Testing Mobile Viewport (390x844) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 800));

  // Also test mobile drawer menu to confirm Design System is absent on mobile
  const mobileDrawerCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const menuBtn = document.querySelector('button[aria-label="Open menu"]');
      if (menuBtn) menuBtn.click();
      return true;
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  const mobileNavCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const drawerLinks = Array.from(document.querySelectorAll('header nav a, header .fixed a')).map(a => a.innerText.trim());
      const hasDesignSystem = drawerLinks.some(t => t.toLowerCase().includes('design system'));
      const hasWeddings = drawerLinks.some(t => t.toLowerCase().includes('wedding'));
      return { drawerLinks, hasDesignSystem, hasWeddings };
    })()`,
    returnByValue: true
  });
  console.log('Mobile Drawer Audit:', mobileNavCheck.result.value);

  const mobileMetrics = await send('Page.getLayoutMetrics');
  const mobileHeight = Math.min(mobileMetrics.contentSize.height, 14000);
  const mobileShot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: mobileHeight, scale: 1 },
    captureBeyondViewport: true
  });
  fs.writeFileSync('audit/weddings-mobile.png', Buffer.from(mobileShot.data, 'base64'));
  console.log(`Saved audit/weddings-mobile.png (390x${mobileHeight})`);

  console.log('\n=============================================');
  console.log('✅ ALL WEDDINGS PAGE CHECKS & SCREENSHOTS COMPLETED!');
  console.log('=============================================');

  ws.close();
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
