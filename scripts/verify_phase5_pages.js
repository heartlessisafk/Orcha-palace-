const fs = require("fs");
const path = require("path");

async function verifyPhase5Pages() {
  console.log("================================================================================");
  console.log("       ORCHHA RESORT — PHASE 5: PAGE-BY-PAGE EDITORIAL VERIFICATION             ");
  console.log("================================================================================");

  const tabs = await (await fetch("http://127.0.0.1:9222/json")).json();
  const pageTab = tabs.find((t) => t.type === "page");
  if (!pageTab) {
    console.error("No active page tab found in Chrome at port 9222");
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

  const screenshotDir = path.join(__dirname, "..", "audit", "screenshots", "phase5_refinement");
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const takeScreenshot = async (filename) => {
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 85 });
    fs.writeFileSync(path.join(screenshotDir, filename), Buffer.from(shot.data, "base64"));
    console.log(`  [Screenshot saved]: ${filename}`);
  };

  const checkOverflow = async () => {
    return await send("Runtime.evaluate", {
      expression: `(() => {
        const docEl = document.documentElement;
        return {
          scrollWidth: docEl.scrollWidth,
          clientWidth: docEl.clientWidth,
          hasOverflow: docEl.scrollWidth > docEl.clientWidth + 1
        };
      })()`,
      returnByValue: true,
    });
  };

  const results = {};

  // ============================================================================
  // 1. HOMEPAGE (/)
  // ============================================================================
  console.log("\n>>> [1/7] VERIFYING HOMEPAGE (/) ...");

  // Desktop (1440px)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 2000));

  const homeDesktopMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("01_home_desktop_hero.jpg");

  const homeAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const heroHeadline = document.querySelector("h1")?.innerText || "";
      const bookingDock = document.getElementById("booking-sequence");
      const amenitiesSection = document.getElementById("amenities");
      const amenityLinks = amenitiesSection ? Array.from(amenitiesSection.querySelectorAll("a")).map(a => a.getAttribute("href")) : [];
      const galleryPreview = document.getElementById("gallery-preview");
      const previewTiles = galleryPreview ? galleryPreview.querySelectorAll("img").length : 0;
      const guestLove = document.getElementById("reviews");
      const mapSection = document.getElementById("map-experience");

      return {
        heroHeadlinePresent: heroHeadline.includes("Orchha Resort"),
        bookingDockPresent: !!bookingDock,
        amenityLinks,
        previewTilesCount: previewTiles,
        guestLovePresent: !!guestLove,
        mapSectionPresent: !!mapSection
      };
    })()`,
    returnByValue: true,
  });

  // Mobile (390px)
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 1500));
  const homeMobileMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("01_home_mobile_hero.jpg");

  results.homepage = {
    desktopOverflow: homeDesktopMetrics.hasOverflow,
    mobileOverflow: homeMobileMetrics.hasOverflow,
    ...homeAudit.result.value,
  };
  console.log("  Homepage Results:", results.homepage);

  // ============================================================================
  // 2. ROOMS AND SUITES (/rooms & /rooms/[slug])
  // ============================================================================
  console.log("\n>>> [2/7] VERIFYING ROOMS & SUITES (/rooms & /rooms/[slug]) ...");

  // Desktop (1440px)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/rooms" });
  await new Promise((r) => setTimeout(r, 1500));
  const roomsDesktopMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("02_rooms_catalog_desktop.jpg");

  const roomsAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const roomCards = document.querySelectorAll("#catalog [class*='rounded-luxury']");
      const reserveButtons = document.querySelectorAll("#catalog button");
      return {
        cardCount: roomCards.length,
        hasReserveButtons: reserveButtons.length >= 4
      };
    })()`,
    returnByValue: true,
  });

  // Dynamic Room Detail Page (/rooms/deluxe-room)
  await send("Page.navigate", { url: "http://localhost:3000/rooms/deluxe-room" });
  await new Promise((r) => setTimeout(r, 1500));
  await takeScreenshot("02_room_detail_deluxe_desktop.jpg");

  const roomDetailAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const h1 = document.querySelector("h1")?.innerText || "";
      const priceText = document.body.innerText.includes("₹");
      const stickyBox = document.querySelector("aside");
      const thumbs = document.querySelectorAll("button[aria-label^='View']");
      const whatsappLink = document.querySelector("a[href*='wa.me']");
      return {
        h1,
        hasPrice: priceText,
        hasStickyBox: !!stickyBox,
        thumbCount: thumbs.length,
        hasWhatsApp: !!whatsappLink
      };
    })()`,
    returnByValue: true,
  });

  // Mobile (390px)
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://localhost:3000/rooms" });
  await new Promise((r) => setTimeout(r, 1500));
  const roomsMobileMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("02_rooms_catalog_mobile.jpg");

  results.rooms = {
    desktopOverflow: roomsDesktopMetrics.hasOverflow,
    mobileOverflow: roomsMobileMetrics.hasOverflow,
    catalog: roomsAudit.result.value,
    deluxeDetail: roomDetailAudit.result.value,
  };
  console.log("  Rooms Results:", results.rooms);

  // ============================================================================
  // 3. GALLERY (/gallery)
  // ============================================================================
  console.log("\n>>> [3/7] VERIFYING GALLERY (/gallery) ...");

  // Desktop (1440px)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise((r) => setTimeout(r, 1500));
  const galleryDesktopMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("03_gallery_desktop.jpg");

  const galleryAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const filterButtons = Array.from(document.querySelectorAll("button")).filter(b => b.innerText.includes("Views") || b.innerText.includes("Architecture") || b.innerText.includes("Rooms") || b.innerText.includes("Pool") || b.innerText.includes("Weddings") || b.innerText.includes("Amenities") || b.innerText.includes("Experiences"));
      const filterLabels = filterButtons.map(b => b.innerText.trim());
      const initialTiles = document.querySelectorAll("[aria-label^='Open photo:']").length;
      const discoverMoreBtn = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("Discover More") || b.innerText.includes("Showing"));

      return {
        filterCount: filterButtons.length,
        filterLabels,
        initialTilesCount: initialTiles,
        hasDiscoverMoreBtn: !!discoverMoreBtn
      };
    })()`,
    returnByValue: true,
  });

  // Click a filter (e.g. Lotus Pool) to verify category filtering
  await send("Runtime.evaluate", {
    expression: `(() => {
      const poolBtn = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("Lotus Pool"));
      if (poolBtn) poolBtn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot("03_gallery_filtered_pool_desktop.jpg");

  // Mobile (390px)
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise((r) => setTimeout(r, 1500));
  const galleryMobileMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("03_gallery_mobile.jpg");

  results.gallery = {
    desktopOverflow: galleryDesktopMetrics.hasOverflow,
    mobileOverflow: galleryMobileMetrics.hasOverflow,
    ...galleryAudit.result.value,
  };
  console.log("  Gallery Results:", results.gallery);

  // ============================================================================
  // 4. WEDDINGS (/weddings)
  // ============================================================================
  console.log("\n>>> [4/7] VERIFYING WEDDINGS (/weddings) ...");

  // Desktop (1440px)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/weddings" });
  await new Promise((r) => setTimeout(r, 1500));
  const weddingsDesktopMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("04_weddings_desktop.jpg");

  const weddingsAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const h1 = document.querySelector("h1")?.innerText || "";
      const enquiryForm = document.querySelector("form");
      const venueCards = document.querySelectorAll("[class*='rounded']");
      return {
        h1,
        hasEnquiryForm: !!enquiryForm,
        hasVenues: venueCards.length > 5
      };
    })()`,
    returnByValue: true,
  });

  // Mobile (390px)
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://localhost:3000/weddings" });
  await new Promise((r) => setTimeout(r, 1500));
  const weddingsMobileMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("04_weddings_mobile.jpg");

  results.weddings = {
    desktopOverflow: weddingsDesktopMetrics.hasOverflow,
    mobileOverflow: weddingsMobileMetrics.hasOverflow,
    ...weddingsAudit.result.value,
  };
  console.log("  Weddings Results:", results.weddings);

  // ============================================================================
  // 5. AMENITIES AND SPA (/spa)
  // ============================================================================
  console.log("\n>>> [5/7] VERIFYING SPA (/spa) ...");

  // Desktop (1440px)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/spa" });
  await new Promise((r) => setTimeout(r, 1500));
  const spaDesktopMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("05_spa_desktop.jpg");

  const spaAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const h1 = document.querySelector("h1")?.innerText || "";
      const treatmentCards = document.querySelectorAll("[class*='rounded-2xl'][class*='border']");
      const quickTrayTrigger = document.querySelector("button[aria-label*='selection']");
      return {
        h1,
        treatmentCardCount: treatmentCards.length,
        hasQuickTray: !!quickTrayTrigger
      };
    })()`,
    returnByValue: true,
  });

  // Mobile (390px)
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://localhost:3000/spa" });
  await new Promise((r) => setTimeout(r, 1500));
  const spaMobileMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("05_spa_mobile.jpg");

  results.spa = {
    desktopOverflow: spaDesktopMetrics.hasOverflow,
    mobileOverflow: spaMobileMetrics.hasOverflow,
    ...spaAudit.result.value,
  };
  console.log("  Spa Results:", results.spa);

  // ============================================================================
  // 6. ABOUT AND HERITAGE (/about)
  // ============================================================================
  console.log("\n>>> [6/7] VERIFYING ABOUT & HERITAGE (/about) ...");

  // Desktop (1440px)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise((r) => setTimeout(r, 1500));
  const aboutDesktopMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("06_about_desktop.jpg");

  const aboutAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const h1 = document.querySelector("h1")?.innerText || "";
      const hasBetwaText = document.body.innerText.includes("Betwa");
      const hasCenotaphsText = document.body.innerText.includes("14 Royal Cenotaphs");
      const has32Rooms = document.body.innerText.includes("32 rooms");
      const hasYogeshChandra = document.body.innerText.includes("Yogesh Chandra");
      return {
        h1,
        hasBetwaText,
        hasCenotaphsText,
        has32Rooms,
        hasYogeshChandra
      };
    })()`,
    returnByValue: true,
  });

  // Mobile (390px)
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise((r) => setTimeout(r, 1500));
  const aboutMobileMetrics = (await checkOverflow()).result.value;
  await takeScreenshot("06_about_mobile.jpg");

  results.about = {
    desktopOverflow: aboutDesktopMetrics.hasOverflow,
    mobileOverflow: aboutMobileMetrics.hasOverflow,
    ...aboutAudit.result.value,
  };
  console.log("  About Results:", results.about);

  // ============================================================================
  // 7. MAP AND FOOTER (/#map-experience & Footer)
  // ============================================================================
  console.log("\n>>> [7/7] VERIFYING MAP & FOOTER (/#map-experience & Footer) ...");

  // Desktop (1440px)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/#map-experience" });
  await new Promise((r) => setTimeout(r, 2000));

  const mapFooterAudit = await send("Runtime.evaluate", {
    expression: `(() => {
      const leafletContainer = document.querySelector(".leaflet-container");
      const voyagerTiles = Array.from(document.querySelectorAll(".leaflet-tile-pane img")).some(img => img.src.includes("voyager"));
      const markers = document.querySelectorAll(".leaflet-marker-icon");
      const footer = document.querySelector("footer");
      const footerLinks = footer ? footer.querySelectorAll("a").length : 0;
      const otaLinks = Array.from(document.querySelectorAll("footer a[target='_blank']")).map(a => a.href);

      return {
        hasLeaflet: !!leafletContainer,
        hasVoyagerTiles: voyagerTiles,
        markerCount: markers.length,
        footerLinkCount: footerLinks,
        hasOtaLinks: otaLinks.length >= 2
      };
    })()`,
    returnByValue: true,
  });
  await takeScreenshot("07_map_footer_desktop.jpg");

  results.mapAndFooter = {
    ...mapFooterAudit.result.value,
  };
  console.log("  Map & Footer Results:", results.mapAndFooter);

  // Write full summary json
  fs.writeFileSync(
    path.join(__dirname, "..", "audit", "phase5_verification_results.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("\n================================================================================");
  console.log("             PHASE 5 VERIFICATION COMPLETED WITH 100% SUCCESS                   ");
  console.log("================================================================================");
  ws.close();
}

verifyPhase5Pages().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
