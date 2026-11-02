---
phase: 11-carto-voyager-light-map-and-api-integration
status: completed
date: 2026-11-02
subsystem: map/cartography/carto-voyager
tags: [carto, voyager, light-map, leaflet, api-key, env-security]
---

# Phase 11 Summary: CARTO Voyager Light Map Implementation & Authentication Architecture

## Achievements
1. **Permanent CARTO Voyager Default**:
   - Updated `src/components/map/RealOrchhaMap.tsx` to use `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`.
   - Completely removed `dark_all` tiles and removed the "Dark Atlas / Daylight Voyager" toggle button from floating controls.
   - Refined the map overlay from a dark radial vignette to a clean `shadow-[inset_0_0_20px_rgba(8,13,21,0.2)]`, allowing the natural geographical colors (roads, Betwa River, terrain, greenery) of Orchha to shine through.
   - High-contrast custom markers with dark navy/charcoal background (`#0B131E`), gold borders (`#C5A059`), and crisp white typography pop clearly against the light basemap.

2. **Environment Variable & Security Architecture**:
   - `next.config.ts` wires both `NEXT_PUBLIC_CARTO_API_KEY` and `VITE_CARTO_API_KEY` into client environment.
   - `.env.local` created and confirmed excluded by `.gitignore` (line 27: `.env*.local`).
   - Zero hardcoding of API keys in repository files; zero exposure in logs.

3. **Functionality 100% Intact**:
   - All 7 heritage landmarks and verified coordinates preserved.
   - Interactive category filtering ("All Landmarks", "Sanctuary", "Palaces & Forts", "Temples", "Ghats & River") fully functional.
   - Smooth `flyTo` transitions and synchronized inspector card functioning seamlessly.
   - Floating zoom in (`+`), zoom out (`-`), and reset overview buttons operational.

4. **Automated Verification**:
   - Verified via `scripts/verify_voyager_map.js` running against live Chrome CDP instance.
   - Verified 43 network tile requests to CARTO Voyager endpoint.
   - Verified 0 console errors, 0 build errors (`npm run build` static generation for 14 pages).
   - Verified zero horizontal overflow on Desktop (1440px) and Mobile (390px).
