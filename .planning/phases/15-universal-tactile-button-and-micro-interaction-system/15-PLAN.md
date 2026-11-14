---
phase: 15-universal-tactile-button-and-micro-interaction-system
plan: 01
subsystem: ui/interactions/3d-buttons
tags: [interactions, 3d-buttons, tactile, sheen, micro-interactions, accessibility, milestone-2]
provides:
  - Centralized useTactile3D hook delivering 120fps GPU-accelerated perspective tilt and sheen
  - Enhanced Button component automatically conferring 3D tactile elevation and light reflection
  - Upgraded interactive controls across reservation dock, gallery, room detail, map, and spa
  - Touch-safe press feedback on mobile devices and prefers-reduced-motion safety overrides
  - Full keyboard focus-visible rings with antique gold outline
affects: [src/hooks/useTactile3D.ts, src/components/ui/Button.tsx, src/components/ui/Stepper.tsx, src/components/gallery/GalleryViewer.tsx, src/components/map/RealOrchhaMap.tsx, src/components/rooms/RoomDetailView.tsx, src/components/spa/SpaCatalogueBrowser.tsx, src/components/spa/SpaTreatmentCard.tsx, src/components/layout/FooterPrimitive.tsx, src/app/globals.css]
duration: 25min
completed: true
---

# Phase 15 Plan: Universal 3D Button & Micro-Interaction System

## Objective
Implement a mandatory, high-craft, centralized 3D interaction system for every appropriate interactive button and clickable control across the website. Deliver subtle perspective tilt, realistic depth, layered gilded shadows, interactive light reflection sheen, tactile compression on click, and graceful return to resting state, while strictly preserving existing click handlers, booking flows, keyboard accessibility, and mobile responsiveness.

## Tasks
1. **Centralized 3D Tactile Engine (`src/hooks/useTactile3D.ts`)**:
   - Create high-performance hook operating directly on GPU-accelerated CSS variables (`--tactile-rx`, `--tactile-ry`, `--tactile-tz`, `--tactile-scale`, `--tactile-sheen-x`, `--tactile-sheen-y`, `--tactile-sheen-opacity`).
   - Eliminate React re-renders during mouse movement (0 layout recalculations).
   - Dampen tilt angles to max ±6° for regal, restrained motion avoiding cartoonish physics.
   - Support mobile touch devices via pointer down/up compression without mouse tilt.
   - Respect `prefers-reduced-motion` preferences.
2. **Universal Button Component Upgrade (`src/components/ui/Button.tsx`)**:
   - Integrate `useTactile3D` seamlessly by default across all button variants (`primary`, `gold`, `secondary`, `outline`, `navy-outline`, `ghost`).
   - Mount interactive sheen overlay `<span className="tactile-sheen" aria-hidden="true" />`.
   - Preserve all existing props, refs, disabled/loading states, click handlers, and accessibility attributes.
3. **Rollout to Specialized Controls**:
   - **Reservation Sanctuary Dock**: "Check Rates & Book" button and occupancy steppers.
   - **Gallery Viewer**: Category filter pills, progressive "Discover More" button, and lightbox navigation controls.
   - **Real Geographic Map**: Category filter pills, map zoom in/out/reset buttons.
   - **Accommodations**: Room card CTAs, room detail gallery carousel arrows, and thumbnail buttons.
   - **Spa & Wellness**: Treatment category filters and therapy quick-select buttons.
   - **Footer & Navigation**: OTA channel cards and mobile navigation toggle.
4. **Automated Multi-Device Verification**:
   - Test mouse tilt physics, press compression, release reset, and sheen visibility via Chrome DevTools Protocol.
   - Verify modal opening and body scroll lock via 3D reservation button.
   - Verify progressive gallery reveal via 3D "Discover More" button.
   - Verify zero horizontal overflow on mobile (390px).
