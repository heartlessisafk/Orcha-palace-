const fs = require("fs");
const path = require("path");

const ROUTES_TO_AUDIT = [
  { path: "/", name: "home" },
  { path: "/rooms", name: "rooms" },
  { path: "/rooms/standard-room", name: "room_standard" },
  { path: "/rooms/deluxe-room", name: "room_deluxe" },
  { path: "/rooms/deluxe-swiss-tent", name: "room_tent" },
  { path: "/rooms/royal-heritage-suite", name: "room_suite" },
  { path: "/gallery", name: "gallery" },
  { path: "/weddings", name: "weddings" },
  { path: "/spa", name: "spa" },
  { path: "/about", name: "about" },
];

async function runPhase7FinalAudit() {
  console.log("================================================================================");
  console.log("   ORCHHA RESORT — PHASE 7: PRINCIPAL ENGINEER & DESIGN SYSTEM FINAL AUDIT      ");
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

  const screenshotDir = path.join(__dirname, "..", "audit", "screenshots", "phase7_final");
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const consoleErrors = [];
  ws.addEventListener("message", (evt) => {
    try {
      const msg = JSON.parse(evt.data);
      if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
        consoleErrors.push(msg.params.args.map((a) => a.value || a.description).join(" "));
      }
    } catch {}
  });

  await send("Console.enable");
  await send("Runtime.enable");

  const finalResults = {
    impeccableDesignAudit: {},
    vercelGuidelinesAudit: {},
    tasteSkillAudit: {},
    tactile3DButtonAudit: {},
    regressionTest: {},
    productionHealth: {},
    regressionsFound: 0,
  };

  // ───────────────────────────────────────────────────────────────────────────
  // 1. IMPECCABLE DESIGN AUDIT & TOKEN ALIGNMENT
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [1/6] AUDITING DESIGN SYSTEM & TOKEN ALIGNMENT (IMPECCABLE) ...");

  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 1200));

  const designTokensAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const bodyStyle = window.getComputedStyle(document.body);
      const h1 = document.querySelector("h1");
      const h1Style = h1 ? window.getComputedStyle(h1) : null;
      const isCrimsonVariable = document.documentElement.className.includes("font-crimson") || document.body.className.includes("font-sans");

      return {
        hasBodyFont: bodyStyle.fontFamily.includes("DM Sans") || bodyStyle.fontFamily.includes("sans-serif"),
        hasHeadingFont: h1Style ? (h1Style.fontFamily.includes("Crimson Text") || h1Style.fontFamily.includes("serif")) : false,
        backgroundColor: bodyStyle.backgroundColor,
        color: bodyStyle.color,
        scrollSmooth: window.getComputedStyle(document.documentElement).scrollBehavior === "smooth"
      };
    })()`,
    returnByValue: true,
  });

  finalResults.impeccableDesignAudit = designTokensAudit.result.value;
  console.log("  Impeccable Design Tokens Result:", finalResults.impeccableDesignAudit);

  // ───────────────────────────────────────────────────────────────────────────
  // 2. VERCEL WEB DESIGN GUIDELINES & ACCESSIBILITY AUDIT
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [2/6] AUDITING VERCEL WEB INTERFACE GUIDELINES & ACCESSIBILITY ...");

  const guidelinesAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      // 1. Skip to Content Link
      const skipLink = document.querySelector("a[href='#main-content']");
      const mainLandmark = document.getElementById("main-content");

      // 2. Navigation Landmarks & Aria
      const mainNav = document.querySelector("nav[aria-label='Main Navigation']");
      const hamburger = document.querySelector("button[aria-label*='menu']");
      const hasAriaExpanded = hamburger ? hamburger.hasAttribute("aria-expanded") : false;

      // 3. Form Labels in Booking Widget
      const checkInInput = document.getElementById("checkin-date");
      const checkInLabel = document.querySelector("label[for='checkin-date']");
      const checkOutInput = document.getElementById("checkout-date");
      const checkOutLabel = document.querySelector("label[for='checkout-date']");

      // 4. Image Alt Attributes (App images; excluding dynamic Leaflet map tile layers)
      const images = Array.from(document.querySelectorAll("img")).filter(img => !img.classList.contains("leaflet-tile"));
      const missingAlt = images.filter(img => !img.hasAttribute("alt") || img.getAttribute("alt") === "");

      return {
        hasSkipLink: !!skipLink,
        hasMainLandmark: !!mainLandmark,
        mainNavAria: !!mainNav,
        hamburgerAriaExpanded: hasAriaExpanded,
        checkInLabelAssociation: !!(checkInInput && checkInLabel),
        checkOutLabelAssociation: !!(checkOutInput && checkOutLabel),
        totalImagesOnHome: images.length,
        missingAltCount: missingAlt.length
      };
    })()`,
    returnByValue: true,
  });

  finalResults.vercelGuidelinesAudit = guidelinesAudit.result.value;
  console.log("  Vercel Web Interface Guidelines Result:", finalResults.vercelGuidelinesAudit);

  // ───────────────────────────────────────────────────────────────────────────
  // 3. TASTE SKILL VISUAL AUDIT & IMAGE MANIFEST
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [3/6] AUDITING TASTE SKILL & REAL PHOTOGRAPHY FIDELITY ...");

  // Check gallery page for asymmetrical layout and category accuracy
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise((r) => setTimeout(r, 1200));

  const tasteGalleryAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const filters = Array.from(document.querySelectorAll("button")).filter(b => b.innerText.includes("Views") || b.innerText.includes("Architecture") || b.innerText.includes("Rooms") || b.innerText.includes("Pool") || b.innerText.includes("Weddings") || b.innerText.includes("Amenities") || b.innerText.includes("Experiences"));
      const editorialWideTiles = document.querySelectorAll("[class*='sm:col-span-2']");
      const standardTiles = document.querySelectorAll("[class*='aspect-']");
      return {
        categoryCount: filters.length,
        editorialWideCount: editorialWideTiles.length,
        standardTileCount: standardTiles.length
      };
    })()`,
    returnByValue: true,
  });

  finalResults.tasteSkillAudit = tasteGalleryAudit.result.value;
  console.log("  Taste Skill Gallery Result:", finalResults.tasteSkillAudit);

  // ───────────────────────────────────────────────────────────────────────────
  // 4. UNIVERSAL 3D BUTTON AUDIT
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [4/6] AUDITING UNIVERSAL 3D BUTTON & TACTILE SYSTEM ...");

  await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
  await new Promise((r) => setTimeout(r, 1000));

  const buttonTactileTest = await send("Runtime.evaluate", {
    expression: `(() => {
      const btn = document.querySelector("#booking-sequence button[type='submit']");
      if (!btn) return { found: false };

      const rect = btn.getBoundingClientRect();
      const hasSheen = !!btn.querySelector(".tactile-sheen");
      const hasTactileClass = btn.classList.contains("tactile-3d");

      // Dispatch Pointer Events
      const enterEvt = new PointerEvent("pointerenter", { bubbles: true, clientX: rect.left + rect.width * 0.2, clientY: rect.top + rect.height * 0.2, pointerType: "mouse" });
      const moveEvt = new PointerEvent("pointermove", { bubbles: true, clientX: rect.left + rect.width * 0.2, clientY: rect.top + rect.height * 0.2, pointerType: "mouse" });
      btn.dispatchEvent(enterEvt);
      btn.dispatchEvent(moveEvt);

      const computedTransform = window.getComputedStyle(btn).transform;
      const leaveEvt = new PointerEvent("pointerleave", { bubbles: true, pointerType: "mouse" });
      btn.dispatchEvent(leaveEvt);

      return {
        found: true,
        hasSheen,
        hasTactileClass,
        interactiveTransformApplied: computedTransform !== "none",
        focusVisibleRing: btn.className.includes("focus-visible:ring-2")
      };
    })()`,
    returnByValue: true,
  });

  finalResults.tactile3DButtonAudit = buttonTactileTest.result.value;
  console.log("  Universal 3D Button Result:", finalResults.tactile3DButtonAudit);

  // ───────────────────────────────────────────────────────────────────────────
  // 5. FULL 10-ROUTE REGRESSION TEST (Desktop 1440, Tablet 768, Mobile 390)
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [5/6] EXECUTING FULL 10-ROUTE MULTI-VIEWPORT REGRESSION MATRIX ...");

  const viewports = [
    { name: "desktop_1440", width: 1440, height: 900, dsf: 1, mobile: false },
    { name: "tablet_768", width: 768, height: 1024, dsf: 2, mobile: true },
    { name: "mobile_390", width: 390, height: 844, dsf: 3, mobile: true },
  ];

  finalResults.regressionTest.routes = {};

  for (const route of ROUTES_TO_AUDIT) {
    finalResults.regressionTest.routes[route.name] = {};

    for (const vp of viewports) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile,
      });

      await send("Page.navigate", { url: `http://localhost:3000${route.path}` });
      await new Promise((r) => setTimeout(r, 600));

      const res = await send("Runtime.evaluate", {
        expression: `(() => {
          const docEl = document.documentElement;
          const hasOverflow = docEl.scrollWidth > docEl.clientWidth + 1;
          const title = document.title;
          const mainPresent = !!document.getElementById("main-content");
          const footerPresent = !!document.querySelector("footer");
          return {
            hasOverflow,
            title,
            mainPresent,
            footerPresent,
            scrollWidth: docEl.scrollWidth,
            clientWidth: docEl.clientWidth
          };
        })()`,
        returnByValue: true,
      });

      const metrics = res.result.value;
      finalResults.regressionTest.routes[route.name][vp.name] = metrics;

      if (metrics.hasOverflow) {
        console.error(`  ❌ REGRESSION DETECTED: Overflow on ${route.path} (${vp.name})`);
        finalResults.regressionsFound++;
      }
    }

    // Capture screenshot on Desktop
    await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url: `http://localhost:3000${route.path}` });
    await new Promise((r) => setTimeout(r, 600));
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
    fs.writeFileSync(path.join(screenshotDir, `final_${route.name}_desktop.jpg`), Buffer.from(shot.data, "base64"));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 6. PRODUCTION VALIDATION & HEALTH
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> [6/6] CHECKING PRODUCTION HEALTH & CONSOLE INTEGRITY ...");

  finalResults.productionHealth = {
    consoleErrorsCount: consoleErrors.length,
    consoleErrors,
    cleanHealth: consoleErrors.length === 0 && finalResults.regressionsFound === 0,
  };

  fs.writeFileSync(
    path.join(__dirname, "..", "audit", "phase7_final_results.json"),
    JSON.stringify(finalResults, null, 2)
  );

  console.log("\n================================================================================");
  console.log(`   PHASE 7 FINAL AUDIT COMPLETE: ${finalResults.regressionsFound} Regressions Detected`);
  console.log("================================================================================");

  ws.close();
}

runPhase7FinalAudit().catch((err) => {
  console.error("Final audit error:", err);
  process.exit(1);
});
