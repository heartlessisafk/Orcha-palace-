# The Orchha Resort — Major Professional Design & Engineering Upgrade

## What This Is
A bespoke, production-grade luxury hospitality digital experience for **The Orchha Resort**, situated on the tranquil riverbanks of the Betwa River directly opposite the 14 Royal Chhatris in Orchha, Madhya Pradesh. The website features authentic curated resort photography, dedicated wellness and royal wedding showcases, an interactive visual gallery, functional accommodation detail suites, and an authentic CARTO Voyager geographic finale.

## Core Value
Deliver an out-of-distribution luxury hospitality experience with flawless visual coherence, bespoke typography, physical scroll choreography, tactile 3D interactions, and authenticated real-world geography, ensuring every visitor experiences the historical grandeur of Orchha and effortlessly reserves their stay.

---

## Installed Skills Inventory
The project is fortified with five world-class design intelligence and engineering skill suites installed project-locally in `.agents/skills/`:

1. **Anthropic Frontend Design (`frontend-design`)**:
   - Location: `.agents/skills/frontend-design/SKILL.md`
   - Git Commit: `2c5958ecac7cee2b583967a2c4981d0f4a75c579`
   - Role: Distinctive visual identity, opinionated typography, anti-template layout direction, and aesthetic integrity tailored to Bundelkhand heritage.

2. **Impeccable (`impeccable`)**:
   - Location: `.agents/skills/impeccable/SKILL.md`
   - Git Commit: `32f10a7833666f056e82a5e83ca4faed7ba4b1f9` (v4.9.1)
   - Role: Out-of-distribution craft floor, critique rubric, slop elimination, design token formalization (`DESIGN.md`), and tactile UI refinement.

3. **Taste Skill (`taste-skill` / `design-taste-frontend`)**:
   - Location: `.agents/skills/taste-skill/SKILL.md`
   - Git Commit: `f6b76575f949707b4e3c37cd86cb44b0b98643e8` (v2.5.1)
   - Role: Professional agency-level execution, section discipline, authentic photographic integration, quiet micro-interactions, and visual finishes.

4. **UI UX Pro Max (`ui-ux-pro-max`)**:
   - Location: `.agents/skills/ui-ux-pro-max/SKILL.md`
   - Git Commit: `6ae86f61f520d6ca229d2f40e070410638c908c5` (v1.0.0)
   - Role: 192 reasoning rules, 80 searchable styles, 74 font pairings, 120 UX guidelines, GSAP motion patterns, touch ergonomics (min 44px targets), and accessibility standards.

5. **Vercel Web Design Guidelines (`web-design-guidelines`)**:
   - Location: `.agents/skills/web-design-guidelines/SKILL.md`
   - Git Commit: `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62` (v1.0.0)
   - Reference: `.agents/skills/web-design-guidelines/references/web-interface-guidelines.md`
   - Role: High-signal Web Interface Guidelines compliance, keyboard navigation (`focus-visible:ring`), accessible forms, touch feedback, and zero layout shift.

---

## Engineering Constraints & Preservation Rules
All modifications must adhere strictly to [GEMINI.md](file:///Users/sam/Projects/orccha/GEMINI.md):
- **Preserve All Working Animations:** 5-act palace-to-map scroll sequence, Leaflet real geography map, alternating guest love review cards, and hero entrance choreography.
- **Preserve Existing Gallery Tiles & Proportions:** Maintain 48-photo curated manifest, aspect ratios, and 3-at-a-time progressive reveal.
- **Preserve Navigation & Routing:** All routes (`/`, `/rooms`, `/rooms/[slug]`, `/gallery`, `/about`, `/spa`, `/weddings`) and hash anchors.
- **Preserve Booking Functionality:** Docked Reservation Sanctuary Suite, date pickers, occupancy steppers, and scroll-locking concierge modal.
- **Never Replace Photographs with Stock:** Real photography only.
- **Avoid Heavy/Unnecessary Libraries:** Build with Next.js 15, React 19, Tailwind CSS, Framer Motion, and Leaflet.
- **Tactile Button Standard:** Every interactive button must receive a consistent premium 3D hover interaction without breaking existing click/touch/keyboard behaviors.

---

## Seven-Phase Execution Roadmap (Milestone 2)

- [x] **Phase 1: Project Preparation, Skill Integration & Baseline Protection** (completed 2026-11-14)
  - Initialize GSD milestone state, download & verify all 5 skills into `.agents/skills/`, establish permanent project rules (`GEMINI.md`, `AGENTS.md`), and capture verified baseline.
- [x] **Phase 2: Comprehensive Codebase Mapping, Route Audit, Animation Inventory & Baseline Visual Capture** (completed 2026-11-14)
  - Understand the entire existing website before changing design or code. Map architecture, audit all 10 pages across 3 viewports (30 baseline screenshots), build exhaustive animation inventory, verify zero missing assets across 109 images, verify interactive flows (booking modal scroll lock, CARTO Voyager map, gallery reveal), and establish 10-point non-negotiable regression checklist.
- [x] **Phase 3: Design Token Architecture, Luxury Typography & Color Harmonies** (completed 2026-11-14)
  - Established canonical DESIGN.md design system. Coordinated 5 design skills (Anthropic Frontend Design, Impeccable, Taste Skill, UI UX Pro Max, Vercel Guidelines). Grounded brand in Bundelkhand royal heritage and contemporary luxury. Synchronized Tailwind tokens (gold-ambient and modal shadows), CSS variables (brand-gold-dark), typography scales (< 80ch lines), photography guidelines for all 6 dimensions, tactile 3D button contracts, and collision-proof Z-index hierarchy.
- [ ] **Phase 4: Universal Tactile Button & Micro-Interaction System**
  - Implement consistent, premium 3D hover interaction across all interactive buttons across the site with tactile elevation and gilded glow.
- [ ] **Phase 5: Hero Section & Reservation Suite Visual Elevation**
  - Elevate hero entrance choreography and editorial layout using `taste-skill` and `impeccable` principles. Polish the in-flow Reservation Sanctuary Suite.
- [ ] **Phase 6: Accommodation Cards & Dynamic Room Details Refinement**
  - Refine room cards on `/` and `/rooms` with tactile depth, editorial spec typography, and subtle image zoom. Enhance dynamic room pages (`/rooms/[slug]`).
- [ ] **Phase 7: Storytelling, Gallery, Media Experiences Polish & Final Production Hardening**
  - Refine `/gallery` masonry and 3-at-a-time reveal with smooth layout transitions. Polish `/about`, `/weddings`, and `/spa` with bespoke editorial layouts. Audit against `web-design-guidelines` (ARIA, keyboard navigation, focus indicators). Test responsive viewports across Desktop, Tablet, and Mobile. Complete production build verification.
