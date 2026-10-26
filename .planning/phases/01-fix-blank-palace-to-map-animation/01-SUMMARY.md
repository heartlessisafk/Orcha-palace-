---
phase: 01-fix-blank-palace-to-map-animation
plan: 01
subsystem: animation/map
tags: [framer-motion, sticky-scroll, svg, css-overflow]
provides:
  - Repaired sticky container in PalaceToMapFinale.tsx
  - High-contrast architectural blueprint SVG line-art
  - Dynamic Betwa river and cartographic contours
  - 9 automated CDP visual verification screenshots
affects: [PalaceToMapFinale]
tech-stack:
  added: []
  patterns: [css position:sticky with overflow-visible parent, framer-motion clamped transforms]
key-files:
  created: []
  modified: [src/components/map/PalaceToMapFinale.tsx]
key-decisions:
  - Removed overflow-hidden from section#map-experience to restore CSS position:sticky.
  - Boosted blueprint line stroke weights, colors (#F5E2B3), and drop-shadows.
duration: 15min
completed: 2026-10-27
---

# Phase 1 Summary: Fix Blank Palace-to-Map Animation

**Restored fully visible, physically coherent 5-act scroll transformation from monumental architecture photo to cartographic map and booking invitation.**

## Performance
- **Duration:** 15 min
- **Tasks:** 2 completed
- **Files modified:** 1 (`src/components/map/PalaceToMapFinale.tsx`)

## Accomplishments
- Fixed CSS sticky ancestor clipping bug (`overflow-hidden` -> `overflow-visible`).
- Enhanced SVG blueprint lines, coordinates, and Betwa river gradient for brilliant visual contrast against dark canvas.
- Verified across 1440px desktop, 768px tablet, and 390px mobile viewports with zero console errors and zero horizontal overflow.

## Visual Verification Artifacts
- `audit/screenshots/map_01_desktop_opening.png` (Act I)
- `audit/screenshots/map_02_desktop_line_art_blueprint.png` (Act II)
- `audit/screenshots/map_03_desktop_cartographic_map.png` (Act III)
- `audit/screenshots/map_04_desktop_location_markers.png` (Act IV)
- `audit/screenshots/map_05_desktop_marker_inspect.png` (Act IV Interactive)
- `audit/screenshots/map_06_desktop_final_cta.png` (Act V)
- `audit/screenshots/map_07_tablet_view.png` (Tablet)
- `audit/screenshots/map_08_mobile_view.png` & `map_09_mobile_inspect.png` (Mobile)

## Next Phase Readiness
Phase 1 complete. Ready to proceed to Phase 2: Fix Guest Review Cards Stuck on Left.
