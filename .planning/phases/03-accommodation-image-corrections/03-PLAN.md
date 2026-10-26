---
phase: 03-accommodation-image-corrections
plan: 01
subsystem: content/rooms
tags: [photography, room-curation, types, assets]
provides:
  - Exact genuine curated photos mapped to all 4 room categories
  - Detailed photo gallery arrays for Standard, Deluxe, Swiss Tent, and Suite
  - Verification that no generic stock or placeholder imagery appears in accommodations
affects: [rooms.ts, room.ts, assets.ts, RoomCardPrimitive.tsx]
tech-stack:
  added: []
  patterns: [typed asset dictionary, curated high-res local image mapping]
key-files:
  created: []
  modified: [src/types/room.ts, src/data/rooms.ts, src/components/rooms/RoomCardPrimitive.tsx]
key-decisions:
  - Map Standard Room to `room-deluxe-interior-panoramic.jpg` (heritage marble floor inlay & king bed).
  - Map Deluxe Room to `room-deluxe-king-pool-view.jpg` (direct lotus pool picture window view).
  - Map Deluxe Swiss Tent to `room-tent-interior-canopy.jpg` (glamping canvas interior & floral block print).
  - Map Royal Suite to `room-suite-heritage-living.jpg` (regal salon parlor & carved diwan).
  - Add comprehensive gallery arrays with bathroom, media console, and verandah perspectives to support dedicated room detail pages.
duration: 15min
completed: 2026-10-27
---

# Phase 3 Plan: Accommodation Image Corrections

## Diagnosis
The 4 accommodation categories require verified genuine resort photography mapped from `public/images/resort/curated/rooms/`. Each room must display authentic interiors (marble inlay floors, direct lotus pool vistas, glamping canvas prints, and suite salons) with zero unverified stock imagery or broken URLs.

## Tasks
1. Update `src/types/room.ts`:
   - Add `gallery?: { src: string; alt: string; caption: string }[]`.
   - Add `features?: string[]`.
   - Add `specs?: { label: string; value: string }[]`.
2. Update `src/data/rooms.ts`:
   - Verify primary `imageKey` for all 4 categories.
   - Add secondary genuine photos for each room's gallery.
   - Add verified architectural features and Bundelkhand heritage details.
3. Update `src/components/rooms/RoomCardPrimitive.tsx`:
   - Add Link wrapper or "Explore Room Details" CTA pointing to `/rooms/${room.id}`.
4. Verify in browser with Chrome DevTools Protocol that all 4 cards load authentic imagery with 200 OK status.
5. Create `03-VERIFICATION.md` and `03-SUMMARY.md`.
