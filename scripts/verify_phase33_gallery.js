const fs = require("fs");
const path = require("path");

function calculateLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function calculateContrast(rgb1, rgb2) {
  const l1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(str) {
  const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
}

async function run() {
  console.log("=== Phase 33 Gallery Targeted Verification Starting ===");
  const outputDir = path.resolve(__dirname, "../.planning/phases/33-gallery-repair");
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
  await send("CSS.enable");

  const evaluate = async expr => {
    const res = await send("Runtime.evaluate", {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result.value;
  };

  const captureScreenshot = async filePath => {
    const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
    fs.writeFileSync(filePath, Buffer.from(data, "base64"));
  };

  // --- 1. Desktop Test (1440x900) ---
  console.log("\n1. Testing Desktop Viewport (1440x900)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise(r => setTimeout(r, 1500));

  const desktopLayout = await evaluate(`
    (() => {
      const gridContainer = document.querySelector(".max-w-7xl .grid.items-start");
      if (!gridContainer) return { error: "Grid container not found" };

      const columns = Array.from(gridContainer.children);
      const colDetails = columns.map((col, idx) => {
        const rect = col.getBoundingClientRect();
        const items = col.querySelectorAll("div[aria-label^='Open photo:']");
        return {
          index: idx,
          itemCount: items.length,
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      });

      return {
        numColumns: columns.length,
        colDetails,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Desktop Layout:", JSON.stringify(desktopLayout, null, 2));

  await captureScreenshot(path.join(outputDir, "after_gallery_desktop.jpg"));
  console.log("Captured after_gallery_desktop.jpg");

  // --- 2. Inspect Discover More Button ---
  console.log("\n2. Inspecting Discover More Button...");
  const buttonMetrics = await evaluate(`
    (() => {
      const allButtons = Array.from(document.querySelectorAll("button"));
      const btn = allButtons.find(b => b.innerText.includes("Discover More Photographs"));
      if (!btn) return { error: "Discover More Photographs button not found" };

      const computed = window.getComputedStyle(btn);
      const spanText = Array.from(btn.querySelectorAll("span")).find(s => s.innerText.includes("Discover More"));
      const textComputed = spanText ? window.getComputedStyle(spanText) : computed;
      const badge = btn.querySelector(".font-mono");
      const badgeComputed = badge ? window.getComputedStyle(badge) : null;
      const arrow = btn.querySelector("svg");
      const arrowComputed = arrow ? window.getComputedStyle(arrow) : null;

      return {
        text: btn.innerText.replace(/\\s+/g, " ").trim(),
        bgColor: computed.backgroundColor,
        textColor: textComputed.color,
        badgeBg: badgeComputed ? badgeComputed.backgroundColor : null,
        badgeColor: badgeComputed ? badgeComputed.color : null,
        arrowColor: arrowComputed ? arrowComputed.color : null,
        borderRadius: computed.borderRadius,
        rect: {
          width: Math.round(btn.getBoundingClientRect().width),
          height: Math.round(btn.getBoundingClientRect().height)
        }
      };
    })()
  `);
  console.log("Button Metrics:", JSON.stringify(buttonMetrics, null, 2));

  if (!buttonMetrics.error) {
    const bgRgb = parseRgb(buttonMetrics.bgColor);
    const textRgb = parseRgb(buttonMetrics.textColor);
    const contrast = calculateContrast(textRgb, bgRgb);
    console.log(`Contrast Ratio: ${contrast.toFixed(2)}:1 (WCAG AAA requires 7.0:1)`);

    await evaluate(`
      (() => {
        const allButtons = Array.from(document.querySelectorAll("button"));
        const btn = allButtons.find(b => b.innerText.includes("Discover More Photographs"));
        if (btn) btn.scrollIntoView({ behavior: "instant", block: "center" });
      })()
    `);
    await new Promise(r => setTimeout(r, 400));
    await captureScreenshot(path.join(outputDir, "after_gallery_button.jpg"));
    console.log("Captured after_gallery_button.jpg");
  }

  // --- 3. Test Progressive Disclosure (+3 Click) ---
  console.log("\n3. Testing Discover More Progressive Disclosure (+3)...");
  const beforeCount = await evaluate(`document.querySelectorAll("div[aria-label^='Open photo:']").length`);
  console.log(`Initial visible photos: ${beforeCount}`);

  await evaluate(`
    (() => {
      const allButtons = Array.from(document.querySelectorAll("button"));
      const btn = allButtons.find(b => b.innerText.includes("Discover More Photographs"));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 600));

  const afterCount = await evaluate(`document.querySelectorAll("div[aria-label^='Open photo:']").length`);
  console.log(`Photos after click: ${afterCount} (expected: ${beforeCount + 3})`);

  const updatedLayout = await evaluate(`
    (() => {
      const gridContainer = document.querySelector(".max-w-7xl .grid.items-start");
      const columns = Array.from(gridContainer.children);
      return columns.map((col, idx) => ({
        index: idx,
        itemCount: col.querySelectorAll("div[aria-label^='Open photo:']").length,
        height: Math.round(col.getBoundingClientRect().height)
      }));
    })()
  `);
  console.log("Layout after +3 click:", JSON.stringify(updatedLayout, null, 2));

  // --- 4. Test Category Filtering ---
  console.log("\n4. Testing Category Filters...");
  const categories = ["architecture", "rooms", "weddings", "all"];
  for (const cat of categories) {
    const result = await evaluate(`
      (() => {
        const tabs = Array.from(document.querySelectorAll(".sticky button"));
        const targetTab = tabs.find(t => {
          const text = t.innerText.toLowerCase();
          if ("${cat}" === "all") return text.includes("all");
          if ("${cat}" === "architecture") return text.includes("architecture");
          if ("${cat}" === "rooms") return text.includes("rooms");
          if ("${cat}" === "weddings") return text.includes("weddings");
          return false;
        });
        if (targetTab) {
          targetTab.click();
          return { clicked: targetTab.innerText.replace(/\\s+/g, " ").trim() };
        }
        return { error: "Tab not found" };
      })()
    `);
    await new Promise(r => setTimeout(r, 500));
    const countInView = await evaluate(`document.querySelectorAll("div[aria-label^='Open photo:']").length`);
    console.log(`  Filtered to "${result.clicked || cat}": displaying ${countInView} photos`);
  }

  // --- 5. Test Lightbox Modal ---
  console.log("\n5. Testing Lightbox Modal...");
  await evaluate(`
    (() => {
      const firstTile = document.querySelector("div[aria-label^='Open photo:']");
      if (firstTile) firstTile.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 500));

  const lightboxState = await evaluate(`
    (() => {
      const modal = document.querySelector(".fixed.inset-0.z-50");
      if (!modal) return { open: false };
      const title = modal.querySelector("h2");
      const photoCounter = modal.querySelector(".font-mono.text-xs");
      const scoreBadge = modal.querySelector(".bg-brand-gold\\\\/20");
      return {
        open: true,
        title: title ? title.innerText : null,
        counter: photoCounter ? photoCounter.innerText : null,
        score: scoreBadge ? scoreBadge.innerText : null
      };
    })()
  `);
  console.log("Lightbox State:", JSON.stringify(lightboxState, null, 2));

  await evaluate(`
    (() => {
      const closeBtn = document.querySelector("button[aria-label='Close Lightbox']");
      if (closeBtn) closeBtn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 400));

  // --- 6. Tablet Viewport (768x1024) ---
  console.log("\n6. Testing Tablet Viewport (768x1024)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise(r => setTimeout(r, 1200));

  const tabletLayout = await evaluate(`
    (() => {
      const gridContainer = document.querySelector(".max-w-7xl .grid.items-start");
      const columns = gridContainer ? Array.from(gridContainer.children) : [];
      const colDetails = columns.map((col, idx) => ({
        index: idx,
        itemCount: col.querySelectorAll("div[aria-label^='Open photo:']").length,
        width: Math.round(col.getBoundingClientRect().width),
        height: Math.round(col.getBoundingClientRect().height)
      }));
      return {
        numColumns: columns.length,
        colDetails,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Tablet Layout:", JSON.stringify(tabletLayout, null, 2));

  await captureScreenshot(path.join(outputDir, "after_gallery_tablet.jpg"));
  console.log("Captured after_gallery_tablet.jpg");

  // --- 7. Mobile Viewport (390x844) ---
  console.log("\n7. Testing Mobile Viewport (390x844)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise(r => setTimeout(r, 1200));

  const mobileLayout = await evaluate(`
    (() => {
      const gridContainer = document.querySelector(".max-w-7xl .grid.items-start");
      const columns = gridContainer ? Array.from(gridContainer.children) : [];
      const colDetails = columns.map((col, idx) => ({
        index: idx,
        itemCount: col.querySelectorAll("div[aria-label^='Open photo:']").length,
        width: Math.round(col.getBoundingClientRect().width),
        height: Math.round(col.getBoundingClientRect().height)
      }));
      return {
        numColumns: columns.length,
        colDetails,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Mobile Layout:", JSON.stringify(mobileLayout, null, 2));

  await captureScreenshot(path.join(outputDir, "after_gallery_mobile.jpg"));
  console.log("Captured after_gallery_mobile.jpg");

  // Reset viewport
  await send("Emulation.clearDeviceMetricsOverride");
  ws.close();

  console.log("\n=== Phase 33 Verification Finished Successfully ===");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
