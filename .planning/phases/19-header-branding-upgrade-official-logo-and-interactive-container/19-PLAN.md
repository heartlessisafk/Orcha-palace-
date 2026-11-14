# Phase 19: Header Branding Upgrade — Official Logo Replacement & Interactive White-to-Blue Container

## Objective
Replace the header branding on The Orchha Resort website with the client's newly supplied official logo (`IMG_1674.png`). Frame the logo inside a refined, luxury white/ivory background container that seamlessly transitions to the resort's signature brand blue on hover, while smoothly transitioning the logo typography from deep navy blue to pure white. Ensure flawless rendering, sharp text and tagline legibility, accessibility, and responsive stability across desktop, tablet, and mobile.

## Requirements & Scope

### 1. Logo Asset Preparation & Replacement
- Preserve raw `IMG_1674.png` (768 × 1024 RGBA) as the official archival asset in `public/images/brand/IMG_1674.png`.
- Generate pixel-perfect transparent artwork trimmed to the exact bounding box (`(65, 475, 672, 567)`, dimensions 607 × 92, aspect ratio ~6.598:1) at `public/images/brand/orchha-logo.png`.
- Also generate color-calibrated variants (`orchha-logo-navy.png` in `#0C1731` and `orchha-logo-white.png` in `#FFFFFF`) sharing the exact antialiased alpha channel.
- Completely remove obsolete emblem circle and outdated header text ("The Orchha Resort", "Betwa River Sanctuary") in `NavbarPrimitive.tsx`.
- Never distort, regenerate, or approximate the logo's serifs or "by the river..." tagline.

### 2. Default State (White / Ivory Luxury Container)
- Background: Pure white / soft ivory (`bg-white` or `bg-white/95`) with delicate border (`border-brand-charcoal/10` or `border-brand-navy/10`).
- Corners: Softly rounded (`rounded-xl`).
- Padding & Sizing: Refined luxury padding (`px-3.5 py-2` on mobile/tablet, `px-4 py-2` on desktop) fitting the logo naturally without excessive empty space or bulk.
- Typography Color: Deep Midnight Royal Navy (`#0C1731` / `brand-navy`).
- Contrast: Crisp, pristine legibility against both transparent hero video background and scrolled frosted navbar.

### 3. Hover State (Interactive Brand Blue Transition)
- Container Background: Transitions from white to signature website brand blue (`bg-brand-navy` / `#0C1731`).
- Container Border: Matches brand blue with subtle highlight.
- Logo Typography: Transitions from deep navy blue to pure white (`#FFFFFF`).
- Animation: Smooth 300–400ms duration with refined cubic-bezier easing (`transition-all duration-300 ease-out`).
- Zero layout shift, zero scaling distortion, zero flash.
- Smooth reverse transition when cursor leaves.
- Keyboard focus visible treatment (`focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2`).
- Touch behavior: Clean default appearance without sticky hover traps.

### 4. Responsive Verification
- Desktop (1440px): Elegant presence, balanced with center navigation pill and "Reserve Stay" CTA.
- Tablet (768px): Proportional scaling, does not crowd tablet header actions.
- Mobile (390px): Compact luxury pill, perfectly aligned with hamburger button, 0px horizontal overflow.
- Scrolled Navbar State: Seamless integration when header becomes sticky with frosted background (`bg-brand-canvas/90 backdrop-blur-md`).

### 5. Verification & Acceptance Criteria
- Automated CDP testing: verify default state styles (background white, text navy), hover state styles (background navy, text white), mouseleave reset, and keyboard focus.
- 3-viewport visual screenshots captured and verified.
- Production build: `npm run type-check` (0 errors) and `npm run build` (14/14 static & SSG routes).
