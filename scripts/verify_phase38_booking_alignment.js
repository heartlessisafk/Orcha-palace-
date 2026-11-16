const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Phase 38: Booking Form Alignment & Dimensions Verification via CDP ===");
  const outputDir = path.resolve(__dirname, "../.planning/phases/38-booking-alignment");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tabs = await (await fetch("http://127.0.0.1:9222/json")).json();
  const pageTab = tabs.find(t => t.type === "page");
  if (!pageTab) {
    console.error("No active page tab found at port 9222");
    process.exit(1);
  }

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener("open", r, { once: true }));

  let id = 1;
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const curId = id++;
      const handler = evt => {
        const data = JSON.parse(evt.data);
        if (data.id === curId) {
          ws.removeEventListener("message", handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

  await send("Page.enable");
  await send("DOM.enable");
  await send("Runtime.enable");

  const results = {
    viewports: {},
    functionality: {},
  };

  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
    { name: "mobile_narrow", width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.width < 768,
    });

    await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
    await new Promise(r => setTimeout(r, 1200));

    await send("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("booking-sequence");
        if (el) el.scrollIntoView({ block: "center" });
      `
    });
    await new Promise(r => setTimeout(r, 400));

    const metrics = await send("Runtime.evaluate", {
      expression: `(() => {
        const form = document.querySelector("#booking-sequence form");
        const checkinInput = document.querySelector("#checkin-date");
        const checkoutInput = document.querySelector("#checkout-date");
        const guestBtn = document.querySelector("#guest-picker-btn");
        const submitBtn = document.querySelector("#booking-sequence button[type='submit']");
        
        const checkinLabel = document.querySelector("label[for='checkin-date']");
        const checkoutLabel = document.querySelector("label[for='checkout-date']");
        const guestLabel = document.querySelector("label[for='guest-picker-btn']");
        const buttonHeader = submitBtn?.parentElement?.querySelector("div[aria-hidden='true']");

        const getBox = el => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return {
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            fontSize: s.fontSize,
            lineHeight: s.lineHeight,
            borderRadius: s.borderRadius,
            display: s.display,
          };
        };

        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;

        return {
          overflow: scrollWidth > docWidth,
          labels: {
            checkin: getBox(checkinLabel),
            checkout: getBox(checkoutLabel),
            guest: getBox(guestLabel),
            buttonHeader: getBox(buttonHeader),
          },
          controls: {
            checkinInput: getBox(checkinInput),
            checkoutInput: getBox(checkoutInput),
            guestBtn: getBox(guestBtn),
            submitBtn: getBox(submitBtn),
          }
        };
      })()`,
      returnByValue: true
    });

    results.viewports[vp.name] = metrics.result.value;
    console.log(`Viewport ${vp.name} metrics:`, JSON.stringify(metrics.result.value, null, 2));

    // Capture screenshot
    const screenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 85 });
    fs.writeFileSync(
      path.join(outputDir, `after_booking_${vp.name}.jpg`),
      Buffer.from(screenshot.data, "base64")
    );
  }

  // Measure /about bottom booking section
  console.log("\nTesting /about Reservation Section (#reserve)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send("Page.navigate", { url: "http://localhost:3000/about#reserve" });
  await new Promise(r => setTimeout(r, 1200));
  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById("reserve");
      if (el) el.scrollIntoView({ block: "center" });
    `
  });
  await new Promise(r => setTimeout(r, 400));

  const aboutMetrics = await send("Runtime.evaluate", {
    expression: `(() => {
      const checkin = document.querySelector("#reserve #checkin-date");
      const checkout = document.querySelector("#reserve #checkout-date");
      const guestBtn = document.querySelector("#reserve #guest-picker-btn");
      const submitBtn = document.querySelector("#reserve button[type='submit']");
      const getBox = el => el ? {
        top: Math.round(el.getBoundingClientRect().top),
        height: Math.round(el.getBoundingClientRect().height * 10) / 10,
        borderRadius: window.getComputedStyle(el).borderRadius
      } : null;

      return {
        checkin: getBox(checkin),
        checkout: getBox(checkout),
        guestBtn: getBox(guestBtn),
        submitBtn: getBox(submitBtn),
      };
    })()`,
    returnByValue: true
  });
  results.aboutBooking = aboutMetrics.result.value;
  console.log("/about booking metrics:", results.aboutBooking);

  const screenshotAbout = await send("Page.captureScreenshot", { format: "jpeg", quality: 85 });
  fs.writeFileSync(
    path.join(outputDir, `after_booking_about_desktop.jpg`),
    Buffer.from(screenshotAbout.data, "base64")
  );

  // Test Functionality
  console.log("\nTesting Booking Functionality & Validation...");
  await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
  await new Promise(r => setTimeout(r, 1200));

  const testFunc = await send("Runtime.evaluate", {
    expression: `(() => {
      const checkin = document.querySelector("#checkin-date");
      const checkout = document.querySelector("#checkout-date");
      const guestBtn = document.querySelector("#guest-picker-btn");
      const form = document.querySelector("#booking-sequence form");

      const initialCheckin = checkin.value;
      const initialCheckout = checkout.value;
      const minCheckout = checkout.getAttribute("min");

      // Test guest picker toggle
      guestBtn.click();
      const popoverVisible = !!document.querySelector("div[aria-modal='true'], .animate-fade-in");

      // Verify date relationship
      const datesValid = new Date(initialCheckout) >= new Date(initialCheckin);

      return {
        initialCheckin,
        initialCheckout,
        minCheckout,
        checkoutCannotPrecedeCheckin: minCheckout >= initialCheckin,
        datesValid,
        popoverToggles: popoverVisible
      };
    })()`,
    returnByValue: true
  });
  results.functionality = testFunc.result.value;
  console.log("Functionality test result:", results.functionality);

  // Test modal trigger
  console.log("\nTesting Submit Handoff Modal...");
  const modalTest = await send("Runtime.evaluate", {
    expression: `new Promise((resolve) => {
      const submitBtn = document.querySelector("#booking-sequence button[type='submit']");
      if (!submitBtn) {
        resolve({ error: "no submit btn" });
        return;
      }
      submitBtn.click();
      setTimeout(() => {
        const modal = document.querySelector("div[role='dialog']");
        const title = modal ? modal.querySelector("#booking-modal-title")?.textContent : null;
        const whatsappLink = modal ? modal.querySelector("a[href*='wa.me']")?.href : null;
        resolve({
          modalOpened: !!modal,
          modalTitle: title,
          whatsappLinkValid: !!whatsappLink && whatsappLink.includes("9926219900")
        });
      }, 300);
    })`,
    awaitPromise: true,
    returnByValue: true
  });
  results.modalTest = modalTest.result.value;
  console.log("Modal test result:", results.modalTest);

  // Close modal with escape key
  await send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    windowsVirtualKeyCode: 27,
    key: "Escape",
    code: "Escape",
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    windowsVirtualKeyCode: 27,
    key: "Escape",
    code: "Escape",
  });
  await new Promise(r => setTimeout(r, 300));

  const modalClosed = await send("Runtime.evaluate", {
    expression: `!document.querySelector("div[role='dialog']")`,
    returnByValue: true
  });
  results.modalClosedWithEscape = modalClosed.result.value;
  console.log("Modal closed on Escape:", results.modalClosedWithEscape);

  fs.writeFileSync(
    path.join(outputDir, "verification_results.json"),
    JSON.stringify(results, null, 2)
  );

  ws.close();
  console.log("\nVerification finished successfully!");
}

run().catch(console.error);
