---
phase: 11-carto-voyager-light-map-and-api-integration
plan: 01
subsystem: map/cartography/carto-voyager
tags: [carto, voyager, light-map, leaflet, api-key, env-security]
provides:
  - Permanent CARTO Voyager light map styling
  - Removal of dark mode map and style toggle control
  - Environment variable authentication wiring (NEXT_PUBLIC_CARTO_API_KEY / VITE_CARTO_API_KEY)
  - Full landmark explorer and 7 heritage attractions preservation
affects: [RealOrchhaMap, next.config.ts, .env.local]
duration: 20min
completed: true
---

# Phase 11 Plan: CARTO Voyager Light Map Implementation & Authentication Architecture

## Objective
Establish CARTO Voyager (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`) as the permanent default light map style, eliminate the dark basemap and style toggle control, ensure secure client-side environment variable resolution, and preserve all 7 heritage landmarks, custom markers, zoom controls, and responsive layout.

## Tasks
1. **API Key & Environment Configuration**:
   - Support `NEXT_PUBLIC_CARTO_API_KEY` and `VITE_CARTO_API_KEY` in `next.config.ts`.
   - Ensure `.env.local` is ignored in `.gitignore`.
   - Prevent exposure of key values in client logs or git commits.

2. **Permanent CARTO Voyager Basemap**:
   - Update `RealOrchhaMap.tsx` to directly request Voyager tiles with optional `?key=` parameter.
   - Remove `mapStyle` state and style toggle button from floating controls.
   - Refine vignette overlay so light basemap colors (Betwa River, roads, terrain) render with high contrast and clarity.

3. **Functionality Preservation**:
   - Maintain all 7 landmarks (The Orchha Resort, Royal Cenotaphs, Orchha Fort, Ram Raja Temple, Chaturbhuj Temple, Laxmi Narayan Temple, Betwa Sanctuary).
   - Maintain category filtering, landmark selection, flyTo camera motions, zoom buttons, and inspector card.

4. **Automated Verification**:
   - CDP script testing tile requests, style toggle absence, landmark interactivity, filter switching, and responsive viewport checks on Desktop and Mobile.
