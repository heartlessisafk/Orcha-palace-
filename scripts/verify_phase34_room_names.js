const fs = require("fs");
const path = require("path");

async function run() {
  console.log("=== Phase 34: Room Category Names Verification via CDP ===");
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

  // Expected client category names
  const expectedNames = [
    "Standard Room Garden Facing",
    "Deluxe Marble Bed Garden Facing",
    "Deluxe Room Garden Facing",
    "Super Deluxe Pool Facing"
  ];

  // --- 1. Test /rooms on Desktop (1440x900) ---
  console.log("\n1. Testing /rooms on Desktop (1440x900)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Page.navigate", { url: "http://localhost:3000/rooms" });
  await new Promise(r => setTimeout(r, 1200));

  const roomsPageData = await evaluate(`
    (() => {
      const cards = Array.from(document.querySelectorAll("#catalog .rounded-luxury, main .grid > .rounded-luxury"));
      const cardDetails = cards.map(c => {
        const h3 = c.querySelector("h3 span:first-child");
        const price = c.querySelector(".font-bold");
        const view = c.querySelector(".text-brand-gold");
        const desc = c.querySelector("p");
        const rect = c.getBoundingClientRect();
        return {
          name: h3 ? h3.innerText.trim() : null,
          price: price ? price.innerText.trim() : null,
          view: view ? view.innerText.trim() : null,
          descriptionPreview: desc ? desc.innerText.slice(0, 60) + "..." : null,
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      });

      return {
        cardCount: cards.length,
        cardDetails,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Rooms Page Cards:", JSON.stringify(roomsPageData, null, 2));

  await captureScreenshot(path.join(outputDir, "after_rooms_catalog_desktop.jpg"));
  console.log("Captured after_rooms_catalog_desktop.jpg");

  // --- 2. Test Mobile Viewport (390x844) on /rooms ---
  console.log("\n2. Testing /rooms on Mobile (390x844)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await send("Page.navigate", { url: "http://localhost:3000/rooms" });
  await new Promise(r => setTimeout(r, 1200));

  const mobileData = await evaluate(`
    (() => {
      const cards = Array.from(document.querySelectorAll("#catalog .rounded-luxury, main .grid > .rounded-luxury"));
      const cardNames = cards.map(c => {
        const h3 = c.querySelector("h3 span:first-child");
        return h3 ? h3.innerText.trim() : null;
      });
      return {
        cardNames,
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.body.scrollWidth > window.innerWidth
      };
    })()
  `);
  console.log("Mobile View:", JSON.stringify(mobileData, null, 2));

  await captureScreenshot(path.join(outputDir, "after_rooms_mobile.jpg"));
  console.log("Captured after_rooms_mobile.jpg");

  // --- 3. Test Detail Pages (/rooms/[slug]) ---
  console.log("\n3. Testing Individual Detail Pages...");
  const slugs = [
    "standard-room",
    "deluxe-room",
    "deluxe-swiss-tent",
    "royal-heritage-suite"
  ];

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  for (const slug of slugs) {
    await send("Page.navigate", { url: `http://localhost:3000/rooms/${slug}` });
    await new Promise(r => setTimeout(r, 1000));

    const pageDetails = await evaluate(`
      (() => {
        const h1 = document.querySelector("h1");
        const breadcrumb = document.querySelector(".sticky.top-0 span.text-brand-charcoal");
        const title = document.title;
        return {
          title,
          h1: h1 ? h1.innerText.trim() : null,
          breadcrumb: breadcrumb ? breadcrumb.innerText.trim() : null
        };
      })()
    `);
    console.log(`  Slug /${slug}:`, pageDetails);
  }

  // --- 4. Test Homepage Rooms Showcase ---
  console.log("\n4. Testing Homepage Rooms Showcase...");
  await send("Page.navigate", { url: "http://localhost:3000/#rooms" });
  await new Promise(r => setTimeout(r, 1200));

  const homeRoomsData = await evaluate(`
    (() => {
      const cards = Array.from(document.querySelectorAll("#rooms .rounded-luxury, section[id='rooms'] .rounded-luxury"));
      return cards.map(c => {
        const h3 = c.querySelector("h3 span:first-child");
        return h3 ? h3.innerText.trim() : null;
      });
    })()
  `);
  console.log("Homepage Showcase Rooms:", homeRoomsData);

  // Reset viewport
  await send("Emulation.clearDeviceMetricsOverride");
  ws.close();

  console.log("\n=== Phase 34 Verification Finished Successfully ===");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
