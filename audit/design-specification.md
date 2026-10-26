# Orchha Resort — Design Specification & Visual System
**Phase 1: Navy & Beige Heritage Luxury Design System**
*Document Version: 1.0.0 | Date: 2026-10-26 | Lead UI/UX Designer & Motion Engineer*

---

## 1. Brand Philosophy & Aesthetic Direction

### Brand Character
- **Business Identity:** The Orchha Resort, Orchha, Madhya Pradesh.
- **Brand Spirit:** Understated Indian royal hospitality, tranquil riverbank sanctuary, timeless Bundelkhandi architecture, and slow luxury.
- **Visual Tone:** Sophisticated, refined, breathable, and deeply photographic. Avoid hyper-modern tech aesthetics, neon gradients, harsh glassmorphism, or noisy clutter.
- **Project Benchmark:** A ₹1,00,000-tier digital standard characterized by flawless typography, bespoke spacing rhythm, fluid scroll choreographies, and intuitive mobile ergonomics.

---

## 2. Refined Color System (Navy & Beige Tokens)

Following our audit of the design reference and the resort's natural riverside environment, we have refined the provisional colors (`#0F1E3F` and `#E8DCC5`) into an authentic heritage palette:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ORCHHA RESORT COLOR PALETTE                      │
├──────────────────┬─────────────────┬─────────────────┬─────────────────┤
│ MIDNIGHT NAVY    │ HERITAGE BEIGE  │ ANTIQUE BRONZE  │ BETWA EARTH     │
│ #0C1731          │ #F4F0E6         │ #8C6D3F         │ #260E01         │
│ (Primary Dark)   │ (Primary Light) │ (Accent / CTA)  │ (Deep Charcoal) │
├──────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ ROYAL NAVY ACCENT│ SAND LINEN      │ GOLD HIGHLIGHT  │ OFF-WHITE CANVAS│
│ #1A2B50          │ #E8DCC5         │ #B89758         │ #FDFBF7         │
│ (Nav Card/Panel) │ (Muted Neutral) │ (Hover / Stars) │ (Page Canvas)   │
└──────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### Functional Token Mapping

| Token Name | Hex Code | HSL Equivalent | Intended Usage |
|---|---|---|---|
| `color-brand-navy` | `#0C1731` | `hsl(222, 60%, 12%)` | Primary brand surface, dark section backgrounds, navigation accents, footer |
| `color-brand-navy-light`| `#1A2B50` | `hsl(221, 51%, 21%)` | Interactive hover states, elevated dark cards, borders on navy |
| `color-brand-beige` | `#F4F0E6` | `hsl(42, 38%, 93%)` | Secondary section background, soft highlight pills, card backings |
| `color-brand-canvas` | `#FDFBF7` | `hsl(40, 43%, 98%)` | Primary page background; warm, non-stark reading surface |
| `color-accent-gold` | `#8C6D3F` | `hsl(36, 38%, 40%)` | Interactive CTA borders, star ratings, category subheadings, badge borders |
| `color-accent-gold-hover`| `#B89758` | `hsl(39, 41%, 53%)` | Active focus rings, button hover backgrounds |
| `color-text-primary` | `#260E01` | `hsl(21, 95%, 8%)` | High-contrast editorial body text, headings on light surfaces |
| `color-text-secondary`| `#57503F` | `hsl(42, 16%, 29%)` | Captions, secondary descriptions, date/author metadata |
| `color-text-on-dark` | `#FFFFFF` | `hsl(0, 0%, 100%)` | Pure white text on navy and photographic overlays |
| `color-text-on-dark-sub`| `#E8DCC5`| `hsl(39, 43%, 84%)` | Subtitle copy and meta information on navy surfaces |
| `color-border-subtle` | `rgba(38,14,1,0.08)` | — | Hairline dividers and card contours on light backgrounds |

---

## 3. Typography Hierarchy

Adapted directly from the reference website's high-contrast pairing of literary serif and modern sans-serif:

```
DISPLAY & HEADINGS:  Crimson Text (Editorial Heritage Serif, 600 SemiBold)
BODY & INTERFACE:   DM Sans (Clean Geometric Sans, 400 Regular & 500 Medium)
CAPTIONS & TAGS:    DM Sans (Tracking +0.12em, 600 SemiBold, UPPERCASE)
```

| Element | Font Family | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| **Hero Title** | `Crimson Text` | `56px` – `64px` | `36px` – `42px` | `1.15em` | `-0.03em` |
| **Philosophy Reveal**| `Crimson Text` | `32px` – `36px` | `22px` – `26px` | `1.40em` | `-0.025em`|
| **Section Heading (H2)**| `Crimson Text` | `40px` – `44px` | `28px` – `32px` | `1.20em` | `-0.02em` |
| **Card Heading (H3)** | `Crimson Text` | `24px` – `26px` | `20px` – `22px` | `1.25em` | `-0.015em`|
| **Category Pill Tag** | `DM Sans` | `12px` | `11px` | `1.00em` | `+0.12em` |
| **Body Primary** | `DM Sans` | `16px` | `15px` | `1.60em` | `-0.01em` |
| **Body Secondary** | `DM Sans` | `14px` | `13px` | `1.50em` | `0.00em` |
| **Button Text** | `DM Sans` | `14px` | `14px` | `1.00em` | `+0.02em` |
| **Room Price Figure** | `DM Sans` | `22px` | `18px` | `1.10em` | `-0.02em` |

---

## 4. Mandatory Homepage Section Hierarchy

To satisfy the client's mandatory structure and the reference layout, the redesigned homepage is organized as follows:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 01. STICKY HEADER & NAVIGATION                                         │
│     Translucent glassmorphism navy/beige bar with phone and Book CTA   │
├────────────────────────────────────────────────────────────────────────┤
│ 02. HERO BANNER                                                        │
│     Full-height visual of Lotus Pool & Palace, Betwa tag & 4.9 rating   │
├────────────────────────────────────────────────────────────────────────┤
│ 03. MANDATORY ROOM-SEARCH INTERFACE (Directly below Hero)              │
│     Floating booking bar: Check-in, Check-out, Guests, Rooms & Search  │
├────────────────────────────────────────────────────────────────────────┤
│ 04. RESORT INTRODUCTION & PHILOSOPHY                                  │
│     Scroll-driven word reveal: "Where ancient Bundelkhand meets serene..."│
├────────────────────────────────────────────────────────────────────────┤
│ 05. FEATURED ACCOMMODATIONS ("Our Rooms & Tents")                      │
│     4-Card Showcase: Standard, Deluxe, Swiss Tents, Heritage Suite     │
├────────────────────────────────────────────────────────────────────────┤
│ 06. SIGNATURE AMENITIES ("Why Stay With Us" 2x2 Grid)                  │
│     Lotus Swimming Pool, Riverside Tennis, Folk Dances, Serene Grounds │
├────────────────────────────────────────────────────────────────────────┤
│ 07. EXPERIENTIAL HOSPITALITY ("How We Host" Tab Accordion)             │
│     Bespoke Concierge, Heritage Dining, Rejuvenating Ayurveda, Weddings│
├────────────────────────────────────────────────────────────────────────┤
│ 08. DINING & LOUNGE BAR                                                │
│     "Kaleva" multi-cuisine culinary journey + Poolside evening grill   │
├────────────────────────────────────────────────────────────────────────┤
│ 09. KERALA AYURVEDA SPA & WELLNESS                                     │
│     Traditional Shirodhara, herbal steam baths, health equilibrium     │
├────────────────────────────────────────────────────────────────────────┤
│ 10. SOCIAL PROOF & TESTIMONIALS                                        │
│     Verified guest reviews (Robert H, Canada), Tripadvisor rating      │
├────────────────────────────────────────────────────────────────────────┤
│ 11. LOCATION & HERITAGE CONTEXT                                        │
│     Historical Chhatris overview, Fort complex guide, Interactive Map  │
├────────────────────────────────────────────────────────────────────────┤
│ 12. GLOBAL FOOTER                                                      │
│     4-Column navigation, contact info, transport routes & copyright    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. The Room-Search Interface (Mandatory Placement)

The room-search interface must appear **immediately below the hero banner**, functioning either as a floating card docked at the bottom of the hero or as the initial anchored element in Section 3.

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    RESERVE YOUR SANCTUARY                                     │
├──────────────────┬──────────────────┬──────────────────────┬──────────────────┬───────────────┤
│  CHECK-IN DATE   │  CHECK-OUT DATE  │  GUESTS              │  ROOMS           │    SEARCH     │
│  [ 15 Nov 2026 ] │  [ 18 Nov 2026 ] │  [ 2 Adults, 0 Kids ]│  [ 1 Room     ]  │ [ CHECK RATES]│
│  Calendar Picker │  Calendar Picker │  Guest Selector Drop │  Room Dropdown   │ Solid Navy CTA│
└──────────────────┴──────────────────┴──────────────────────┴──────────────────┴───────────────┘
```

### Technical Specification
- **Positioning:** Desktop: Floating docked container (`margin-top: -48px; z-index: 30; max-width: 1140px; margin-left: auto; margin-right: auto;`). Mobile: Clean stacked modular card.
- **Surface:** Pure white background (`#FFFFFF`) with subtle luxury shadow (`0 20px 40px -15px rgba(12, 23, 49, 0.12)`) and hairline gold border (`1px solid rgba(140, 109, 63, 0.2)`).
- **Controls & Validation:**
  - *Check-in / Check-out:* Dual date picker with minimum stay validation and disabled past dates.
  - *Guests:* Stepper input for Adults (1–5) and Children (0–4) matching the verified legacy options.
  - *Rooms:* Selector (1, 2, or 3 Rooms).
- **Booking Flow Resolution:**
  - Clicking "CHECK RATES / BOOK NOW" triggers a streamlined booking resolution modal:
    1. *Direct Instant Enquiry:* Prefills dates and guest counts into an instant WhatsApp reservation dispatcher (`https://wa.me/919926219900?text=...`) or verified reservation mailer.
    2. *Verified OTA Redirects:* Provides 1-click fallback links to the resort's official listings on MakeMyTrip and Agoda for travelers demanding immediate automated credit card checkout.

---

## 6. Motion & Interaction Principles

### Principles
1. **Restraint over Spectacle:** Motion must feel like physical paper, silk, or architectural light. Never animate purely for decoration.
2. **Performance Budget:** All animations must execute strictly on the compositor thread (`transform` and `opacity` only). Zero layout-triggering properties (`width`, `height`, `top`, `margin`) during scroll.
3. **Reduced Motion:** Fully disable or flatten scroll interpolation when `@media (prefers-reduced-motion: reduce)` is detected.

### Specific Choreography Rules
- **Word-by-Word Text Reveal:**
  - Element: Section 4 "Our Philosophy".
  - Scroll Trigger: When container is between `20%` and `80%` of viewport.
  - Interpolation: Individual words transition from `rgba(38, 14, 1, 0.2)` to `rgba(38, 14, 1, 1.0)`.
- **Card Hover Elevation:**
  - Element: Room cards and amenity items.
  - Transition: `transform: scale(1.025); transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1)`.
  - Image overlay: Subtle exposure increase (`filter: brightness(1.04)`).
- **Accordion Toggle:**
  - Element: "How We Host" & FAQ items.
  - Height: CSS grid height transition (`grid-template-rows: 0fr` to `1fr`) in `300ms ease-out`.

---

## 7. Accessibility & Responsive Requirements

- **Color Contrast:** All body text (`#260E01` on `#FDFBF7` and `#FFFFFF` on `#0C1731`) exceeds WCAG 2.1 AA standards (minimum contrast ratio of `12.5:1`, well above the `4.5:1` threshold).
- **Gold Accent Readability:** Gold text (`#8C6D3F`) is reserved for decorative subheadings and borders; text on gold buttons uses deep midnight navy (`#0C1731`) for maximum contrast (`7.8:1`).
- **Touch Target Sizes:** All interactive buttons, calendar days, and form inputs maintain a minimum touch bounding box of `44 × 44 px` on mobile devices.
- **Breakpoints:**
  - Mobile Small: `< 480px`
  - Mobile Standard: `480px – 809px`
  - Tablet: `810px – 1199px`
  - Desktop Standard: `1200px – 1440px`
  - Wide Desktop: `> 1440px`
