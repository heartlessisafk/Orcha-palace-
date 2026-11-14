# THE ORCHHA RESORT — DESIGN SYSTEM & CREATIVE SPECIFICATION
**Version:** 2.0.0 (Milestone 2 Architecture)  
**Status:** Canonical Design Authority  
**Authoring Team:** Anthropic Frontend Design · Impeccable · Taste Skill · UI UX Pro Max · Vercel Design Guidelines  
**Modes:** Persuade & Experience  
**Site Kind:** Place (Luxury Riverside Heritage Sanctuary)

---

## 1. Creative Direction & Brand Identity

### 1.1 Brand Essence
The Orchha Resort digital experience is crafted as a **cinematic luxury hospitality journey** rooted in the tranquil riverbanks of the Betwa River, directly opposite the 16th-century Royal Cenotaphs (Chhatris) of Bundelkhand.

The digital identity articulates six pillars:
1. **Royal Indian Heritage**: Authentic Bundela Rajput architectural vernacular, monumental stonework, arched jharokhas, and imperial grace.
2. **Contemporary Luxury**: Modern hospitality standards, international luxury poise (reminiscent of Aman, Six Senses, and Oberoi Vilas), clean geometric restraint, and effortless digital elegance.
3. **Architectural Elegance**: Structural clarity, proportion, generous negative space, intentional rhythm, and avoidance of decorative excess.
4. **Calm & Immersive Hospitality**: Unhurried pacing, generous breathing room, gentle scroll choreography, and ambient depth.
5. **Premium Editorial Photography**: Genuine, authentic imagery leading every screen; zero generic stock photographs.
6. **Sophisticated Digital Storytelling**: Seamless handoffs from historical landscape narrative to in-flow suite reservation.

### 1.2 Anti-Slop Discipline (Anti-Patterns to Reject)
- **NO Generic SaaS Card Kits**: Avoid uniform grey-shadowed box cards with identical rounded corners.
- **NO Cliché AI Color Traps**: Strict prohibition of random terracotta/clay accents, neon gradients, or acid green highlights.
- **NO Ubiquitous Tracked-Out Eyebrows**: Subtitle tags are reserved strictly for genuine contextual categories; never used as decorative filler above every heading.
- **NO Artificial Stock Photography**: Never substitute authentic resort photography with generic stock models or unrelated hotel interiors.
- **NO Image Captions Under Visuals**: Images speak for themselves; metadata is integrated cleanly into card contracts or reserved for modal lightboxes.
- **NO Broken Scroll Traps**: Map gestures and scroll sequences must never trap the visitor or impede natural page traversal.

---

## 2. Design Token Architecture

### 2.1 Color Palette
The color system honors the established **Midnight Navy, Heritage Linen, and Antique Bronze/Gold** identity, mapping directly to physical materials of Orchha (night skies over the Betwa River, yellow sandstone cenotaphs, and antique brass fixtures).

#### Primary Palette
| Token Name | Hex Value | CSS Variable | Semantic Usage | WCAG AA Contrast |
| :--- | :--- | :--- | :--- | :--- |
| `brand-navy` | `#0C1731` | `--color-brand-navy` | Primary brand background, dark sections, high-contrast headings | 14.8:1 on Linen |
| `brand-navy-light` | `#1A2B50` | `--color-brand-navy-light`| Elevated dark surfaces, button hover states, active dark cards | 10.5:1 on Linen |
| `brand-navy-deep` | `#060C1B` | `--color-brand-navy-deep` | Cartographic map ground, footer abyss, backdrop modal masks | 18.2:1 on Linen |
| `brand-beige` | `#F4F0E6` | `--color-brand-beige` | Warm Heritage Linen surface, secondary buttons, card backgrounds | 14.8:1 on Navy |
| `brand-beige-sand` | `#E8DCC5` | `--color-brand-beige-sand`| Muted Sand neutral, subtle borders, inactive control chips | 9.2:1 on Navy |
| `brand-beige-light`| `#FAF7F2` | `--color-brand-beige-light`| Ultra-light warm tint, subtle table zebra stripes, light card fills | 16.1:1 on Navy |
| `brand-canvas` | `#FDFBF7` | `--color-brand-canvas` | Primary light page ground (off-white heritage parchment) | 16.9:1 on Navy |

#### Accent & Metal Palette
| Token Name | Hex Value | CSS Variable | Semantic Usage | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `brand-gold` | `#8C6D3F` | `--color-brand-gold` | Antique Bronze / Muted Gold accent, primary CTA borders, focus rings | 4.8:1 on Navy |
| `brand-gold-light` | `#B89758` | `--color-brand-gold-light`| Warm Gold highlight, icon accents, active tab indicators | 3.2:1 (large text/graphics) |
| `brand-gold-dark` | `#6E532B` | `--color-brand-gold-dark` | Deep Bronze, pressed button state, high-contrast gold text on light | 5.4:1 on Canvas |
| `brand-gold-muted` | `rgba(140, 109, 63, 0.18)`| `--color-brand-gold-muted` | Subtle gold glow, tinted badge backgrounds, interactive tile halos | Decorative |

#### Typography & Content Palette
| Token Name | Hex Value | CSS Variable | Semantic Usage | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `brand-charcoal` | `#260E01` | `--color-brand-charcoal` | Primary body text on light backgrounds (warm black) | 15.6:1 on Canvas |
| `brand-charcoal-soft`| `#3A2B20` | `--color-brand-charcoal-soft`| Secondary body text, list descriptions | 11.2:1 on Canvas |
| `brand-olive` | `#57503F` | `--color-brand-olive` | Editorial lead text, subheadings, architectural notes | 7.1:1 on Canvas |
| `brand-muted` | `#757575` | `--color-brand-muted` | Meta labels, date pickers, inactive stepper counts | 4.6:1 on Canvas |
| `brand-white` | `#FFFFFF` | `--color-brand-white` | Primary text on navy, glass card surfaces, crisp modal grounds | 18.2:1 on Navy Deep |

---

### 2.2 Typography Hierarchy

Typography embodies the contrast between **regal historical heritage** (serif) and **effortless contemporary readability** (sans-serif).

#### Font Pairings
- **Display & Headings:** `Crimson Text` (`font-serif`, Google Fonts via `--font-crimson`).
- **Body, Navigation, UI Controls:** `DM Sans` (`font-sans`, Google Fonts via `--font-dmsans`).

#### Type Scale Specifications
| Role | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Letter Spacing | Max Line Length |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `font-serif` | `3.75rem (60px)` / `2.5rem (40px)` | Semibold (600) | `1.12` | `-0.03em` | 32ch |
| **H1 (Page Title)** | `font-serif` | `3.0rem (48px)` / `2.125rem (34px)` | Semibold (600) | `1.18` | `-0.025em` | 38ch |
| **H2 (Section Heading)**| `font-serif` | `2.25rem (36px)` / `1.75rem (28px)` | Semibold (600) | `1.22` | `-0.02em` | 42ch |
| **H3 (Card Title)** | `font-serif` | `1.5rem (24px)` / `1.25rem (20px)` | Medium (500) | `1.30` | `-0.015em` | 45ch |
| **H4 (Sub-Heading)** | `font-serif` | `1.25rem (20px)` / `1.125rem (18px)`| Medium (500) | `1.35` | `-0.01em` | 50ch |
| **Lead Paragraph** | `font-sans` | `1.125rem (18px)` / `1.0rem (16px)` | Regular (400) | `1.65` | `0` | 65ch |
| **Body (Default)** | `font-sans` | `1.0rem (16px)` / `0.9375rem (15px)`| Regular (400) | `1.60` | `-0.005em` | 68ch |
| **Body Small / Meta** | `font-sans` | `0.875rem (14px)` / `0.8125rem (13px)`| Regular (400) | `1.50` | `0` | 72ch |
| **Navigation Link** | `font-sans` | `0.875rem (14px)` | Medium (500) | `1.0` | `+0.02em` | Single-line |
| **Button Label** | `font-sans` | `0.875rem (14px)` / `0.9375rem (15px)`| Medium (500) | `1.0` | `+0.025em` | Single-line |
| **Contextual Subtitle Tag**| `font-sans` | `0.75rem (12px)` | Semibold (600) | `1.0` | `+0.12em` | Uppercase |

---

### 2.3 Spatial Rhythm & Grid System

The layout adopts a **4px geometric grid** with equal edge margins enforcing Taste Skill Rule 4: *Equal left and right content edges*.

#### Container Widths
- `max-w-narrow`: `960px` (Dedicated reading, single-column heritage articles, modal dialogs)
- `max-w-container`: `1280px` (Standard page content, card grids, accommodations overview)
- `max-w-wide`: `1440px` (Full-bleed editorial features, visual hero frames, map finale)

#### Margin & Padding Tokens
| Token | Pixels | Usage |
| :--- | :--- | :--- |
| `space-1` | `4px` | Fine adjustments, icon gaps |
| `space-2` | `8px` | Badge interior padding, stepper spacing |
| `space-3` | `12px` | Input interior vertical padding, chip gaps |
| `space-4` | `16px` | Standard compact spacing, card mobile padding |
| `space-6` | `24px` | Card desktop padding, section subtitle gap |
| `space-8` | `32px` | Grid column gutters, reservation component spacing |
| `space-12` | `48px` | Section sub-block separations |
| `space-16` | `64px` | Section vertical rhythm (mobile) |
| `space-24` | `96px` | Section vertical rhythm (tablet/desktop) |
| `space-32` | `128px` | Major thematic transition gaps (hero to suites, suites to map) |

---

### 2.4 Border Radii & Architectural Geometry

In adherence to Anthropic Frontend Design and Taste Skill rules, border radii are deliberately differentiated by hierarchical role rather than uniformly rounded.

| Class | Value | Usage |
| :--- | :--- | :--- |
| `rounded-none` | `0px` | Photographic frames, architectural image split panels, divider bars |
| `rounded-sm` | `4px` | Form input fields, stepper buttons, date picker cells |
| `rounded-md` | `8px` | Dropdown menus, tooltips, interactive landmark pills |
| `rounded-luxury` | `12px` | Accommodation cards, review cards, booking sequence dock |
| `rounded-2xl` | `16px` | Floating reservation modal, major experiential containers |
| `rounded-full` | `9999px` | Buttons, navigation pills, status badges, avatar frames |

---

### 2.5 Shadows, Depth & Elevation

Depth is tactile and physical, utilizing subtle tinted ambient shadows with gilded illumination rather than flat grey drop-shadows.

```css
/* Tailored Elevation Tokens */
--shadow-subtle: 0 2px 8px -2px rgba(12, 23, 49, 0.05);
--shadow-card: 0 8px 24px -4px rgba(12, 23, 49, 0.07), 0 2px 6px -1px rgba(12, 23, 49, 0.03);
--shadow-hover: 0 16px 36px -8px rgba(12, 23, 49, 0.12), 0 4px 12px -2px rgba(12, 23, 49, 0.04);
--shadow-gold-ambient: 0 8px 25px -4px rgba(140, 109, 63, 0.28), 0 2px 8px -1px rgba(140, 109, 63, 0.12);
--shadow-modal: 0 24px 60px -12px rgba(6, 12, 27, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08);
```

---

### 2.6 Collision-Proof Z-Index Scale

To prevent any recurrence of stacking bugs, overlapping modals, or sticky clipping:

| Layer | Z-Index | Elements |
| :--- | :--- | :--- |
| `z-base` | `0` | Standard layout, content flow, photographic backgrounds |
| `z-card` | `10` | Elevated interactive cards, floating badges |
| `z-controls` | `20` | Leaflet map markers, map layer controls, gallery filters |
| `z-sticky` | `30` | Pinned category filter bar (`sticky top-20`) |
| `z-navbar` | `40` | Main fixed navigation header |
| `z-modal-backdrop` | `50` | Dialog backdrop mask (`bg-brand-navy-deep/75 backdrop-blur-md`) |
| `z-modal` | `51` | Concierge reservation dialog, fullscreen photo lightbox |
| `z-toast` | `60` | Notification alerts, copy-to-clipboard confirmations |

---

## 3. Photography Direction & Asset Management

### 3.1 Subject-Specific Guidelines

Photography leads the experience. In accordance with Taste Skill: *Every visual renders real photographs of the place; zero captions underneath; zero stock models.*

#### Category 1: Palace Architecture & Facades
- **Visual Truth:** Authentic Bundela sandstone craftsmanship, symmetry, domed chhatris, stone jalis, illuminated courtyards at dusk.
- **Lighting:** Warm golden hour (4:30 PM - 6:00 PM) or ambient twilight illumination.
- **Framing:** Dramatic architectural perspective, strong leading lines, clear sky or reflective water grounding.
- **Approved Assets:** `public/images/resort/genuine/chhatris.jpg`, `public/images/resort/curated/heritage/heritage-chhatris-reflection-river.jpg`.

#### Category 2: Accommodations & Suites
- **Visual Truth:** Real interior appointments—Pietra Dura marble floors, hand-block printed canopies, teak heritage furnishings, river views.
- **Lighting:** Natural diffuse daylight through arched windows paired with warm interior lamp glow (2700K).
- **Framing:** Generous wide angle showcasing bedroom-to-living layout without extreme fish-eye distortion.
- **Approved Assets:**
  - Standard Room: `room-deluxe-interior-panoramic.jpg`
  - Deluxe Room: `room-deluxe-king-pool-view.jpg`
  - AC Swiss Tent: `room-tent-interior-canopy.jpg`
  - Royal Heritage Suite: `room-suite-heritage-living.jpg`

#### Category 3: Lotus Swimming Pool
- **Visual Truth:** Characteristic blossoming lotus pool architecture with turquoise water and sandstone perimeter.
- **Lighting:** Twilight illumination with submerged lights and poolside lanterns.
- **Approved Assets:** `public/images/resort/curated/pool/pool-lotus-twilight-glow.jpg`, `public/images/resort/genuine/swimming.jpg`.

#### Category 4: Royal Destination Weddings
- **Visual Truth:** Authentic palace lawn mandap, floral marigold canopies, warm evening banquet illumination.
- **Approved Assets:** `public/images/weddings/wedding-mandap-canopy.jpg`, `public/images/weddings/wedding-sangeet-celebration.jpg`.

#### Category 5: Kairali Ayurvedic Wellness Spa
- **Visual Truth:** Traditional brass urli bowls, herbal medicated oils, teak wooden droni massage tables.
- **Approved Assets:** `public/images/resort/genuine/spa2.jpg`, `public/images/spa/catalog/*.jpg`.

#### Category 6: Betwa River Landscapes & Heritage
- **Visual Truth:** Betwa river bends, granite river boulders, sunset reflections behind the 14 royal chhatris.
- **Approved Assets:** `public/images/resort/curated/heritage/*.jpg`.

### 3.2 Asset Replacement Policy
- All 109 genuine assets verified in Phase 2 are retained.
- If an image requires refinement in future phases, it must be sourced from confirmed on-site photography or historical archives.
- **Zero generic stock imagery** (e.g., Unsplash generic hotel rooms) may ever be introduced.

---

## 4. Shared Component System

### 4.1 Interactive Button & Tactile 3D Standard

In accordance with Core Directive 2 and Impeccable Craft Floor, every interactive button features:
1. **Subtle Z-Axis Elevation**: Smooth lift (`translateY(-2px)`) on hover.
2. **Gilded Ambient Drop-Shadow**: Gold/bronze halo (`--shadow-gold-ambient`).
3. **Tactile Press Feedback**: Subtle compression (`scale: 0.98`) on active click/tap.
4. **Accessible Focus Rings**: Explicit 2px solid gold `:focus-visible` ring with 2px offset.
5. **Touch Ergonomics**: Minimum bounding target >= 44x44px.

#### Button Variants Matrix
```tsx
// Primary Brand Navy Button (Default CTA)
className="h-11 px-6 rounded-full bg-brand-navy text-white font-sans text-sm font-medium tracking-wide
           border border-white/10 shadow-subtle transition-all duration-300 ease-out
           hover:bg-brand-navy-light hover:-translate-y-0.5 hover:shadow-hover hover:border-brand-gold/40
           active:scale-[0.98] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"

// Heritage Antique Gold Button (High-Priority Action / Reserve)
className="h-11 px-7 rounded-full bg-brand-gold text-white font-sans text-sm font-medium tracking-wide
           border border-brand-gold-light/40 shadow-subtle transition-all duration-300 ease-out
           hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-gold-ambient
           active:scale-[0.98] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"

// Heritage Linen Secondary Button
className="h-11 px-6 rounded-full bg-brand-beige text-brand-charcoal font-sans text-sm font-medium tracking-wide
           border border-brand-charcoal/10 transition-all duration-300 ease-out
           hover:bg-brand-beige-sand hover:-translate-y-0.5 hover:shadow-subtle
           active:scale-[0.98] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
```

### 4.2 Editorial Glass Surface (Hero Contrast Protection)
- Applied behind hero typography to ensure 100% legibility over any background photography.
- Specification: `backdrop-blur-md bg-brand-navy/60 border border-white/12 rounded-2xl p-6 sm:p-10 shadow-navy`.

### 4.3 In-Flow Reservation Sanctuary Suite
- Directly follows the cinematic hero in the regular document flow (zero absolute floating overlap).
- Features formatted date pickers, occupancy steppers, and "Check Rate & Book" button.
- Triggers modal dialog with complete body/root scroll lock (`overflow: hidden`).

### 4.4 Accommodation & Experience Cards
- Container: `rounded-luxury border border-brand-charcoal/8 bg-white overflow-hidden shadow-card`.
- Interaction: Lift `translateY(-4px)` with internal image zoom `1.03` over 0.6s `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 5. Motion Design System

All motion is governed by **physical restraint and spatial continuity** (UI UX Pro Max Priority 7).

### 5.1 Animation Timing & Easing Curves
```css
/* Motion Curves */
--ease-editorial-entrance: cubic-bezier(0.22, 1, 0.36, 1); /* Elegant deceleration */
--ease-tactile-spring: cubic-bezier(0.16, 1, 0.3, 1);      /* Responsive interactive lift */
--ease-smooth-out: cubic-bezier(0.25, 0.8, 0.25, 1);       /* Dialog / drawer exit */

/* Durations */
--duration-instant: 150ms; /* Button press feedback */
--duration-fast: 250ms;    /* Hover transitions, chip selection */
--duration-normal: 400ms;  /* Card lift, dropdown reveal */
--duration-gentle: 600ms;  /* Modal open, drawer slide */
--duration-entrance: 800ms;/* Hero text line mask reveal */
```

### 5.2 Preserved Core Animation Contracts
1. **Palace-to-Map 5-Stage Finale (`PalaceToMapFinale.tsx`)**:
   - 500vh scroll container divided into 5 discrete non-overlapping acts.
   - Preserves `overflow-visible` to prevent sticky clipping.
2. **Real Orchha Geographic Map (`RealOrchhaMap.tsx`)**:
   - CARTO Voyager light raster tiles (`rastertiles/voyager`).
   - Smooth camera `flyTo` with 1.2s flight easing on landmark selection.
   - `scrollWheelZoom: false` to guarantee natural page scroll traversal.
3. **Guest Love Review Choreography (`GuestLoveExperience.tsx`)**:
   - 380vh scroll track with 4 alternating cards.
   - Full domain `[0.0, 1.0]` clamped keyframes preventing animation looping.
4. **Progressive Gallery Reveal (`GalleryViewer.tsx`)**:
   - 3-at-a-time progressive expansion with Framer Motion `layout` smoothing.
5. **Reduced Motion Safety**:
   - When `prefers-reduced-motion: reduce` is detected, all transitions collapse to instant opacity fades (`0.01ms`), preventing disorientation.

---

## 6. Implementation Alignment & Roadmap for Subsequent Phases

| Phase | Target Area | Implementation Deliverables |
| :--- | :--- | :--- |
| **Phase 4** | Universal Buttons & Interactive Controls | Implement tactile 3D hover system across all 45+ buttons; verify focus rings and touch targets. |
| **Phase 5** | Hero Section & Reservation Suite | Polish editorial glass surface, refine in-flow reservation dock, enhance date/stepper controls. |
| **Phase 6** | Accommodation Cards & Room Pages | Elevate cards on `/` and `/rooms`, refine `/rooms/[slug]` specifications and WhatsApp booking. |
| **Phase 7** | Storytelling, Gallery & Final Hardening | Polish `/gallery`, `/about`, `/weddings`, `/spa`. Execute Web Interface Guidelines audit and final multi-viewport verification. |
