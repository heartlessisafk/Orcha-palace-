const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Verifying Footer Logo Correction via Chrome DevTools Protocol ===");
  const outputDir = path.resolve(__dirname, "../.planning/phases/39-footer-logo-correction");
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
  await send("Runtime.enable");

  const viewports = [
    { name: "desktop_1440", width: 1440, height: 900 },
    { name: "ipad_1024", width: 1024, height: 768 },
    { name: "tablet_768", width: 768, height: 1024 },
    { name: "mobile_390", width: 390, height: 844 },
    { name: "mobile_320", width: 320, height: 568 },
  ];

  const results = {};

  for (const vp of viewports) {
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.width < 768,
    });

    await send("Page.navigate", { url: "http://localhost:3000" });
    await new Promise(r => setTimeout(r, 1200));

    // Scroll to footer
    await send("Runtime.evaluate", {
      expression: `(() => {
        const footer = document.querySelector("footer.bg-brand-navy");
        if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
        else window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
      })()`
    });
    await new Promise(r => setTimeout(r, 400));

    const evalData = await send("Runtime.evaluate", {
      expression: `(() => {
        const footer = document.querySelector("footer.bg-brand-navy");
        if (!footer) return { error: "No site footer found" };

        const col1 = footer.querySelector(".grid > div:first-child");
        if (!col1) return { error: "No col1 found" };
        const logoLink = col1.querySelector("a");
        const logoSpan = logoLink ? logoLink.querySelector("span") : null;
        const brandH4 = col1.querySelector("h4");
        const taglineP = col1.querySelector("p");

        const logoStyles = logoSpan ? window.getComputedStyle(logoSpan) : null;
        const linkStyles = logoLink ? window.getComputedStyle(logoLink) : null;
        const maskImg = logoStyles ? (logoStyles.webkitMaskImage || logoStyles.maskImage) : "";

        const clientWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;

        const getBox = el => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
          };
        };

        return {
          overflow: scrollWidth > clientWidth,
          logoFound: !!logoLink,
          maskImage: maskImg,
          usesOfficialLogoMask: maskImg.includes("orchha-logo.png"),
          containerBackground: linkStyles ? linkStyles.backgroundColor : null,
          brandH4Text: brandH4 ? brandH4.textContent.trim() : null,
          taglineText: taglineP ? taglineP.textContent.trim() : null,
          boxes: {
            logoContainer: getBox(logoLink),
            logoSpan: getBox(logoSpan),
            brandH4: getBox(brandH4),
            tagline: getBox(taglineP),
            col1: getBox(col1),
          }
        };
      })()`,
      returnByValue: true
    });

    results[vp.name] = evalData.result ? evalData.result.value : null;
    console.log(JSON.stringify(results[vp.name], null, 2));

    const screenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
    fs.writeFileSync(
      path.join(outputDir, `footer_${vp.name}.jpg`),
      Buffer.from(screenshot.data, "base64")
    );
  }

  // Also verify interactive hover state on desktop
  console.log("\nTesting Hover State on Desktop (1440x900)...");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise(r => setTimeout(r, 1000));
  await send("Runtime.evaluate", {
    expression: `(() => {
      const footer = document.querySelector("footer.bg-brand-navy");
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
      else window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 300));

  // Hover over the footer logo
  const box = results.desktop_1440 && results.desktop_1440.boxes ? results.desktop_1440.boxes.logoContainer : null;
  if (box) {
    await send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    });
    await new Promise(r => setTimeout(r, 350));
  }

  const hoverData = await send("Runtime.evaluate", {
    expression: `(() => {
      const logoLink = document.querySelector("footer.bg-brand-navy .grid > div:first-child a");
      const span = logoLink ? logoLink.querySelector("span") : null;
      const linkStyle = logoLink ? window.getComputedStyle(logoLink) : null;
      const spanStyle = span ? window.getComputedStyle(span) : null;
      return {
        bgOnHover: linkStyle ? linkStyle.backgroundColor : null,
        logoColorOnHover: spanStyle ? spanStyle.backgroundColor : null,
      };
    })()`,
    returnByValue: true
  });
  results.hoverState = hoverData.result.value;
  console.log("Hover state data:", results.hoverState);

  const hoverShot = await send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
  fs.writeFileSync(path.join(outputDir, "footer_desktop_hover.jpg"), Buffer.from(hoverShot.data, "base64"));

  fs.writeFileSync(path.join(outputDir, "verification_results.json"), JSON.stringify(results, null, 2));

  ws.close();
  console.log("\nVerification complete! Artifacts written to .planning/phases/39-footer-logo-correction/");
}

run().catch(console.error);
