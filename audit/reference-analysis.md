# Orchha Resort Redesign — Reference Website Analysis
**Reverse-Engineering Report: Constellare Reference (`fearless-gazelle-480293.framer.app`)**
*Document Version: 1.0.0 | Date: 2026-10-26 | Method: Headless REA DOM & Stylesheet Decompilation*

---

## 1. Overview & Architecture

The design reference is a bespoke Framer website titled **"Constellare | Modern Hotel Rooms and Suites"** (`https://fearless-gazelle-480293.framer.app/`). It embodies contemporary boutique luxury hospitality: minimal ornamentation, intentional whitespace, high-contrast serif/sans typography, subtle scroll choreography, and tactile interactive elements.

### Technical Framework
- **Platform:** Framer (React 19 runtime, server-side rendered with hydration)
- **Animation Engine:** Framer Motion (embedded within Framer components)
- **Styling Architecture:** Atomic scoped CSS with centralized design tokens (`--token-...`)
- **Hosting / CDN:** Cloudflare Edge + Framer Asset CDN (`framerusercontent.com`)
- **Responsive Viewport Model:** Desktop (`≥ 1200px`), Tablet (`810px – 1199.98px`), Mobile (`0 – 809.98px`)

---

## 2. Complete Section Order & Hierarchy

The reference homepage follows a meticulously planned narrative structure across 12 distinct functional sections:

```
┌────────────────────────────────────────────────────────┐
│  01. STICKY NAVIGATION BAR (Glassmorphism & Quick CTA) │
├────────────────────────────────────────────────────────┤
│  02. HERO SECTION (Full-Height Ambient Video + Rating) │
├────────────────────────────────────────────────────────┤
│  03. PHILOSOPHY SECTION (Scroll Word-by-Word Reveal)   │
├────────────────────────────────────────────────────────┤
│  04. VALUE PROPOSITION: "Why Stay With Us" (2x2 Grid)  │
├────────────────────────────────────────────────────────┤
│  05. SERVICE EXPERIENCE: "How We Host" (Tab Accordion) │
├────────────────────────────────────────────────────────┤
│  06. ACCOMMODATION: "Our Rooms" (4-Card CMS Showcase)  │
├────────────────────────────────────────────────────────┤
│  07. SOCIAL PROOF: Guest Testimonials (Avatar Slider)   │
├────────────────────────────────────────────────────────┤
│  08. IMMERSIVE MEDIA: Interior Showcase Banner         │
├────────────────────────────────────────────────────────┤
│  09. EDITORIAL JOURNAL: "Articles" (3-Card Stories)    │
├────────────────────────────────────────────────────────┤
│  10. FAQ SECTION: Collapsible Accordion                │
├────────────────────────────────────────────────────────┤
│  11. INSTAGRAM / SOCIAL MEDIA PHOTO MOSAIC             │
├────────────────────────────────────────────────────────┤
│  12. GLOBAL FOOTER (4-Column Directory + Reception)    │
└────────────────────────────────────────────────────────┘
```

---

## 3. Typography System

The design achieves its editorial sophistication by contrasting a classical, high-contrast literary serif with a functional, geometric sans-serif.

| Role | Font Family | Fallbacks | Weight | Size (Desktop) | Line Height | Letter Spacing | Case |
|---|---|---|---|---|---|---|---|
| **Display Hero Heading** | `Crimson Text` | Georgia, serif | 600 (SemiBold) | 52px – 64px | 1.15em | `-0.03em` | Sentence |
| **Philosophy Text Reveal** | `Crimson Text` | Georgia, serif | 600 (SemiBold) | 32px – 38px | 1.40em | `-0.03em` | Sentence |
| **Section Headings (H2)** | `Crimson Text` | Georgia, serif | 600 (SemiBold) | 40px – 48px | 1.20em | `-0.025em`| Sentence |
| **Card / Item Titles (H3)**| `Crimson Text` | Georgia, serif | 600 (SemiBold) | 24px – 28px | 1.25em | `-0.02em` | Sentence |
| **Small Category Subtitle**| `DM Sans` / `Geist` | Inter, sans-serif| 600 (Medium) | 12px – 13px | 1.00em | `+0.12em` | UPPERCASE |
| **Body Primary** | `DM Sans` | Inter, sans-serif| 400 (Regular) | 15px – 16px | 1.55em | `-0.01em` | Normal |
| **Body Muted / Footnotes** | `DM Sans` | Inter, sans-serif| 400 (Regular) | 13px – 14px | 1.50em | `0.00em` | Normal |
| **Navigation & CTA Buttons**| `DM Sans` | Inter, sans-serif| 500 (Medium) | 14px | 1.00em | `+0.02em` | Sentence |
| **Pricing Figures** | `DM Sans` | Inter, sans-serif| 600 (SemiBold) | 20px – 22px | 1.10em | `-0.02em` | Normal |

---

## 4. Color Palette & Verified Design Tokens

Decompiled from the Framer runtime stylesheets:

```css
:root {
  /* Core Brand Tokens */
  --color-primary-navy:     #0C1731;  /* Deep Midnight Royal Navy (Header, Dark Cards, Footer) */
  --color-navy-muted:       #1B2744;  /* Secondary Navy Surface */
  --color-accent-gold:       #8C6D3F;  /* Warm Antique Gold / Ochre Bronze */
  --color-accent-gold-light: #C4A265;  /* Hover / Highlight Gold */
  
  /* Surfaces & Backgrounds */
  --color-bg-linen:         #F4F0E6;  /* Primary Cream / Warm Heritage Linen */
  --color-bg-canvas:        #FDFBF7;  /* Clean Off-White Warm Canvas */
  --color-surface-pure:     #FFFFFF;  /* Card Surfaces, Floating Modals */
  --color-surface-dark:     #0C0C0C;  /* Media Banners & Dark Panels */
  
  /* Text & Foreground */
  --color-text-charcoal:    #260E01;  /* Deep Earth Charcoal Body Text (Warm Black) */
  --color-text-secondary:   #57503F;  /* Muted Olive/Brown Editorial Subtext */
  --color-text-muted:       #757575;  /* Captions & Meta Labels */
  --color-text-on-dark:     #FFFFFF;  /* Inverted Text on Navy/Dark surfaces */
  --color-text-on-dark-sub: #E8DCC5;  /* Soft Warm Linen Subtext on Navy */

  /* Borders & Dividers */
  --color-border-subtle:    rgba(38, 14, 1, 0.08); /* Hairline warm borders */
  --color-border-dark:      rgba(255, 255, 255, 0.12); /* Dividers on Navy */
}
```

---

## 5. Spacing, Proportions & Layout Rules

- **Grid System:** 12-column flexible grid with max content container width of **1280px** (expanding to **1440px** for full-bleed hero and gallery sections).
- **Horizontal Page Gutter:**
  - Desktop (`≥ 1200px`): `80px` (`5rem`) outer margin
  - Tablet (`810px – 1199px`): `40px` (`2.5rem`) outer margin
  - Mobile (`< 810px`): `20px` (`1.25rem`) outer margin
- **Vertical Section Spacing:**
  - Standard section padding: `120px 0` desktop, `80px 0` tablet, `60px 0` mobile.
  - Reduced rhythm sections: `80px 0` desktop.
- **Card Gaps:**
  - 2×2 feature grid: `24px` gap.
  - 4-column room grid: `24px` horizontal gap, `32px` vertical gap.
  - Journal cards: `24px` gap.

---

## 6. Detailed Component Inspection

### 6.1 Sticky Navigation Bar (`Nav Container`)
- **Height:** 72px desktop (`64px` mobile).
- **Positioning:** Fixed / Sticky (`position: sticky; top: 0; z-index: 50;`).
- **Surface:** Glassmorphic translucent backdrop: `background: rgba(244, 240, 230, 0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(38, 14, 1, 0.06);`.
- **Layout:**
  - Left: Logo text ("Constellare") in `Crimson Text` 22px semi-bold.
  - Center: Pill-shaped navigation menu (`Home`, `About us`, `Our Rooms`, `Articles`).
  - Right: "Book your stay" pill CTA button (`padding: 10px 22px; border-radius: 9999px; background: #0C1731; color: #FFF; font-size: 14px;`) with animated right-arrow icon on hover.

### 6.2 Hero Section (`Hero Section`)
- **Height:** Desktop `90vh` – `100vh`.
- **Composition:** Asymmetric split overlay:
  - Background: Full-bleed ambient video / high-res imagery with subtle dark gradient vignette (`linear-gradient(180deg, rgba(12,23,49,0.2) 0%, rgba(12,23,49,0.65) 100%)`).
  - Overlay Card / Pill: Top-left floating rating badge: "4.9 ★ Excellent" with 3 overlapping circular avatar headshots.
  - Headline: Centered bottom-aligned typography in `Crimson Text` 56px white.
  - Subtitle Tag: Small caps tracking `+0.12em` tag (e.g., "ORCHHA PALACE" in reference).

### 6.3 "Our Philosophy" Text-Reveal Section
- **Effect:** Word-by-word scroll-driven opacity interpolation.
- **Markup Implementation:**
  ```html
  <h4 style="font-family: 'Crimson Text'; font-size: 32px; line-height: 1.4em;">
    <span style="opacity: 0.2; transition: opacity 0.3s ease;">We </span>
    <span style="opacity: 0.2; transition: opacity 0.3s ease;">believe </span>
    <span style="opacity: 0.2; transition: opacity 0.3s ease;">a </span>
    <span style="opacity: 0.2; transition: opacity 0.3s ease;">great </span>
    <span style="opacity: 0.2; transition: opacity 0.3s ease;">stay </span>...
  </h4>
  ```
- **Motion Trigger:** As the parent container scrolls through the center 50% of the viewport, each span transitions linearly from `0.2` to `1.0`.

### 6.4 Feature Grid: "Why Stay With Us"
- **Layout:** Asymmetric 2-column layout:
  - Left Column (40% width): Sticky section title ("Why Stay With Us"), subtitle paragraph, and secondary text button ("See more about us").
  - Right Column (60% width): 2×2 grid of minimal cards.
  - Card Structure: Crisp hairline border (`1px solid rgba(38,14,1,0.08)`), generous padding (`32px`), icon badge, bold sans title (`18px`), and muted body description (`15px`).

### 6.5 Interactive Experience Accordion: "How We Host"
- **Interaction Pattern:** Synced tab-to-image accordion.
- **Behavior:** 5 service pillars ("Attentive Hosts", "Rooms Prepared For You", "Comfort and Security", "Flexible Stays", "From Booking To Checkout"). Clicking or scrolling into an item expands its description (`height: auto; opacity: 1`) and smoothly cross-fades the accompanying photographic image on the right.

### 6.6 Room Cards Grid: "Our Rooms"
- **Layout:** 2×2 or 4-card horizontal responsive flex-grid.
- **Card Design:**
  - Image Container: 4:3 or 16:10 aspect ratio with `overflow: hidden; border-radius: 12px;`.
  - Image Interaction: `transform: scale(1.0); transition: transform 0.4s ease-out;` zooming to `scale(1.03)` on card hover.
  - Content Row: Room title in `Crimson Text` 22px, right-aligned nightly rate ("$189 PER NIGHT") in `DM Sans` 14px uppercase label + 20px bold rate.

### 6.7 Guest Testimonials
- **Structure:** Clean quote presentation card with 5 gold stars (`#8C6D3F`), large headline ("Booking took two minutes"), detailed narrative paragraph, guest author name, and an interactive row of guest avatar buttons allowing users to switch between stories.

### 6.8 Collapsible FAQ Section
- **Pattern:** Clean single-column accordion (`max-width: 840px; margin: 0 auto;`).
- **Items:** Border bottom divider (`1px solid rgba(38,14,1,0.08)`), `+` / `−` icon transition with 90-degree rotation, spring height expansion.

### 6.9 Global Footer
- **Background:** Deep Navy (`#0C1731`), text in `#FFFFFF` and `#E8DCC5`.
- **Layout:** 4 columns:
  1. *Brand & Contact:* Hotel name, 24-hour reception status, phone, email, physical address.
  2. *Explore:* Internal page anchors (`Home`, `About Us`, `Our Rooms`, `Experiences`, `Dining`).
  3. *Legal:* Privacy Policy, Terms & Conditions, Cancellation Policies.
  4. *Social Channels:* Instagram, Facebook, LinkedIn, YouTube.
- **Bottom Bar:** Subtle copyright notice + Back to Top anchor.

---

## 7. Motion & Interaction Specifications

| Interaction | Trigger | Duration | Easing | Properties Animated |
|---|---|---|---|---|
| **Sticky Header Reveal** | Window Scroll (> 50px) | `250ms` | `ease-out` | `background-color`, `box-shadow`, `backdrop-filter` |
| **Philosophy Word Reveal**| Scroll Progress (`0.0 – 1.0`)| Instant / Scroll-tied| Linear | `opacity (0.2 → 1.0)` |
| **Room Image Hover** | Cursor MouseEnter | `400ms` | `cubic-bezier(0.2, 0, 0, 1)` | `transform: scale(1.03)` |
| **Button Arrow Slide** | Button MouseEnter | `200ms` | `ease-in-out` | `transform: translateX(4px)` |
| **Accordion Toggle** | Click Event | `350ms` | `cubic-bezier(0.2, 0, 0, 1)` | `height`, `opacity`, `transform: rotate(45deg)` |
| **Testimonial Switch** | Tab Click | `300ms` | `ease-out` | `opacity (0 → 1)`, `transform: translateY(8px → 0)` |

> [!IMPORTANT]
> All motion elements must respect the `@media (prefers-reduced-motion: reduce)` media query. For users with motion sensitivity, opacity transitions should be static (`opacity: 1`) and transform animations disabled.
