const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Phase 37: Spa Page Branding & Logo Verification via CDP ===");
  const outputDir = path.resolve(__dirname, "../.planning/phases/37-spa-branding");
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

  // --- 1. Desktop Verification (1440x900) ---
  console.log("\n1. Testing Spa Header & Branding on Desktop (1440x900)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Page.navigate", { url: "http://localhost:3000/spa" });
  await new Promise(r => setTimeout(r, 1500));

  const desktopInspection = await evaluate(`
    (() => {
      const header = document.querySelector("header");
      const title = document.title;
      const logoLink = header ? header.querySelector("a[aria-label*='Orchha Resort']") : null;
      const logoSpan = logoLink ? logoLink.querySelector("span[style*='mask-image']") : null;
      const computedLogo = logoSpan ? window.getComputedStyle(logoSpan) : null;
      const spaBadge = header ? header.querySelector("a[href='/spa'] span")?.innerText.trim() : null;
      const heroTag = document.querySelector("section .bg-brand-beige.rounded-full")?.innerText.trim();
      const heroEmblem = document.querySelector("section .bg-brand-beige.rounded-full img")?.getAttribute("src");
      const pageText = document.body.innerText;
      const palaceOccurrences = (pageText.match(/Orchha Palace Hotel/gi) || []).length;

      return {
        documentTitle: title,
        hasOfficialLogoLink: !!logoLink,
        logoSpanStyles: {
          maskImage: computedLogo ? computedLogo.webkitMaskImage || computedLogo.maskImage : null,
          width: computedLogo ? computedLogo.width : null,
          height: computedLogo ? computedLogo.height : null,
          backgroundColor: computedLogo ? computedLogo.backgroundColor : null
        },
        spaBadgeText: spaBadge,
        heroHeritageTag: heroTag,
        heroEmblemSrc: heroEmblem,
        palaceOccurrencesOnPage: palaceOccurrences,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);

  console.log("Desktop Inspection:", JSON.stringify(desktopInspection, null, 2));
  await captureScreenshot(path.join(outputDir, "after_spa_header_desktop.jpg"));
  console.log("Captured after_spa_header_desktop.jpg");

  // --- 2. Mobile Verification (390x844) ---
  console.log("\n2. Testing on Mobile (390x844)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/spa" });
  await new Promise(r => setTimeout(r, 1500));

  const mobileInspection = await evaluate(`
    (() => {
      const header = document.querySelector("header");
      const logoLink = header ? header.querySelector("a[aria-label*='Orchha Resort']") : null;
      const rect = logoLink ? logoLink.getBoundingClientRect() : null;

      return {
        logoRect: rect ? { width: Math.round(rect.width), height: Math.round(rect.height) } : null,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);

  console.log("Mobile Inspection:", JSON.stringify(mobileInspection, null, 2));
  await captureScreenshot(path.join(outputDir, "after_spa_header_mobile.jpg"));
  console.log("Captured after_spa_header_mobile.jpg");

  // --- 3. Narrow Mobile Verification (320x568) ---
  console.log("\n3. Testing on Narrow Mobile (320x568)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 320,
    height: 568,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/spa" });
  await new Promise(r => setTimeout(r, 1200));

  const narrowInspection = await evaluate(`
    (() => {
      return {
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Narrow 320px Inspection:", JSON.stringify(narrowInspection, null, 2));

  // Reset viewport
  await send("Emulation.clearDeviceMetricsOverride");
  ws.close();

  console.log("\n=== Phase 37 Verification Completed Successfully ===");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
