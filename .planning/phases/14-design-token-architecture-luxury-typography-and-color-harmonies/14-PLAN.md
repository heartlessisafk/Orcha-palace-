---
phase: 14-design-token-architecture-luxury-typography-and-color-harmonies
plan: 01
subsystem: design-system/tokens/typography
tags: [design-system, tokens, typography, creative-direction, photography-guidelines, motion-spec, milestone-2]
provides:
  - Authoritative DESIGN.md establishing comprehensive design tokens and component contracts
  - Synchronized Tailwind CSS configuration (gold-ambient and modal shadow tokens)
  - Synchronized CSS variables in globals.css (--color-brand-gold-dark)
  - Subject-specific photography guidelines for all 6 resort dimensions (zero stock policy)
  - Motion language specifications with preserved core animations (Palace-to-Map, Guest Love, CARTO Voyager)
  - Interactive tactile 3D button hover contract ready for Phase 4 rollout
affects: [DESIGN.md, tailwind.config.ts, src/app/globals.css, .planning]
duration: 20min
completed: true
---

# Phase 14 Plan: Design Token Architecture, Luxury Typography & Color Harmonies

## Objective
Establish the canonical design system for the Orchha Resort digital experience using the coordinated five-skill design intelligence team (Anthropic Frontend Design, Impeccable, Taste Skill, UI UX Pro Max, Vercel Guidelines). Ground the brand in royal Indian heritage, contemporary luxury, architectural elegance, and calm immersive hospitality, while strictly preserving the navy and beige identity and existing animation architecture.

## Tasks
1. **Design Tokens Architecture**:
   - Map existing tokens across `tailwind.config.ts` and `src/app/globals.css`.
   - Establish semantic color tokens with verified WCAG AA contrast (Midnight Navy `#0C1731`, Deep Navy `#060C1B`, Heritage Linen `#F4F0E6`, Muted Sand `#E8DCC5`, Canvas `#FDFBF7`, Antique Bronze/Gold `#8C6D3F`, Gold Light `#B89758`, Gold Dark `#6E532B`).
   - Define spacing scales on a 4px geometric grid, container widths, and equal edge margins.
   - Establish hierarchical border radii (differentiated by role, not generic rounded cards).
   - Formulate tactile elevation hierarchy (`shadow-gold-ambient`, `shadow-card`, `shadow-modal`).
   - Establish collision-proof Z-index scale (`z-base: 0` to `z-toast: 60`).
2. **Typography System**:
   - Pair regal display serif (`Crimson Text`) with contemporary readable sans-serif (`DM Sans`).
   - Define type scale, weights, leading, and tracking from Hero Title (60px) to Contextual Tags (12px).
   - Enforce line lengths < 80ch to optimize readability.
3. **Photography Direction**:
   - Create tailored guidelines for palace architecture, suites, lotus pool, destination weddings, spa, and Betwa river landscapes.
   - Enforce zero stock photo rule; map approved genuine local photographs.
4. **Shared Component System**:
   - Define reusable specifications for buttons (tactile 3D elevation standard, gold glow, active press, focus rings).
   - Define specifications for navigation, editorial glass surface, accommodation cards, and reservation suite.
5. **Motion Design System**:
   - Define unified animation language, durations, and easing curves.
   - Preserve existing working animation architecture: Palace-to-Map 5-stage finale, Leaflet real map, Guest Love 380vh scroll track, and progressive gallery reveals.
   - Implement `prefers-reduced-motion` safety fallbacks.
6. **Documentation & GSD Update**:
   - Generate root `DESIGN.md` as permanent single source of truth.
   - Update `.planning/PROJECT.md`, `.planning/ROADMAP.md`, and `.planning/STATE.md`.
