---
phase: 09-real-geographic-scroll-map-and-landmark-explorer
plan: 01
subsystem: map/cartography/homepage-finale
tags: [leaflet, real-geography, cartography, scroll-animation, landmark-explorer, tourist-attractions, orchha]
provides:
  - Real geographic interactive map of Orchha, MP using genuine map tiles (CARTO Dark Matter / Voyager)
  - 100% verified real geographic coordinates for The Orchha Resort and surrounding heritage attractions
  - Synchronized tourist landmark explorer with category filters and interactive selection
  - Smooth camera pan/flyTo transitions to authentic landmarks with zero geographic distortion
  - Luxury branded custom HTML markers with distinct primary styling for The Orchha Resort
  - Refined 5-stage cinematic homepage scroll finale with graceful transitions and booking invitation
affects: [PalaceToMapFinale, orchha-map, page]
tech-stack:
  added: [leaflet, @types/leaflet]
  patterns: [client-side map lifecycle management, real geographic coordinates, synchronized list-marker state, hardware-accelerated scroll choreography]
key-files:
  created: [src/components/map/RealOrchhaMap.tsx, scripts/verify_real_map.js]
  modified: [src/data/orchha-map.ts, src/components/map/PalaceToMapFinale.tsx, .planning/ROADMAP.md, .planning/STATE.md]
key-decisions:
  - Replace the synthetic SVG river illustration with a real Leaflet-powered geographic basemap using authentic CARTO dark/luxury raster tiles.
  - Anchor all markers strictly to verified WGS-84 latitude and longitude coordinates (OSM/Overpass verified): Orchha Resort (25.344842, 78.639536), Royal Chhatris (25.343750, 78.637725), Orchha Fort & Jahangir Mahal (25.350641, 78.644233), Ram Raja Temple (25.350839, 78.639798), Chaturbhuj Temple (25.350125, 78.639843), Laxmi Narayan Temple (25.352794, 78.630803).
  - Build a synchronized split/docked Landmark Explorer featuring category pills, tactile list items, active state halos, and detailed inspector cards with smooth flyTo camera motions.
  - Isolate map scroll-wheel zoom to avoid scroll trapping during homepage scrolling while preserving full drag, touch pan, and luxury zoom controls (+ / - / reset view).
  - Preserve the 5-stage scroll finale sequence leading into the final 'Stay close to the stories of Orchha' booking invitation.
duration: 45min
completed: pending
---

# Phase 9 Plan: Real Geographic Scroll Map and Tourist Landmark Explorer

## Objective
Completely eliminate the artificial, stylized vector map and replace it with a real, geographically grounded, interactive map of Orchha, Madhya Pradesh. Integrate real map tiles, authentic WGS-84 coordinates for the resort and top tourist attractions, a synchronized landmark explorer with category filtering, luxury marker treatments, and a cinematic 5-stage scroll sequence that transitions smoothly from guest reviews into the real geography and final booking invitation.

## Tasks
1. **Real Geographic Dataset & Coordinate Verification (`src/data/orchha-map.ts`)**:
   - Update data structures to store verified `[lat, lng]` coordinates (WGS-84) alongside factual historical narratives.
   - Set Orchha Resort coordinates to `25.344842, 78.639536` on the eastern riverbank.
   - Include 6 major tourist landmarks (Kanchan Ghat & 14 Royal Cenotaphs, Orchha Fort & Jahangir Mahal, Ram Raja Temple, Chaturbhuj Temple, Laxmi Narayan Temple, Betwa River Sanctuary).
   - Add category tagging: `resort`, `palace`, `temple`, `monument`, `river`.

2. **Real Interactive Map Engine (`src/components/map/RealOrchhaMap.tsx`)**:
   - Implement a Leaflet-powered client component with CARTO Dark Matter / Voyager tiles (`@2x` retina support).
   - Render custom luxury HTML markers with pure Tailwind CSS:
     - The Orchha Resort: Prominent Bundela star crest in luxury gold (`#C5A059`) with gentle ambient halo.
     - Heritage Monuments & Temples: Refined brass/gold ring markers with subtle badge icon and label.
   - Synchronize map view with selected landmark (`flyTo([lat, lng], 16)`).
   - Handle map gestures safely (`scrollWheelZoom: false` to allow natural page scroll, with explicit zoom controls and touch/drag panning).
   - Implement responsive layout for desktop, tablet, and mobile.

3. **Synchronized Tourist Landmark Explorer**:
   - Heading: "The Heritage Geography of Orchha"
   - Subtitle: "Discover the temples, royal architecture and river landscapes surrounding your stay."
   - Category filter pills: All, Sanctuary, Palaces & Forts, Temples, Ghats & River.
   - Interactive list with tactile hover lift, active selection border, and directional indicators.
   - Compact docked inspector card showing genuine photography, verified distance/walk time, historical era, and brief factual description.
   - Reset view button to return camera to the full Orchha overview (`[25.3485, 78.6395]`, zoom 14.8).

4. **Cinematic Homepage Finale Integration (`src/components/map/PalaceToMapFinale.tsx`)**:
   - Adapt the 5-stage scroll choreography:
     - Stage 1: Resort introduction with architectural photo and clean title reveal.
     - Stage 2: Cinematic image dissolve as the real geographic map emerges.
     - Stage 3: Real map camera settles and pins emerge in true coordinates.
     - Stage 4: Interactive exploration (landmark list, category filters, and map inspection).
     - Stage 5: Final luxury invitation ("Stay close to the stories of Orchha.") and functional "Book Your Stay" action.
   - Maintain full responsive support (Desktop 1440px, Tablet 768px, Mobile 390px).

5. **Automated Verification & GSD Delivery**:
   - Write CDP test script `scripts/verify_real_map.js` to verify:
     - Real map tiles loaded without errors.
     - Marker coordinates and click interactions.
     - List selection synchronization and camera `flyTo`.
     - 5-stage scroll transition and booking CTA.
     - Viewport tests (Desktop, Tablet, Mobile) with zero horizontal overflow.
   - Run `npm run type-check` and `npm run build`.
   - Capture proof screenshots and generate `09-VERIFICATION.md` and `09-SUMMARY.md`.
