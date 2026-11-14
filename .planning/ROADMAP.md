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
- [x] **Phase 10: Booking Experience Redesign & Hero Text Legibility Refinement** — Replace awkward floating scroll booking with an integrated luxury reservation suite, eliminate overlapping and background bleed, implement proper modal scroll locking, and add a luxury translucent editorial surface behind hero text for pristine contrast. (completed 2026-11-02)
- [x] **Phase 11: CARTO Voyager Light Map Implementation & Authentication Architecture** — Eliminate dark basemap and style toggle, establish CARTO Voyager as the permanent default light map style, configure environment variable mapping (`NEXT_PUBLIC_CARTO_API_KEY` / `VITE_CARTO_API_KEY`) with zero logging or git leaks, preserve all 7 heritage landmarks and interactions, and verify in browser. (completed 2026-11-02)

---

## Milestone 2: Major Professional Design & Engineering Upgrade

A seven-phase execution roadmap establishing top-tier design craft, slop-free aesthetics, universal 3D button interactions, and rigorous accessibility across the entire Orchha Resort website.

### Seven-Phase Roadmap
- [x] **Phase 12 (Upgrade Phase 1): Project Preparation, Skill Integration & Baseline Protection** — Initialize GSD milestone state, install and verify all 5 design skills (`frontend-design`, `impeccable`, `taste-skill`, `ui-ux-pro-max`, `web-design-guidelines`) in `.agents/skills/`, establish permanent rules (`GEMINI.md`, `AGENTS.md`), and secure a verified Git baseline. (completed 2026-11-14)
- [ ] **Phase 13 (Upgrade Phase 2): Design Token Architecture, Luxury Typography & Color Harmonies** — Formalize `DESIGN.md`, refine palette tokens (Bundelkhand gold, deep royal navy, warm beige, pristine stone), enforce strict typographic scale and line-height discipline, and banish templated fonts.
- [ ] **Phase 14 (Upgrade Phase 3): Universal Tactile Button & Micro-Interaction System** — Implement consistent, tactile 3D hover interactions (Z-elevation, gilded ambient drop shadows, active press state) across every button on the website with 100% preservation of existing click/keyboard behaviors.
- [ ] **Phase 15 (Upgrade Phase 4): Hero Section & Reservation Suite Visual Elevation** — Elevate hero entrance choreography and editorial layout using `taste-skill` and `impeccable` guidelines; polish the in-flow Reservation Sanctuary Suite with subtle glass reflections and tactile steppers.
- [ ] **Phase 16 (Upgrade Phase 5): Accommodation Cards & Dynamic Room Details Refinement** — Refine room cards on `/` and `/rooms` with tactile depth and editorial spec typography; polish dynamic `/rooms/[slug]` suites with immersive gallery carousels and direct WhatsApp concierge booking.
- [ ] **Phase 17 (Upgrade Phase 6): Visual Storytelling, Heritage About & Media Experiences Polish** — Polish `/gallery` masonry and 3-at-a-time reveal; refine `/about`, `/weddings`, and `/spa` with bespoke editorial typography and luxury layout rhythm while strictly preserving all real photographs.
- [ ] **Phase 18 (Upgrade Phase 7): End-to-End Performance, Accessibility Audit & Production Hardening** — Full audit against Vercel Web Interface Guidelines (ARIA, keyboard navigation, visible focus rings, zero layout shift); verify Desktop, Tablet, and Mobile responsiveness; complete production build verification.

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

### Phase 10: Booking Experience Redesign & Hero Text Legibility Refinement

**Goal**: Redesign the booking experience into a seamless, integrated luxury reservation suite with zero section overlaps and full scroll locking, and introduce a sophisticated translucent editorial surface behind the hero text to guarantee crisp contrast and legibility.  
**Depends on**: Phase 9  
**Requirements**: BOOKING-01, BOOKING-02, HERO-LEGIBILITY-01, MODAL-01  
**Success Criteria**:

1. Hero location kicker, serif headline, and description render with high contrast and crystal-clear readability against all background photography.
2. Background photograph remains visually prominent and unobstructed.
3. Booking section transitions naturally from the hero with no floating overlap, no background bleed-through, and no unexpected margins.
4. Booking panel occupies appropriate container width aligning with the luxury layout grid.
5. Search inputs support check-in/out dates, guest counts, room counts, and preferred category.
6. Handoff modal or inline view implements full body scroll locking, background containment, and keyboard accessibility.
7. WhatsApp concierge and direct email reservation handoffs remain 100% operational.
8. Zero horizontal overflow across Desktop, Tablet, and Mobile with clean production build.

### Phase 11: CARTO Voyager Light Map & API Integration

**Goal**: Configure valid CARTO API key, make CARTO Voyager light raster tiles the permanent default map style, and eliminate all API KEY REQUIRED watermarks across the map.  
**Depends on**: Phase 10  
**Requirements**: CARTO-API-01, VOYAGER-01, WATERMARK-ELIM-01  
**Success Criteria**:

1. `NEXT_PUBLIC_CARTO_API_KEY` configured securely in `.env.local` and `.gitignore`.
2. CARTO Voyager raster tiles configured as permanent default at `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=...`.
3. Zero watermarks across the map; clean geographical roads, river curves, and terrain rendered.
4. All 7 landmarks, custom pins, category filters, and camera `flyTo` transitions verified intact.

---

## Milestone 2: Major Professional Design & Engineering Upgrade

### Phase 12: Project Preparation, Skill Integration & Baseline Protection

**Goal**: Download and locally install 5 world-class design intelligence skills, establish non-negotiable preservation rules, and capture clean Git baseline.  
**Depends on**: Phase 11  
**Requirements**: GSD-SKILLS-01, PRESERVE-RULES-01, BASELINE-CHECK-01  
**Success Criteria**:

1. All 5 skills verified in `.agents/skills/` (`frontend-design`, `impeccable`, `taste-skill`, `ui-ux-pro-max`, `web-design-guidelines`).
2. Permanent project preservation rules recorded in `GEMINI.md`, `AGENTS.md`, and `.agents/rules/project-preservation-rules.md`.
3. Seven-phase upgrade roadmap established in `.planning/`.
4. Clean production build and type-check verified.

### Phase 13: Comprehensive Codebase Mapping, Route Audit, Animation Inventory & Baseline Visual Capture

**Goal**: Understand the entire existing website before changing its design or code. Perform a full codebase mapping, multi-viewport audit of all 10 pages, build an exhaustive animation inventory, verify all 109 image assets with zero missing files, test interactive workflows, capture 30 baseline screenshots, and establish a strict 10-point regression checklist.  
**Depends on**: Phase 12  
**Requirements**: AUDIT-MAP-01, ANIM-INVENTORY-01, ASSET-AUDIT-01, BASELINE-CAPTURE-01, REGRESSION-CHECK-01  
**Success Criteria**:

1. Complete architectural dependency map established for framework, routes, components, and data stores.
2. Multi-viewport audit across Desktop (1440px), Tablet (768px), and Mobile (390px) confirms 0 horizontal overflow across all 10 routes.
3. Exhaustive animation inventory documents triggers, easing, durations, initial/final states, and mobile behavior for all 7 key motion systems.
4. Asset audit confirms 109 unique images on disk with exactly 0 missing references in `src/`.
5. Interactive tests verify reservation modal scroll lock, CARTO Voyager map tiles, and gallery 3-at-a-time reveal.
6. 30 full-page baseline screenshots captured in `audit/screenshots/phase2_baseline/`.
7. 10-point non-negotiable regression checklist formulated.

### Phase 14: Design Token Architecture, Luxury Typography & Color Harmonies

**Goal**: Establish the canonical design system for Orchha Resort by coordinating the five installed skills. Define design tokens, typography scales, photography direction, shared component contracts, and motion language in an authoritative `DESIGN.md`.  
**Depends on**: Phase 13  
**Requirements**: TOKEN-SYS-01, TYPO-SYS-01, PHOTO-DIR-01, COMP-CONTRACT-01, MOTION-LANG-01  
**Success Criteria**:

1. Canonical `DESIGN.md` created in project root covering royal heritage identity, anti-slop rules, and tokens.
2. Semantic color palette verified with WCAG AA contrast (Midnight Navy, Deep Navy, Heritage Linen, Muted Sand, Canvas, Antique Gold/Bronze).
3. Synchronized Tailwind configuration (`shadow-gold-ambient`, `shadow-modal`) and CSS variables (`--color-brand-gold-dark`).
4. Typography hierarchy established pairing `Crimson Text` and `DM Sans` with line length constraints (< 80ch).
5. Photography direction defined across 6 core subject dimensions; zero stock photo policy strictly enforced.
6. Universal tactile 3D button hover contract and collision-proof Z-index scale established.
7. Existing working animations (Palace-to-Map, CARTO Voyager, Guest Love, Gallery reveal) 100% preserved.
8. Clean Next.js build and type-check verified.

### Phase 15: Universal Tactile Button & Micro-Interaction System

**Goal**: Implement a reusable, GPU-accelerated 3D tactile interaction system for every interactive button and clickable control across the website, preserving all existing handlers, routing, and accessibility.  
**Depends on**: Phase 14  
**Requirements**: BUTTON-3D-01, TACTILE-HOOK-01, SHEEN-OVERLAY-01, ACCESSIBLE-TOUCH-01  
**Success Criteria**:

1. Centralized `useTactile3D` hook created with zero layout recalculation overhead.
2. Universal `Button.tsx` upgraded with perspective tilt (±6°), 4px elevation, dynamic sheen overlay, and tactile press compression (`scale: 0.975`).
3. Upgraded controls across reservation dock, gallery filter pills, "Discover More" progressive trigger, map controls, room detail carousel/thumbs, and spa selections.
4. Touch devices supported with clean press feedback without hover tilt; `prefers-reduced-motion` respected.
5. Automated CDP verification confirms 3D matrix transform, booking modal trigger, body scroll lock, and zero mobile overflow.
6. Clean Next.js build and type-check verified.

### Phase 16: Hero Section & Reservation Suite Visual Elevation

**Goal**: Elevate hero entrance choreography and editorial layout using `taste-skill` and `impeccable` principles. Polish the in-flow Reservation Sanctuary Suite.  
**Depends on**: Phase 15  

### Phase 17: Accommodation Cards & Dynamic Room Details Refinement

**Goal**: Refine room cards on `/` and `/rooms` with tactile depth, editorial spec typography, and subtle image zoom. Enhance dynamic room pages (`/rooms/[slug]`).  
**Depends on**: Phase 16  

### Phase 18: Storytelling, Gallery, Media Experiences Polish & Final Production Hardening

**Goal**: Refine `/gallery` masonry and 3-at-a-time reveal. Polish `/about`, `/weddings`, and `/spa` with bespoke editorial layouts. Complete Web Interface Guidelines audit and final production verification.  
**Depends on**: Phase 17
