const fs = require("fs");
const path = require("path");

async function runAudit() {
  console.log("================================================================================");
  console.log("   ORCHHA RESORT — INDEPENDENT FINAL QUALITY-CONTROL AUDIT (PROMPT 7)           ");
  console.log("================================================================================");

  const outputDir = path.resolve(__dirname, "independent_qc");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tabs = await (await fetch("http://127.0.0.1:9222/json")).json();
  const pageTab = tabs.find(t => t.type === "page");
  if (!pageTab) {
    console.error("No active Chrome page tab found on port 9222");
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

  const consoleErrors = [];
  ws.addEventListener("message", evt => {
    const data = JSON.parse(evt.data);
    if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
      const text = data.params.args.map(a => a.value || a.description || "").join(" ");
      consoleErrors.push(text);
    }
  });

  const auditReport = {};

  // ─────────────────────────────────────────────────────────────────────────────
  // A. ROOM CATEGORY VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n[A] AUDITING ROOM CATEGORY NAMES...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  // Check /rooms page
  await send("Page.navigate", { url: "http://localhost:3000/rooms" });
  await new Promise(r => setTimeout(r, 1200));

  const roomsPageData = await send("Runtime.evaluate", {
    expression: `(() => {
      const titles = Array.from(document.querySelectorAll("h3")).map(h => h.textContent.trim());
      const bodyText = document.body.innerText;
      return {
        renderedTitles: titles,
        hasSuperDeluxe: bodyText.includes("Super Deluxe Pool Facing"),
        hasDeluxeMarbleBed: bodyText.includes("Deluxe Marble Bed Garden Facing"),
        hasStandardRoom: bodyText.includes("Standard Room Garden Facing"),
        hasDeluxeRoom: bodyText.includes("Deluxe Room Garden Facing"),
        hasOldSuite: bodyText.includes("Royal Heritage Suite"),
        hasOldTent: bodyText.includes("Luxury Swiss Tent"),
      };
    })()`,
    returnByValue: true
  });

  // Check individual room slug pages
  const slugs = [
    { slug: "royal-heritage-suite", expected: "Super Deluxe Pool Facing" },
    { slug: "deluxe-room", expected: "Deluxe Marble Bed Garden Facing" },
    { slug: "deluxe-swiss-tent", expected: "Deluxe Room Garden Facing" },
    { slug: "standard-room", expected: "Standard Room Garden Facing" },
  ];

  const slugChecks = [];
  for (const s of slugs) {
    await send("Page.navigate", { url: `http://localhost:3000/rooms/${s.slug}` });
    await new Promise(r => setTimeout(r, 800));
    const slugData = await send("Runtime.evaluate", {
      expression: `(() => {
        const h1 = document.querySelector("h1")?.textContent.trim();
        return {
          h1,
          matches: h1 === "${s.expected}"
        };
      })()`,
      returnByValue: true
    });
    slugChecks.push({ slug: s.slug, expected: s.expected, ...slugData.result.value });
  }

  // Check homepage room cards
  await send("Page.navigate", { url: "http://localhost:3000/#rooms" });
  await new Promise(r => setTimeout(r, 1000));
  const homeRoomData = await send("Runtime.evaluate", {
    expression: `(() => {
      const roomSection = document.getElementById("rooms");
      const cardTitles = roomSection ? Array.from(roomSection.querySelectorAll("h3")).map(h => h.textContent.trim()) : [];
      return cardTitles;
    })()`,
    returnByValue: true
  });

  const exactExpectedNames = [
    "Super Deluxe Pool Facing",
    "Deluxe Marble Bed Garden Facing",
    "Standard Room Garden Facing",
    "Deluxe Room Garden Facing"
  ];

  const allExpectedPresentOnRooms = exactExpectedNames.every(name =>
    roomsPageData.result.value.renderedTitles.some(t => t.includes(name))
  );

  const allSlugsMatch = slugChecks.every(s => s.matches);
  const homeRoomsMatch = exactExpectedNames.every(name =>
    homeRoomData.result.value.some(t => t.includes(name))
  );

  auditReport.roomCategories = {
    status: (allExpectedPresentOnRooms && allSlugsMatch && homeRoomsMatch) ? "PASS" : "FAIL",
    renderedNamesRoomsPage: roomsPageData.result.value.renderedTitles,
    renderedNamesHomePage: homeRoomData.result.value,
    slugChecks,
    hasOldNames: roomsPageData.result.value.hasOldSuite || roomsPageData.result.value.hasOldTent,
  };
  console.log("  Room Categories Result:", auditReport.roomCategories.status);

  // Screenshot /rooms
  await send("Page.navigate", { url: "http://localhost:3000/rooms" });
  await new Promise(r => setTimeout(r, 800));
  const roomsScreenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(outputDir, "qc_rooms_page.jpg"), Buffer.from(roomsScreenshot.data, "base64"));

  // ─────────────────────────────────────────────────────────────────────────────
  // B. ROOM COUNT VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n[B] AUDITING ROOM COUNT / SANCTUARY KEYS STATISTIC...");
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 1000));

  const aboutStats = await send("Runtime.evaluate", {
    expression: `(() => {
      const text = document.body.innerText;
      const statsStrip = document.querySelector("#sanctuary-stats") || document.querySelector("section");
      
      return {
        has50Rooms: text.includes("50 Rooms"),
        hasGardenPoolFacing: text.includes("Garden & Pool Facing"),
        hasKanchanGhat: text.includes("Kanchan Ghat"),
        hasZeroPollution: text.includes("0% Pollution"),
        hasOld44SanctuaryKeys: text.includes("44 Sanctuary Keys"),
      };
    })()`,
    returnByValue: true
  });

  // Check homepage inventory references
  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise(r => setTimeout(r, 1000));
  const homeInventory = await send("Runtime.evaluate", {
    expression: `(() => {
      const text = document.body.innerText;
      return {
        has50RoomsMention: text.includes("50 private rooms") || text.includes("50 rooms") || text.includes("50 Heritage Accommodations"),
        hasOld44: text.includes("44 Sanctuary Keys"),
      };
    })()`,
    returnByValue: true
  });

  auditReport.roomCount = {
    status: (aboutStats.result.value.has50Rooms &&
             aboutStats.result.value.hasKanchanGhat &&
             aboutStats.result.value.hasZeroPollution &&
             !aboutStats.result.value.hasOld44SanctuaryKeys &&
             !homeInventory.result.value.hasOld44) ? "PASS" : "FAIL",
    evidence: {
      aboutPage: aboutStats.result.value,
      homePage: homeInventory.result.value,
    }
  };
  console.log("  Room Count Result:", auditReport.roomCount.status);

  // Screenshot /about stats
  await send("Page.navigate", { url: "http://localhost:3000/about" });
  await new Promise(r => setTimeout(r, 800));
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 400, behavior: "instant" })`
  });
  await new Promise(r => setTimeout(r, 300));
  const aboutStatsScreenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(outputDir, "qc_about_stats.jpg"), Buffer.from(aboutStatsScreenshot.data, "base64"));

  // ─────────────────────────────────────────────────────────────────────────────
  // C. BETWA VIEW DINING — HOSPITALITY SECTION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n[C] AUDITING BETWA VIEW DINING IN HOSPITALITY SECTION...");
  await send("Page.navigate", { url: "http://localhost:3000/about#hospitality" });
  await new Promise(r => setTimeout(r, 1000));

  const hospitalityData = await send("Runtime.evaluate", {
    expression: `(() => {
      const section = document.getElementById("hospitality");
      if (!section) return { error: "No #hospitality section" };
      
      const cards = Array.from(section.querySelectorAll(".grid > div")).map(card => {
        const titleSpan = card.querySelector(".drop-shadow-sm");
        const categorySpan = card.querySelector(".uppercase");
        const descP = card.querySelector("p");
        const img = card.querySelector("img");
        const rect = card.getBoundingClientRect();
        return {
          title: titleSpan ? titleSpan.textContent.trim() : null,
          category: categorySpan ? categorySpan.textContent.trim() : null,
          desc: descP ? descP.textContent.trim() : null,
          imgSrc: img ? img.getAttribute("src") : null,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      });

      const betwaCard = cards.find(c => c.title === "Betwa View Dining");
      const kalevaCard = cards.find(c => c.title && c.title.includes("Kaleva"));
      const spaCard = cards.find(c => c.title && c.title.includes("Ayurveda"));

      return {
        cardCount: cards.length,
        hasBetwaCard: !!betwaCard,
        betwaCard,
        hasKalevaCard: !!kalevaCard,
        hasSpaCard: !!spaCard,
        cards
      };
    })()`,
    returnByValue: true
  });

  const betwaPassed = hospitalityData.result.value.hasBetwaCard &&
                      hospitalityData.result.value.hasKalevaCard &&
                      hospitalityData.result.value.hasSpaCard &&
                      hospitalityData.result.value.betwaCard.imgSrc?.includes("dining-riverfront-alfresco.jpg");

  auditReport.hospitality = {
    status: betwaPassed ? "PASS" : "FAIL",
    evidence: hospitalityData.result.value
  };
  console.log("  Hospitality Betwa Dining Result:", auditReport.hospitality.status);

  // Screenshot #hospitality
  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById("hospitality");
      if (el) el.scrollIntoView({ block: "center" });
    `
  });
  await new Promise(r => setTimeout(r, 400));
  const hospScreenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(outputDir, "qc_hospitality_section.jpg"), Buffer.from(hospScreenshot.data, "base64"));

  // ─────────────────────────────────────────────────────────────────────────────
  // D. EXPERIENCE SELECTOR VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n[D] AUDITING EXPERIENCE SELECTOR TABS & INTERACTIONS...");
  await send("Page.navigate", { url: "http://localhost:3000/about#architecture" });
  await new Promise(r => setTimeout(r, 1000));

  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById("architecture");
      if (el) el.scrollIntoView({ block: "center" });
    `
  });
  await new Promise(r => setTimeout(r, 400));

  // Inspect tab names and initial order
  const tabsInitial = await send("Runtime.evaluate", {
    expression: `(() => {
      const section = document.getElementById("architecture");
      if (!section) return { error: "No #architecture section" };
      const tabButtons = Array.from(section.querySelectorAll(".grid button")).map(b => b.innerText.trim().replace(/\\n/g, " "));
      return tabButtons;
    })()`,
    returnByValue: true
  });

  // Sequentially click all 4 tabs and verify content & images
  const expectedTabs = [
    { name: "BETWA VIEW DINING", expectedImg: "dining-riverfront-alfresco.jpg", forbiddenText: "Swiss Tent" },
    { name: "LOTUS-SHAPED POOL", expectedImg: "swimming.jpg", forbiddenText: "Swiss Tent" },
    { name: "DELUXE ROOMS", expectedImg: "13.jpg", forbiddenText: "" },
    { name: "COURTYARDS & BARADARI", expectedImg: "16.jpg", forbiddenText: "" }
  ];

  const tabClickResults = [];
  for (let i = 0; i < expectedTabs.length; i++) {
    const exp = expectedTabs[i];
    const clickData = await send("Runtime.evaluate", {
      expression: `(async () => {
        const section = document.getElementById("architecture");
        const buttons = Array.from(section.querySelectorAll(".grid button"));
        const targetBtn = buttons.find(b => b.innerText.includes("${exp.name}"));
        if (!targetBtn) return { error: "Button not found: ${exp.name}" };

        targetBtn.click();
        await new Promise(r => setTimeout(r, 300));

        const activeTitle = section.querySelector("h3")?.textContent.trim();
        const activeImg = section.querySelector("img");
        const activeImgSrc = activeImg ? activeImg.getAttribute("src") : null;
        const panelText = section.innerText;

        return {
          tabName: "${exp.name}",
          activeTitle,
          activeImgSrc,
          imgMatches: activeImgSrc ? activeImgSrc.includes("${exp.expectedImg}") : false,
          hasForbidden: "${exp.forbiddenText}" ? panelText.includes("${exp.forbiddenText}") : false
        };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    tabClickResults.push(clickData.result.value);
  }

  const allTabsPass = tabClickResults.every(t => t.imgMatches && !t.hasForbidden);
  auditReport.experienceSelector = {
    status: allTabsPass ? "PASS" : "FAIL",
    initialTabs: tabsInitial.result.value,
    interactions: tabClickResults
  };
  console.log("  Experience Selector Result:", auditReport.experienceSelector.status);

  // Screenshot tab 1 (Betwa View Dining)
  const tabScreenshot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(outputDir, "qc_experience_selector.jpg"), Buffer.from(tabScreenshot.data, "base64"));

  // ─────────────────────────────────────────────────────────────────────────────
  // E. SPA BRANDING VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n[E] AUDITING SPA PAGE BRANDING & LOGO...");
  await send("Page.navigate", { url: "http://localhost:3000/spa" });
  await new Promise(r => setTimeout(r, 1200));

  const spaBrandingData = await send("Runtime.evaluate", {
    expression: `(() => {
      const pageTitle = document.title;
      const logoLink = document.querySelector("header a[aria-label*='The Orchha Resort']");
      const logoSpan = logoLink ? logoLink.querySelector("span") : null;
      const logoStyles = logoSpan ? window.getComputedStyle(logoSpan) : null;
      const logoMask = logoStyles ? (logoStyles.webkitMaskImage || logoStyles.maskImage) : "";
      const spaBadge = document.querySelector("header a[href='/spa']")?.innerText.trim();
      const pageText = document.body.innerText;
      const palaceMentions = (pageText.match(/Orchha Palace Hotel/gi) || []).length;
      const therapiesCount = document.querySelectorAll("[data-treatment-id], h4").length;

      return {
        pageTitle,
        hasOfficialLogoLink: !!logoLink,
        logoMaskImage: logoMask,
        usesOfficialLogoMask: logoMask.includes("orchha-logo.png"),
        hasSpaBadge: !!spaBadge && spaBadge.includes("Ayurveda Spa"),
        palaceMentions,
        therapiesCount
      };
    })()`,
    returnByValue: true
  });

  const spaPassed = spaBrandingData.result.value.usesOfficialLogoMask &&
                    spaBrandingData.result.value.hasSpaBadge &&
                    spaBrandingData.result.value.palaceMentions === 0 &&
                    spaBrandingData.result.value.pageTitle.includes("The Orchha Resort");

  auditReport.spaBranding = {
    status: spaPassed ? "PASS" : "FAIL",
    evidence: spaBrandingData.result.value
  };
  console.log("  Spa Branding Result:", auditReport.spaBranding.status);

  // Screenshot Spa header desktop & mobile
  const spaDesktopShot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(outputDir, "qc_spa_header_desktop.jpg"), Buffer.from(spaDesktopShot.data, "base64"));

  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await new Promise(r => setTimeout(r, 400));
  const spaMobileShot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
  fs.writeFileSync(path.join(outputDir, "qc_spa_header_mobile.jpg"), Buffer.from(spaMobileShot.data, "base64"));

  // ─────────────────────────────────────────────────────────────────────────────
  // F. BOOKING FORM VERIFICATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n[F] AUDITING BOOKING FORM ALIGNMENT & FUNCTIONALITY...");
  // Test Desktop (1440)
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
  await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
  await new Promise(r => setTimeout(r, 1200));

  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById("booking-sequence");
      if (el) el.scrollIntoView({ block: "center" });
    `
  });
  await new Promise(r => setTimeout(r, 400));

  const bookingMetricsDesktop = await send("Runtime.evaluate", {
    expression: `(() => {
      const checkin = document.querySelector("#checkin-date");
      const checkout = document.querySelector("#checkout-date");
      const guest = document.querySelector("#guest-picker-btn");
      const submit = document.querySelector("#booking-sequence button[type='submit']");
      const cLabel = document.querySelector("label[for='checkin-date']");
      const oLabel = document.querySelector("label[for='checkout-date']");
      const gLabel = document.querySelector("label[for='guest-picker-btn']");
      const sHeader = submit?.parentElement?.querySelector("div[aria-hidden='true']");

      const getR = el => el ? {
        top: Math.round(el.getBoundingClientRect().top),
        height: Math.round(el.getBoundingClientRect().height * 10) / 10,
        borderRadius: window.getComputedStyle(el).borderRadius
      } : null;

      return {
        labels: {
          checkin: getR(cLabel),
          checkout: getR(oLabel),
          guest: getR(gLabel),
          header: getR(sHeader),
        },
        controls: {
          checkin: getR(checkin),
          checkout: getR(checkout),
          guest: getR(guest),
          submit: getR(submit),
        }
      };
    })()`,
    returnByValue: true
  });

  // Test functional booking modal submission
  const bookingFuncTest = await send("Runtime.evaluate", {
    expression: `new Promise(resolve => {
      const submit = document.querySelector("#booking-sequence button[type='submit']");
      submit.click();
      setTimeout(() => {
        const modal = document.querySelector("div[role='dialog']");
        const title = modal ? modal.querySelector("#booking-modal-title")?.textContent : null;
        const wa = modal ? modal.querySelector("a[href*='wa.me']")?.href : null;
        resolve({
          modalOpened: !!modal,
          title,
          whatsappUrlValid: !!wa && wa.includes("9926219900")
        });
      }, 300);
    })`,
    awaitPromise: true,
    returnByValue: true
  });

  // Close modal with ESC
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", windowsVirtualKeyCode: 27, key: "Escape", code: "Escape" });
  await send("Input.dispatchKeyEvent", { type: "keyUp", windowsVirtualKeyCode: 27, key: "Escape", code: "Escape" });
  await new Promise(r => setTimeout(r, 200));

  const c = bookingMetricsDesktop.result.value.controls;
  const l = bookingMetricsDesktop.result.value.labels;

  const heightsEqual = c.checkin.height === 50 && c.checkout.height === 50 && c.guest.height === 50 && c.submit.height === 50;
  const topsEqual = c.checkin.top === c.checkout.top && c.checkout.top === c.guest.top && c.guest.top === c.submit.top;
  const labelsEqual = l.checkin.top === l.checkout.top && l.checkout.top === l.guest.top && l.guest.top === l.header.top;

  auditReport.bookingForm = {
    status: (heightsEqual && topsEqual && labelsEqual && bookingFuncTest.result.value.modalOpened) ? "PASS" : "FAIL",
    evidence: {
      metrics: bookingMetricsDesktop.result.value,
      functionality: bookingFuncTest.result.value
    }
  };
  console.log("  Booking Form Result:", auditReport.bookingForm.status);

  // ─────────────────────────────────────────────────────────────────────────────
  // G. FULL WEBSITE REGRESSION TEST
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n[G] AUDITING WEBSITE REGRESSION ACROSS ALL ROUTES...");
  const routesToTest = [
    "/",
    "/about",
    "/rooms",
    "/rooms/standard-room",
    "/rooms/deluxe-room",
    "/rooms/deluxe-swiss-tent",
    "/rooms/royal-heritage-suite",
    "/gallery",
    "/spa",
    "/weddings",
    "/design-system"
  ];

  const routeResults = [];
  for (const r of routesToTest) {
    await send("Page.navigate", { url: `http://localhost:3000${r}` });
    await new Promise(res => setTimeout(res, 800));

    const pageData = await send("Runtime.evaluate", {
      expression: `(() => {
        const clientWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const hasNav = !!document.querySelector("nav, header");
        const hasFooter = !!document.querySelector("footer");
        return {
          title: document.title,
          overflow: scrollWidth > clientWidth,
          hasNav,
          hasFooter
        };
      })()`,
      returnByValue: true
    });
    routeResults.push({ route: r, ...pageData.result.value });
  }

  const allRoutesClean = routeResults.every(r => !r.overflow && r.hasNav && r.hasFooter);
  auditReport.websiteRegression = {
    status: allRoutesClean ? "PASS" : "FAIL",
    routesChecked: routeResults.length,
    zeroConsoleErrors: consoleErrors.length === 0,
    consoleErrors,
    routes: routeResults
  };
  console.log("  Website Regression Result:", auditReport.websiteRegression.status);

  fs.writeFileSync(path.join(outputDir, "final_audit_evidence.json"), JSON.stringify(auditReport, null, 2));

  ws.close();
  console.log("\n================================================================================");
  console.log("   INDEPENDENT AUDIT COMPLETE. RESULTS COMPILED TO audit/independent_qc/        ");
  console.log("================================================================================");
}

runAudit().catch(console.error);
