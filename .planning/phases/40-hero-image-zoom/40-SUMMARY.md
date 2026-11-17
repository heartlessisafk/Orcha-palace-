# Phase 40: Homepage Hero Image Replacement & Scroll Zoom Animation — Summary

## Summary of Changes
1. **Hero Photograph Replacement**:
   - Ingested the authentic high-resolution aerial photograph into `public/images/resort/hero/hero-aerial-chhatris-river.jpg`.
   - Updated `RESORT_ASSETS.heroDesktop` and `RESORT_ASSETS.heroMobile` in `src/lib/assets.ts`.
   - Removed the swimming pool photograph and external staging video from `src/components/hero/HeroScrollBookingSequence.tsx`.
2. **Smooth Scroll-Based Zoom Animation**:
   - Integrated Framer Motion's `useScroll` hook targeting the `#hero` element with `offset: ["start start", "end start"]`.
   - Applied dynamic GPU-accelerated scaling (`scale = useTransform(scrollYProgress, [0, 1], [1, 1.25])`) to the image container.
   - Pinned the focal point at `transformOrigin: "center 42%"` so the Betwa River and the 14 Royal Chhatris remain centered in frame as the image scales.
   - Guarded with `useReducedMotion()` for accessibility compliance.
3. **Design & Element Preservation**:
   - Preserved all existing editorial glass card typography, ratings, location kicker, buttons, and booking widget.
   - Maintained seamless aesthetic transition into the reservation sanctuary section with balanced vignette gradients.

## Status: COMPLETE
- Build: 0 errors; 16/16 pages static pre-rendered.
- Verification: 4/4 viewports verified via Chrome DevTools Protocol; 0 overflow; 0 console errors.
- Live Tunnel: `https://magazine-airports-martin-wellness.trycloudflare.com`.
