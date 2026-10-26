---
phase: 02-fix-guest-review-cards-stuck-on-left
plan: 01
subsystem: reviews/motion
tags: [framer-motion, scroll-choreography, transform-clamping, pointer-events]
provides:
  - Alternating Left/Right card choreography for 4 guest reviews
  - Clamped transforms preventing extrapolation bugs
  - Dynamic pointer-events gating per active card
  - Smooth handoff into Collective Memory and Palace-to-Map finale
affects: [GuestLoveExperience]
tech-stack:
  added: []
  patterns: [framer-motion clamped useTransform, pointerEvents gating, sticky stage layout]
key-files:
  created: []
  modified: [src/components/reviews/GuestLoveExperience.tsx]
key-decisions:
  - Add { clamp: true } to all scroll transforms (x, rotate, opacity, scale).
  - Gate pointer-events dynamically to the single active card so inactive cards do not block interactions.
  - Implement clean alternating entry/exit choreography: Card 1 exits LEFT, Card 2 enters/exits RIGHT, Card 3 enters/exits LEFT, Card 4 enters RIGHT, followed by Collective Memory.
duration: 15min
completed: 2026-10-27
---

# Phase 2 Plan: Fix Guest Review Cards Stuck on Left

## Diagnosis
In `GuestLoveExperience.tsx`:
1. `useTransform` calls lacked `{ clamp: true }`. Beyond defined progress intervals, Framer Motion extrapolated values. Card 1 at 80%-100% scroll had `opacity: 1.00` and `x: -750px`, appearing stuck on the left side of the screen over subsequent cards and the section footer.
2. All 4 cards and the Collective Memory container had `pointer-events-auto` without visibility/progress gating, causing overlapping click targets.
3. Scroll intervals were closely packed and lacked precise settling windows.

## Tasks
1. Update `src/components/reviews/GuestLoveExperience.tsx`:
   - Add `{ clamp: true }` to all transforms.
   - Implement dynamic `pointerEvents` gating (`pe1`, `pe2`, `pe3`, `pe4`, `peCollective`).
   - Refine choreography so each card enters smoothly, settles in center, and exits cleanly.
2. Verify with Chrome DevTools Protocol automation:
   - Measure card rects, opacities, and transforms at 0%, 25%, 50%, 75%, 90%, 100% progress.
   - Capture screenshot artifacts (`review_step_0` to `review_step_100`).
   - Confirm zero cards are stuck on the left when inactive.
3. Update `02-VERIFICATION.md` and generate `02-SUMMARY.md`.
