---
phase: 01-fix-blank-palace-to-map-animation
plan: 01
subsystem: animation/map
tags: [framer-motion, sticky-scroll, svg, css-overflow]
provides:
  - Pinned sticky container during 450vh scroll
  - Vibrant high-contrast SVG blueprint & cartographic layers
  - Responsive fallback on mobile/tablet
  - Verified 5-act scroll sequence
affects: [PalaceToMapFinale]
tech-stack:
  added: []
  patterns: [css position:sticky with overflow-visible parent, framer-motion clamped transforms]
key-files:
  created: []
  modified: [src/components/map/PalaceToMapFinale.tsx]
key-decisions:
  - Remove overflow-hidden from section#map-experience to restore CSS position:sticky functionality.
  - Enhance stroke brightness and drop-shadows on SVG architectural blueprints so Act II and III pop crisply against the dark background.
  - Validate all 5 acts (Hero text dissolve, Line-art blueprint, Cartographic reveal, Landmark pulses, Final booking CTA) via Chrome DevTools Protocol automation.
duration: 15min
completed: 2026-10-27
---

# Phase 1 Plan: Fix Blank Palace-to-Map Animation

## Diagnosis
1. `PalaceToMapFinale.tsx` line 108 has `overflow-hidden` on the `<section id={id} ... lg:h-[450vh]>` container. Under CSS spec, any ancestor with `overflow: hidden` cancels `position: sticky` on child elements. As a result, the sticky container scrolled off immediately upon entering the section, leaving 350vh of blank dark background.
2. The architectural blueprint lines in Act II and the cartographic river/elevation contours in Act III benefit from higher contrast strokes (`#F5E2B3`, `#E6CA85`, `#60A5FA`) and luminous filters to pop vibrantly against the dark `#0C131D` canvas.

## Tasks
1. Edit `src/components/map/PalaceToMapFinale.tsx`:
   - Change `overflow-hidden` on `<section>` to `overflow-visible lg:overflow-visible`.
   - Boost blueprint SVG stroke contrast, glows, and coordinate markers.
   - Ensure Act IV landmark pins have high contrast and clear z-indexes.
2. Re-run `node scripts/verify_map_finale.js` across desktop, tablet, and mobile to verify all 5 acts render visibly with zero blank frames.
3. Update `01-VERIFICATION.md` and generate `01-SUMMARY.md`.
