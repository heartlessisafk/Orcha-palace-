---
phase: 13-comprehensive-codebase-mapping-animation-inventory-and-functional-audit
plan: 01
subsystem: audit/codebase-mapping/inventory
tags: [audit, codebase-map, animation-inventory, asset-audit, functional-testing, visual-baseline, regression-checklist, milestone-2]
provides:
  - Complete architectural dependency map for all 14 routes and shared components
  - Route-by-route audit covering desktop, tablet, and mobile behavior
  - Exhaustive animation inventory with triggers, easing, and scroll behaviors
  - Complete asset audit covering 109 unique images with zero missing files
  - Interactive functional testing matrix for reservation, map, gallery, and navigation
  - 30 multi-viewport baseline screenshots in audit/screenshots/phase2_baseline/
  - Strict 10-point non-negotiable regression checklist for Phases 3-7
affects: [.planning, audit]
duration: 25min
completed: true
---

# Phase 13 Plan: Comprehensive Codebase Mapping, Route Audit, Animation Inventory & Baseline Visual Capture

## Objective
Understand the entire existing website before changing its design or code. Perform a rigorous, multi-viewport audit of the complete Orchha Resort website across framework architecture, all 14 routes, all shared components, design tokens, animation choreography, image assets, interactive behaviors, and visual baselines to prevent unintended regressions during Milestone 2.

## Tasks
1. **Codebase Architecture & Dependency Mapping**:
   - Map framework (Next.js 15.2.0 App Router, React 19, TypeScript 5.7.3).
   - Map design token system (`tailwind.config.ts`, `globals.css`, color tokens, font tokens).
   - Document component hierarchy and dependencies across pages and data sources.
2. **Route-by-Route Multi-Viewport Audit**:
   - Audit `/`, `/rooms`, `/rooms/[slug]`, `/gallery`, `/about`, `/weddings`, `/spa`, and `/design-system`.
   - Inspect desktop (1440px), tablet (768px), and mobile (390px) viewports for horizontal overflow and layout stability.
3. **Exhaustive Animation Inventory**:
   - Catalog all working animations: Hero entrance & glass surface, Reservation Suite, Guest Love 380vh scroll track, Palace-to-Map 5-stage finale, Leaflet real map, Progressive gallery reveals, and UI motion primitives.
   - Document library, trigger, easing, duration, initial/final states, mobile adaptations, and known quirks.
4. **Image & Asset Audit**:
   - Scan all 166 image references across `src/` against `public/` filesystem.
   - Audit curated gallery manifest (48 deduplicated photos), room photos (16 curated assets), and heritage photography.
   - Verify zero missing image references.
5. **Interactive Functional Testing**:
   - Test reservation CTA, date inputs, occupancy stepper, and concierge modal with root/body scroll lock.
   - Test CARTO Voyager map tiles, WGS-84 landmarks, category filters, and camera `flyTo`.
   - Test gallery category pills, 3-at-a-time progressive reveal, and lightbox modal.
   - Test desktop and mobile navigation drawers and hash anchors.
6. **Visual Baseline Captures**:
   - Capture full-page baseline screenshots across all 10 key routes at 1440px desktop, 768px tablet, and 390px mobile (30 screenshots total).
7. **Regression Checklist**:
   - Formulate strict 10-point non-negotiable regression checklist protecting working animations, authentic assets, routing, and mobile responsiveness for Phases 3-7.
