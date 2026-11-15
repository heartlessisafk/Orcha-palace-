const fs = require("fs");
const path = require("path");

const MOBILE_VIEWPORTS = [
  { name: "mobile_320", width: 320, height: 568 },
  { name: "mobile_360", width: 360, height: 800 },
  { name: "mobile_375", width: 375, height: 667 },
  { name: "mobile_390", width: 390, height: 844 },
  { name: "mobile_393", width: 393, height: 852 },
  { name: "mobile_402", width: 402, height: 874 },
  { name: "mobile_430", width: 430, height: 932 },
  { name: "mobile_440", width: 440, height: 956 },
];

const TABLET_VIEWPORTS = [
  { name: "ipad_mini_portrait", width: 768, height: 1024 },
  { name: "ipad_mini_landscape", width: 1024, height: 768 },
  { name: "ipad_10th_portrait", width: 820, height: 1180 },
  { name: "ipad_10th_landscape", width: 1180, height: 820 },
  { name: "ipad_air_portrait", width: 834, height: 1194 },
  { name: "ipad_air_landscape", width: 1194, height: 834 },
  { name: "ipad_pro_11_portrait", width: 834, height: 1194 },
  { name: "ipad_pro_13_portrait", width: 1024, height: 1366 },
  { name: "ipad_pro_13_landscape", width: 1366, height: 1024 },
];

const DESKTOP_VIEWPORTS = [
  { name: "desktop_1440", width: 1440, height: 900 },
  { name: "desktop_1920", width: 1920, height: 1080 },
];

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/rooms", name: "rooms" },
  { path: "/rooms/standard-room", name: "room_standard" },
  { path: "/rooms/deluxe-room", name: "room_deluxe" },
  { path: "/rooms/deluxe-swiss-tent", name: "room_tent" },
  { path: "/rooms/royal-heritage-suite", name: "room_suite" },
  { path: "/gallery", name: "gallery" },
  { path: "/weddings", name: "weddings" },
  { path: "/spa", name: "spa" },
  { path: "/about", name: "about" },
];

async function runAudit() {
  console.log("================================================================================");
  console.log("   ORCHHA RESORT — COMPLETE TECHNICAL & RESPONSIVE BASELINE AUDIT               ");
  console.log("================================================================================");

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

  const auditLog = {
    timestamp: new Date().toISOString(),
    routesAudited: ROUTES.length,
    viewportsChecked: MOBILE_VIEWPORTS.length + TABLET_VIEWPORTS.length + DESKTOP_VIEWPORTS.length,
    seoFindings: [],
    overflowFindings: [],
    headingFindings: [],
  };

  // 1. Audit SEO metadata on desktop first for all routes
  console.log("\n>>> [1/3] AUDITING SEO METADATA ACROSS ALL 10 ROUTES...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  for (const r of ROUTES) {
    await send("Page.navigate", { url: `http://localhost:3000${r.path}` });
    await new Promise((res) => setTimeout(res, 1200));

    const seoData = await send("Runtime.evaluate", {
      expression: `(() => {
        const title = document.title;
        const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") || null;
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || null;
        const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content") || null;
        const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute("content") || null;
        const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") || null;
        const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute("content") || null;
        const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
          try { return JSON.parse(s.textContent); } catch (e) { return { error: "invalid JSON" }; }
        });
        const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim().replace(/\\s+/g, " "));
        const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim().replace(/\\s+/g, " "));
        const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.hasAttribute('alt') || img.getAttribute('alt') === "");

        return {
          title,
          metaDesc,
          canonical,
          ogTitle,
          ogDesc,
          ogImage,
          twitterCard,
          jsonLdCount: jsonLdScripts.length,
          h1Count: h1s.length,
          h1s,
          h2Count: h2s.length,
          imagesWithoutAltCount: imagesWithoutAlt.length
        };
      })()`,
      returnByValue: true,
    });

    const data = seoData.result.value;
    auditLog.seoFindings.push({ route: r.path, ...data });
    console.log(`- [${r.path}] H1s: ${data.h1Count}, Title: "${data.title?.slice(0, 40)}...", Desc: ${!!data.metaDesc}, Canonical: ${!!data.canonical}, JSON-LD: ${data.jsonLdCount}`);
  }

  // 2. Audit Responsive Overflow across Mobile Viewports
  console.log("\n>>> [2/3] AUDITING HORIZONTAL OVERFLOW ACROSS ALL 8 MOBILE VIEWPORTS...");
  for (const vp of MOBILE_VIEWPORTS) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: true,
    });

    for (const r of ROUTES) {
      await send("Page.navigate", { url: `http://localhost:3000${r.path}` });
      await new Promise((res) => setTimeout(res, 800));

      const ovResult = await send("Runtime.evaluate", {
        expression: `(() => {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          const hasOverflow = docW > winW;
          let overflowingElements = [];
          if (hasOverflow) {
            document.querySelectorAll('*').forEach(el => {
              const rect = el.getBoundingClientRect();
              if (rect.right > winW + 1) {
                overflowingElements.push({
                  tag: el.tagName,
                  className: el.className?.toString().slice(0, 50),
                  right: Math.round(rect.right),
                  width: Math.round(rect.width)
                });
              }
            });
          }
          return {
            docW,
            winW,
            hasOverflow,
            overflowingElements: overflowingElements.slice(0, 3)
          };
        })()`,
        returnByValue: true,
      });

      const res = ovResult.result.value;
      if (res.hasOverflow) {
        console.warn(`  ⚠️ OVERFLOW on ${r.path} @ ${vp.name} (${vp.width}px): docW=${res.docW} > winW=${res.winW}`);
        auditLog.overflowFindings.push({
          viewport: vp.name,
          width: vp.width,
          route: r.path,
          docW: res.docW,
          winW: res.winW,
          elements: res.overflowingElements,
        });
      }
    }
  }

  // 3. Audit Responsive Overflow across Tablet Viewports
  console.log("\n>>> [3/3] AUDITING HORIZONTAL OVERFLOW ACROSS ALL 9 TABLET VIEWPORTS...");
  for (const vp of TABLET_VIEWPORTS) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: false,
    });

    for (const r of ROUTES) {
      await send("Page.navigate", { url: `http://localhost:3000${r.path}` });
      await new Promise((res) => setTimeout(res, 800));

      const ovResult = await send("Runtime.evaluate", {
        expression: `(() => {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          const hasOverflow = docW > winW;
          return { docW, winW, hasOverflow };
        })()`,
        returnByValue: true,
      });

      const res = ovResult.result.value;
      if (res.hasOverflow) {
        console.warn(`  ⚠️ TABLET OVERFLOW on ${r.path} @ ${vp.name} (${vp.width}px): docW=${res.docW} > winW=${res.winW}`);
        auditLog.overflowFindings.push({
          viewport: vp.name,
          width: vp.width,
          route: r.path,
          docW: res.docW,
          winW: res.winW,
        });
      }
    }
  }

  const outDir = path.join(process.cwd(), ".planning", "phases", "32-master-optimization");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outDir, "audit_baseline.json"),
    JSON.stringify(auditLog, null, 2)
  );

  console.log(`\nAudit finished! Baseline report written to: ${path.join(outDir, "audit_baseline.json")}`);
  console.log(`Summary:`);
  console.log(`- Total overflow events detected: ${auditLog.overflowFindings.length}`);
  console.log(`- Routes missing JSON-LD: ${auditLog.seoFindings.filter(s => s.jsonLdCount === 0).length} / ${ROUTES.length}`);
  console.log(`- Routes missing Canonical: ${auditLog.seoFindings.filter(s => !s.canonical).length} / ${ROUTES.length}`);
  console.log(`- Routes missing Meta Description: ${auditLog.seoFindings.filter(s => !s.metaDesc).length} / ${ROUTES.length}`);

  ws.close();
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
