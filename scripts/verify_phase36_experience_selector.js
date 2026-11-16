const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Phase 36: Resort Experience Selector Tabs Verification via CDP ===");
  const outputDir = path.resolve(__dirname, "../.planning/phases/36-experience-selector");
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
  console.log("\n1. Testing Experience Selector Tabs on Desktop (1440x900)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 1500));

  await evaluate(`
    (() => {
      const sec = document.getElementById("architecture");
      if (sec) sec.scrollIntoView({ block: "center", behavior: "instant" });
    })()
  `);
  await new Promise(r => setTimeout(r, 600));

  // Inspect initial tab list
  const initialTabs = await evaluate(`
    (() => {
      const sec = document.getElementById("architecture");
      const btns = Array.from(sec.querySelectorAll(".grid.grid-cols-2 > button"));
      return btns.map((b, i) => {
        const spans = Array.from(b.querySelectorAll("span"));
        return {
          index: i,
          label: spans[0] ? spans[0].innerText.trim() : null,
          tag: spans[1] ? spans[1].innerText.trim() : null,
          isActive: b.classList.contains("bg-brand-navy")
        };
      });
    })()
  `);
  console.log("Initial Tab Order:", JSON.stringify(initialTabs, null, 2));

  // Inspect each tab by clicking through tabs 0, 1, 2, 3
  const tabInspections = [];

  for (let idx = 0; idx < 4; idx++) {
    console.log(`\nClicking Tab ${idx}...`);
    await evaluate(`
      (() => {
        const sec = document.getElementById("architecture");
        const btns = Array.from(sec.querySelectorAll(".grid.grid-cols-2 > button"));
        if (btns[${idx}]) btns[${idx}].click();
      })()
    `);
    await new Promise(r => setTimeout(r, 500));

    const state = await evaluate(`
      (() => {
        const sec = document.getElementById("architecture");
        const btns = Array.from(sec.querySelectorAll(".grid.grid-cols-2 > button"));
        const activeBtn = btns[${idx}];
        const activeSpans = Array.from(activeBtn.querySelectorAll("span"));

        const img = sec.querySelector(".lg\\\\:col-span-7 img");
        const tag = sec.querySelector(".lg\\\\:col-span-5 span.rounded-full")?.innerText.trim();
        const title = sec.querySelector(".lg\\\\:col-span-5 h3")?.innerText.trim();
        const desc = sec.querySelector(".lg\\\\:col-span-5 p.leading-relaxed")?.innerText.trim();
        const features = Array.from(sec.querySelectorAll(".lg\\\\:col-span-5 .space-y-2 > div")).map(d => d.innerText.trim());
        const architectNote = sec.querySelector(".lg\\\\:col-span-5 .font-serif.italic")?.innerText.trim();

        return {
          tabIndex: ${idx},
          tabLabel: activeSpans[0] ? activeSpans[0].innerText.trim() : null,
          tabTag: activeSpans[1] ? activeSpans[1].innerText.trim() : null,
          isActiveButton: activeBtn.classList.contains("bg-brand-navy"),
          panelTitle: title,
          panelTag: tag,
          descriptionPreview: desc ? desc.substring(0, 60) + "..." : null,
          imageSrc: img ? img.getAttribute("src") : null,
          imageLoaded: img ? (img.complete && img.naturalWidth > 0) : false,
          imageNaturalWidth: img ? img.naturalWidth : 0,
          featuresCount: features.length,
          architectNotePreview: architectNote ? architectNote.substring(0, 50) + "..." : null
        };
      })()
    `);

    tabInspections.push(state);
    console.log(`Tab ${idx} Inspection:`, JSON.stringify(state, null, 2));

    await captureScreenshot(path.join(outputDir, `after_tab_${idx}_${state.tabLabel.toLowerCase().replace(/[^a-z0-9]/g, "_")}.jpg`));
  }

  // Check overflow on Desktop
  const desktopOverflow = await evaluate(`
    ({
      scrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
      overflow: document.body.scrollWidth > window.innerWidth
    })
  `);
  console.log("\nDesktop Overflow Check:", desktopOverflow);

  // --- 2. Mobile Verification (390x844) ---
  console.log("\n2. Testing on Mobile (390x844)...");
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
      const sec = document.getElementById("architecture");
      if (sec) sec.scrollIntoView({ block: "center", behavior: "instant" });
    })()
  `);
  await new Promise(r => setTimeout(r, 600));

  const mobileOverflow = await evaluate(`
    ({
      scrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
      overflow: document.body.scrollWidth > window.innerWidth
    })
  `);
  console.log("Mobile Overflow Check:", mobileOverflow);
  await captureScreenshot(path.join(outputDir, "after_experience_selector_mobile.jpg"));

  // Reset viewport
  await send("Emulation.clearDeviceMetricsOverride");
  ws.close();

  console.log("\n=== Phase 36 Verification Finished Successfully ===");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
