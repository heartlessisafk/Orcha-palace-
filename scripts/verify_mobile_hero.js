const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Verifying Hero Without 'Scroll to Reserve' via Chrome DevTools Protocol ===");
  const artifactDir = "/Users/sam/.gemini/antigravity/brain/ebed3400-0ccc-4bed-94be-917fd27e626f";

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

  await send("Page.enable");
  await send("DOM.enable");
  await send("Runtime.enable");

  const viewports = [
    { name: "mobile_standard", width: 390, height: 844, isMobile: true },
    { name: "desktop", width: 1440, height: 900, isMobile: false },
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);

    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.isMobile,
    });

    await send("Page.navigate", { url: "http://127.0.0.1:3000" });
    await new Promise((r) => setTimeout(r, 1200));

    const evalResult = await send("Runtime.evaluate", {
      expression: `(() => {
        const bodyText = document.body.innerText;
        const hasScrollToReserveText = bodyText.toLowerCase().includes("scroll to reserve");
        
        const heroDesktop = document.getElementById("hero");
        const heroMobile = document.getElementById("hero-mobile");

        const desktopButtons = heroDesktop ? Array.from(heroDesktop.querySelectorAll("button, a")).map(el => el.innerText.trim()) : [];
        const mobileButtons = heroMobile ? Array.from(heroMobile.querySelectorAll("button, a")).map(el => el.innerText.trim()) : [];

        return {
          hasScrollToReserveText,
          desktopButtons,
          mobileButtons,
        };
      })()`,
      returnByValue: true,
    });

    const data = evalResult.result.value;
    console.log(`Contains 'Scroll to Reserve' Text: ${data.hasScrollToReserveText ? "FOUND (FAIL)" : "NONE (PASS)"}`);
    console.log(`Desktop Hero Buttons:`, data.desktopButtons);
    console.log(`Mobile Hero Buttons:`, data.mobileButtons);

    const screenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 85 });
    const imgPath = path.join(artifactDir, `verified_no_scroll_reserve_${vp.name}.jpg`);
    fs.writeFileSync(imgPath, Buffer.from(screenshot.data, "base64"));
    console.log(`Saved screenshot: ${imgPath}`);
  }

  ws.close();
  console.log("\n=== Verification Complete ===");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
