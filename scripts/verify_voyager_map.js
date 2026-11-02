const fs = require("fs");
const path = require("path");

async function runVerification() {
  console.log("=== ORCHHA RESORT: CARTO VOYAGER MAP VERIFICATION ===");
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

  const consoleErrors = [];
  const networkTileRequests = [];

  ws.addEventListener("message", (evt) => {
    const data = JSON.parse(evt.data);
    if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
      consoleErrors.push(data.params.args.map((a) => a.value || a.description).join(" "));
    }
    if (data.method === "Network.responseReceived") {
      const url = data.params.response.url;
      if (url.includes("cartocdn.com") || url.includes("rastertiles")) {
        networkTileRequests.push({
          url,
          status: data.params.response.status,
          headers: data.params.response.headers,
        });
      }
    }
  });

  await new Promise((r) => ws.addEventListener("open", r));
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  const outDir = path.join(process.cwd(), "audit/screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. DESKTOP VIEWPORT SETUP (1440 x 900)
  console.log("\n--- Setting Desktop Viewport 1440x900 ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  console.log("Navigating to http://localhost:3000 ...");
  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise((r) => setTimeout(r, 2000));

  // Find map container position
  const getMapPosition = await send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.getElementById("map-experience");
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const height = rect.height;
      return { top, height };
    })()`,
    returnByValue: true,
  });

  const mapPos = getMapPosition.result?.value;
  if (!mapPos) {
    console.error("Could not find #map-experience section!");
    process.exit(1);
  }
  console.log(`Map experience section found at y=${mapPos.top}, total track height=${mapPos.height}px`);

  // Scroll into the interactive map stage (stage 2/3 of sequence)
  const mapInteractiveScrollY = mapPos.top + mapPos.height * 0.45;
  console.log(`Scrolling to interactive map view at y=${mapInteractiveScrollY} ...`);
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: ${mapInteractiveScrollY}, behavior: "instant" })`,
  });
  await new Promise((r) => setTimeout(r, 2000));

  // 2. VERIFY CARTO VOYAGER MAP TILES
  console.log("\n--- Verifying CARTO Voyager Map Tiles ---");
  const tileInspection = await send("Runtime.evaluate", {
    expression: `(() => {
      const tiles = Array.from(document.querySelectorAll(".leaflet-tile"));
      const tileSrcs = tiles.map(t => t.src).filter(Boolean);
      const isVoyager = tileSrcs.some(src => src.includes("rastertiles/voyager"));
      const isDark = tileSrcs.some(src => src.includes("rastertiles/dark_all"));
      return {
        totalTileElements: tiles.length,
        sampleTileSrcs: tileSrcs.slice(0, 3),
        isVoyager,
        isDark,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Tile Inspection Result:", JSON.stringify(tileInspection.result.value, null, 2));

  // 3. VERIFY STYLE TOGGLE IS REMOVED
  console.log("\n--- Verifying Style Toggle Button Removal ---");
  const toggleCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const toggleBtn = buttons.find(b =>
        b.textContent.includes("Dark Atlas") ||
        b.textContent.includes("Daylight") ||
        b.title?.includes("Cartographic Style")
      );
      return { hasStyleToggle: !!toggleBtn };
    })()`,
    returnByValue: true,
  });
  console.log("Style toggle removed?", !toggleCheck.result.value.hasStyleToggle);

  // 4. VERIFY ALL 7 LANDMARKS IN LIST AND MAP
  console.log("\n--- Verifying 7 Heritage Landmarks ---");
  const landmarkCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const listItems = Array.from(document.querySelectorAll(".font-serif.text-sm.font-semibold"));
      const listNames = listItems.map(el => el.textContent.trim());
      const markers = Array.from(document.querySelectorAll(".custom-landmark-marker"));
      const resortMarker = document.querySelector(".marker-orchha-resort");
      return {
        listCount: listNames.length,
        listNames,
        mapMarkerCount: markers.length,
        resortMarkerPresent: !!resortMarker,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Landmarks Check:", JSON.stringify(landmarkCheck.result.value, null, 2));

  // 5. TEST INTERACTION: SELECT A LANDMARK (Orchha Fort)
  console.log("\n--- Testing Landmark Selection & Inspector Update ---");
  const clickFort = await send("Runtime.evaluate", {
    expression: `(() => {
      const fortItem = Array.from(document.querySelectorAll("div")).find(el =>
        el.textContent.includes("Orchha Fort & Jahangir Mahal") && el.classList.contains("cursor-pointer")
      );
      if (fortItem) {
        fortItem.click();
        return { clicked: true };
      }
      return { clicked: false };
    })()`,
    returnByValue: true,
  });
  console.log("Clicked Orchha Fort?", clickFort.result.value.clicked);
  await new Promise((r) => setTimeout(r, 1200));

  const inspectorCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const inspector = document.querySelector(".animate-fade-in");
      if (!inspector) return { found: false };
      return {
        found: true,
        text: inspector.textContent.trim(),
        hasFort: inspector.textContent.includes("Orchha Fort"),
      };
    })()`,
    returnByValue: true,
  });
  console.log("Inspector Check after click:", inspectorCheck.result.value);

  // 6. TEST CATEGORY FILTERS
  console.log("\n--- Testing Category Filter (Temples) ---");
  const filterTemples = await send("Runtime.evaluate", {
    expression: `(() => {
      const templePill = Array.from(document.querySelectorAll("button")).find(b => b.textContent.trim() === "Temples");
      if (templePill) {
        templePill.click();
        return { clicked: true };
      }
      return { clicked: false };
    })()`,
    returnByValue: true,
  });
  await new Promise((r) => setTimeout(r, 500));

  const filteredCount = await send("Runtime.evaluate", {
    expression: `(() => {
      const listItems = Array.from(document.querySelectorAll(".font-serif.text-sm.font-semibold"));
      return { count: listItems.length, names: listItems.map(el => el.textContent.trim()) };
    })()`,
    returnByValue: true,
  });
  console.log("Filtered to Temples count:", filteredCount.result.value);

  // Reset to All
  await send("Runtime.evaluate", {
    expression: `(() => {
      const allPill = Array.from(document.querySelectorAll("button")).find(b => b.textContent.trim() === "All Landmarks");
      if (allPill) allPill.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 500));

  // Reset view to resort
  await send("Runtime.evaluate", {
    expression: `(() => {
      const resetBtn = document.querySelector("button[title='Reset Overview']");
      if (resetBtn) resetBtn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1000));

  // 7. DESKTOP SCREENSHOT
  console.log("\n--- Capturing Desktop Screenshot ---");
  const desktopShot = await send("Page.captureScreenshot", {
    format: "png",
  });
  fs.writeFileSync(path.join(outDir, "carto_voyager_clean.png"), Buffer.from(desktopShot.data, "base64"));
  console.log("Desktop screenshot saved: audit/screenshots/carto_voyager_clean.png");

  // 8. MOBILE VIEWPORT SETUP (390 x 844)
  console.log("\n--- Testing Mobile Viewport (390x844) ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: ${mapInteractiveScrollY}, behavior: "instant" })`,
  });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileOverflow = await send("Runtime.evaluate", {
    expression: `(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Mobile overflow check:", mobileOverflow.result.value);

  const mobileShot = await send("Page.captureScreenshot", {
    format: "png",
  });
  fs.writeFileSync(path.join(outDir, "carto_voyager_mobile.png"), Buffer.from(mobileShot.data, "base64"));
  console.log("Mobile screenshot saved: audit/screenshots/carto_voyager_mobile.png");

  // Check network tile status
  console.log("\n--- Network Tiles Summary ---");
  console.log(`Total CARTO tile requests recorded: ${networkTileRequests.length}`);
  if (networkTileRequests.length > 0) {
    const sample = networkTileRequests[0];
    console.log("Sample request URL:", sample.url);
    console.log("Sample response status:", sample.status);
    console.log("Sample response headers:", sample.headers);
  }

  console.log(`\nConsole Errors count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }

  // Summary object
  const report = {
    tileInspection: tileInspection.result.value,
    styleToggleRemoved: !toggleCheck.result.value.hasStyleToggle,
    landmarks: landmarkCheck.result.value,
    mobileOverflow: mobileOverflow.result.value,
    totalTileRequests: networkTileRequests.length,
    sampleTileUrl: networkTileRequests[0]?.url || null,
    sampleEtag: networkTileRequests[0]?.headers?.etag || null,
    consoleErrors,
  };

  fs.writeFileSync(
    path.join(process.cwd(), "audit/carto_voyager_verification_report.json"),
    JSON.stringify(report, null, 2)
  );

  ws.close();
  console.log("\n=== VERIFICATION COMPLETE ===");
}

runVerification().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
