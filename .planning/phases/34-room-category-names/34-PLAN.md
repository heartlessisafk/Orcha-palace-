# Phase 34: Update All Room Category Names

## Objective
Update all four room category names throughout the Orchha Resort website to match the client's exact requested terminology:
1. `Super Deluxe Pool Facing`
2. `Deluxe Marble Bed Garden Facing`
3. `Standard Room Garden Facing`
4. `Deluxe Room Garden Facing`

## Strategy & Source of Truth Mapping
- **Source of Truth**: `src/data/rooms.ts` (`VERIFIED_ROOMS: RoomDetails[]`)
- **Preserved Existing Routes & IDs**:
  - `standard-room` $\to$ `Standard Room Garden Facing`
  - `deluxe-room` $\to$ `Deluxe Marble Bed Garden Facing`
  - `deluxe-swiss-tent` $\to$ `Deluxe Room Garden Facing`
  - `royal-heritage-suite` $\to$ `Super Deluxe Pool Facing`
- **Preserved Routing**: Retained all existing `/rooms/[slug]` dynamic routes (`/rooms/standard-room`, `/rooms/deluxe-room`, `/rooms/deluxe-swiss-tent`, `/rooms/royal-heritage-suite`).
- **Preserved Pricing & Amenities**: All genuine pricing (₹4,500, ₹5,200, ₹6,000, ₹8,500), photos, key amenities, and booking integrations preserved with zero hallucination.
- **Responsive Wrapping**: Added `min-w-0 flex-1` and `text-balance` to room card headers in `RoomCardPrimitive.tsx` so 31-character names wrap gracefully without overflowing on mobile, tablet, or desktop viewports.
- **Codebase Sanitization**: Replaced all occurrences of previous labels across assets, site config, wedding pages, about hero, design system, and reviews.
