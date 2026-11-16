const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Phase 34: Room Count (50 Rooms) Verification via CDP ===");
  const outputDir = path.resolve(__dirname, "../.planning/phases/34-room-category-names");
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

  // --- 1. Test /about Hero Stat Cards on Desktop (1440x900) ---
  console.log("\n1. Testing /about Hero Stat Cards on Desktop (1440x900)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 1200));

  const statsDesktop = await evaluate(`
    (() => {
      const cards = Array.from(document.querySelectorAll(".grid.grid-cols-1 > div")).filter(d => {
        const text = d.innerText;
        return text.includes("Kanchan Ghat") || text.includes("50 Rooms") || text.includes("0% Pollution");
      });
      return cards.map(c => {
        const spans = Array.from(c.querySelectorAll("span"));
        const computed = window.getComputedStyle(c);
        return {
          title: spans[0] ? spans[0].innerText.trim() : null,
          subtitle: spans[1] ? spans[1].innerText.trim() : null,
          textAlign: computed.textAlign,
          borderRadius: computed.borderRadius
        };
      });
    })()
  `);
  console.log("About Hero Stat Cards (Desktop):", JSON.stringify(statsDesktop, null, 2));

  await captureScreenshot(path.join(outputDir, "after_about_hero_stats_desktop.jpg"));
  console.log("Captured after_about_hero_stats_desktop.jpg");

  // --- 2. Test /about Hero Stat Cards on Mobile (390x844) ---
  console.log("\n2. Testing /about Hero Stat Cards on Mobile (390x844)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 1200));

  const statsMobile = await evaluate(`
    (() => {
      const cards = Array.from(document.querySelectorAll(".grid.grid-cols-1 > div")).filter(d => {
        const text = d.innerText;
        return text.includes("Kanchan Ghat") || text.includes("50 Rooms") || text.includes("0% Pollution");
      });
      const scrollWidth = document.body.scrollWidth;
      const innerWidth = window.innerWidth;
      return {
        cards: cards.map(c => {
          const spans = Array.from(c.querySelectorAll("span"));
          return {
            title: spans[0] ? spans[0].innerText.trim() : null,
            subtitle: spans[1] ? spans[1].innerText.trim() : null
          };
        }),
        scrollWidth,
        innerWidth,
        overflow: scrollWidth > innerWidth
      };
    })()
  `);
  console.log("About Hero Stat Cards (Mobile):", JSON.stringify(statsMobile, null, 2));

  await captureScreenshot(path.join(outputDir, "after_about_hero_stats_mobile.jpg"));
  console.log("Captured after_about_hero_stats_mobile.jpg");

  // --- 3. Test Homepage Mention ---
  console.log("\n3. Testing Homepage Mention...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Page.navigate", { url: "http://localhost:3000/#rooms" });
  await new Promise(r => setTimeout(r, 1000));

  const homeLead = await evaluate(`
    (() => {
      const el = document.querySelector("#rooms .mt-1");
      return el ? el.innerText.trim() : null;
    })()
  `);
  console.log("Homepage #rooms lead text:", homeLead);

  // Reset viewport
  await send("Emulation.clearDeviceMetricsOverride");
  ws.close();

  console.log("\n=== Phase 34 Room Count Verification Finished Successfully ===");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
