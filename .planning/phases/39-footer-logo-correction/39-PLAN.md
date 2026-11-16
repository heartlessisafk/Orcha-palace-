# Phase 39: Footer Logo Correction — Implementation Plan

## Goal
Replace the circular placeholder/emblem in the first column of the site-wide footer (`src/components/layout/FooterPrimitive.tsx`) with the official The Orchha Resort logo asset and luxury container styling from the navigation bar.

## Requirements
1. **Official Asset**: Use `/images/brand/orchha-logo.png` (dimensions 607x92, aspect ratio 6.598:1), identical to `NavbarPrimitive.tsx`.
2. **Proportion & Sharpness**: Render the logo sharp and proportionate in a luxury pill container with responsive sizing (`w-[130px] sm:w-[145px]`).
3. **Alignment**: Align neatly with "The Orchha Resort" brand name and "Riverside Heritage" tagline along the column's left margin.
4. **Interactive Hover State**: White luxury container that transitions to navy on hover with a gold border and inverted white logo lettering, maintaining keyboard accessibility.
5. **Responsiveness**: Zero horizontal overflow across Desktop (1440px), iPad (1024px), Tablet (768px), and Mobile (390px, 320px).
6. **Non-Destructive**: Do not alter other footer columns, links, copyright, or unrelated site sections.

## Verification
- Next.js type check & production build (16/16 pages static pre-rendered).
- CDP automated measurement across 5 viewports + hover state verification.
- Tunnel URL confirmation on live domain.
