# Roadmap: The Orchha Resort Redesign & Upgrade

## Overview

A comprehensive 6-phase engineering and creative refinement plan addressing animation rendering defects, layout positioning bugs, asset mapping fidelity, dedicated accommodation detail experiences, and gallery presentation.

## Phases

- [x] **Phase 1: Fix Blank Palace-to-Map Animation** — Eliminate sticky-breaking CSS overflow, fix layer transforms and visibility, verify 5-act animation in browser. (completed 2026-10-26)
- [x] **Phase 2: Fix Guest Review Cards Stuck on Left** — Diagnose positioning, width, and scroll-driver in `GuestLoveExperience.tsx`, restore alternating left-right card animation. (completed 2026-10-26)
- [x] **Phase 3: Accommodation Image Corrections** — Verify and map genuine photos to Standard Heritage Room, Deluxe Room, Deluxe Swiss Tent, and Royal Suite without mismatches. (completed 2026-10-26)
- [x] **Phase 4: Functional Room-Detail Pages** — Implement dedicated dynamic routes (`/rooms/[slug]` and `/rooms`) with photo gallery, room specs, amenities, floor plans/views, and booking actions. (completed 2026-10-26)
- [x] **Phase 5: Gallery Layout & Cinematic Scroll Transitions** — Refine `/gallery` with sticky header, cinematic smooth scroll transitions, and enhanced lightbox interactions. (completed 2026-10-26)
- [x] **Phase 6: Integration, Responsive Behavior, Accessibility & Final Verification** — Complete browser verification across Desktop (1440px), Tablet (768px), and Mobile (390px), ensure `prefers-reduced-motion` compliance, 0 console errors, clean production build. (completed 2026-10-26)
- [x] **Phase 7: Editorial Cartographic Map Finale Redesign** — Eliminate AI-dashboard aesthetic, enforce strict non-overlapping stages, authentic Betwa River geography, anti-collision typography, and seamless booking invitation. (completed 2026-10-27)
- [x] **Phase 8: Premium Interaction & Motion System and Gallery Refinement** — Implement tactile hover and selection system across all tiles, expressive typography entrance reveals, deduplicate gallery manifest, and rebuild gallery into progressive 3-at-a-time reveal. (completed 2026-10-27)
- [x] **Phase 9: Real Geographic Scroll Map and Tourist Landmark Explorer** — Replace artificial vector map with a real Leaflet-powered geographic basemap (CARTO dark tiles), verified WGS-84 coordinates for resort & top attractions, synchronized landmark explorer, and 5-stage cinematic homepage scroll finale. (completed 2026-10-29)

## Phase Details

### Phase 1: Fix Blank Palace-to-Map Animation

**Goal**: Restore fully visible, physically coherent 5-act scroll transformation from architectural photo to cartographic map and booking invitation.  
**Depends on**: Nothing (first phase)  
**Requirements**: MAP-01, MAP-02, MAP-03, MAP-04, MAP-05, MAP-06, MAP-07, MAP-08  
**Success Criteria**:

1. Section renders visible content immediately without dark blank voids.
2. Sticky pinning (`lg:sticky top-0 h-screen`) locks firmly during the 450vh scroll track.
3. Act I photo transitions into Act II line-art and Act III vector cartographic map.
4. Location markers and inspection cards respond to clicks.
5. Act V closing card provides working "Book Your Stay" CTA.

### Phase 2: Fix Guest Review Cards Stuck on Left

**Goal**: Repair `GuestLoveExperience.tsx` so cards are centered and execute alternating left-right scroll choreography.  
**Depends on**: Phase 1  
**Requirements**: REV-01, REV-02, REV-03, REV-04  
**Success Criteria**:

1. Cards are centered horizontally within the viewport.
2. Alternating scroll animation (Card 1 exits left, Card 2 enters right, Card 3 enters left, Card 4 enters right).
3. Mobile and tablet layouts render clean swipeable cards.

### Phase 3: Accommodation Image Corrections

**Goal**: Ensure authentic, verified resort photography is mapped accurately to all room types without generic stock.  
**Depends on**: Phase 2  
**Requirements**: ROOM-IMG-01, ROOM-IMG-02, ROOM-IMG-03, ROOM-IMG-04, ROOM-IMG-05  
**Success Criteria**:

1. Standard Room, Deluxe Room, Swiss Tent, and Suite cards render distinct genuine photographs.
2. All room image keys resolve to local curated assets in `public/images/resort/curated/rooms/`.

### Phase 4: Functional Room-Detail Pages

**Goal**: Create dedicated room routes (`/rooms` and `/rooms/[slug]`) with specifications, amenities, and booking triggers.  
**Depends on**: Phase 3  
**Requirements**: ROOM-PAGE-01, ROOM-PAGE-02, ROOM-PAGE-03, ROOM-PAGE-04  
**Success Criteria**:

1. Visiting `/rooms` renders full accommodations index.
2. Visiting `/rooms/deluxe-room`, `/rooms/deluxe-swiss-tent`, `/rooms/royal-heritage-suite`, `/rooms/standard-room` renders dedicated rich pages.
3. Next.js static params pre-renders all 4 room routes.

### Phase 5: Gallery Layout & Cinematic Scroll Transitions

**Goal**: Elevate `/gallery` into a structured, cinematic scrolling experience with sticky filters and refined lightbox.  
**Depends on**: Phase 4  
**Requirements**: GAL-01, GAL-02, GAL-03, GAL-04  
**Success Criteria**:

1. Category filters remain sticky on scroll.
2. Image grid renders with fluid responsive transitions.
3. Lightbox supports smooth keyboard and touch swipe navigation.

### Phase 6: Integration, Responsive Behavior, Accessibility & Final Verification

**Goal**: Complete end-to-end audit, type-checking, build verification, and multi-device browser testing.  
**Depends on**: Phase 5  
**Requirements**: VERIF-01, VERIF-02, VERIF-03, VERIF-04  
**Success Criteria**:

1. `npm run type-check` passes with 0 errors.
2. `npm run build` succeeds with all static routes pre-rendered.
3. CDP browser verification confirms 0 console errors and clean rendering across Desktop, Tablet, and Mobile.

### Phase 7: Editorial Cartographic Map Finale Redesign

**Goal**: Transform the palace-to-map finale into a museum-quality heritage cartographic experience with zero headline collisions, non-overlapping typography, authentic Betwa River geography, and seamless booking invitation integration.  
**Depends on**: Phase 6  
**Requirements**: MAP-REDESIGN-01, MAP-REDESIGN-02, MAP-REDESIGN-03, MAP-REDESIGN-04  
**Success Criteria**:

1. Stage A headline completely exits before Stage C map reveals (`opacity: 0`, `visibility: hidden` above 0.14 scroll).
2. Zero label collisions: all landmark markers and text callouts have non-overlapping bounding zones.
3. Realistic Betwa River channel with fort island bifurcation, historic bridge, and archival survey styling.
4. Museum-quality antique-contemporary palette (`#0A1018`, `#C5A059`, `#D4C3A3`, `#16283D`).
5. Working booking invitation and responsive layouts verified on Desktop, Tablet, and Mobile.

### Phase 8: Premium Interaction & Motion System and Gallery Refinement

**Goal**: Implement a tactile, luxury hover and selection system across all tiles, expressive typography entrance reveals, eliminate gallery duplicates, and rebuild the gallery into a 3-photos-at-a-time progressive reveal experience.  
**Depends on**: Phase 7  
**Requirements**: INTERACT-01, INTERACT-02, TYPO-01, GAL-DEDUP-01, GAL-PROG-01  
**Success Criteria**:

1. Interactive tiles (room, amenity, spa, wedding, dining) lift smoothly (3-5px), scale subtly (1.015), and zoom internal images without layout reflow.
2. Distinct selection states with press response (`scale: 0.985`) and accessible focus/aria states.
3. Expressive typography entrance reveals for headings and paragraphs with luxury cubic-bezier easing.
4. Gallery deduplication removes duplicate entries (`orchha-photo-016`), retaining 48 unique verified photos with documented inventory.
5. Gallery displays initial 3 photos per category, revealing next 3 on "Discover More" until category is exhausted.
6. Full verification across Desktop, Tablet, Mobile with 0 errors and clean production build.

### Phase 9: Real Geographic Scroll Map and Tourist Landmark Explorer

**Goal**: Replace the invented vector map with a real, geographically grounded Leaflet map with authentic CARTO tiles, verified WGS-84 coordinates for The Orchha Resort and surrounding heritage attractions, a synchronized landmark explorer, and a 5-stage cinematic homepage finale.  
**Depends on**: Phase 8  
**Requirements**: REAL-MAP-01, REAL-MAP-02, LANDMARK-EXP-01, MOTION-01, FINALE-01  
**Success Criteria**:

1. Real interactive map renders authentic Orchha geography, real roads, and true Betwa River bends with zero artificial geometry.
2. Verified WGS-84 coordinates applied to The Orchha Resort (25.344842, 78.639536) and 6 surrounding heritage landmarks.
3. Synchronized landmark list with category filtering, tactile hover states, and camera `flyTo` transitions.
4. Primary luxury marker treatment for The Orchha Resort and refined consistent styling for tourist landmarks.
5. Non-conflicting map gestures (`scrollWheelZoom: false`, responsive drag/touch pan and zoom controls).
6. 5-stage scroll finale cleanly transitions from resort introduction into the real map and ends with the luxury booking invitation.
7. Verification across Desktop, Tablet, Mobile with 0 console errors and clean production build.
