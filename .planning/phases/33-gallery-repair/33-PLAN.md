# Phase 33: Critical Gallery Layout Repair & Cinematic Visual Upgrade

## Objective
Diagnose and repair the broken gallery layout architecture in `src/components/gallery/GalleryViewer.tsx` (`/gallery`), eliminate empty chasms, restore architectural proportions, and fix the "Discover More Photographs" button contrast.

## Problems Identified
1. **Empty Chasms & Broken Grid**:
   - `GalleryViewer.tsx` used `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` with `isEditorialWide` forcing Photo 0 to `sm:col-span-2 aspect-[16/10]`.
   - With initial count of 3, Photo 0 spanned 2 columns and Photo 1 took 1 column (Row 1). Photo 2 was stranded alone on Row 2, leaving a 2-column empty chasm.
   - 40 out of 48 photos in `PHOTO_CATALOGUE` are vertical portraits (9:16 ratio ~0.563). Forcing them into landscape boxes (`aspect-[4/3]`) cropped 58% of the height off, amputating temple spires and royal domes.
2. **"Discover More Photographs" Button Low Contrast**:
   - Button had class `text-brand-sand`, which was not defined in `tailwind.config.ts`, causing Tailwind-merge to remove `text-white` while failing to apply a color class.
   - Text fell back to body color `#260E01` (Earth Charcoal) on `#0C1731` (Brand Navy), yielding an unreadable contrast ratio of 1.4:1.

## Solution Architecture
1. **Architectural Column Track Partitioning**:
   - Implemented `useGalleryColumns()` returning responsive column count (3 on desktop $\ge 1024$px, 2 on tablet $640-1023$px, 1 on mobile $< 640$px).
   - Partitioned `visiblePhotos` across column tracks using `i % columns`.
   - Replaced fragile CSS row spanning with vertical column tracks (`flex flex-col gap-6`), guaranteeing zero empty gaps.
2. **Aspect Ratio Preservation**:
   - Implemented `getTileAspectClass(photo)`:
     - Portraits: `aspect-[3/4]` for Signature photos ($\ge 9$ quality score) and `aspect-[4/5]` for standard.
     - Landscapes: `aspect-[16/10]` for Signature photos and `aspect-[3/2]` for standard.
     - Squares: `aspect-square`.
3. **High-Contrast "Discover More" Button**:
   - Explicit `text-[#F8F4EC]` (warm ivory) on `bg-brand-navy` (`#0C1731`).
   - Luminous gold badge: `bg-brand-gold/25 border-brand-gold/40 text-brand-gold-light`.
   - High-contrast arrow: `ArrowRight text-[#F8F4EC]`.
   - Tactile 3D rounded pill styling with gold ambient hover shadow.
   - Verified contrast ratio: **16.19:1** (WCAG AAA compliant).
4. **Preservation**:
   - Preserved all 48 deduplicated authentic resort photographs.
   - Preserved all 7 category filters with accurate real-time counts.
   - Preserved full-screen interactive lightbox modal with keyboard and swipe navigation.
