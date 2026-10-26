# Orchha Resort — Technical Architecture & Implementation Plan
**Phase 1: Engineering Roadmap, Technology Stack & Implementation Phases**
*Document Version: 1.0.0 | Date: 2026-10-26 | Lead Frontend Architect*

---

## 1. Technology Stack Recommendation (Evidence-Based)

Our technology selection is dictated strictly by the project requirements: exceptional visual polish (matching Framer's fluid interaction), high Lighthouse performance (95+ score), SEO discoverability for a luxury Indian resort, responsive reliability across mobile devices, and zero unnecessary engineering bloat.

| Layer | Recommended Choice | Technical Justification |
|---|---|---|
| **Core Framework** | **Next.js 15 (App Router)** | Best-in-class React framework for static site generation (SSG) with client hydration. Provides automatic image optimization, route pre-rendering, and superior metadata/SEO control. |
| **Language** | **TypeScript** | Strict compile-time safety for room models, asset dictionaries, and form payloads. |
| **Styling Engine** | **Tailwind CSS v3/v4** | Token-based utility styling matching the exact design tokens reverse-engineered from Framer. Enables zero-runtime CSS overhead and rapid responsive iteration. |
| **Animation Library** | **Framer Motion (`motion`)** | Direct drop-in match for the reference site's animation primitives. Enables scroll-linked word-by-word opacity reveals, layout springs, and accordion height animations. |
| **Icons** | **Lucide React** | Lightweight, tree-shakeable SVG icon set matching the reference site's feather-weight luxury icon aesthetics. |
| **Font Management** | **`next/font` (Google Fonts)** | Zero layout-shift self-hosted font loading for `Crimson Text` and `DM Sans` without external render-blocking network requests. |
| **Date & Form Logic** | **Native HTML5 / DayJS** | Ultra-lightweight date arithmetic for the room-search check-in/check-out pickers without the heavy bundle footprint of Moment.js. |

---

## 2. Target Project Architecture

```
/Users/sam/Projects/orccha/
├── audit/                             # Phase 1 Reconnaissance Artifacts (Preserved)
│   ├── audit-report.md
│   ├── reference-analysis.md
│   ├── resort-content-inventory.md
│   ├── asset-manifest.md
│   ├── design-specification.md
│   ├── implementation-plan.md
│   ├── framer-evidence.json           # Raw REA evidence bundle (36MB)
│   ├── framer-reference.html          # Decompiled Framer DOM
│   ├── orchharesort-live.html         # Live legacy site DOM
│   └── *.png                          # Viewport screenshots
│
├── public/                            # Static Production Assets
│   ├── images/
│   │   ├── hero/                      # Hero landscape and mobile crops
│   │   ├── rooms/                     # Standard, Deluxe, Swiss Tent, Suite
│   │   ├── dining/                    # Kaleva restaurant & culinary shots
│   │   ├── amenities/                 # Lotus pool, Ayurveda spa, sports
│   │   └── heritage/                  # Chhatris, Betwa river, Orchha Fort
│   └── favicon.ico
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Global layout, fonts, meta & analytics
│   │   ├── page.tsx                   # Master Homepage
│   │   └── globals.css                # Tailwind directives & CSS design tokens
│   │
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx             # Sticky translucent header with book CTA
│   │   │   └── MobileMenu.tsx         # Slide-in mobile drawer
│   │   ├── hero/
│   │   │   ├── HeroBanner.tsx         # Full-bleed image/video hero
│   │   │   └── RoomSearchWidget.tsx   # Mandatory search interface (Check-in, Guests)
│   │   ├── sections/
│   │   │   ├── PhilosophySection.tsx  # Word-by-word scroll opacity text reveal
│   │   │   ├── RoomsSection.tsx       # 4-card accommodation grid with hover zoom
│   │   │   ├── AmenitiesGrid.tsx      # 2x2 "Why Stay With Us" feature grid
│   │   │   ├── HowWeHostAccordion.tsx # Synced 5-pillar service tab accordion
│   │   │   ├── DiningSection.tsx      # Kaleva restaurant & poolside bar
│   │   │   ├── AyurvedaSection.tsx    # Kerala Ayurveda spa & steam bath
│   │   │   ├── Testimonials.tsx       # Verified guest reviews & avatar switcher
│   │   │   ├── HeritageGuide.tsx      # 14 Chhatris & Orchha monuments guide
│   │   │   └── FaqAccordion.tsx       # Collapsible guest FAQ
│   │   ├── footer/
│   │   │   └── Footer.tsx             # 4-column navy footer & contact info
│   │   └── ui/
│   │       ├── Button.tsx             # Gold/Navy pill buttons with sliding arrow
│   │       ├── Modal.tsx              # Booking resolution & enquiry modal
│   │       └── DatePicker.tsx         # Minimalist luxury calendar picker
│   │
│   ├── data/                          # Typed Business Truth (Orchha Resort)
│   │   ├── rooms.ts                   # Standard, Deluxe, Swiss Tents specs & rates
│   │   ├── amenities.ts               # Pool, sports, spa, dining features
│   │   ├── testimonials.ts            # Verified guest reviews (Robert H, etc.)
│   │   └── faq.ts                     # Check-in, cancellations, travel times
│   │
│   └── lib/
│       ├── assets.ts                  # Centralized image path dictionary
│       ├── utils.ts                   # Tailwind class merge helper (clsx/twMerge)
│       └── booking.ts                 # WhatsApp/Email enquiry dispatcher
│
├── tailwind.config.ts                 # Navy & Beige design tokens configuration
├── tsconfig.json
└── package.json
```

---

## 3. Step-by-Step Implementation Phases

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: RECONNAISSANCE & DESIGN INTELLIGENCE (Completed)              │
│ [X] REA environment audit                                              │
│ [X] Decompile Framer reference site & extract tokens                   │
│ [X] Extract verified business facts from live Orchha Resort site       │
│ [X] Investigate Google Photos album (HTTP 404 handled)                 │
│ [X] Publish complete 6-part audit deliverable package                  │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: REPOSITORY FOUNDATION & DESIGN SYSTEM (Completed)             │
│ [X] Initialize Git repository & Next.js 15 App Router in /orccha       │
│ [X] Configure Crimson Text & DM Sans typography with next/font/google   │
│ [X] Establish Navy & Beige CSS design tokens in tailwind.config.ts     │
│ [X] Build shared UI atoms: Button, Badge, Card, Container, Section     │
│ [X] Build accessible form controls: Input, Select, Stepper             │
│ [X] Build motion primitives: FadeIn, TextReveal, HoverZoom             │
│ [X] Implement foundational RoomCardPrimitive & RoomSearchWidget        │
│ [X] Deploy interactive Design System Preview (/design-system)          │
│ [X] Verify build, static generation (5/5 pages), and REA screenshots  │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: CINEMATIC HERO & SCROLL-TRANSFORMING BOOKING (High Priority) │
│ [ ] Deploy full-screen cinematic video hero with poster & mobile crop  │
│ [ ] Overlaid identity, rating badge & prominent first-screen Book CTA   │
│ [ ] Implement scroll-controlled hero-to-booking transformation         │
│     - Sticky track: Video recedes/scales as beige panel rises          │
│     - Panel expands smoothly into settled room search interface        │
│     - Zero scroll-trapping or jank; natural hand-off to page scroll   │
│ [ ] Implement reduced-motion & touch-optimized mobile fallbacks        │
│ [ ] Integrate date picker, guest steppers & WhatsApp/OTA handoffs      │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: EDITORIAL STORYTELLING & DIVERSE PHOTOGRAPHY CHOREOGRAPHY     │
│ [ ] Enhance word-by-word scroll text reveal with editorial typography  │
│ [ ] Implement photography motion vocabulary: clipped reveals, tilt     │
│ [ ] Build "Our Rooms" 4-card showcase with hover zoom interactions    │
│ [ ] Build "Why Stay With Us" 2x2 signature amenities grid              │
│ [ ] Build "How We Host" 5-point synced interactive accordion           │
│ [ ] Build Kaleva Dining, Poolside Bar, and Ayurveda Spa showcases     │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: SOCIAL PROOF, MEDIA & INTERACTIVITY                           │
│ [ ] Build verified Testimonials slider with guest avatar switcher      │
│ [ ] Build Heritage Guide (14 Royal Chhatris, Fort, River Betwa)        │
│ [ ] Build Collapsible FAQ accordion and Instagram photo mosaic         │
│ [ ] Construct 4-column master footer with transit notes & directions   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 6: QUALITY CONTROL, LIGHTHOUSE PERFORMANCE & HANDOVER            │
│ [ ] Performance optimization: WebP/AVIF generation & blur placeholders │
│ [ ] Responsive QA across Desktop (1440px), Tablet (810px), Mobile (390)│
│ [ ] WCAG 2.1 AA accessibility audit & keyboard navigation testing      │
│ [ ] Verify 95+ score on Google Lighthouse (Performance, SEO, A11y)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Integration Dependencies & Booking Flow Spec

Because the existing resort does not operate a live cloud reservation API, the room-search interface will implement an elegant hybrid booking dispatcher:

```
[ GUEST SELECTS DATES & GUEST COUNT IN SEARCH BAR ]
                       │
                       ▼
          [ CLICKS "CHECK RATES / BOOK NOW" ]
                       │
                       ▼
          ┌─────────────────────────┐
          │ BOOKING RESOLUTION MODAL│
          └────────────┬────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
[ PRIMARY: DIRECT ENQUIRY ]   [ SECONDARY: INSTANT OTA ]
Prefills dates, room type     Direct deep-links to official
and guest count into direct   Orchha Resort pages on:
WhatsApp reservation desk     - MakeMyTrip
(+91 99262 19900) or email    - Agoda
```

### Advantages
1. Zero fabrication: Does not pretend to have a live availability engine when none exists.
2. Highest conversion: 70%+ of Indian domestic luxury resort bookings are finalized via phone/WhatsApp concierge.
3. Flexibility: For international guests, OTA deep-links provide instant automated booking with foreign credit card acceptance.

---

## 5. Risk Assessment & Mitigation Matrix

| Risk Factor | Severity | Probability | Mitigation Strategy |
|---|---|---|---|
| **Google Photos 404 Error** | High | 100% (Confirmed) | Implemented curated 25-shot asset manifest. Staged with high-fidelity royalty-free heritage architectural imagery via typed asset dictionary for instant 1-click replacement. |
| **Missing High-Res Logo** | Medium | High | Recreate the resort's iconic emblem as clean scalable vector SVG in Phase 2 based on the legacy site's `logo.png`. |
| **Animation Performance on Mobile** | Medium | Medium | Restrict all scroll animations to GPU-composited `transform` and `opacity`. Disable word-by-word reveal on mobile viewport in favor of standard fade-in. |
| **Booking Abandonment** | Medium | Low | Prominently display verified direct phone numbers (`+91 99262 19900`) and quick WhatsApp pill across all room cards and navigation bars. |

---

## 6. Testing & Quality Strategy

1. **Lighthouse Target:** Performance: `≥ 95`, Accessibility: `100`, Best Practices: `100`, SEO: `100`.
2. **Device Matrix:**
   - Apple iPhone 14/15/16 Pro (`393 × 852 px`)
   - Apple iPad Pro (`1024 × 1366 px`)
   - MacBook Pro 14" / 16" (`1512 × 982 px` & `1728 × 1117 px`)
   - Generic Full HD Desktop (`1920 × 1080 px`)
3. **Reduced Motion Verification:** Test with `prefers-reduced-motion: reduce` simulated in Chrome DevTools to ensure zero jarring transitions or inaccessible hidden content.
