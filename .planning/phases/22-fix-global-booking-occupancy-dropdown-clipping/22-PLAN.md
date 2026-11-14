# Phase 22: Global Booking Widget — Occupancy Dropdown Clipping & Layering Bug (Client Feedback Fix 06)

## Problem Description
In Client Feedback Fix 06 (referenced by `IMG_1680.jpeg`), when the user clicks the "Guests & Rooms" / Occupancy selector in the booking interface, the dropdown popover opens, but its lower portion (Children stepper, Room stepper, and "Done" button) is visually clipped and disappears behind the dark navy section immediately below.

## Root Cause Analysis
1. **Parent Container Overflow Clipping**:
   - In [HeroScrollBookingSequence.tsx](file:///Users/sam/Projects/orccha/src/components/hero/HeroScrollBookingSequence.tsx#L160), the luxury booking card container has `overflow-hidden`:
     `<div className="rounded-3xl bg-brand-beige border border-brand-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">`
   - The card height is ~390px, while the popover extends from Y=395px to Y=741px (height: 346px). Because of `overflow-hidden`, any element protruding past the bottom of the card is abruptly sliced off.
2. **Column Width & Popover Width Contraction**:
   - In [RoomSearchWidgetPrimitive.tsx](file:///Users/sam/Projects/orccha/src/components/booking/RoomSearchWidgetPrimitive.tsx#L226), the popover was positioned with `left-0 right-0`. In 4-column responsive grid layouts (e.g. at 1024px tablet/desktop), the column is only ~180-220px wide. This forced the popover to squeeze into a narrow width, wrapping "Select Occupancy" onto two lines and cramming stepper controls against the borders.
3. **Missing Intelligent Viewport Repositioning**:
   - When opened near the bottom of a smaller screen or when scrolled, the dropdown had no directional detection to flip upwards if space below was insufficient.
4. **Keyboard Accessibility**:
   - The dropdown closed on outside clicks, but lacked an `Escape` key listener.

## Required Surgical Solution
1. **Container Overflow & Corner Preservation ([HeroScrollBookingSequence.tsx](file:///Users/sam/Projects/orccha/src/components/hero/HeroScrollBookingSequence.tsx))**:
   - Change `overflow-hidden` to `overflow-visible relative` on the card container.
   - Add explicit `rounded-t-3xl` to the Navy Header Bar and `rounded-b-3xl` to the Reassurance Strip so the 24px border radii remain crisp and pixel-perfect.
2. **Dropdown Dimension & Alignment ([RoomSearchWidgetPrimitive.tsx](file:///Users/sam/Projects/orccha/src/components/booking/RoomSearchWidgetPrimitive.tsx))**:
   - Replace rigid `left-0 right-0` with responsive, spacious dimensions:
     `left-0 right-0 sm:left-auto sm:right-0 w-full sm:w-[320px]`
   - Keeps it full-width on mobile (390px) and a comfortable, unconstrained 320px wide on tablet (768px) and desktop (1024px+), preventing any text wrapping or clipped controls.
3. **Dynamic Viewport Direction Detection ([RoomSearchWidgetPrimitive.tsx](file:///Users/sam/Projects/orccha/src/components/booking/RoomSearchWidgetPrimitive.tsx))**:
   - Check `spaceBelow` vs `spaceAbove` when opening. If `spaceBelow < 360px` and `spaceAbove > spaceBelow`, render upwards with `bottom-full mb-2` and upward elevation shadow; otherwise render downwards with `top-full mt-2`.
4. **Stacking Context Elevation**:
   - Set `z-40` on `guestPickerRef` container when open to guarantee it floats above all sibling inputs, borders, and reassurance strips.
5. **Keyboard Support**:
   - Add `Escape` key listener to close the occupancy dropdown cleanly.

## Verification Matrix
1. **Desktop Verification (1440px & 1024px)**:
   - Click "Guests & Rooms" on Homepage booking dock.
   - Verify complete visibility of Adults, Children, Rooms steppers, and "Done" button.
   - Verify zero clipping against bottom navy section or "Our Philosophy".
2. **Tablet Verification (768px)**:
   - Verify popover fits cleanly within viewport without collision.
3. **Mobile Verification (390px)**:
   - Verify full-width presentation, accessible touch steppers, and proper "Done" closing.
4. **Subsequent Page Instances**:
   - Test Our Story (`/about#reserve`) and Design System (`/design-system`).
5. **Build & Regressions**:
   - `npm run type-check` (0 errors), `npm run build` (14/14 static pages), `verify_phase7_final.js` (0 regressions).
