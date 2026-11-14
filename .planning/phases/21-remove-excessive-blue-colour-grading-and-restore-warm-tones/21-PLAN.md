# Phase 21: Remove Excessive Blue Colour Grading & Restore Warm Heritage Tones

## Objective
The client reported in Client Feedback Fix 04 that an excessive bluish tint is suppressing the natural photographic colors across:
1. **Homepage Hero Section**: The pool, surrounding greenery, and architecture are covered in an artificial blue wash.
2. **Our Story Hero Section**: The heritage salon photograph (`slide1.jpg`) is drowned in cold blue, suppressing its authentic warm golden teak, beige marble, Bundeli murals, and warm interior lighting.
3. **Gallery Page (Hero & Photo Presentation)**: The hero photograph is dulled by `brightness-75` and dark multi-stop scrims, and tab controls lack contrast.

## Non-Negotiable Requirements
- Remove artificial blue color overlays and filters from the photographs.
- Restore natural daylight, warm golden architectural highlights, beige/sandstone tones, rich greenery, and natural turquoise pool water.
- **Preserve text contrast and readability**: Replace heavy full-bleed blue scrims with restrained, localized neutral dark vignettes or glass cards directly behind text so WCAG AA legibility is maintained without discoloring the photography.
- Do NOT replace existing genuine photographs with stock or AI.
- Do NOT alter page layouts, dimensions, typography, or booking/navigation functionality.

## Root Cause Analysis
1. **Homepage Hero (`src/components/hero/HeroScrollBookingSequence.tsx`)**:
   - Line 83: `<div className="absolute inset-0 z-1 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-black/35 pointer-events-none" />`
   - The full-screen `via-brand-navy/60` drench applies an artificial 60% blue wash across the entire pool and architecture.
   - The hero text ALREADY sits inside a dedicated translucent high-contrast glass card (`bg-gradient-to-br from-brand-navy/80 ... backdrop-blur-md`).
   - **Fix**: Replace line 83 with a neutral, non-blue edge vignette: `bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none`.

2. **Our Story Hero (`src/components/about/AboutHero.tsx`)**:
   - Line 35: `<div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/40" />`
   - Line 36: `<div className="absolute inset-0 bg-radial-vignette opacity-70" />`
   - `slide1.jpg` contains rich golden carved sofas, golden ceiling coffers, and warm sandstone inlays. The heavy navy overlay suffocates all warm tones.
   - **Fix**: Replace the full-screen navy overlay with a neutral, warm-preserving vignette: `bg-gradient-to-t from-black/75 via-black/25 to-black/35`.
   - Wrap the hero typography and subtitle in a subtle localized soft dark text scrim/shadow (`drop-shadow-md`) to ensure crisp WCAG AA contrast while letting the golden salon illuminate with full warmth.
   - Neutralize any secondary card scrims in `AboutOrchhaSpirit.tsx`, `AboutBetwaSetting.tsx`, `AboutArchitectureSpaces.tsx`, `AboutHospitality.tsx` from `from-brand-navy` to neutral `from-black/60` or `from-brand-charcoal/60`.

3. **Gallery Page (`src/app/gallery/page.tsx` & `GalleryViewer.tsx`)**:
   - In `gallery/page.tsx`:
     - Line 34: Remove `filter brightness-75` from the hero image.
     - Line 37: Replace heavy 3-stop charcoal overlay with an elegant, clear gradient `bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/30 to-transparent` so the turquoise pool water and architecture remain clear and luminous.
   - In `GalleryViewer.tsx`:
     - Line 159: Ensure the active tab pill has clear, high-contrast text (`bg-brand-navy text-white ring-1 ring-brand-gold/60`).
     - Verify card overlays in hover state use neutral charcoal gradients (`from-brand-charcoal/90 via-brand-charcoal/25`) with zero blue bias.

## Verification Steps
1. Build and type-check: `npm run type-check` (0 errors), `npm run build`.
2. Capture CDP screenshots of:
   - Homepage hero at 1440px desktop, 768px tablet, 390px mobile.
   - Our Story hero at 1440px desktop, 768px tablet, 390px mobile.
   - Gallery hero & photo cards at 1440px desktop.
3. Visually inspect captured screenshots with `read_file` to verify:
   - Golden teak, ceilings, and Bundela murals in Our Story hero are vivid and warm.
   - Pool water in Homepage and Gallery is natural glowing turquoise, greenery is lush green, fairy lights are warm.
   - Zero blue cast over architecture or furniture.
   - All headings and text remain easily readable.
4. Run full 10-route regression test.
