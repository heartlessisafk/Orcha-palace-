# PHASE 25 PLAN: ADD NEW FEATURE TILE — BETWA VIEW DINING (CLIENT FEEDBACK FIX 08)

## Objective
Add a new feature card titled **"Betwa View Dining"** as the **FIRST** card in the "Why Stay at Orchha Resort" section, while preserving all existing cards in their exact relative order (`Lotus-Shaped Pool`, `Kaleva Restaurant`, `Kerala Ayurveda Spa`), matching the design system identically, and verifying responsive layouts across Desktop, Tablet, and Mobile.

---

## Technical Specifications

### 1. Section Identification
- **Target File:** `src/app/page.tsx`
- **Section ID:** `#amenities`
- **Kicker:** `SIGNATURE FACILITIES`
- **Heading:** `Why Stay at Orchha Resort`
- **Subheading:** `Every facility is thoughtfully curated to immerse guests in tranquility, wellness, and authentic regional hospitality.`

### 2. New Card Specifications
- **Title:** `Betwa View Dining`
- **Description:** `Experience Orchha’s one and only riverside-view dining experience, offering a memorable setting overlooking the serene Betwa River.`
- **Icon:** `Utensils` from `lucide-react` (5x5 scale inside 10x10 circular badge with gold background transition on hover).
- **Link Destination:** `/gallery?category=amenities`
- **Hover Micro-copy:** `Riverside dining` + `ArrowRight`
- **Ordering:** Position 1 (First of 4 cards)

### 3. Responsive Layout Strategy
- Update grid from `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`.
  - **Desktop (>=1024px):** 4 columns in 1 balanced row.
  - **Tablet (640px - 1023px):** 2 columns × 2 rows (2x2 grid).
  - **Mobile (<640px):** 1 column stacked cleanly.

### 4. Verification Checklist
- [ ] TypeScript type-check: 0 errors.
- [ ] Next.js production build: 14/14 static pages generated.
- [ ] CDP Visual inspection across 1440px Desktop, 768px iPad, 390px iPhone.
- [ ] Verify card sequence: Betwa View Dining -> Lotus-Shaped Pool -> Kaleva Restaurant -> Kerala Ayurveda Spa.
- [ ] Verify all existing cards retain their original text, icons, and links.
