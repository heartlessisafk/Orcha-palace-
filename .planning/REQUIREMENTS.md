# Requirements: Orchha Resort Website Repair & Upgrade

**Defined:** 2026-10-26  
**Core Value:** Flawless visual coherence, physical scroll choreography, authentic imagery, and functional room explorations.

## v1 Requirements

### Phase 1: Palace-to-Map Finale Repair

- [x] **MAP-01**: Section is visible immediately upon scrolling down into the section without rendering as a blank dark void.
- [x] **MAP-02**: CSS sticky pinning functions reliably across all viewports (`lg:sticky top-0 h-screen`) by ensuring no parent container possesses `overflow-hidden`.
- [x] **MAP-03**: Act I displays authentic architectural photo with text *"Beyond the Ordinary — Discover Orchha"*.
- [x] **MAP-04**: Act II desaturates photo into black-and-white, revealing Inversa coordinate grid and gold architectural line-art blueprint.
- [x] **MAP-05**: Act III reveals vector cartographic canvas of Orchha with Betwa River channel, island branch, and elevation contours.
- [x] **MAP-06**: Act IV displays 7 verified historical landmark markers with interactive click/tap inspector card.
- [x] **MAP-07**: Act V reveals final closing card *"Your next chapter begins here."* with "Book Your Stay" CTA smoothly scrolling to booking controls.
- [x] **MAP-08**: Reverse scrolling functions bi-directionally without blank frames, jumps, or layout shifts.

### Phase 2: Guest Love Experience Repair

- [x] **REV-01**: Review cards are properly centered within the viewport rather than clipped or stuck against the left screen edge.
- [x] **REV-02**: Pinned track correctly sequences all 4 authentic guest reviews with alternating directional choreography (Card 1 exits left, Card 2 enters from right, Card 3 enters from left, Card 4 enters from right).
- [x] **REV-03**: Responsive layout on mobile and tablet displays a clean swipeable carousel or stacked layout with clear touch targets.
- [x] **REV-04**: Bi-directional scrolling reverses smoothly without card overlap or clipping.

### Phase 3: Accommodation Image Corrections

- [x] **ROOM-IMG-01**: Standard Room card and details display genuine heritage bedroom interior (`room-deluxe-interior-panoramic.jpg`).
- [x] **ROOM-IMG-02**: Deluxe Room card displays genuine pool-view bedroom with king bed and damask runner (`room-deluxe-king-pool-view.jpg`).
- [x] **ROOM-IMG-03**: Deluxe AC Swiss Tent card displays genuine luxury tent interior with traditional floral block-print canvas walls (`room-tent-interior-canopy.jpg`).
- [x] **ROOM-IMG-04**: Royal Suite card displays genuine royal living salon with carved heritage furniture (`room-suite-heritage-living.jpg`).
- [x] **ROOM-IMG-05**: Zero generic stock placeholders (`isStagingPlaceholder: false`) across all room assets.

### Phase 4: Functional Room-Detail Pages

- [x] **ROOM-PAGE-01**: Dedicated `/rooms` overview listing all verified room categories with pricing, capacity, and direct detail links.
- [x] **ROOM-PAGE-02**: Dedicated `/rooms/[slug]` dynamic routes for `standard-room`, `deluxe-room`, `deluxe-swiss-tent`, and `royal-heritage-suite`.
- [x] **ROOM-PAGE-03**: Each room page includes high-res photo gallery (bedroom, bathroom, exterior view, amenities), verified specifications (sq ft, bed type, view, occupancy), comprehensive amenities list, and instant "Reserve This Room" CTA connecting to booking drawer/modal.
- [x] **ROOM-PAGE-04**: Next.js static params pre-rendering with full SEO metadata and OpenGraph tags.

### Phase 5: Gallery Layout & Cinematic Scroll Transitions

- [x] **GAL-01**: Refined `/gallery` route with sticky category filter bar that stays accessible as visitors scroll.
- [x] **GAL-02**: Smooth scroll-triggered entry animations and editorial masonry layout with consistent spacing and aspect ratios.
- [x] **GAL-03**: Lightbox modal includes full keyboard controls (`ArrowLeft`, `ArrowRight`, `Escape`), touch swipe support, zoom toggle, and camera metadata tray.
- [x] **GAL-04**: Zero image distortion or aspect ratio deformation across viewport changes.

### Phase 6: Integration & Verification

- [x] **VERIF-01**: `npm run type-check` passes with 0 errors.
- [x] **VERIF-02**: `npm run build` statically pre-renders all routes (`/`, `/about`, `/spa`, `/weddings`, `/gallery`, `/rooms`, `/rooms/[slug]`).
- [x] **VERIF-03**: End-to-end browser verification across Desktop (1440px), Tablet (768px), and Mobile (390px) via CDP automation with screenshots captured in `audit/screenshots/`.
- [x] **VERIF-04**: Zero console errors or unhandled exceptions across all tested pages.
