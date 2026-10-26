# The Orchha Resort Redesign & Cinematic Experience Upgrade

## What This Is
A cinematic, production-grade luxury hospitality website for The Orchha Resort, situated beside the Betwa River opposite the 14 Royal Chhatris in Orchha, Madhya Pradesh. The website features authentic resort photography, dedicated wellness and wedding showcases, an interactive visual gallery, functional accommodation detail routes, and a scroll-driven palace-to-map cartographic finale.

## Core Value
To provide an authentic, cinematic, and technically flawless digital hospitality experience where the right photography appears in the right section, all scroll animations execute with physical coherence, accommodations can be explored in detail, and every visitor arrives naturally at the decision to reserve a stay.

## Requirements

### Validated
- [x] Initial Phase 1 & 2 design system tokens, responsive navbar, and mobile drawer.
- [x] Solid warm-beige `#F4F0E6` hero booking sequence without video bleed-through.
- [x] Authentic heritage About page (`/about`) with verified property narrative.
- [x] Dedicated Royal Weddings route (`/weddings`) with verified event photography.
- [x] Dedicated Kairali Ayurveda Spa route (`/spa`) with authentic treatment offerings.
- [x] Master photo catalogue of 300 genuine Google Photos album items with 49 high-resolution curated assets in `public/images/resort/curated/`.
- [x] Dedicated visual photo gallery route (`/gallery`) with category filter pills and interactive lightbox modal.

### Active Scope (Complete Website Repair & Upgrade)
- [ ] **Phase 1: Fix Blank Palace-to-Map Animation** — Eliminate sticky-breaking CSS `overflow-hidden`, fix layer transforms and visibility, verify full 5-act animation in browser.
- [ ] **Phase 2: Fix Review Cards Stuck on Left** — Diagnose positioning, width, and scroll-driver in `GuestLoveExperience.tsx`, restore alternating left-right card animation.
- [ ] **Phase 3: Accommodation Image Corrections** — Verify and map genuine photos to Standard Heritage Room, Deluxe Room, Deluxe Swiss Tent, and Royal Suite without mismatches.
- [ ] **Phase 4: Functional Room-Detail Pages** — Implement dedicated dynamic routes (`/rooms/[slug]` and `/rooms`) with photo gallery, room specs, amenities, floor plans/views, and booking actions.
- [ ] **Phase 5: Gallery Layout & Cinematic Scroll Transitions** — Refine `/gallery` with sticky header, cinematic smooth scroll transitions, and enhanced lightbox interactions.
- [ ] **Phase 6: Integration, Responsive Behavior, Accessibility & Final Verification** — Complete browser verification across Desktop (1440px), Tablet (768px), and Mobile (390px), ensure `prefers-reduced-motion` compliance, 0 console errors, clean production build.

### Out of Scope
- Rebuilding the application from scratch or changing the Next.js / Tailwind / Framer Motion stack.
- Modifying working routes (`/spa`, `/about`, `/weddings`) unnecessarily.
- Using unverified stock photography or fictional geographical distances.
