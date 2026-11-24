const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Verifying Mobile Hero Layout via Chrome DevTools Protocol ===");
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
    { name: "mobile_compact", width: 360, height: 780, isMobile: true },
    { name: "mobile_standard", width: 390, height: 844, isMobile: true },
    { name: "mobile_large", width: 414, height: 896, isMobile: true },
    { name: "tablet", width: 768, height: 1024, isMobile: false },
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
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        const hasHorizontalOverflow = scrollWidth > innerWidth;

        const mobileHero = document.getElementById("hero-mobile");
        const desktopHero = document.getElementById("hero");

        const isMobileHeroVisible = mobileHero ? (window.getComputedStyle(mobileHero).display !== "none") : false;
        const isDesktopHeroVisible = desktopHero ? (window.getComputedStyle(desktopHero).display !== "none") : false;

        let mobileDetails = null;
        if (isMobileHeroVisible && mobileHero) {
          const h1 = mobileHero.querySelector("h1");
          const img = mobileHero.querySelector("img");
          const button = mobileHero.querySelector("button");

          mobileDetails = {
            hasH1: !!h1,
            h1Text: h1 ? h1.innerText : "",
            hasImg: !!img,
            imgSrc: img ? img.src : "",
            imgDimensions: img ? { width: img.clientWidth, height: img.clientHeight } : null,
            hasButton: !!button,
            buttonText: button ? button.innerText : "",
          };
        }

        return {
          scrollWidth,
          innerWidth,
          hasHorizontalOverflow,
          isMobileHeroVisible,
          isDesktopHeroVisible,
          mobileDetails
        };
      })()`,
      returnByValue: true,
    });

    const data = evalResult.result.value;
    console.log(`Horizontal Overflow: ${data.hasHorizontalOverflow ? "FAIL" : "PASS"} (scrollWidth: ${data.scrollWidth}, innerWidth: ${data.innerWidth})`);
    console.log(`Mobile Hero Visible: ${data.isMobileHeroVisible}, Desktop Hero Visible: ${data.isDesktopHeroVisible}`);

    if (data.isMobileHeroVisible) {
      console.log(`Mobile Hero Sequence Verified:`);
      console.log(`  1. Tagline H1: "${data.mobileDetails?.h1Text}"`);
      console.log(`  2. Central Image: ${data.mobileDetails?.imgDimensions?.width}x${data.mobileDetails?.imgDimensions?.height}`);
      console.log(`  3. CTA Button: "${data.mobileDetails?.buttonText}"`);
    }

    // Capture screenshot for key viewports
    if (["mobile_standard", "tablet", "desktop"].includes(vp.name)) {
      const screenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 85 });
      const imgPath = path.join(artifactDir, `verified_hero_${vp.name}.jpg`);
      fs.writeFileSync(imgPath, Buffer.from(screenshot.data, "base64"));
      console.log(`Saved screenshot: ${imgPath}`);
    }

    // On mobile, test clicking Book Your Stay button
    if (vp.name === "mobile_standard") {
      console.log("\nTesting 'Book Your Stay' button scroll on mobile standard...");
      const clickResult = await send("Runtime.evaluate", {
        expression: `(() => {
          const mobileHero = document.getElementById("hero-mobile");
          const button = mobileHero?.querySelector("button");
          if (!button) return { clicked: false, error: "Button not found" };
          const initialY = window.scrollY;
          button.click();
          return { clicked: true, initialY };
        })()`,
        returnByValue: true,
      });

      await new Promise((r) => setTimeout(r, 800));

      const afterScroll = await send("Runtime.evaluate", {
        expression: `(() => {
          const bookingSequence = document.getElementById("booking-sequence");
          const rect = bookingSequence ? bookingSequence.getBoundingClientRect() : null;
          return {
            scrollY: window.scrollY,
            bookingTop: rect ? rect.top : null,
          };
        })()`,
        returnByValue: true,
      });

      console.log(`Initial Scroll: ${clickResult.result.value.initialY}, After Click Scroll: ${afterScroll.result.value.scrollY}`);
      console.log(`Booking Sequence Rect Top: ${afterScroll.result.value.bookingTop}px`);
    }
  }

  ws.close();
  console.log("\n=== Verification Complete ===");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
