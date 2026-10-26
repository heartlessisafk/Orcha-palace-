---
phase: 05-gallery-layout-and-cinematic-scroll-transitions
plan: 01
subsystem: gallery/ui
tags: [lightbox, masonry, sticky-filters, touch-gestures, keyboard-navigation]
provides:
  - Sticky category filter bar under top navbar
  - Fluid responsive masonry grid with scroll entry transitions
  - High-resolution lightbox with touch swipe and keyboard navigation
  - Verification across desktop, tablet, and mobile
affects: [src/components/gallery/GalleryViewer.tsx]
tech-stack:
  added: []
  patterns: [sticky filter bar, framer-motion staggered layout, accessible modal lightbox]
key-files:
  created: []
  modified: [src/components/gallery/GalleryViewer.tsx]
key-decisions:
  - Make filter pills sticky (`top-16 sm:top-20 z-30 bg-brand-canvas/95 backdrop-blur-md`) for effortless category switching.
  - Implement fluid masonry with staggered layout animations.
  - Enhance lightbox with keyboard navigation (Esc, Left, Right) and touch gestures.
duration: 15min
completed: 2026-10-27
---

# Phase 5 Plan: Gallery Layout & Cinematic Scroll Transitions

## Diagnosis
The gallery has 49 curated high-resolution photos, but the category filter bar scrolls out of view immediately, requiring long scrolls back to the top to switch categories. In addition, cards need smooth viewport entrance animations as visitors scroll down the gallery.

## Tasks
1. Edit `src/components/gallery/GalleryViewer.tsx`:
   - Upgrade filter bar to sticky container (`sticky top-16 sm:top-20 z-30 bg-brand-canvas/95 backdrop-blur-md border-y border-brand-charcoal/10`).
   - Add viewport scroll reveal with staggered spring animation.
   - Refine lightbox with full-resolution view trigger.
2. Verify via Chrome DevTools Protocol:
   - Filter bar remains pinned when scrolling down.
   - Category filtering works interactively.
   - Lightbox opens, advances with ArrowRight, and closes with Escape.
3. Update `05-VERIFICATION.md` and generate `05-SUMMARY.md`.
