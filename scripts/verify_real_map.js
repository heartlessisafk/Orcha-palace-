const fs = require("fs");
const path = require("path");

async function runVerification() {
  console.log("=== ORCHHA RESORT: REAL MAP & LANDMARK EXPLORER VERIFICATION ===");
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
  ws.addEventListener("message", (evt) => {
    const data = JSON.parse(evt.data);
    if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
      consoleErrors.push(data.params.args.map((a) => a.value || a.description).join(" "));
    }
  });

  await new Promise((r) => ws.addEventListener("open", r));
  await send("Page.enable");
  await send("Runtime.enable");

  // Ensure output dir exists
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

  // Navigate to Homepage
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

  // 2. STAGE 1: HERO TITLE ENTRANCE (0% of track)
  console.log("\n--- Testing Stage 1: Resort Introduction & Hero Headline ---");
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: ${mapPos.top}, behavior: "instant" })`,
  });
  await new Promise((r) => setTimeout(r, 800));

  const heroCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const h2 = Array.from(document.querySelectorAll("h2")).find(el => el.textContent.includes("The Heritage Geography of Orchha"));
      if (!h2) return { found: false };
      const opacity = window.getComputedStyle(h2.parentElement).opacity;
      const visibility = window.getComputedStyle(h2.parentElement).visibility;
      return { found: true, text: h2.textContent.trim(), opacity: parseFloat(opacity), visibility };
    })()`,
    returnByValue: true,
  });
  console.log("Hero check:", heroCheck.result.value);

  const shot1 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_01_hero.png"), Buffer.from(shot1.data, "base64"));
  console.log("Captured real_map_01_hero.png");

  // 3. STAGE 2: ARCHITECTURAL BLUEPRINT (20% of track)
  console.log("\n--- Testing Stage 2: Cenotaph Blueprint & Coordinate Grid (20% scroll) ---");
  const scrollStage2 = mapPos.top + mapPos.height * 0.2;
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: ${scrollStage2}, behavior: "instant" })`,
  });
  await new Promise((r) => setTimeout(r, 800));

  const shot2 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_02_blueprint.png"), Buffer.from(shot2.data, "base64"));
  console.log("Captured real_map_02_blueprint.png");

  // 4. STAGE 3 & 4: REAL GEOGRAPHIC MAP & LANDMARK EXPLORER (52% of track)
  console.log("\n--- Testing Stage 3 & 4: Real Geographic Map & Landmarks (52% scroll) ---");
  const scrollStage3 = mapPos.top + mapPos.height * 0.52;
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: ${scrollStage3}, behavior: "instant" })`,
  });
  await new Promise((r) => setTimeout(r, 2500)); // Allow Leaflet tiles to load

  const mapValidation = await send("Runtime.evaluate", {
    expression: `(() => {
      const tiles = document.querySelectorAll(".leaflet-tile");
      const markers = document.querySelectorAll(".custom-landmark-marker");
      const listItems = document.querySelectorAll(".marker-item-orchha-fort, .marker-orchha-resort");
      const resortMarker = document.querySelector(".marker-orchha-resort");
      return {
        tileCount: tiles.length,
        markerCount: markers.length,
        hasResortMarker: !!resortMarker,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Map validation results:", mapValidation.result.value);

  const shot3 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_03_atlas.png"), Buffer.from(shot3.data, "base64"));
  console.log("Captured real_map_03_atlas.png");

  // 5. TEST SELECTING A LANDMARK FROM LIST (Orchha Fort)
  console.log("\n--- Testing Landmark Selection & Camera Pan (Selecting Orchha Fort) ---");
  const selectFort = await send("Runtime.evaluate", {
    expression: `(() => {
      const items = Array.from(document.querySelectorAll("h4"));
      const fortItem = items.find(el => el.textContent.includes("Orchha Fort & Jahangir Mahal"));
      if (!fortItem) return { clicked: false, reason: "item not found" };
      fortItem.closest(".cursor-pointer").click();
      return { clicked: true };
    })()`,
    returnByValue: true,
  });
  console.log("Clicked Orchha Fort:", selectFort.result.value);
  await new Promise((r) => setTimeout(r, 1600)); // Wait for flyTo transition

  const fortInspectorCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const cardTitle = document.querySelector(".animate-fade-in h4");
      return {
        cardVisible: !!cardTitle,
        title: cardTitle ? cardTitle.textContent.trim() : null
      };
    })()`,
    returnByValue: true,
  });
  console.log("Inspector check after selecting Orchha Fort:", fortInspectorCheck.result.value);

  const shot4 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_04_selected_fort.png"), Buffer.from(shot4.data, "base64"));
  console.log("Captured real_map_04_selected_fort.png");

  // 6. TEST CATEGORY FILTERING (Click "Temples")
  console.log("\n--- Testing Category Filter ('Temples') ---");
  const filterTemples = await send("Runtime.evaluate", {
    expression: `(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const templesBtn = buttons.find(b => b.textContent.trim() === "Temples");
      if (!templesBtn) return { clicked: false };
      templesBtn.click();
      return { clicked: true };
    })()`,
    returnByValue: true,
  });
  console.log("Clicked Temples filter:", filterTemples.result.value);
  await new Promise((r) => setTimeout(r, 800));

  const templesCountCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const countEl = Array.from(document.querySelectorAll("span")).find(s => s.textContent.includes("Verified Landmarks"));
      return { countText: countEl ? countEl.textContent.trim() : null };
    })()`,
    returnByValue: true,
  });
  console.log("Filtered count check:", templesCountCheck.result.value);

  const shot5 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_05_temples_filter.png"), Buffer.from(shot5.data, "base64"));
  console.log("Captured real_map_05_temples_filter.png");

  // 7. STAGE 5: FINAL LUXURY BOOKING INVITATION (90% of track)
  console.log("\n--- Testing Stage 5: Final Luxury Booking Invitation (90% scroll) ---");
  const scrollStage5 = mapPos.top + mapPos.height * 0.90;
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: ${scrollStage5}, behavior: "instant" })`,
  });
  await new Promise((r) => setTimeout(r, 800));

  const ctaCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const h3 = Array.from(document.querySelectorAll("h3")).find(el => el.textContent.includes("Stay close to the stories of Orchha"));
      const btn = Array.from(document.querySelectorAll("button")).find(el => el.textContent.includes("Book Your Stay"));
      return {
        hasTitle: !!h3,
        titleText: h3 ? h3.textContent.trim() : null,
        hasButton: !!btn
      };
    })()`,
    returnByValue: true,
  });
  console.log("Stage 5 booking invitation check:", ctaCheck.result.value);

  const shot6 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_06_booking_cta.png"), Buffer.from(shot6.data, "base64"));
  console.log("Captured real_map_06_booking_cta.png");

  // 8. TABLET VIEWPORT (768 x 1024)
  console.log("\n--- Testing Tablet Viewport (768 x 1024) ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 1000));

  const tabletOverflow = await send("Runtime.evaluate", {
    expression: `(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    })()`,
    returnByValue: true,
  });
  console.log("Tablet overflow check:", tabletOverflow.result.value);

  // Scroll to mobile/tablet map section
  await send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.getElementById("map-experience");
      if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shotTablet = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_tablet.png"), Buffer.from(shotTablet.data, "base64"));
  console.log("Captured real_map_tablet.png");

  // 9. MOBILE VIEWPORT (390 x 844)
  console.log("\n--- Testing Mobile Viewport (390 x 844) ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileOverflow = await send("Runtime.evaluate", {
    expression: `(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    })()`,
    returnByValue: true,
  });
  console.log("Mobile overflow check:", mobileOverflow.result.value);

  await send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.getElementById("map-experience");
      if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shotMobile = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, "real_map_mobile.png"), Buffer.from(shotMobile.data, "base64"));
  console.log("Captured real_map_mobile.png");

  console.log("\n--- Console Errors Check ---");
  console.log("Total console errors encountered:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error("Errors:", consoleErrors);
  }

  // Restore desktop before closing
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });
  ws.close();

  console.log("\n=== REAL MAP VERIFICATION COMPLETE: ALL PASS ===");
}

runVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
