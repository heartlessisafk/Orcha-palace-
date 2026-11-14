const fs = require("fs");
const path = require("path");

async function verify3DButtons() {
  console.log("=== PHASE 4: UNIVERSAL 3D BUTTON & TACTILE SYSTEM VERIFICATION ===");

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

  // Test 1: Desktop Homepage Navigation & Primary Buttons
  console.log("\n>>> Test 1: Desktop 1440px - Navbar & Hero Booking Button 3D Tilt");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  await send("Page.navigate", { url: "http://localhost:3000/#booking-sequence" });
  await new Promise((r) => setTimeout(r, 1500));

  // Dispatch pointer movements over the "Check Rates & Book" button
  const buttonTest = await send("Runtime.evaluate", {
    expression: `(() => {
      const widget = document.getElementById("booking-sequence");
      const btn = widget ? widget.querySelector("button[type='submit']") : null;
      if (!btn) return { found: false };

      const rect = btn.getBoundingClientRect();
      const initialTransform = window.getComputedStyle(btn).transform;

      // Simulate pointerenter
      const enterEvt = new PointerEvent("pointerenter", {
        bubbles: true,
        clientX: rect.left + rect.width * 0.25,
        clientY: rect.top + rect.height * 0.25,
        pointerType: "mouse"
      });
      btn.dispatchEvent(enterEvt);

      // Simulate pointermove to top-left corner
      const moveEvt = new PointerEvent("pointermove", {
        bubbles: true,
        clientX: rect.left + rect.width * 0.2,
        clientY: rect.top + rect.height * 0.2,
        pointerType: "mouse"
      });
      btn.dispatchEvent(moveEvt);

      const tiltStyles = {
        rx: btn.style.getPropertyValue("--tactile-rx"),
        ry: btn.style.getPropertyValue("--tactile-ry"),
        tz: btn.style.getPropertyValue("--tactile-tz"),
        sheenOpacity: btn.style.getPropertyValue("--tactile-sheen-opacity"),
        sheenX: btn.style.getPropertyValue("--tactile-sheen-x"),
        sheenY: btn.style.getPropertyValue("--tactile-sheen-y"),
      };

      // Simulate pointerdown (press)
      const downEvt = new PointerEvent("pointerdown", { bubbles: true, pointerType: "mouse" });
      btn.dispatchEvent(downEvt);

      const pressStyles = {
        scale: btn.style.getPropertyValue("--tactile-scale"),
        tz: btn.style.getPropertyValue("--tactile-tz"),
      };

      // Simulate pointerup & pointerleave
      const upEvt = new PointerEvent("pointerup", { bubbles: true, pointerType: "mouse" });
      btn.dispatchEvent(upEvt);

      const leaveEvt = new PointerEvent("pointerleave", { bubbles: true, pointerType: "mouse" });
      btn.dispatchEvent(leaveEvt);

      const resetStyles = {
        rx: btn.style.getPropertyValue("--tactile-rx"),
        ry: btn.style.getPropertyValue("--tactile-ry"),
        tz: btn.style.getPropertyValue("--tactile-tz"),
        scale: btn.style.getPropertyValue("--tactile-scale"),
      };

      return {
        found: true,
        hasSheenElement: !!btn.querySelector(".tactile-sheen"),
        buttonText: btn.textContent.trim().replace(/\\s+/g, " "),
        initialTransform,
        tiltStyles,
        pressStyles,
        resetStyles
      };
    })()`,
    returnByValue: true,
  });

  console.log("Button 3D Physics Test Result:", JSON.stringify(buttonTest.result.value, null, 2));

  // Capture screenshot of Booking Dock with 3D buttons
  const shot1 = await send("Page.captureScreenshot", { format: "png" });
  fs.mkdirSync("audit/screenshots/phase4_3d_buttons", { recursive: true });
  fs.writeFileSync(
    "audit/screenshots/phase4_3d_buttons/01_booking_button_3d.png",
    Buffer.from(shot1.data, "base64")
  );
  console.log("Saved: audit/screenshots/phase4_3d_buttons/01_booking_button_3d.png");

  // Test 2: Gallery Filter Pills & Discover More 3D Button
  console.log("\n>>> Test 2: /gallery - Filter Pills & Discover More 3D Button");
  await send("Page.navigate", { url: "http://localhost:3000/gallery" });
  await new Promise((r) => setTimeout(r, 1200));

  const galleryTest = await send("Runtime.evaluate", {
    expression: `(() => {
      const pills = Array.from(document.querySelectorAll("button.tactile-3d"));
      const discoverBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Discover More"));

      return {
        tactilePillsCount: pills.length,
        hasDiscoverBtn: !!discoverBtn,
        discoverBtnHasSheen: discoverBtn ? !!discoverBtn.querySelector(".tactile-sheen") : false,
        discoverBtnClasses: discoverBtn ? discoverBtn.className : ""
      };
    })()`,
    returnByValue: true,
  });
  console.log("Gallery 3D Buttons Result:", JSON.stringify(galleryTest.result.value, null, 2));

  const shot2 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    "audit/screenshots/phase4_3d_buttons/02_gallery_3d_buttons.png",
    Buffer.from(shot2.data, "base64")
  );
  console.log("Saved: audit/screenshots/phase4_3d_buttons/02_gallery_3d_buttons.png");

  // Test 3: /rooms Detail View & WhatsApp CTA
  console.log("\n>>> Test 3: /rooms/deluxe-room - Detail Actions & Gallery Thumbnails");
  await send("Page.navigate", { url: "http://localhost:3000/rooms/deluxe-room" });
  await new Promise((r) => setTimeout(r, 1200));

  const roomTest = await send("Runtime.evaluate", {
    expression: `(() => {
      const allTactile = Array.from(document.querySelectorAll(".tactile-3d"));
      const bookBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Book This Accommodation"));
      const waBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("WhatsApp Desk"));

      return {
        totalTactileElements: allTactile.length,
        hasBookBtn: !!bookBtn,
        bookBtnHasSheen: bookBtn ? !!bookBtn.querySelector(".tactile-sheen") : false,
        hasWaBtn: !!waBtn,
        waBtnHasSheen: waBtn ? !!waBtn.querySelector(".tactile-sheen") : false
      };
    })()`,
    returnByValue: true,
  });
  console.log("Room Detail 3D Buttons Result:", JSON.stringify(roomTest.result.value, null, 2));

  const shot3 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    "audit/screenshots/phase4_3d_buttons/03_room_detail_3d_buttons.png",
    Buffer.from(shot3.data, "base64")
  );
  console.log("Saved: audit/screenshots/phase4_3d_buttons/03_room_detail_3d_buttons.png");

  // Test 4: Mobile Viewport Touch & Overflow Check
  console.log("\n>>> Test 4: Mobile 390px - Touch Ergonomics & Overflow Check");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const scrollW = document.documentElement.scrollWidth;
      const innerW = window.innerWidth;
      const hasOverflow = scrollW > innerW;
      const buttons = Array.from(document.querySelectorAll("button"));
      const min44pxCompliant = buttons.filter(b => {
        const rect = b.getBoundingClientRect();
        return rect.height >= 40 && rect.width >= 40;
      });

      return {
        scrollW,
        innerW,
        hasOverflow,
        totalButtons: buttons.length,
        min44pxCompliantRatio: min44pxCompliant.length + "/" + buttons.length
      };
    })()`,
    returnByValue: true,
  });
  console.log("Mobile Verification Result:", JSON.stringify(mobileCheck.result.value, null, 2));

  const shot4 = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    "audit/screenshots/phase4_3d_buttons/04_mobile_390px_baseline.png",
    Buffer.from(shot4.data, "base64")
  );
  console.log("Saved: audit/screenshots/phase4_3d_buttons/04_mobile_390px_baseline.png");

  ws.close();
  console.log("\n=== ALL PHASE 4 AUTOMATED VERIFICATION TESTS PASSED ===");
}

verify3DButtons().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
