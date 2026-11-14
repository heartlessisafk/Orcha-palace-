const fs = require("fs");
const path = require("path");

async function runComprehensiveAudit() {
  console.log("=== ORCHHA RESORT: PHASE 2 COMPREHENSIVE CODEBASE & VISUAL AUDIT ===");

  const list = await (await fetch("http://127.0.0.1:9222/json")).json();
  const pageTab = list.find((t) => t.type === "page");
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

  const consoleLogs = [];
  const networkRequests = [];

  ws.addEventListener("message", (evt) => {
    const data = JSON.parse(evt.data);
    if (data.method === "Runtime.consoleAPICalled") {
      consoleLogs.push({
        type: data.params.type,
        text: data.params.args.map((a) => a.value || a.description).join(" "),
      });
    }
    if (data.method === "Network.responseReceived") {
      networkRequests.push({
        url: data.params.response.url,
        status: data.params.response.status,
      });
    }
  });

  await new Promise((r) => ws.addEventListener("open", r));
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  const screenshotDir = path.join(process.cwd(), "audit/screenshots/phase2_baseline");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const routesToAudit = [
    { name: "home", url: "http://localhost:3000/" },
    { name: "rooms", url: "http://localhost:3000/rooms" },
    { name: "room_deluxe", url: "http://localhost:3000/rooms/deluxe-room" },
    { name: "room_tent", url: "http://localhost:3000/rooms/deluxe-swiss-tent" },
    { name: "room_suite", url: "http://localhost:3000/rooms/royal-heritage-suite" },
    { name: "gallery", url: "http://localhost:3000/gallery" },
    { name: "about", url: "http://localhost:3000/about" },
    { name: "weddings", url: "http://localhost:3000/weddings" },
    { name: "spa", url: "http://localhost:3000/spa" },
    { name: "design_system", url: "http://localhost:3000/design-system" },
  ];

  const auditResults = {
    timestamp: new Date().toISOString(),
    routes: {},
    deepDives: {},
    summary: {},
  };

  const viewports = [
    { name: "desktop", width: 1440, height: 900, mobile: false, dpr: 2 },
    { name: "tablet", width: 768, height: 1024, mobile: true, dpr: 2 },
    { name: "mobile", width: 390, height: 844, mobile: true, dpr: 2 },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // ROUTE AUDITS
  // ───────────────────────────────────────────────────────────────────────────
  for (const route of routesToAudit) {
    console.log(`\n>>> Auditing route: ${route.name} (${route.url})`);
    auditResults.routes[route.name] = { url: route.url, viewports: {} };

    for (const vp of viewports) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dpr,
        mobile: vp.mobile,
      });

      consoleLogs.length = 0;
      await send("Page.navigate", { url: route.url });
      await new Promise((r) => setTimeout(r, 1800));

      const pageMetrics = await send("Runtime.evaluate", {
        expression: `(() => {
          const scrollW = document.documentElement.scrollWidth;
          const innerW = window.innerWidth;
          const scrollH = document.documentElement.scrollHeight;
          const title = document.title;
          const images = Array.from(document.querySelectorAll("img")).map(img => ({
            src: img.src,
            alt: img.alt,
            naturalW: img.naturalWidth,
            naturalH: img.naturalHeight,
            clientW: img.clientWidth,
            clientH: img.clientHeight,
            isBroken: img.naturalWidth === 0 && !img.src.endsWith(".svg"),
          }));
          const buttons = Array.from(document.querySelectorAll("button")).map(b => ({
            text: b.textContent.trim().replace(/\\s+/g, " ").slice(0, 40),
            ariaLabel: b.getAttribute("aria-label"),
            disabled: b.disabled,
          }));
          const links = Array.from(document.querySelectorAll("a")).map(a => ({
            text: a.textContent.trim().replace(/\\s+/g, " ").slice(0, 40),
            href: a.getAttribute("href"),
          }));
          return {
            title,
            scrollW,
            innerW,
            hasOverflow: scrollW > innerW,
            totalImages: images.length,
            brokenImages: images.filter(i => i.isBroken).length,
            imageDetails: images.slice(0, 10),
            totalButtons: buttons.length,
            sampleButtons: buttons.slice(0, 6),
            totalLinks: links.length,
          };
        })()`,
        returnByValue: true,
      });

      // Capture screenshot
      const shot = await send("Page.captureScreenshot", { format: "png" });
      const filename = `${route.name}_${vp.name}.png`;
      fs.writeFileSync(path.join(screenshotDir, filename), Buffer.from(shot.data, "base64"));

      auditResults.routes[route.name].viewports[vp.name] = {
        ...pageMetrics.result.value,
        screenshot: filename,
        consoleErrors: consoleLogs.filter((l) => l.type === "error"),
      };

      console.log(`  [${vp.name}] Overflow: ${pageMetrics.result.value.hasOverflow} | Broken Images: ${pageMetrics.result.value.brokenImages} | Buttons: ${pageMetrics.result.value.totalButtons}`);
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // DEEP DIVE 1: HERO & BOOKING SEQUENCE INTERACTION
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> Deep Dive: Hero & Booking Sequence Interactions");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
  await new Promise((r) => setTimeout(r, 1500));

  const bookingInteraction = await send("Runtime.evaluate", {
    expression: `(() => {
      const widget = document.getElementById("booking-sequence");
      if (!widget) return { found: false };

      const checkInInput = widget.querySelector("input[type='date']");
      const reserveBtn = Array.from(widget.querySelectorAll("button")).find(b => b.textContent.includes("Reserve") || b.textContent.includes("Check"));

      let modalOpened = false;
      let bodyScrollLocked = false;

      if (reserveBtn) {
        reserveBtn.click();
        const modal = document.querySelector(".fixed.inset-0.z-50");
        modalOpened = !!modal;
        bodyScrollLocked = document.body.style.overflow === "hidden" && document.documentElement.style.overflow === "hidden";
        if (modal) {
          const closeBtn = modal.querySelector("button[aria-label='Close booking dialog']") || modal.querySelector("button");
          if (closeBtn) closeBtn.click();
        }
      }

      return {
        found: true,
        hasCheckInInput: !!checkInInput,
        hasReserveButton: !!reserveBtn,
        modalOpenedOnReserveClick: modalOpened,
        bodyScrollLockedDuringModal: bodyScrollLocked,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Booking Deep Dive:", bookingInteraction.result.value);
  auditResults.deepDives.booking = bookingInteraction.result.value;

  // ───────────────────────────────────────────────────────────────────────────
  // DEEP DIVE 2: GALLERY VIEWER & PROGRESSIVE REVEAL
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> Deep Dive: Gallery Progressive Reveal & Lightbox");
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise((r) => setTimeout(r, 1500));

  const galleryDeepDive = await send("Runtime.evaluate", {
    expression: `(() => {
      const tilesInitial = document.querySelectorAll(".gallery-tile, img[alt]").length;
      const discoverMoreBtn = Array.from(document.querySelectorAll("button")).find(b =>
        b.textContent.includes("Discover 3 More") || b.textContent.includes("Discover More")
      );

      let countAfterClick = 0;
      let hasDiscoverMore = !!discoverMoreBtn;
      if (discoverMoreBtn) {
        discoverMoreBtn.click();
      }

      return {
        hasDiscoverMoreButton: hasDiscoverMore,
        initialTileElements: tilesInitial,
      };
    })()`,
    returnByValue: true,
  });
  await new Promise((r) => setTimeout(r, 800));

  const galleryAfterClick = await send("Runtime.evaluate", {
    expression: `(() => {
      const filterPills = Array.from(document.querySelectorAll("button")).filter(b =>
        ["All Curated Views", "Lotus Pool", "Architecture", "Rooms & Tents"].some(lbl => b.textContent.includes(lbl))
      ).map(b => b.textContent.trim());

      return {
        filterPillsCount: filterPills.length,
        filterPills,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Gallery Deep Dive:", { ...galleryDeepDive.result.value, ...galleryAfterClick.result.value });
  auditResults.deepDives.gallery = { ...galleryDeepDive.result.value, ...galleryAfterClick.result.value };

  // ───────────────────────────────────────────────────────────────────────────
  // DEEP DIVE 3: GUEST LOVE EXPERIENCE (Scroll Choreography)
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> Deep Dive: Guest Love Experience");
  await send("Page.navigate", { url: "http://localhost:3000/#guest-stories" });
  await new Promise((r) => setTimeout(r, 1500));

  const reviewDeepDive = await send("Runtime.evaluate", {
    expression: `(() => {
      const section = document.getElementById("guest-stories");
      if (!section) return { found: false };
      const rect = section.getBoundingClientRect();
      const cards = section.querySelectorAll(".rounded-3xl, .rounded-2xl");
      return {
        found: true,
        height: rect.height,
        cardCount: cards.length,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Guest Love Deep Dive:", reviewDeepDive.result.value);
  auditResults.deepDives.reviews = reviewDeepDive.result.value;

  // ───────────────────────────────────────────────────────────────────────────
  // DEEP DIVE 4: PALACE-TO-MAP & LEAFLET CARTO VOYAGER
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n>>> Deep Dive: Palace-To-Map & Leaflet Real Map");
  await send("Page.navigate", { url: "http://localhost:3000/#map-experience" });
  await new Promise((r) => setTimeout(r, 2000));

  const mapDeepDive = await send("Runtime.evaluate", {
    expression: `(() => {
      const mapSection = document.getElementById("map-experience");
      if (!mapSection) return { found: false };
      const tiles = Array.from(document.querySelectorAll(".leaflet-tile"));
      const isVoyager = tiles.some(t => t.src.includes("rastertiles/voyager"));
      const hasKey = tiles.some(t => t.src.includes("key="));
      const markers = document.querySelectorAll(".custom-landmark-marker");
      const filters = Array.from(document.querySelectorAll("button")).filter(b =>
        ["All Landmarks", "Sanctuary", "Temples"].some(lbl => b.textContent.includes(lbl))
      );

      return {
        found: true,
        tileCount: tiles.length,
        isVoyager,
        hasKeyParam: hasKey,
        markerCount: markers.length,
        filterCount: filters.length,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Map Deep Dive:", mapDeepDive.result.value);
  auditResults.deepDives.map = mapDeepDive.result.value;

  // ───────────────────────────────────────────────────────────────────────────
  // WRITE FULL AUDIT REPORT
  // ───────────────────────────────────────────────────────────────────────────
  const reportPath = path.join(process.cwd(), "audit/phase2_codebase_and_visual_audit.json");
  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));
  console.log(`\nAudit report written to: ${reportPath}`);

  ws.close();
  console.log("=== COMPREHENSIVE AUDIT FINISHED ===");
}

runComprehensiveAudit().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
