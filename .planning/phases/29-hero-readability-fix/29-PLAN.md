# Phase 29 Plan: Hero Text Readability & Contrast Fix (About Page)

## Objective
Address client feedback regarding text readability on the Orchha Resort Story / Kanchan Ghat Sanctuary hero section (`src/components/about/AboutHero.tsx`). Elevate contrast across the eyebrow label, main heading, gold italic accent, description, 3 statistic cards, buttons, and photography citation without altering layout, animations, or replacing the authentic background photography.

## Root Cause Analysis
- The background photograph of the heritage salon interior (`slide1.jpg`) is visually intricate, featuring carved wooden furniture, wall murals, chandeliers, and high-contrast marble floors.
- The previous overlay only applied a generic linear gradient with weak middle opacity (`via-black/35`), leaving the central text directly conflicting with high-contrast furniture patterns.
- The gold italic heading ("Bundela Grandeur") and card titles used `#8C6D3F` (antique bronze), which had low luminance and blended directly into wooden furniture.
- Eyebrow badge and bottom attribution lacked background opacity, making text difficult to distinguish against light wall zones and dark table/floor patterns.

## Solution Architecture
1. **Seamless Central Elliptical Gradient**:
   - Integrated a feather-edged radial gradient behind the content (`radial-gradient(ellipse 75% 65% at 50% 48%, rgba(6, 12, 27, 0.88) 0%, rgba(6, 12, 27, 0.6) 50%, transparent 95%)`) paired with a grounding vertical scrim (`from-black/85 via-black/45 to-black/35`).
   - Completely avoids hard box/rectangle boundaries while providing an atmospheric pocket of contrast.
2. **Typography Luminance Upgrade**:
   - Heading: `text-white` with `drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]`.
   - Gold Italic: Luminous warm antique gold (`#F3D382`) with drop shadow for instant legibility against dark and light zones.
   - Description: Warm ivory (`text-brand-beige`) with `drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]`.
3. **Elevated Glass Card & Badge System**:
   - Eyebrow Badge: `bg-brand-navy-deep/90 backdrop-blur-md border border-brand-gold/50 text-[#F3D382] shadow-md`.
   - 3 Information Cards: `bg-brand-navy-deep/85 backdrop-blur-md border border-brand-gold/40 shadow-xl` with `#F3D382` titles and `text-white/95` descriptions.
   - Secondary Button: `bg-brand-navy-deep/60 backdrop-blur-md border-white/40 text-white shadow-md`.
   - Photography Attribution: `inline-flex px-4 py-1.5 rounded-full bg-brand-navy-deep/85 backdrop-blur-md border border-white/15 text-white/90`.
