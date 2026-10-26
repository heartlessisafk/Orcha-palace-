# Creative Direction Addendum — Orchha Resort Redesign
**Cinematic Luxury Hospitality, Hero-to-Booking Transformation & Motion Vocabulary**
*Document Version: 1.0.0 | Date: 2026-10-26 | Supplement to Phase 1 Audit & Phase 2 Foundation*

---

## 1. Executive Summary & Creative Vision

This addendum supplements the approved Orchha Resort implementation plan. While Phase 1 established verified facts and Phase 2 deployed the technical scaffolding, this document defines the **cinematic luxury creative direction** required to elevate the website from a conventional hotel template into an immersive, ₹1,00,000-tier digital hospitality experience.

The experience is defined by three hallmark creative pillars:
1. **Full-Viewport Cinematic Video Hero:** Opening with a high-impact atmospheric video of riverside heritage, illuminated palace archways, and the blooming lotus pool, with the resort identity and a prominent "Book Your Stay" action immediately visible on the initial screen without scrolling.
2. **Scroll-Controlled Hero-to-Booking Transformation:** A choreographed multi-stage scroll sequence where scrolling smoothly lifts and expands a warm-beige reservation panel over the receding video background, settling naturally into an accessible booking interface before transitioning seamlessly into regular page flow.
3. **Word-by-Word Editorial Storytelling & Photography Choreography:** Restrained editorial typography in `Crimson Text` with progressive scroll-driven text reveals, paired with a deliberate photography motion vocabulary (clipped reveals, directional slide-ins, and subtle 3D card elevation).

---

## 2. Cinematic Hero & Video Asset Strategy

### 2.1 Video Specifications & Staging Asset
- **Format:** HTML5 `<video autoPlay loop muted playsInline preload="metadata">`.
- **Dimensions & Ratio:** 16:9 widescreen desktop (`1920 × 1080` or `2880 × 1620`), cropped gracefully on mobile via `object-cover`.
- **Poster Image:** High-resolution twilight visual of palace architecture and lotus pool (`RESORT_ASSETS.heroDesktop.src`).
- **Audio Rule:** Strict `muted` autoplay with no unsolicited audio, adhering to WCAG and browser autoplay policies.
- **Staging Disclaimer:** Until the resort owner supplies drone and camera footage of the real Orchha Resort, an atmospheric, slow-panning staging video (luxury heritage water palace & pool) is utilized and explicitly documented as a staging placeholder in the asset dictionary (`src/lib/assets.ts`).

### 2.2 First-Screen Visibility & Restrained Navigation
- Overlaid directly on the cinematic video:
  - Sticky glassmorphic navigation bar with royal emblem, menu pill, and emergency phone concierge.
  - Social rating badge ("4.9 ★ Excellent · Sanctuary by the Betwa").
  - Hero display headline: *"Understated luxury where royalty meets the river."*
  - **Prominent First-Screen CTA ("Book Your Stay" / "Explore Sanctuary"):** An amber-gold luxury button with sliding arrow, immediately visible above the fold on all viewports without scrolling. Clicking it initiates smooth programmatic scrolling directly into the settled booking interface.

---

## 3. Scroll-Controlled Hero-to-Booking Transformation Geometry

### 3.1 Choreography Timeline (Framer Motion `useScroll`)
The transformation operates across a pinned/sticky scroll track (`200vh` desktop, `150vh` tablet/mobile):

```
Scroll Track (200vh total height)
├── 0.00 – 0.25: Hero Video Focus
│   ├── Video: Scale 1.00, Opacity 1.00, Exposure Normal
│   ├── Hero Text & CTA: Opacity 1.00 → 0.20
│   └── Beige Booking Panel: Peeking at bottom (y: 65% translated)
│
├── 0.25 – 0.70: The Transformation Window
│   ├── Video: Scale 1.00 → 0.94, Opacity 1.00 → 0.30, Darkness increases
│   ├── Hero Text: Fades out completely (Opacity 0.00)
│   ├── Beige Booking Panel: Smoothly rises (y: 65% → 0%), expands width (90% → 100%)
│   └── Panel Surface: Transitions to solid warm heritage beige (#F4F0E6)
│
└── 0.70 – 1.00: Final Settled State
    ├── Booking Panel: Fully docked and locked in place
    ├── Controls: Date pickers, guest counters, and handoff buttons fully interactive
    └── Natural Scroll Hand-off: Pinned track unlocks; page scrolls smoothly into Section 3
```

### 3.2 Anti-Jank & Usability Safeguards
- **Zero Scroll-Trapping:** Uses standard document scroll progress; does not hijack wheel events or use scroll-jacking.
- **Mobile Ergonomics:** On touch devices (`< 810px`), the scroll track height is shortened (`130vh`), and the panel stacks vertically with larger touch targets (`48px` minimum).
- **Reduced Motion Mode:** Under `@media (prefers-reduced-motion: reduce)`, the sticky transform is bypassed; the hero and booking panel render as standard high-contrast stacked sections.

---

## 4. Photography Motion Vocabulary

| Pattern | Component | Motion Behavior | Intended Placement |
|---|---|---|---|
| **Word-by-Word Reveal** | `TextReveal.tsx` | Words interpolate from `opacity: 0.18` to `1.0` tied to viewport scroll | "Our Philosophy" Intro Section |
| **Clipped Mask Reveal** | `ClippedReveal.tsx` | Container unmasks from `clip-path: inset(100% 0 0 0)` to `inset(0% 0 0 0)` | Hero imagery & primary section leads |
| **Hover Scale Zoom** | `HoverZoom.tsx` | Inner image scales `1.0 → 1.03` over `500ms ease-out` | 4-Card Room Showcase |
| **Directional Slide-In** | `FadeIn.tsx` | Smooth `18px` translation with luxury bezier curve `[0.2, 0, 0, 1]` | Amenities 2×2 grid & Testimonials |
| **Subtle 3D Tilt** | `TiltCard.tsx` | Micro-perspective tilt (`±2.5deg`) based on cursor coordinates | Exclusive Suite card & Heritage guide |

---

## 5. Implementation Mapping in Project Plan

This creative direction addendum is integrated into the master engineering plan:
- **Phase 3 (Next Milestone):** Implements the cinematic video hero, the interactive scroll transformation to the warm-beige booking panel, and the mobile/reduced-motion fallbacks.
- **Phase 4:** Implements the editorial storytelling text-reveal, clipped image reveals, and 3D card tilt effects across the accommodations and amenities sections.
