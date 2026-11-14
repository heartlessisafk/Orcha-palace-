# Phase 20: Heritage Geography Map Reveal — Text Visibility & Scroll Performance Optimization (Client Feedback Fix 03)

## Objective
Address Client Feedback Fix 03 based on visual reference `IMG_1675.jpeg`. Introduce a refined translucent luxury glass information panel behind the Stage 1 "The Heritage Geography of Orchha" dialog overlay to ensure 100% text contrast and readability against the underlying heritage photography. Simultaneously execute deep technical optimizations to eliminate scroll stutter and lag during the 5-stage map reveal animation.

## Problems Diagnosed & Targeted

### Problem A: Dialog Text Visibility
- **Root Cause**: In `PalaceToMapFinale.tsx` (Stage 1), the heading "The Heritage Geography of Orchha", description, and "SCROLL TO UNVEIL REAL GEOGRAPHY ↓" prompt were rendered bare over `RESORT_ASSETS.chhatrisHeritage.src` without any container surface. The white and gold typography collided with bright stone cenotaphs, sky, and balcony foliage.
- **Solution**:
  - Enclose the entire dialog content inside an intentional floating information panel (`rounded-3xl`, `bg-white/90 sm:bg-white/95`, `backdrop-blur-md`, `border border-brand-gold/35`, `shadow-[0_20px_50px_rgba(0,0,0,0.35)]`).
  - Standardize typography to royal heritage contrast: Deep Midnight Royal Navy (`#0C1731`) for display headings, dark charcoal (`#260E01` at 80% opacity) for descriptions, and antique bronze/gold for metadata badges.
  - Preserve transparency so the underlying cenotaphs photo remains visible through and around the floating panel.
  - Apply matching luxury card styling to the mobile layout (`< lg: screens`).

### Problem B: Laggy Map Scroll Experience
- **Root Cause 1**: Full-screen CSS `filter: saturate()` continuously recalculated by Framer Motion on every scroll tick (`[0.06, 0.22]`), triggering full-viewport GPU re-rasterization on every frame.
- **Root Cause 2**: Leaflet map DOM tiles and CSS marker ping animations (`animate-ping`) were actively composited during Stage 1 and Stage 2 when `opacity: 0`, consuming compositor thread cycles unnecessarily.
- **Root Cause 3**: Nested `backdrop-blur-md` on the scaling map header (`RealOrchhaMap.tsx`) caused continuous GPU frame-buffer readback stalls during map scale interpolation (`scale: mapScale`).
- **Solution**:
  - Eliminated continuous `filter: saturate()`, relying on pure GPU-composited opacity transitions (`imageOverlayOpacity` 0.35 → 0.94).
  - Implemented strict visibility gating (`visibility: hidden` when inactive) on the Leaflet map container (`p < 0.26 || p > 0.84`), architectural line-art, grid, and CTA layers.
  - Added `transform-gpu will-change-[transform,opacity]` to isolate motion layers into dedicated hardware compositor surfaces.
  - Converted the scaling map top bar in `RealOrchhaMap.tsx` to `bg-[#0B131E]/98` (pure solid dark luxury slate), eliminating GPU readbacks.

## Verification Standards
- Visual confirmation of Stage 1 screenshot matching client reference with high contrast.
- Visual verification of all 5 stages (Stage 1 Dialog, Stage 2 Blueprint, Stage 3 Map, Stage 5 Booking).
- Mobile responsive layout verified (390px).
- Production build and 10-route regression test (0 errors, 0 overflow).
