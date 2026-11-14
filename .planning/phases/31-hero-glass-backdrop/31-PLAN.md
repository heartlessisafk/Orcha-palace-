# Phase 31 — Full Hero Content Glass Backdrop Plan

## 1. Problem Statement
In the Orchha Resort Story / Kanchan Ghat Sanctuary hero section (`src/components/about/AboutHero.tsx`), the background photograph features a brightly lit salon ceiling, chandeliers, and walls that competed with the central text, rendering heading and supporting text difficult to read. Individual black card overlays created visual fragmentation rather than a cohesive luxury presentation.

## 2. Solution Architecture
Introduce **ONE unified, translucent glass-style background panel** encompassing all 5 central elements:
1. Eyebrow badge ("The Story of Orchha Resort • Kanchanghat Sanctuary")
2. Main heading ("Where Sacred Waters Meet *Bundela Grandeur*")
3. Supporting description ("Conceived in quiet reverence beside the calm ripples of the Betwa River...")
4. All three verified statistic cards ("Kanchan Ghat", "44 Sanctuary Keys", "0% Pollution")
5. Both CTA buttons ("Explore The Story", "Reserve Your Sanctuary Stay")

Outside & below the panel:
- Photograph attribution pill ("Official Resort Photograph • Evening Pavilions & Lawns at The Orchha Resort")

## 3. Visual Treatment & Specifications
- **Panel Base**: `bg-gradient-to-b from-[#070F1E]/80 via-[#0B1528]/75 to-[#070F1E]/85` (deep charcoal/navy translucent gradient, ~75% opacity).
- **Backdrop Blur**: `backdrop-blur-md backdrop-saturate-150` for luxury refraction without washing out colors.
- **Corners & Elevation**: `rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/10`.
- **Border**: `border border-white/15`.
- **Padding**: `p-6 sm:p-10 md:p-12`.
- **Interior Stat Cards**: Nested frosted glass tiles (`bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm border border-white/12`).
- **Background Overlays**: Reduced background scrim to `bg-gradient-to-t from-brand-navy-deep/80 via-black/40 to-black/35` so the authentic room lighting, chandeliers, and furniture remain visible around the glass panel.
