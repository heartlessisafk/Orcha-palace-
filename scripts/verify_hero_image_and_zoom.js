const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Verifying Homepage Hero Image Replacement & Scroll Zoom Animation ===");

  const outputDir = path.resolve(__dirname, "../.planning/phases/40-hero-image-zoom");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tabs = await (await fetch("http://127.0.0.1:9222/json")).json();
  let pageTab = tabs.find(t => t.type === "page");
  if (!pageTab) {
    const newTabRes = await fetch("http://127.0.0.1:9222/json/new?http://localhost:3000");
    pageTab = await newTabRes.json();
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
  await send("Runtime.enable");

  // Track console errors
  const consoleErrors = [];
  ws.addEventListener("message", evt => {
    try {
      const data = JSON.parse(evt.data);
      if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
        consoleErrors.push(data.params.args.map(a => a.value || a.description).join(" "));
      }
    } catch (_) {}
  });

  const viewports = [
    { name: "desktop_1440", width: 1440, height: 900, mobile: false },
    { name: "ipad_1024", width: 1024, height: 768, mobile: false },
    { name: "tablet_768", width: 768, height: 1024, mobile: true },
    { name: "mobile_390", width: 390, height: 844, mobile: true },
  ];

  const results = {
    viewports: {},
    consoleErrors: [],
  };

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);

    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.mobile,
    });

    await send("Page.navigate", { url: "http://localhost:3000" });
    await new Promise(r => setTimeout(r, 1500));

    // Measure at initial state (scrollY = 0)
    const initialData = await send("Runtime.evaluate", {
      expression: `(() => {
        const hero = document.getElementById("hero");
        if (!hero) return { error: "Hero section not found" };

        const img = hero.querySelector("img");
        const video = hero.querySelector("video");
        const poolImgInHero = !!hero.querySelector('img[src*="pool"]');
        const bgDiv = hero.querySelector(".absolute.inset-0.z-0");
        const motionWrapper = bgDiv ? bgDiv.firstElementChild : null;
        const transformInitial = motionWrapper ? window.getComputedStyle(motionWrapper).transform : null;

        // Parse scale from transform
        let scaleInitial = 1.0;
        if (transformInitial && transformInitial.includes("matrix")) {
          const parts = transformInitial.replace("matrix(", "").replace(")", "").split(",").map(s => parseFloat(s.trim()));
          scaleInitial = Math.round(Math.sqrt(parts[0] * parts[0] + parts[1] * parts[1]) * 1000) / 1000;
        }

        const h1 = hero.querySelector("h1");
        const kicker = hero.querySelector("span");
        const bookBtn = hero.querySelector("button");

        return {
          heroFound: true,
          imageSrc: img ? img.currentSrc || img.src : null,
          usesNewHeroImage: img ? (img.currentSrc || img.src).includes("hero-aerial-chhatris-river") : false,
          hasVideo: !!video,
          hasPoolImageInHero: poolImgInHero,
          scaleInitial,
          transformInitial,
          h1Text: h1 ? h1.textContent.trim() : null,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      })()`,
      returnByValue: true,
    });

    const initVal = initialData.result ? initialData.result.value : null;
    console.log("Initial state:", JSON.stringify(initVal, null, 2));

    // Capture initial screenshot
    const initScreenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
    fs.writeFileSync(path.join(outputDir, `hero_initial_${vp.name}.jpg`), Buffer.from(initScreenshot.data, "base64"));

    // Scroll through steps: 250px, 500px, 750px
    const scrollSteps = [250, 500, 750];
    const zoomProgress = [];

    for (const scrollY of scrollSteps) {
      await send("Runtime.evaluate", {
        expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' })`,
      });
      await new Promise(r => setTimeout(r, 200));

      const stepData = await send("Runtime.evaluate", {
        expression: `(() => {
          const hero = document.getElementById("hero");
          const bgDiv = hero ? hero.querySelector(".absolute.inset-0.z-0") : null;
          const motionWrapper = bgDiv ? bgDiv.firstElementChild : null;
          const transform = motionWrapper ? window.getComputedStyle(motionWrapper).transform : null;
          let scale = 1.0;
          if (transform && transform.includes("matrix")) {
            const parts = transform.replace("matrix(", "").replace(")", "").split(",").map(s => parseFloat(s.trim()));
            scale = Math.round(Math.sqrt(parts[0] * parts[0] + parts[1] * parts[1]) * 1000) / 1000;
          }
          return {
            scrollY: window.scrollY,
            transform,
            scale,
          };
        })()`,
        returnByValue: true,
      });

      const sVal = stepData.result ? stepData.result.value : null;
      zoomProgress.push(sVal);
      console.log(`Scrolled to ${scrollY}px -> Scale: ${sVal ? sVal.scale : "N/A"}`);
    }

    // Capture scrolled screenshot at 500px
    await send("Runtime.evaluate", { expression: "window.scrollTo({ top: 500, behavior: 'instant' })" });
    await new Promise(r => setTimeout(r, 200));
    const scrolledScreenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
    fs.writeFileSync(path.join(outputDir, `hero_scrolled_${vp.name}.jpg`), Buffer.from(scrolledScreenshot.data, "base64"));

    results.viewports[vp.name] = {
      initial: initVal,
      zoomProgress,
    };
  }

  results.consoleErrors = consoleErrors;
  fs.writeFileSync(path.join(outputDir, "verification_results.json"), JSON.stringify(results, null, 2));

  ws.close();
  console.log("\nVerification complete! Artifacts saved to .planning/phases/40-hero-image-zoom/");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
