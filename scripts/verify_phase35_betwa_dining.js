const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Phase 35: Betwa View Dining Experience Card Verification via CDP ===");
  const outputDir = path.resolve(__dirname, "../.planning/phases/35-betwa-view-dining");
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

  // -------------------------------------------------------------
  // 1. Desktop Verification (1440x900)
  // -------------------------------------------------------------
  console.log("\n1. Testing 'Hospitality, Dining & Rejuvenation' on Desktop (1440x900)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll section into view
  await evaluate(`
    (() => {
      const sec = document.getElementById("hospitality");
      if (sec) sec.scrollIntoView({ block: "center", behavior: "instant" });
    })()
  `);
  await new Promise(r => setTimeout(r, 600));

  const desktopData = await evaluate(`
    (() => {
      const section = document.getElementById("hospitality");
      if (!section) return { error: "Section #hospitality not found" };

      const heading = section.querySelector("h2")?.innerText.trim();
      const lead = section.querySelector("p.font-serif")?.innerText.trim();
      const cards = Array.from(section.querySelectorAll(".grid > div > div.bg-white")).map(card => {
        const title = card.querySelector(".font-serif.text-lg, .font-serif.text-xl")?.innerText.trim();
        const eyebrow = card.querySelector(".text-brand-gold-dark span")?.innerText.trim();
        const description = card.querySelector("p.leading-relaxed")?.innerText.trim();
        const img = card.querySelector("img");
        const features = Array.from(card.querySelectorAll(".space-y-1\\.5 > div")).map(d => d.innerText.trim());
        const cta = card.querySelector("a")?.innerText.trim();
        const badge = card.querySelector(".backdrop-blur-md")?.innerText.trim();
        const rect = card.getBoundingClientRect();

        return {
          title,
          eyebrow,
          descriptionPreview: description ? description.substring(0, 60) + "..." : null,
          imageSrc: img ? img.getAttribute("src") : null,
          imageLoaded: img ? (img.complete && img.naturalWidth > 0) : false,
          imageNaturalWidth: img ? img.naturalWidth : 0,
          badge,
          featuresCount: features.length,
          features,
          cta,
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      });

      return {
        heading,
        lead,
        cardCount: cards.length,
        cards,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);

  console.log("Desktop Section Inspection:", JSON.stringify(desktopData, null, 2));
  await captureScreenshot(path.join(outputDir, "after_hospitality_dining_desktop.jpg"));
  console.log("Captured after_hospitality_dining_desktop.jpg");

  // -------------------------------------------------------------
  // 2. Tablet Verification (768x1024)
  // -------------------------------------------------------------
  console.log("\n2. Testing on Tablet (768x1024)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 1500));

  await evaluate(`
    (() => {
      const sec = document.getElementById("hospitality");
      if (sec) sec.scrollIntoView({ block: "center", behavior: "instant" });
    })()
  `);
  await new Promise(r => setTimeout(r, 600));

  const tabletData = await evaluate(`
    (() => {
      const section = document.getElementById("hospitality");
      const cards = Array.from(section.querySelectorAll(".grid > div > div.bg-white")).map(c => {
        const title = c.querySelector(".font-serif.text-lg, .font-serif.text-xl")?.innerText.trim();
        const rect = c.getBoundingClientRect();
        return { title, width: Math.round(rect.width), height: Math.round(rect.height) };
      });
      return {
        cardCount: cards.length,
        cards,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Tablet Inspection:", JSON.stringify(tabletData, null, 2));
  await captureScreenshot(path.join(outputDir, "after_hospitality_dining_tablet.jpg"));
  console.log("Captured after_hospitality_dining_tablet.jpg");

  // -------------------------------------------------------------
  // 3. Mobile Verification (390x844)
  // -------------------------------------------------------------
  console.log("\n3. Testing on Mobile (390x844)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 1500));

  await evaluate(`
    (() => {
      const sec = document.getElementById("hospitality");
      if (sec) sec.scrollIntoView({ block: "center", behavior: "instant" });
    })()
  `);
  await new Promise(r => setTimeout(r, 600));

  const mobileData = await evaluate(`
    (() => {
      const section = document.getElementById("hospitality");
      const cards = Array.from(section.querySelectorAll(".grid > div > div.bg-white")).map(c => {
        const title = c.querySelector(".font-serif.text-lg, .font-serif.text-xl")?.innerText.trim();
        const rect = c.getBoundingClientRect();
        return { title, width: Math.round(rect.width), height: Math.round(rect.height) };
      });
      return {
        cardCount: cards.length,
        cards,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Mobile Inspection:", JSON.stringify(mobileData, null, 2));
  await captureScreenshot(path.join(outputDir, "after_hospitality_dining_mobile.jpg"));
  console.log("Captured after_hospitality_dining_mobile.jpg");

  // Reset viewport
  await send("Emulation.clearDeviceMetricsOverride");
  ws.close();

  console.log("\n=== Phase 35 Verification Completed Successfully ===");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
