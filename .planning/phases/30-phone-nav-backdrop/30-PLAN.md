# Phase 30 Plan: Phone Number Navigation Backdrop Styling

## Objective
Address client feedback regarding the phone contact link (`+91 99262 19900`) in the top navigation. When viewed over the transparent top header on hero photographs, the unstyled text and icon lack contrast against dark hero imagery. Add an elegant, subtle translucent white glass-style background pill behind the entire phone element, matching the existing center navigation menu pill.

## Technical Details
- File: `src/components/layout/NavbarPrimitive.tsx`
- Replace bare link styling with:
  - `bg-white/65 hover:bg-white/90` (`rgba(255, 255, 255, 0.65)`)
  - `backdrop-blur-sm`
  - `rounded-full` (pill shape)
  - `border border-brand-charcoal/10` (soft understated boundary)
  - `text-brand-navy` (`#0C1731` - deep royal navy for high contrast)
  - Phone icon in `text-brand-navy shrink-0`
  - `px-4 py-2` comfortable padding matching neighboring CTA and nav pill
  - Smooth hover transition and accessible focus-visible ring
- Mobile Drawer: Ensure mobile drawer phone link matches the white glass treatment.
- Multi-viewport verification via Chrome DevTools Protocol.
