# ORCHHA RESORT — CORE PROJECT RULES & ENGINEERING DIRECTIVES

This document defines the non-negotiable architectural, design, and engineering rules for all agents, contributors, and tools operating on the Orchha Resort website repository (`/Users/sam/Projects/orccha`).

---

## 1. Non-Negotiable Preservation Directives

1. **Preserve All Working Animations**:
   - The 5-stage palace-to-map cartographic finale (`src/components/map/PalaceToMapFinale.tsx`).
   - The synchronized Leaflet real geography explorer (`src/components/map/RealOrchhaMap.tsx`).
   - The alternating guest love review cards choreography (`src/components/testimonials/GuestLoveExperience.tsx`).
   - The hero editorial entrance motion and booking dock transitions.
   - Never break, disable, or simplify these animations.

2. **Preserve Existing Gallery Tiles & Proportions**:
   - Maintain the curated masonry layout, aspect ratios, and visual density.
   - Maintain the progressive 3-at-a-time reveal pattern and interactive lightbox.
   - Maintain the deduplicated 48-photo curated manifest (`src/data/gallery-data.ts`).

3. **Preserve Navigation & Routing**:
   - Retain all established routes: `/`, `/rooms`, `/rooms/[slug]`, `/gallery`, `/about`, `/spa`, `/weddings`, `/design-system`.
   - Maintain desktop navbar links and mobile navigation drawer behavior.
   - Keep internal hash navigation anchor points (`#booking-sequence`, `#map-experience`, `#rooms`, etc.).

4. **Preserve Booking Functionality**:
   - The in-flow Reservation Sanctuary Suite (`RoomSearchWidgetPrimitive.tsx`).
   - Formatted check-in / check-out date pickers and night calculation.
   - Occupancy stepper controls.
   - Root/body scroll-locking modal handoff to direct concierge WhatsApp / booking channel.

5. **Never Randomly Replace Photographs**:
   - Real, authentic resort photography is mapped and verified across accommodations, dining, wellness, and heritage attractions.
   - Never replace genuine resort assets with generic or unverified stock photos.

6. **Never Rewrite Working Components Unnecessarily**:
   - Practice precision surgery and surgical refinements.
   - Do not discard or rewrite working components when adding styling, motion, or features.

7. **Avoid Unnecessary Libraries**:
   - Rely on existing dependencies: React 19, Next.js 15, Framer Motion, Tailwind CSS, Leaflet, and Lucide React.
   - Do not install heavy runtime wrappers or redundant animation packages.

8. **Maintain Mobile, Tablet & Desktop Responsiveness**:
   - Test and maintain 100% responsive behavior across Mobile (390px), Tablet (768px), and Desktop (1440px).
   - Zero horizontal overflow (`scrollWidth <= innerWidth`).

9. **Use Controlled, Incremental Changes**:
   - Implement one focused requirement or phase at a time.
   - Inspect existing state before touching code; verify immediately after.

10. **Verify Every Modification**:
    - Every change must pass automated verification (type-check, Next.js build, and browser verification via Chrome DevTools Protocol).
    - Never mark work complete without visual or programmatic proof.

---

## 2. Interactive Button & Motion Standard

- **Premium 3D Hover Interaction**: Every interactive button across the website must eventually receive a consistent, tactile, premium 3D hover interaction (subtle Z-axis elevation, gilded ambient drop-shadow, tactile press state, and smooth easing) without compromising its click/touch handlers, accessibility attributes (`aria-*`), or keyboard focus rings (`focus-visible`).
