# Phase 35: Add Betwa View Dining Experience Card

## Objective
Add "Betwa View Dining" as an experience card alongside "Kaleva Multi-Cuisine Restaurant" and "Authentic Kerala Ayurveda Spa" in the "Hospitality, Dining & Rejuvenation" section, presenting it with an authentic riverside dining photograph, consistent luxury card aesthetics, balanced 3-column responsive layout, and verified accessibility.

## Requirements
1. **Target Section**: `Hospitality, Dining & Rejuvenation` (`src/components/about/AboutHospitality.tsx`).
2. **Third Experience Card**:
   - Title: `Betwa View Dining`
   - Category / Eyebrow: `Riverside Dining`
   - Description: `"An inviting riverside dining experience overlooking the tranquil waters of the Betwa, where guests can enjoy memorable meals surrounded by the natural beauty of Orchha."`
   - Features: 3 verified bullets detailing al fresco tables, sunset tea & dinners, and riverbank sanctuary views.
   - CTA: `"Discover Riverside Dining"` $\to$ `/#amenities`
3. **Authentic Photography**:
   - Sourced from authentic resort curated repository: `/images/resort/curated/dining/dining-riverfront-alfresco.jpg` (1564×878px, 16:9 aspect ratio).
   - Alt text: `"Betwa View Dining al fresco table setting overlooking River Betwa at The Orchha Resort"`.
   - Verified badge: `"Verified Resort Amenity"`.
4. **Design & Layout**:
   - Exact same card styling, 16:9 photo container, rounded corners, subtle border, shadow elevation, and group-hover image zoom.
   - 3-column balanced grid on desktop (`lg:grid-cols-3`).
   - Clean responsive adaptation on tablet (768px) and mobile (390px) with 0 horizontal overflow.
   - Strictly preserve Kaleva Multi-Cuisine Restaurant and Authentic Kerala Ayurveda Spa.
