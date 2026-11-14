# PHASE 27 PLAN: HERITAGE GUIDE AUTHENTIC PHOTOGRAPH INTEGRATION

## Objective
Integrate authentic, real-world photographs into the top of every existing Heritage Guide tile in `AboutDiscoveringOrchha.tsx` (`/about#heritage`).

---

## Technical Specifications

### 1. Section Identification
- **Target File:** `src/components/about/AboutDiscoveringOrchha.tsx`
- **Section ID:** `#heritage`
- **Heading:** `Discovering Orchha From Our Sanctuary`
- **Route:** `/about#heritage` (linked from navbar as "Heritage Guide")

### 2. Sourced & Verified Authentic Photography
All 5 images are authentic, high-resolution, landscape photographs sourced from reputable archives (Wikimedia Commons) depicting the genuine Orchha monuments:
1. **The 14 Royal Chhatris (Cenotaphs)**:
   - File: `/images/destinations/chhatris-cenotaphs.jpg` (1280 × 853)
   - Source: Royal Chhatris along the Betwa River at Kanchan Ghat, Orchha (CC BY-SA 4.0).
2. **Jahangir Mahal & Raja Mahal**:
   - File: `/images/destinations/jahangir-mahal.jpg` (1280 × 853)
   - Source: Inner courtyard, domes, and carved stone balconies of Jahangir Mahal, Orchha (CC BY 2.0).
3. **Ram Raja Temple & Chaturbhuj Temple**:
   - File: `/images/destinations/chaturbhuj-temple.jpg` (1280 × 960)
   - Source: Towering spires and cathedral-like sanctum of Chaturbhuj Temple rising above Orchha forest canopy (CC BY-SA 3.0).
4. **Betwa River Rafting & Wildlife Sanctuary**:
   - File: `/images/destinations/betwa-river.jpg` (1280 × 851)
   - Source: Wide scenic stretch of the Betwa River showing granite boulders, historic bridge, and sanctuary teak forests (CC BY-SA 2.0).
5. **Laxminarayan Temple**:
   - File: `/images/destinations/laxminarayan-temple.jpg` (1280 × 878)
   - Source: Distinctive triangular fort-temple synthesis and grand central shikhara of Laxminarayan Temple, Orchha (CC BY-SA 4.0).

### 3. Card Structure & Visual Hierarchy
- Full-width image container at card top:
  `aspect-[16/9] w-full relative overflow-hidden bg-brand-charcoal/5`
  `object-cover group-hover:scale-105 transition-transform duration-500 ease-out`
- Card body:
  `p-6 flex-1 flex flex-col justify-between`
- Exact ordering:
  1. Full-width photograph
  2. Category badge (`site.tag`) & time (`site.time`)
  3. Landmark heading (`site.name`)
  4. Distance/location (`site.distance`)
  5. Description (`site.highlight`)
  6. Recommended visiting time (`site.bestTime`) & Guided tour information

### 4. Quality Checklist
- [ ] 0 AI-generated images, 0 generic stock.
- [ ] 16:9 landscape aspect ratio with clean coverage.
- [ ] Responsive 3-column desktop grid, 2-column tablet, 1-column mobile.
- [ ] 0 horizontal overflow across all viewports.
- [ ] Clean type check and Next.js build.
- [ ] Global regression suite passes with 0 errors.
