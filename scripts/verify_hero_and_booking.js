const fs = require("fs");
const path = require("path");

async function runVerification() {
  console.log("=== ORCHHA RESORT: HERO LEGIBILITY & BOOKING EXPERIENCE VERIFICATION ===");
  const list = await (await fetch("http://127.0.0.1:9222/json")).json();
  const pageTab = list.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  if (!pageTab) {
    console.error("No active page tab found in Chrome at port 9222");
    process.exit(1);
  }

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const curId = id++;
      const handler = (evt) => {
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

  const consoleErrors = [];
  ws.addEventListener("message", (evt) => {
    const data = JSON.parse(evt.data);
    if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
      consoleErrors.push(data.params.args.map((a) => a.value || a.description).join(" "));
    }
  });

  await new Promise((r) => ws.addEventListener("open", r));
  await send("Page.enable");
  await send("Runtime.enable");

  const outDir = path.join(process.cwd(), "audit/screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. DESKTOP VIEWPORT SETUP (1440 x 900)
  console.log("\n--- 1. Testing Desktop Viewport (1440x900): Hero Legibility ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise((r) => setTimeout(r, 2000));

  // Inspect Hero Editorial Translucent Surface & Typography
  const heroEvaluation = await send("Runtime.evaluate", {
    expression: `(() => {
      const hero = document.getElementById("hero");
      const h1 = document.querySelector("#hero h1");
      const kicker = document.querySelector("#hero [class*='text-brand-gold-light']");
      const desc = document.querySelector("#hero p");
      const surface = h1 ? h1.closest(".backdrop-blur-md") : null;
      const computedSurface = surface ? window.getComputedStyle(surface) : null;
      const computedKicker = kicker ? window.getComputedStyle(kicker) : null;
      const computedH1 = h1 ? window.getComputedStyle(h1) : null;

      return {
        hasHero: !!hero,
        hasSurface: !!surface,
        surfaceBackdrop: computedSurface?.backdropFilter,
        surfaceBg: computedSurface?.backgroundColor,
        surfaceBorder: computedSurface?.borderColor,
        surfaceRadius: computedSurface?.borderRadius,
        kickerText: kicker?.textContent?.trim(),
        kickerBg: computedKicker?.backgroundColor,
        kickerColor: computedKicker?.color,
        h1Text: h1?.textContent?.trim(),
        h1Color: computedH1?.color,
        h1FontSize: computedH1?.fontSize,
        descText: desc?.textContent?.trim(),
      };
    })()`,
    returnByValue: true,
  });
  console.log("Hero evaluation result:", heroEvaluation.result.value);

  const shotHero = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "hero_editorial_legibility.png"), Buffer.from(shotHero.data, "base64"));
  console.log("Saved audit/screenshots/hero_editorial_legibility.png");

  // 2. BOOKING EXPERIENCE INTEGRATION & TRANSITION
  console.log("\n--- 2. Testing Booking Experience Integration & Layout Stability ---");
  await send("Runtime.evaluate", {
    expression: `(() => {
      const booking = document.getElementById("booking-sequence");
      if (booking) {
        booking.scrollIntoView({ behavior: "instant", block: "center" });
      }
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1000));

  const bookingLayout = await send("Runtime.evaluate", {
    expression: `(() => {
      const booking = document.getElementById("booking-sequence");
      const about = document.getElementById("about");
      if (!booking || !about) return null;

      const bookingRect = booking.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();

      // Check distance between bottom of booking and top of about
      const verticalGap = aboutRect.top - bookingRect.bottom;
      const isOverlapping = bookingRect.bottom > aboutRect.top;

      return {
        bookingWidth: bookingRect.width,
        bookingHeight: bookingRect.height,
        verticalGapToAbout: verticalGap,
        isOverlapping,
        windowInnerWidth: window.innerWidth,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Booking layout measurement:", bookingLayout.result.value);

  const shotBooking = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "booking_suite_integrated.png"), Buffer.from(shotBooking.data, "base64"));
  console.log("Saved audit/screenshots/booking_suite_integrated.png");

  // 3. MODAL BODY SCROLL-LOCKING & CONCIERGE HANDOFF
  console.log("\n--- 3. Testing Modal Body Scroll-Lock & Independent Containment ---");

  // Click "Check Rates & Book"
  const clickSubmit = await send("Runtime.evaluate", {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Check Rates & Book"));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true,
  });
  console.log("Clicked 'Check Rates & Book':", clickSubmit.result.value);
  await new Promise((r) => setTimeout(r, 800));

  // Verify modal is open and body overflow is locked
  const modalCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const modal = document.querySelector("[role='dialog']");
      const bodyOverflow = window.getComputedStyle(document.body).overflow;
      const htmlOverflow = window.getComputedStyle(document.documentElement).overflow;
      const title = modal ? modal.querySelector("h3")?.textContent?.trim() : null;
      const whatsappBtn = modal ? modal.querySelector("a[href*='wa.me']") : null;
      const emailBtn = modal ? modal.querySelector("a[href*='mailto:']") : null;

      return {
        hasModal: !!modal,
        bodyOverflow,
        htmlOverflow,
        modalTitle: title,
        hasWhatsAppHandoff: !!whatsappBtn,
        whatsappUrl: whatsappBtn?.getAttribute("href"),
        hasEmailHandoff: !!emailBtn,
        emailUrl: emailBtn?.getAttribute("href"),
      };
    })()`,
    returnByValue: true,
  });
  console.log("Modal state evaluation:", modalCheck.result.value);

  // Attempt user mouse-wheel scroll while modal is open
  const beforeWheelY = await send("Runtime.evaluate", { expression: "window.scrollY", returnByValue: true });
  await send("Input.dispatchMouseEvent", {
    type: "mouseWheel",
    x: 500,
    y: 500,
    deltaX: 0,
    deltaY: 400,
  });
  await new Promise((r) => setTimeout(r, 400));
  const postWheelY = await send("Runtime.evaluate", { expression: "window.scrollY", returnByValue: true });
  const wheelDiff = Math.abs(postWheelY.result.value - beforeWheelY.result.value);
  console.log(`Mouse wheel attempt while modal is open: beforeY=${beforeWheelY.result.value}, afterY=${postWheelY.result.value}, diff=${wheelDiff}px, isBackgroundScrollLocked=${wheelDiff === 0}`);

  const shotModal = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "booking_modal_scroll_locked.png"), Buffer.from(shotModal.data, "base64"));
  console.log("Saved audit/screenshots/booking_modal_scroll_locked.png");

  // Close modal via Close Button
  await send("Runtime.evaluate", {
    expression: `(() => {
      const closeBtn = document.querySelector("[aria-label='Close reservation dialog']");
      if (closeBtn) closeBtn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 600));

  // Check body overflow restored
  const restoredBodyOverflow = await send("Runtime.evaluate", {
    expression: "window.getComputedStyle(document.body).overflow",
    returnByValue: true,
  });
  console.log("Restored body overflow after closing modal:", restoredBodyOverflow.result.value);

  // 4. TABLET VIEWPORT (768 x 1024)
  console.log("\n--- 4. Testing Tablet Viewport (768x1024) ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 800));

  const tabletOverflow = await send("Runtime.evaluate", {
    expression: `(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Tablet overflow check:", tabletOverflow.result.value);

  const shotTablet = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "booking_tablet.png"), Buffer.from(shotTablet.data, "base64"));
  console.log("Saved audit/screenshots/booking_tablet.png");

  // 5. MOBILE VIEWPORT (390 x 844)
  console.log("\n--- 5. Testing Mobile Viewport (390x844) ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 800));

  const mobileOverflow = await send("Runtime.evaluate", {
    expression: `(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Mobile overflow check:", mobileOverflow.result.value);

  const shotMobile = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "booking_mobile.png"), Buffer.from(shotMobile.data, "base64"));
  console.log("Saved audit/screenshots/booking_mobile.png");

  // Restore Desktop
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  console.log("\n--- Console Errors Check ---");
  console.log("Total console errors encountered:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error("Errors:", consoleErrors);
  }

  ws.close();
  console.log("\n=== VERIFICATION COMPLETE ===");
}

runVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
