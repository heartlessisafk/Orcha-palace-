# Phase 16: Page-by-Page Cinematic Refinement & Editorial Elevation

## Goal
Execute individual page refinement across all 7 core website sections without full rewrites, utilizing established design tokens (`DESIGN.md`), 6-subject photography guidelines, universal 3D button interactions, and the 5 installed design skills (`frontend-design`, `impeccable`, `taste-skill`, `ui-ux-pro-max`, `web-design-guidelines`).

## Targeted Sections & Refinements
1. **Homepage (`/`)**:
   - Full-screen cinematic hero with high-contrast editorial glass container and motion entrance.
   - Working in-flow reservation dock (`#booking-sequence`) with date/night calculations and guest steppers.
   - 3 signature amenities cards wired to respective sections (`/gallery?category=pool`, `/gallery?category=amenities`, `/spa`).
   - Visual gallery showcase teaser with genuine resort imagery and subtle hover lifts.
   - Guest Love review cards choreography and 5-stage Palace-to-Map Finale preserved.
2. **Rooms & Suites (`/rooms`, `/rooms/[slug]`)**:
   - 4 room cards with authentic photography, verified 32-room inventory, accurate square footage, and pricing in INR.
   - Dynamic room pages (`/rooms/standard-room`, `/rooms/deluxe-room`, `/rooms/deluxe-swiss-tent`, `/rooms/royal-heritage-suite`) with interactive thumbnail gallery carousels and direct WhatsApp concierge booking.
   - Smooth fallback for room reservation actions.
3. **Gallery (`/gallery`)**:
   - Consolidation into the exact 6 user-specified categories: Architecture, Rooms & Suites, Lotus Pool, Weddings, Amenities & Dining, Experiences (plus "All Curated Views").
   - 48 curated genuine photos with zero stock placeholders.
   - Asymmetrical editorial tiles (`sm:col-span-2 aspect-[16/10]` for lead and signature views).
   - Progressive 3-at-a-time reveal pattern and tactile lightbox modal.
   - Universal 3D button upgrades on bottom CTAs.
4. **Weddings (`/weddings`)**:
   - 6 royal wedding sections: Hero, Story, Venues (1,500 sq ft ballroom & riverfront lawns), Experiences (Haldi, Sangeet, Pheras), Enquiry Form, and Romantic CTA.
   - Grounded in verified resort assets (`WEDDING_ASSETS`).
5. **Amenities & Spa (`/spa`)**:
   - Authentic Kairali Ayurvedic Spa visual storytelling and genuine treatments mapped directly from resort collateral.
   - Quick-commerce selection tray, pricing in INR, detail modal, and WhatsApp booking handoff.
6. **About & Heritage (`/about`)**:
   - 7 narrative sections covering Bundelkhand history, Betwa River sanctuary, Yogesh Chandra architectural legacy, and zero fabricated claims.
   - Strict 32-room inventory alignment across all contact blocks.
7. **Map & Footer**:
   - Permanent CARTO Voyager raster tiles with zero watermarks.
   - 7 verified heritage landmarks with category filters and flyTo transitions.
   - 4-column footer with live contact numbers, address, transit instructions, and verified OTA links.

## Verification Requirements
- 100% clean Next.js static build (`14/14` pages) and zero TypeScript errors (`tsc --noEmit`).
- Automated CDP checks for Desktop (1440px) and Mobile (390px) viewports with zero horizontal overflow (`hasOverflow: false`).
- Capture multi-viewport baseline screenshots in `audit/screenshots/phase5_refinement/`.
