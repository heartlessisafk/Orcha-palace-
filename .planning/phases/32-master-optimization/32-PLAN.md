# Phase 32: Complete Responsive, Mobile, Tablet, SEO & Performance Master Optimization

## Objective
Transform the existing Orchha Resort website into a fully optimized, production-quality digital experience across all devices (320px smartphones to 1920px desktops), modern tablets (iPad Mini, 10th gen, Air, Pro in portrait and landscape), search engines (Google SEO, local Orchha intent, complete JSON-LD schemas, sitemap, robots.txt), and performance metrics (Core Web Vitals, touch response, WCAG 2.2 AA accessibility).

## Non-Negotiable Preservation Directives
1. Preserve all working animations (Palace-to-Map finale, Leaflet geographic explorer, alternating reviews, hero transitions, booking dock).
2. Preserve existing gallery tiles, masonry layout, 48 curated photos, and lightbox.
3. Preserve navigation routes (`/`, `/rooms`, `/rooms/[slug]`, `/gallery`, `/about`, `/spa`, `/weddings`, `/design-system`).
4. Preserve booking functionality (in-flow reservation suite, date pickers, occupancy steppers, WhatsApp/email concierge handoff).
5. Never randomly replace authentic resort photography with stock photos.
6. Universal 3D tactile button system preserved with mobile touch feedback.

## Sub-Phases & Execution Order

### Phase 32.1: Technical Baseline & Multi-Viewport Audit (COMPLETED)
- Run baseline audit script across 10 routes and 19 viewports (8 mobile, 9 tablet, 2 desktop).
- Baseline results:
  - 0 horizontal overflows detected across all tested viewports.
  - 1 H1 per page confirmed across all routes.
  - Identified gaps: 10/10 routes missing JSON-LD schema, 10/10 routes missing Canonical links, missing `sitemap.xml` and `robots.txt`, mobile drawer scroll locking & accessibility improvements.

### Phase 32.2: Mobile & Tablet Navigation & Responsive Hardening
- **Mobile Navigation Drawer** (`NavbarPrimitive.tsx`):
  - Change positioning to `top-full` so it seamlessly attaches below the navbar in all scroll states.
  - Add root/body scroll locking when drawer is open.
  - Add backdrop overlay with click-to-close and Escape key listener.
  - Add `aria-modal="true"`, `role="dialog"`, and `aria-label="Mobile Navigation"`.
  - Add touch-manipulation and minimum 44px touch targets.
  - Ensure Reserve Stay CTA and Call Concierge phone link are prominent with tactile touch states.
- **Tablet / iPad Spacing**:
  - Refine tablet header layout so logo, hamburger, and quick-action buttons maintain balanced spacing across 768px, 820px, 834px, 1024px, 1180px, 1194px, 1366px.
- **Fluid Heading Typography (`clamp()`)**:
  - Audit and apply content-driven fluid scaling (`clamp(1.75rem, 5vw, 4.5rem)`) to prevent awkward word breaks on 320px screens.

### Phase 32.3: Technical & Local Google SEO (Metadata, Canonical, OpenGraph, Sitemap, Robots)
- **Root Layout & Global Metadata** (`src/app/layout.tsx`):
  - Set canonical URL base: `https://www.orchharesort.com`.
  - Add OpenGraph siteName, locale (`en_IN`), type (`website`).
  - Add Twitter card (`summary_large_image`).
  - Add `robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } }`.
- **Per-Page Metadata & Canonicals**:
  - Update every route (`/`, `/rooms`, `/rooms/[slug]`, `/gallery`, `/weddings`, `/spa`, `/about`) with unique meta title, description, canonical link, OpenGraph, and Twitter image.
- **XML Sitemap Generator** (`src/app/sitemap.ts`):
  - Generate dynamic sitemap for all 10 canonical routes with accurate `lastModified`, `changeFrequency`, and `priority`.
- **Robots Configuration** (`src/app/robots.ts`):
  - Dynamic `robots.txt` granting full crawl access to search engines, pointing to `https://www.orchharesort.com/sitemap.xml`.
- **Local SEO & Keywords Integration**:
  - Infuse authentic Orchha search terms naturally: "Resorts in Orchha", "Luxury resort in Orchha", "Hotels near Betwa River", "Riverside stays in Orchha", "Heritage stays in Orchha", "Wedding venues in Orchha", "Spa and wellness in Orchha".
  - Ensure uniform NAP (Name, Address, Phone): Kanchanghat, Orchha, Madhya Pradesh 472246, India; +91 99262 19900.

### Phase 32.4: Comprehensive Structured Data (Schema.org / JSON-LD)
- Create centralized schema helper (`src/lib/schema.ts`):
  - `getHotelSchema()`: `Hotel` / `LodgingBusiness` schema with address, geo coordinates (25.3448, 78.6395), telephone, checkin/checkout times, priceRange, amenities, rating/reviews omitted if unverified.
  - `getOrganizationSchema()`: `Organization` with logo, contactPoint, official URL.
  - `getWebSiteSchema()`: `WebSite` with SearchAction potential.
  - `getBreadcrumbSchema(items)`: `BreadcrumbList` for interior pages.
  - `getRoomSchema(room)`: `HotelRoom` with bed, occupancy, amenities.
  - `getSpaSchema()`: `DaySpa` / `HealthAndBeautyBusiness`.
  - `getWeddingSchema()`: `EventVenue`.
- Embed `<script type="application/ld+json">` across all pages.

### Phase 32.5: Performance, Core Web Vitals & Web Interface Guidelines / Accessibility
- **Images**: Ensure explicit `sizes` on all `<Image />` tags so responsive srcset serves scaled images on mobile/tablet.
- **Priority**: Ensure LCP hero image has `priority` and `fetchPriority="high"`.
- **Accessibility**:
  - Ensure keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2`).
  - Verify semantic landmarks (`<main id="main-content">`, `<nav>`, `<header>`, `<footer>`).
  - Verify WCAG 2.2 AA contrast across all text surfaces.

### Phase 32.6: Booking Journey & Conversion Testing
- Test room search dock, date picker, occupancy stepper, modal handoff across mobile, tablet, and desktop viewports.

### Phase 32.7: Multi-Device Verification Matrix & Final Quality Report
- Run automated verification across all 8 mobile viewports, all 9 tablet viewports, and desktop.
- Run typecheck, build, and produce the comprehensive final report.
