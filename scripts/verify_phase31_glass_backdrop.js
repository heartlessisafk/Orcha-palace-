const fs = require("fs");
const path = require("path");

const VIEWPORTS = [
  { name: "desktop_1440", width: 1440, height: 900, isMobile: false },
  { name: "tablet_768", width: 768, height: 1024, isMobile: false },
  { name: "mobile_390", width: 390, height: 844, isMobile: true },
];

async function runVerification() {
  console.log("=== PHASE 31: ABOUT HERO FULL CONTENT GLASS BACKDROP VERIFICATION ===");
  const tabs = await (await fetch("http://127.0.0.1:9222/json")).json();
  const pageTab = tabs.find((t) => t.type === "page");
  if (!pageTab) {
    console.error("No active page tab found at port 9222");
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

  const outDir = path.join(process.cwd(), ".planning", "phases", "31-hero-glass-backdrop");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})...`);

    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.isMobile,
    });

    await send("Page.navigate", { url: "http://localhost:3000/about" });
    await new Promise((r) => setTimeout(r, 1500));

    // Scroll to top
    await send("Runtime.evaluate", {
      expression: "window.scrollTo(0, 0)",
    });
    await new Promise((r) => setTimeout(r, 400));

    // Measure geometry & overflow
    const evalResult = await send("Runtime.evaluate", {
      expression: `(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasOverflow = docWidth > winWidth;
        
        // Find glass panel
        const heading = document.querySelector('h1');
        const glassPanel = heading ? heading.closest('.rounded-3xl') : null;
        
        let glassRect = null;
        let glassComputed = null;
        if (glassPanel) {
          const r = glassPanel.getBoundingClientRect();
          const s = window.getComputedStyle(glassPanel);
          glassRect = { x: r.x, y: r.y, width: r.width, height: r.height };
          glassComputed = {
            backdropFilter: s.backdropFilter,
            backgroundColor: s.backgroundColor,
            borderRadius: s.borderRadius,
            boxShadow: s.boxShadow,
            border: s.border
          };
        }

        // Verify elements inside panel
        const eyebrow = glassPanel ? glassPanel.querySelector('span') : null;
        const subtitle = glassPanel ? glassPanel.querySelector('p') : null;
        const statCards = glassPanel ? glassPanel.querySelectorAll('.grid > div') : [];
        const buttons = glassPanel ? glassPanel.querySelectorAll('button') : [];
        
        return {
          viewport: { width: winWidth, docWidth, hasOverflow },
          glassFound: !!glassPanel,
          glassRect,
          glassComputed,
          elementsInside: {
            hasEyebrow: !!eyebrow,
            hasHeading: !!heading,
            hasSubtitle: !!subtitle,
            statCardsCount: statCards.length,
            buttonsCount: buttons.length
          }
        };
      })()`,
      returnByValue: true,
    });

    const info = evalResult.result.value;
    console.log(`Viewport check: hasOverflow=${info.viewport.hasOverflow} (docWidth: ${info.viewport.docWidth}, winWidth: ${info.viewport.width})`);
    console.log(`Glass panel found: ${info.glassFound}, dimensions: ${info.glassRect ? Math.round(info.glassRect.width) + 'x' + Math.round(info.glassRect.height) : 'none'}`);
    console.log(`Elements inside: statCards=${info.elementsInside.statCardsCount}, buttons=${info.elementsInside.buttonsCount}`);

    // Capture screenshot
    const shot = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 92,
    });

    const filename = `after_phase31_about_${vp.name}.jpg`;
    const filePath = path.join(outDir, filename);
    fs.writeFileSync(filePath, Buffer.from(shot.data, "base64"));
    console.log(`Saved screenshot: ${filePath}`);

    results.push({
      viewport: vp.name,
      ...info,
      screenshot: filePath,
    });
  }

  ws.close();
  console.log("\nAll viewport tests completed!");
  return results;
}

runVerification().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
