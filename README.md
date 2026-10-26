# The Orchha Resort — Website Redesign

Understated luxury, warm hospitality, and timeless heritage design for **The Orchha Resort** (Orchha, Madhya Pradesh). Located on the peaceful banks of the Betwa River directly overlooking the 14 Royal Chhatris.

---

## 1. Project Overview

This repository houses the modern frontend architecture for the complete digital redesign of The Orchha Resort, architected to meet a premium ₹1,00,000 project standard.

- **Design Reference:** Inspired by the contemporary luxury Framer website ("Constellare").
- **Business Truth:** Grounded strictly in verified facts from the live resort (`orchharesort.com`): 32 rooms & luxury Swiss tents, lotus-shaped swimming pool, "Kaleva" multi-cuisine restaurant, and certified Kerala Ayurveda spa.
- **Phase Status:** **Phase 2 Complete** (Project Initialization, Repository Setup & Design System).

---

## 2. Technology Stack & Verified Versions

| Package | Version | Purpose |
|---|---|---|
| **Next.js** | `15.5.28` | React framework with App Router, SSR/SSG, and `next/font` |
| **React** | `19.0.0` | UI runtime |
| **TypeScript** | `5.7.3` | Type safety across models, assets, and booking payloads |
| **Tailwind CSS** | `3.4.17` | Utility-first design tokens matching the audited Navy & Beige system |
| **Framer Motion** | `12.4.7` | Restrained motion: scroll text reveals, hover zooms, modal springs |
| **Lucide React** | `0.475.0` | Lightweight luxury SVG icons |

---

## 3. Visual Design System

### Color Palette Tokens
- **Midnight Navy (`#0C1731`):** Primary dark surface, navigation headers, footers, and solid buttons.
- **Heritage Beige (`#F4F0E6`):** Warm linen background and secondary card backings.
- **Antique Bronze (`#8C6D3F`):** Accent borders, star ratings, CTA glyphs, and category tags.
- **Earth Charcoal (`#260E01`):** Warm black high-contrast body typography.
- **Canvas Warm (`#FDFBF7`):** Non-stark, reading-friendly page canvas.

### Typography
- **Headings & Display:** `Crimson Text` (Google Fonts, serif, 600 weight, tracking `-0.03em`).
- **Body & Interface:** `DM Sans` (Google Fonts, sans-serif, 400 & 500 weight, tracking `-0.01em`).

---

## 4. Key Architectural Features

1. **Mandatory Room-Search Widget (`src/components/booking/RoomSearchWidgetPrimitive.tsx`):**
   - Positioned immediately below the hero banner.
   - Dual date pickers (check-in/check-out) with validation.
   - Interactive Adult (1–5) and Child (0–4) steppers, plus room selectors (1–3).
   - Direct concierge dispatch via WhatsApp (`+91 99262 19900`), formal email reservations, and verified OTA deep links (MakeMyTrip / Agoda).
2. **Word-by-Word Scroll Opacity Reveal (`src/components/motion/TextReveal.tsx`):**
   - Replicates the audited Framer reference's signature "Our Philosophy" scroll reveal.
   - Respects `prefers-reduced-motion` for accessibility.
3. **Typed Asset Dictionary (`src/lib/assets.ts`):**
   - Isolates all image paths in a single typed map.
   - Zero fragile or expiring Google Photos session URLs.
   - Clearly flags staging placeholders with 1-click replacement instructions.
4. **Verified Room Inventory (`src/data/rooms.ts`):**
   - Standard Heritage Room (~225 sq ft, ₹4,500/night)
   - Deluxe Marble Room (~280 sq ft, ₹6,000/night)
   - Deluxe AC Swiss Tent (~320 sq ft, ₹5,200/night, glamping near Chhatris)
   - Royal Heritage Suite (~450 sq ft, ₹8,500/night, Betwa river views)

---

## 5. Development & Verification Commands

```bash
# Install dependencies
npm install

# Run TypeScript typecheck
npm run type-check

# Run production build
npm run build

# Start production server
npm run start

# Start local development server
npm run dev
```

Interactive Design System Gallery is accessible at `/design-system`.
Full Phase 1 audit deliverables are preserved in [`/audit/`](./audit/).
