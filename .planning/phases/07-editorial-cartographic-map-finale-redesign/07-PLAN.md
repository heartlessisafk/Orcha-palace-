---
phase: 07-editorial-cartographic-map-finale-redesign
plan: 01
subsystem: animation/cartography
tags: [cartography, framer-motion, luxury-editorial, anti-collision, svg-map, responsive]
provides:
  - Museum-quality antique-contemporary heritage cartographic finale
  - Strict 5-stage non-overlapping scroll choreography
  - Absolute zero headline and label collisions via dedicated callout zones
  - Authentic Betwa River geometry with island bifurcation and historic bridge
  - Restrained Bundelkhand star/crest resort focal point
  - Seamless final booking invitation integration
affects: [PalaceToMapFinale, orchha-map]
tech-stack:
  added: []
  patterns: [quadrant-based cartographic callouts, clamped framer-motion keyframes, responsive svg cartography]
key-files:
  created: [scripts/verify_map_redesign.js]
  modified: [src/data/orchha-map.ts, src/components/map/PalaceToMapFinale.tsx, .planning/ROADMAP.md, .planning/STATE.md]
key-decisions:
  - Replace generic AI-dashboard pill markers with archival survey hairline leader lines and editorial serif labels.
  - Separate Stage A (Headline lift/exit) and Stage C (Map reveal) with explicit non-overlapping domains (`[0.00, 0.14]` exit for headline, `0.28+` entry for map).
  - Geometrically isolate East Bank (Resort & Cenotaphs) from West Bank (Ram Raja, Chaturbhuj, Laxmi) and Central Island (Fort) to guarantee 0 label bounding-box collisions.
  - Replace cartoonish blue ribbon with authentic slate-indigo Betwa riverbed featuring island bifurcation, shoals, and stone bridge.
  - Dock landmark detail inspector in a calm corner card rather than cluttering canvas with floating badges.
duration: 25min
completed: pending
---

# Phase 7 Plan: Editorial Cartographic Map Finale Redesign

## Objective
Eliminate the AI-dashboard aesthetic from the palace-to-map finale and create a cinematic, credible, luxury cartographic experience inspired by antique heritage cartography and contemporary editorial luxury design.

## Identified Defects & Solutions
1. **Headline Collision**:
   - *Defect*: The "Discover Orchha" headline remains layered on top of or behind the map.
   - *Fix*: Headline exits cleanly in Stage A (`[0.00, 0.12] -> [1.0, 0.0]`, translateY `-60px`). At scroll `>= 0.14`, set `display: none` / `pointerEvents: none` / `visibility: hidden`. Map canvas only emerges at `0.28+`.
2. **Landmark Label Overlaps**:
   - *Defect*: Pill badges physically overlap (e.g. Resort at 64% x 56% vs Kanchan Ghat at 61% x 48%; Ram Raja vs Chaturbhuj).
   - *Fix*: Quadrant-based leader line layout:
     - The Orchha Resort: Prominent Bundela star crest on East Bank (`68% x 50%`) with dedicated right-aligned serif callout.
     - Kanchan Ghat & 14 Royal Cenotaphs: Southeast Bank (`68% x 74%`).
     - Orchha Fort & Jahangir Mahal: Central Island (`50% x 26%`) with north callout.
     - Ram Raja Temple: West Bank town square (`24% x 38%`) with west callout.
     - Chaturbhuj Temple: West Bank southwest (`24% x 58%`) with southwest callout.
     - Laxmi Narayan Temple: Northwest hill (`18% x 16%`) with northwest callout.
     - All labels have fixed non-overlapping bounding zones.
3. **River Representation**:
   - *Defect*: Oversized neon-blue ribbon.
   - *Fix*: Authentically contoured Betwa River path (`#112538` base, `#17344F` water, subtle `#2D5D86` shoreline ripple contours), island bifurcation around Orchha Fort, and historic Bundela stone bridge.
4. **AI-Dashboard Clutter**:
   - *Defect*: Radar pings (`animate-ping`), floating distance badges, generic colored pills.
   - *Fix*: Fine hairline leader pins, restrained serif typography, quiet corner inspector card, and antique Bundelkhand cartouche & compass rose.
5. **Disconnected Black Bottom Panel**:
   - *Defect*: Abrupt jarring transition to CTA.
   - *Fix*: Integrated Stage E transition where the map canvas recedes gently and an understated, warm gold-accented booking invitation card rises smoothly into view.

## Execution Tasks
1. **Update `src/data/orchha-map.ts`**:
   - Adjust `mapCoords` for exact anti-collision quadrant spacing.
   - Add leader line angles/orientations (`calloutAlign: "left" | "right" | "top"`).
2. **Redesign `src/components/map/PalaceToMapFinale.tsx`**:
   - Implement strict scroll keyframe staging.
   - Stage A: Resort photo & headline exit.
   - Stage B: Architectural line-art blueprint.
   - Stage C & D: Archival cartographic canvas with authentic Betwa River, island bifurcation, bridge, contour lines, compass rose, and anti-collision callouts.
   - Stage E: Integrated luxury booking invitation.
   - Responsive Mobile/Tablet layout.
3. **Automated Verification Script (`scripts/verify_map_redesign.js`)**:
   - CDP tests verifying headline visibility state at all scroll positions.
   - Automated collision check testing 100% pairwise non-intersection of landmark bounding boxes.
   - Viewport checks across Desktop (1440px), Tablet (768px), and Mobile (390px).
   - Capture high-resolution verification screenshots.
4. **Type-Check & Build Verification**:
   - `npm run type-check` (0 errors).
   - `npm run build` (Clean production build).
