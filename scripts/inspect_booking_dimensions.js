const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Inspecting Booking Form Alignment & Dimensions via CDP ===");
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

  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    console.log(`\n--- Measuring Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.width < 768,
    });

    await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll into view
    await send("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("booking-sequence");
        if (el) el.scrollIntoView({ block: "center" });
      `
    });
    await new Promise(r => setTimeout(r, 500));

    const evalResult = await send("Runtime.evaluate", {
      expression: `(() => {
        const checkinInput = document.querySelector("#checkin-date");
        const checkoutInput = document.querySelector("#checkout-date");
        const guestBtn = document.querySelector("#booking-sequence button[aria-haspopup='dialog']");
        const submitBtn = document.querySelector("#booking-sequence button[type='submit']");
        
        const checkinLabel = document.querySelector("label[for='checkin-date']");
        const checkoutLabel = document.querySelector("label[for='checkout-date']");
        const guestLabel = guestBtn ? guestBtn.closest("div")?.parentElement?.querySelector("label") || guestBtn.parentElement?.querySelector("label") : null;
        const submitContainer = submitBtn ? submitBtn.parentElement : null;

        const getMetrics = (el, name) => {
          if (!el) return { name, exists: false };
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          return {
            name,
            exists: true,
            top: Math.round(rect.top),
            bottom: Math.round(rect.bottom),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            borderTopWidth: style.borderTopWidth,
            borderBottomWidth: style.borderBottomWidth,
            display: style.display,
            alignItems: style.alignItems,
          };
        };

        return {
          labels: {
            checkin: getMetrics(checkinLabel, "checkinLabel"),
            checkout: getMetrics(checkoutLabel, "checkoutLabel"),
            guest: getMetrics(guestLabel, "guestLabel"),
          },
          controls: {
            checkinInput: getMetrics(checkinInput, "checkinInput"),
            checkoutInput: getMetrics(checkoutInput, "checkoutInput"),
            guestBtn: getMetrics(guestBtn, "guestBtn"),
            submitBtn: getMetrics(submitBtn, "submitBtn"),
            submitContainer: getMetrics(submitContainer, "submitContainer"),
          }
        };
      })()`,
      returnByValue: true
    });

    console.log(JSON.stringify(evalResult.result.value, null, 2));

    // Capture screenshot
    const screenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
    fs.writeFileSync(
      path.join(outputDir, `before_booking_${vp.name}.jpg`),
      Buffer.from(screenshot.data, "base64")
    );
  }

  // Also check /about booking form
  console.log(`\n--- Measuring /about Booking Form ---`);
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send("Page.navigate", { url: "http://localhost:3000/about#reserve" });
  await new Promise(r => setTimeout(r, 1500));
  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById("reserve");
      if (el) el.scrollIntoView({ block: "center" });
    `
  });
  await new Promise(r => setTimeout(r, 500));

  const screenshotAbout = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(
    path.join(outputDir, `before_booking_about_desktop.jpg`),
    Buffer.from(screenshotAbout.data, "base64")
  );

  ws.close();
  console.log("Inspection complete. Saved screenshots to .planning/phases/38-booking-alignment/");
}

run().catch(console.error);
