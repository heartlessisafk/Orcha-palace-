# Phase 40: Homepage Hero Image Replacement & Scroll Zoom Animation — Implementation Plan

## Goal
Replace the swimming pool photograph in the homepage hero section with the client-supplied aerial photograph of The Orchha Resort and the 14 Royal Cenotaphs along the Betwa River, and implement a smooth, scroll-based progressive zoom animation directly tied to scroll position.

## Requirements
1. **Asset Replacement**:
   - Ingest user-uploaded photograph (`media_1794911883687_09e533d1.jpg`) into `public/images/resort/hero/hero-aerial-chhatris-river.jpg`.
   - Update `RESORT_ASSETS.heroDesktop` and `RESORT_ASSETS.heroMobile` in `src/lib/assets.ts`.
   - Completely remove the old swimming pool photo and staging video from `#hero`.
2. **Scroll-Based Zoom Animation**:
   - Tie zoom scale directly to scroll progress (`scrollYProgress` from `useScroll` targeting `#hero`).
   - Smoothly interpolate scale from `1.0` (at `scrollY = 0`) to `1.25` (at `scrollY = end of hero`).
   - Maintain `transformOrigin: "center 42%"` to keep the Royal Chhatris and Betwa river majestically in focus.
   - Hardware-accelerate with `transform-gpu` and `will-change: transform`.
   - Respect user accessibility preferences via `useReducedMotion()`.
3. **Preservation**:
   - Preserve all existing typography, glass editorial card, rating badge, location kicker, headline, and buttons.
   - Maintain seamless bridge into `#booking-sequence` (`RoomSearchWidgetPrimitive`).
   - Zero horizontal overflow across Mobile (390px), Tablet (768px), iPad (1024px), and Desktop (1440px).
4. **Verification**:
   - Pass `npm run type-check` (0 errors).
   - Pass `npm run build` (16/16 pages static pre-rendered).
   - Execute Chrome DevTools Protocol automated scroll verification script.
   - Verify live Cloudflare tunnel response.
