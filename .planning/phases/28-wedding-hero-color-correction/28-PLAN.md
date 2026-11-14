# Phase 28 Plan: Wedding Hero Background Color Correction

## Objective
Remove the excessive blue/navy color grading and heavy overlay from the Wedding page hero section (`src/components/weddings/WeddingHero.tsx`), restoring the authentic photograph's natural warm golden lighting, fireworks, natural skin tones, and festive stage celebration atmosphere, while preserving WCAG AA text legibility and all component hierarchy.

## Root Cause Analysis
- `src/components/weddings/WeddingHero.tsx` contained:
  - `<div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/45" />`
  - Brand navy (`#0C1731`) cast an intense bluish-navy filter over the entire photograph, particularly drowning out the couple, champagne dress, stage patterns, and pyrotechnics with 100% opacity at the bottom and 65% in the center.
  - A ghost `<div className="absolute inset-0 bg-radial-vignette opacity-80" />` that didn't match any CSS rule.

## Solution
- Replace the blue-tinted gradient with a refined neutral black gradient:
  - `bg-gradient-to-t from-black/60 via-black/35 to-black/25`
- Zero modification to image asset, layout, typography, statistics cards, or global styling.
- Verification via automated Chrome DevTools Protocol across Desktop, Tablet, and Mobile viewports.
