---
phase: 08-premium-interaction-motion-system-and-gallery-curation
plan: 01
subsystem: interaction/motion/gallery
tags: [framer-motion, hover-polish, selection-state, typography-entrance, gallery-deduplication, progressive-reveal]
provides:
  - Global tactile tile hover & selection interaction system across all pages
  - Expressive typography entrance and line reveal utilities
  - Deduplicated gallery dataset (48 unique photos, zero repeated assets)
  - 3-photos-at-a-time progressive gallery reveal with staggered entrance motion
affects: [RoomCardPrimitive, Card, Button, GalleryViewer, photo-catalogue, Typography, TextReveal, AnimatedTypography]
tech-stack:
  added: []
  patterns: [hardware-accelerated transforms, progressive array slicing with Framer Motion, accessible aria-selected/expanded states]
key-files:
  created: [src/components/motion/InteractiveTile.tsx, src/components/motion/AnimatedTypography.tsx, audit/gallery-deduplication-inventory.md, scripts/verify_interactions_and_gallery.js]
  modified: [src/data/photo-catalogue.json, src/data/photo-catalogue.ts, src/components/gallery/GalleryViewer.tsx, src/components/rooms/RoomCardPrimitive.tsx, src/components/ui/Card.tsx, src/components/ui/Typography.tsx, .planning/ROADMAP.md, .planning/STATE.md]
key-decisions:
  - Establish a unified tactile tile interaction contract (3-5px lift, 1.01-1.02 scale, internal image zoom, directional glide) without causing layout shifts or neighbor reflow.
  - Exclude exact duplicate orchha-photo-016 (identical sha256 to orchha-photo-015) and enforce strict !p.isDuplicate && !p.isExcluded in GalleryViewer.
  - Implement progressive 3-at-a-time gallery disclosure with 'Discover More' button, animating only newly revealed triplets while keeping existing items pinned and stable.
  - Build reusable AnimatedHeadline and AnimatedParagraph components that execute clipped mask and translateY line reveals with luxury cubic-bezier easing.
duration: 35min
completed: pending
---

# Phase 8 Plan: Premium Interaction & Motion System and Gallery Refinement

## Objective
Upgrade the interaction quality of the entire Orchha Resort website. Every interactive tile should feel tactile and premium, every important text element should enter with character, and the gallery should be curated, duplicate-free, and progressively revealed in groups of three photographs.

## Tasks
1. **Interactive Tile Audit & Global Interaction System**:
   - Audit interactive tiles across homepage, rooms, spa, weddings, dining, about, and gallery.
   - Build `InteractiveTile` wrapper / enhance `Card` and `RoomCardPrimitive`:
     - Default hover: 3-5px upward lift, 1.015 scale, shadow deepening, subtle border warmth (`border-brand-gold/40`), internal image scale (`1.05`), secondary arrow glide (`translate-x-1`).
     - Selection state: subtle press (`scale: 0.985`), gold accent ring, accessible aria state.
     - Context-aware tuning for room cards, amenities, spa treatments, wedding venues, and gallery tiles.
     - Zero layout reflow or neighbor bouncing.
2. **Typography & Expressive Text Reveals**:
   - Create `AnimatedTypography.tsx` providing `AnimatedHeading` (clipped line/word entrance) and `AnimatedParagraph` (gentle line reveal).
   - Integrate with `Heading` and section headers across key pages.
   - Respect `prefers-reduced-motion` and ensure text is 100% visible and accessible without JavaScript or motion.
3. **Gallery Deduplication & Curation**:
   - Remove duplicate `orchha-photo-016` (sha256 matches `orchha-photo-015`).
   - Audit all 48 remaining curated photos across categories.
   - Produce `audit/gallery-deduplication-inventory.md` documenting image paths, categories, and duplicate resolutions.
   - Update `photo-catalogue.json` and `photo-catalogue.ts` to enforce `isExcluded: true` and `isDuplicate: true` on redundant items.
4. **Rebuild Gallery as 3-Photos-at-a-Time Progressive Reveal**:
   - Initial state: slice of first 3 unique photos in selected category.
   - "Discover More" action: increments visible slice by 3.
   - Animate newly inserted photos with staggered clipped reveal; keep existing photos static.
   - If fewer than 3 remain, reveal final partial group and gracefully hide "Discover More".
   - Seamless category switching (resets to first 3 of chosen category).
   - Lightbox navigation works across all revealed photos.
5. **Browser Verification & Final QA**:
   - Automated CDP script `scripts/verify_interactions_and_gallery.js`.
   - Verify hover lift and transform on cards.
   - Verify selection states.
   - Verify initial 3 photos -> click "Discover More" -> 6 photos -> click again -> complete.
   - Verify final partial group behavior.
   - Verify Desktop (1440px), Tablet (768px), Mobile (390px), zero overflow, zero console errors.
   - Run `npm run type-check` and `npm run build`.
