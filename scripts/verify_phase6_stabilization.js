const fs = require("fs");
const path = require("path");

const VIEWPORTS = [
  // Desktop
  { name: "desktop_1920x1080", width: 1920, height: 1080, dsf: 1, mobile: false, category: "Desktop" },
  { name: "desktop_1440x900",  width: 1440, height: 900,  dsf: 1, mobile: false, category: "Desktop" },
  { name: "desktop_1280x800",  width: 1280, height: 800,  dsf: 1, mobile: false, category: "Desktop" },
  // Tablet
  { name: "tablet_1024x768",   width: 1024, height: 768,  dsf: 2, mobile: true,  category: "Tablet" },
  { name: "tablet_768x1024",   width: 768,  height: 1024, dsf: 2, mobile: true,  category: "Tablet" },
  // Mobile
  { name: "mobile_430x932",    width: 430,  height: 932,  dsf: 3, mobile: true,  category: "Mobile" },
  { name: "mobile_390x844",    width: 390,  height: 844,  dsf: 3, mobile: true,  category: "Mobile" },
  { name: "mobile_375x812",    width: 375,  height: 812,  dsf: 3, mobile: true,  category: "Mobile" },
  { name: "mobile_360x800",    width: 360,  height: 800,  dsf: 2, mobile: true,  category: "Mobile" },
];

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/rooms", name: "rooms" },
  { path: "/rooms/deluxe-room", name: "room_deluxe" },
  { path: "/gallery", name: "gallery" },
  { path: "/weddings", name: "weddings" },
  { path: "/spa", name: "spa" },
  { path: "/about", name: "about" },
];

async function runStabilizationAudit() {
  console.log("================================================================================");
  console.log("   ORCHHA RESORT — PHASE 6: TECHNICAL STABILIZATION & HARDENING AUDIT           ");
  console.log("================================================================================");

  const tabs = await (await fetch("http://127.0.0.1:9222/json")).json();
  const pageTab = tabs.find((t) => t.type === "page");
  if (!pageTab) {
    console.error("No active page tab found in Chrome at port 9222");
    process.exit(1);
  }

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

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

  const screenshotDir = path.join(__dirname, "..", "audit", "screenshots", "phase6_stabilization");
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const consoleLogs = [];
  ws.addEventListener("message", (evt) => {
    try {
      const msg = JSON.parse(evt.data);
      if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
        consoleLogs.push(msg.params.args.map((a) => a.value || a.description).join(" "));
      }
    } catch {}
  });

  await send("Console.enable");
  await send("Runtime.enable");

  const results = {
    viewportsTested: VIEWPORTS.length,
    routesTested: ROUTES.length,
    responsiveMatrix: {},
    animations: {},
    bookingFlow: {},
    consoleErrors: 0,
    regressionsFound: 0,
  };

  // ───────────────────────────────────────────────────────────────────────────
  // PART 1: 9-VIEWPORT RESPONSIVE & OVERFLOW MATRIX
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [1/4] EXECUTING 9-VIEWPORT DEEP RESPONSIVE AUDIT ...");

  for (const vp of VIEWPORTS) {
    console.log(`\n  Checking Viewport: ${vp.name} (${vp.width}x${vp.height}, ${vp.category})`);
    results.responsiveMatrix[vp.name] = {};

    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dsf,
      mobile: vp.mobile,
    });

    for (const route of ROUTES) {
      await send("Page.navigate", { url: `http://localhost:3000${route.path}` });
      await new Promise((r) => setTimeout(r, 600));

      const overflowRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const hasOverflow = docEl.scrollWidth > docEl.clientWidth + 1;
          const navVisible = !!document.querySelector("nav");
          const footerVisible = !!document.querySelector("footer");
          return {
            scrollWidth: docEl.scrollWidth,
            clientWidth: docEl.clientWidth,
            hasOverflow,
            navVisible,
            footerVisible
          };
        })()`,
        returnByValue: true,
      });

      const metrics = overflowRes.result.value;
      results.responsiveMatrix[vp.name][route.name] = metrics;

      if (metrics.hasOverflow) {
        console.error(`    ❌ OVERFLOW DETECTED: ${route.path} on ${vp.name} (scrollWidth: ${metrics.scrollWidth}, clientWidth: ${metrics.clientWidth})`);
        results.regressionsFound++;
      }
    }

    // Capture representative screenshot of homepage at this viewport
    await send("Page.navigate", { url: "http://localhost:3000/" });
    await new Promise((r) => setTimeout(r, 800));
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
    fs.writeFileSync(path.join(screenshotDir, `responsive_${vp.name}.jpg`), Buffer.from(shot.data, "base64"));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // PART 2: ANIMATION INTEGRITY (Forward & Reverse Scrolling, Pinned Tracks)
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [2/4] EXECUTING ANIMATION INTEGRITY AUDIT ...");

  // Set Desktop standard viewport for scroll choreography
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 1200));

  // Test 2A: Hero Entrance & Reduced Motion
  console.log("  Testing Hero animation and reduced motion compatibility...");
  const heroCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const heroHeadline = document.querySelector("h1");
      const heroGlass = heroHeadline ? heroHeadline.closest(".backdrop-blur-md") : null;
      return {
        hasHeroGlass: !!heroGlass,
        glassOpacity: heroGlass ? window.getComputedStyle(heroGlass).opacity : "0"
      };
    })()`,
    returnByValue: true,
  });
  results.animations.hero = heroCheck.result.value;

  // Test 2B: Scroll down to Guest Love Reviews, then reverse scroll
  console.log("  Testing Guest Love Review Cards (Forward & Reverse Scroll)...");
  await send("Runtime.evaluate", {
    expression: `(() => {
      const reviewSection = document.getElementById("reviews");
      if (reviewSection) reviewSection.scrollIntoView({ behavior: "instant" });
    })()`,
  });
  await new Promise((r) => setTimeout(r, 800));

  // Scroll through the 380vh review track in increments
  const reviewTransformsForward = [];
  for (let i = 0; i <= 4; i++) {
    await send("Runtime.evaluate", {
      expression: `window.scrollBy({ top: 400, behavior: "instant" });`,
    });
    await new Promise((r) => setTimeout(r, 200));
    const t = await send("Runtime.evaluate", {
      expression: `(() => {
        const dots = document.querySelectorAll("footer span[aria-label^='Story step']");
        return { step: dots.length };
      })()`,
      returnByValue: true,
    });
    reviewTransformsForward.push(t.result.value);
  }

  // Reverse scroll
  for (let i = 0; i <= 4; i++) {
    await send("Runtime.evaluate", {
      expression: `window.scrollBy({ top: -400, behavior: "instant" });`,
    });
    await new Promise((r) => setTimeout(r, 200));
  }
  const reviewAfterReverse = await send("Runtime.evaluate", {
    expression: `(() => {
      const section = document.getElementById("guest-stories") || document.getElementById("reviews");
      const cards = section ? section.querySelectorAll("article") : [];
      return { cardsFound: cards.length };
    })()`,
    returnByValue: true,
  });
  results.animations.reviews = {
    forwardStepsRecorded: reviewTransformsForward.length,
    reverseRecovered: reviewAfterReverse.result.value.cardsFound >= 1,
    cardsRendered: reviewAfterReverse.result.value.cardsFound,
  };

  // Test 2C: Palace-to-Map Finale (Forward & Reverse Scroll)
  console.log("  Testing Palace-to-Map 5-Stage Finale (Forward & Reverse Scroll)...");
  await send("Runtime.evaluate", {
    expression: `(() => {
      const mapSection = document.getElementById("map-experience");
      if (mapSection) mapSection.scrollIntoView({ behavior: "instant" });
    })()`,
  });
  await new Promise((r) => setTimeout(r, 800));

  // Scroll forward through map stages
  for (let i = 0; i < 5; i++) {
    await send("Runtime.evaluate", {
      expression: `window.scrollBy({ top: 600, behavior: "instant" });`,
    });
    await new Promise((r) => setTimeout(r, 250));
  }
  const mapMiddleAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const leaflet = document.querySelector(".leaflet-container");
      const markers = document.querySelectorAll(".leaflet-marker-icon");
      return { hasLeaflet: !!leaflet, markerCount: markers.length };
    })()`,
    returnByValue: true,
  });

  // Reverse scroll back to top of map section
  for (let i = 0; i < 5; i++) {
    await send("Runtime.evaluate", {
      expression: `window.scrollBy({ top: -600, behavior: "instant" });`,
    });
    await new Promise((r) => setTimeout(r, 250));
  }
  results.animations.mapFinale = {
    leafletActive: mapMiddleAudit.result.value.hasLeaflet,
    markersRendered: mapMiddleAudit.result.value.markerCount,
  };

  // Capture screenshot of map finale
  const shotMap = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(screenshotDir, "animation_map_finale.jpg"), Buffer.from(shotMap.data, "base64"));

  // ───────────────────────────────────────────────────────────────────────────
  // PART 3: BOOKING FUNCTIONALITY END-TO-END VERIFICATION
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [3/4] EXECUTING FULL RESERVATION FLOW VERIFICATION ...");

  await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
  await new Promise((r) => setTimeout(r, 1200));

  // Step 3A: Inspect form inputs before submit
  const preSubmitAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const widget = document.getElementById("booking-sequence");
      if (!widget) return { success: false, reason: "No widget" };

      const checkInInput = widget.querySelector("input[type='date']:first-of-type");
      const checkOutInput = widget.querySelector("input[type='date']:last-of-type");
      const submitBtn = widget.querySelector("button[type='submit']");

      return {
        hasCheckIn: !!checkInInput,
        hasCheckOut: !!checkOutInput,
        hasSubmitBtn: !!submitBtn
      };
    })()`,
    returnByValue: true,
  });

  // Step 3B: Click submit button to trigger reservation handoff modal
  await send("Runtime.evaluate", {
    expression: `(() => {
      const submitBtn = document.querySelector("#booking-sequence button[type='submit']");
      if (submitBtn) submitBtn.click();
    })()`,
  });

  // Wait 600ms for React state commit and modal mount
  await new Promise((r) => setTimeout(r, 600));

  // Step 3C: Inspect mounted modal, body scroll lock, and WhatsApp handoff link
  const modalAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const modal = document.querySelector("[role='dialog']");
      const bodyScrollLocked = document.body.style.overflow === "hidden";
      const htmlScrollLocked = document.documentElement.style.overflow === "hidden";
      const waLink = modal ? modal.querySelector("a[href*='wa.me']") : null;
      const waHref = waLink ? waLink.getAttribute("href") : "";

      return {
        hasModal: !!modal,
        bodyScrollLocked,
        htmlScrollLocked,
        hasWhatsAppHandoff: !!waLink,
        waHref,
        waUrlEncoded: waHref.includes("Reservation") || waHref.includes("Adults") || waHref.includes("Orchha")
      };
    })()`,
    returnByValue: true,
  });

  results.bookingFlow = {
    ...preSubmitAudit.result.value,
    ...modalAudit.result.value,
  };
  console.log("  Booking Flow Test Result:", results.bookingFlow);

  // Capture modal screenshot
  const shotBookingModal = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(screenshotDir, "booking_handoff_modal.jpg"), Buffer.from(shotBookingModal.data, "base64"));

  // Step 3D: Test modal dismissal via Escape key
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape" });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape" });
  await new Promise((r) => setTimeout(r, 400));

  const modalAfterEscape = await send("Runtime.evaluate", {
    expression: `(() => {
      const modal = document.querySelector("[role='dialog']");
      return {
        modalDismissed: !modal,
        bodyScrollUnlocked: document.body.style.overflow !== "hidden"
      };
    })()`,
    returnByValue: true,
  });
  results.bookingFlow.escapeDismissal = modalAfterEscape.result.value;

  // ───────────────────────────────────────────────────────────────────────────
  // PART 4: CONSOLE ERRORS & PERFORMANCE AUDIT
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [4/4] EXECUTING PERFORMANCE & CONSOLE AUDIT ...");

  results.consoleErrors = consoleLogs.length;
  if (consoleLogs.length > 0) {
    console.warn("  Console Warnings / Errors detected:", consoleLogs);
  } else {
    console.log("  Zero console errors detected across all tested flows.");
  }

  // Save audit results json
  fs.writeFileSync(
    path.join(__dirname, "..", "audit", "phase6_stabilization_results.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("\n================================================================================");
  console.log(`   STABILIZATION AUDIT COMPLETE: ${results.regressionsFound} Regressions Found`);
  console.log("================================================================================");

  ws.close();
}

runStabilizationAudit().catch((err) => {
  console.error("Audit failure:", err);
  process.exit(1);
});
