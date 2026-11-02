---
phase: 10-booking-experience-redesign-and-hero-legibility
plan: 01
subsystem: hero/booking/ux-refinement
tags: [hero-legibility, booking-redesign, luxury-ui, modal-scroll-lock, responsive, framer-motion]
provides:
  - High-contrast luxury editorial translucent surface for hero headline, location tag, and description
  - Seamless in-flow luxury booking suite bridging the cinematic hero and resort philosophy
  - Elimination of sticky unpinning glitches, overlapping sections, and background bleed-through
  - Engineered, scroll-locked luxury reservation modal for concierge WhatsApp and direct email handoff
  - Two-state inline/modal booking resolution supporting instant front-desk handoff
affects: [HeroScrollBookingSequence, RoomSearchWidgetPrimitive, Typography, Badge, page]
tech-stack:
  added: []
  patterns: [luxury editorial glassmorphism, body scroll locking, in-flow reservation architecture, responsive form layout]
key-files:
  created: [scripts/verify_hero_and_booking.js]
  modified: [src/components/hero/HeroScrollBookingSequence.tsx, src/components/booking/RoomSearchWidgetPrimitive.tsx, .planning/ROADMAP.md, .planning/STATE.md]
key-decisions:
  - Replace the fragile 190vh sticky scroll track with an intentional, seamless in-flow reservation suite that bridges the hero into the resort philosophy with zero overlap or unpinning jump.
  - Implement a luxury translucent editorial glass panel behind the hero text with backdrop blur, fine gilded border, and high-contrast typography, preserving full prominence of the background photograph.
  - Implement full body scroll locking (`document.body.style.overflow = "hidden"`) and proper keyboard/backdrop containment whenever the booking handoff modal is opened.
  - Enhance RoomSearchWidgetPrimitive to support both inline seamless confirmation and fully engineered modal handoff with verified WhatsApp and email reservation links.
duration: 35min
completed: pending
---

# Phase 10 Plan: Booking Experience Redesign & Hero Text Legibility Refinement

## Objective
Address two critical UI/UX issues on the homepage:
1. Redesign the booking experience so it transitions seamlessly from the hero into a rock-solid, beautifully integrated luxury reservation suite with zero section overlapping, no background bleed-through, no awkward gaps, and fully engineered scroll locking.
2. Refine hero text legibility by introducing a sophisticated translucent editorial surface behind the text that elevates contrast for the location kicker, serif headline, and description while keeping the hero photograph prominent and un-obscured.

## Tasks
1. **Hero Text Legibility Refinement (`src/components/hero/HeroScrollBookingSequence.tsx`)**:
   - Create a refined editorial translucent surface container around the hero text:
     - Backdrop: `bg-gradient-to-br from-brand-navy/70 via-brand-navy/55 to-brand-navy/35 backdrop-blur-md`
     - Border: `border border-white/15 hover:border-brand-gold/30 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10`
   - Location Kicker: Gilded pill tag (`bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-light font-mono text-xs tracking-widest uppercase`) guaranteeing 100% legibility against dark trees and turquoise water.
   - Headline: Crisp white serif (`font-serif text-white font-semibold leading-display`).
   - Description: Warm ivory/beige (`text-brand-beige-sand/95 leading-relaxed`).
   - Maintain rating badge and first-screen "Book Your Stay" / "Scroll to Reserve" CTAs.

2. **Complete Booking Experience Redesign (`src/components/hero/HeroScrollBookingSequence.tsx` & `src/components/booking/RoomSearchWidgetPrimitive.tsx`)**:
   - Eliminate the fragile `190vh` sticky track that caused the booking card to float awkwardly and collide with subsequent sections.
   - Design a dedicated, in-flow **Reservation Sanctuary Suite** (`id="booking-sequence"`, `id="reserve"`):
     - Elegantly docked straddling the hero base or seamlessly flowing into the philosophy section.
     - Full container width matching the site's layout grid (`max-w-container mx-auto px-4 sm:px-6 md:px-8`).
     - Warm ivory/beige surfaces (`bg-brand-beige`), deep navy headers and typography (`text-brand-navy`), subtle gold/brass accents (`border-brand-gold/25`), and restrained shadows.
     - Zero unwanted left/right gaps, zero layout shifts, zero overlapping of following sections.
   - Enhance the Search Form:
     - Check-In & Check-Out date inputs with calendar icons and formatted helper text.
     - Interactive Guests & Rooms popover stepper (Adults, Children, Room count).
     - Preferred accommodation selector.
     - "Check Rates & Book" primary button.

3. **Engineered Reservation Modal & Concierge Handoff**:
   - Prevent background scrolling when modal is open (`document.body.style.overflow = "hidden"` on mount, restored on unmount).
   - Full-screen dark backdrop overlay (`fixed inset-0 z-[100] bg-brand-navy/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6`).
   - Bounded, scroll-contained modal dialog (`max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-brand-gold/30`).
   - Clearly visible close button (`X`), Escape key close handler, and backdrop click handler.
   - Instant WhatsApp Concierge (+91 99262 19900) and Direct Email Reservation handoffs preserved and fully operational.

4. **Automated Verification & Browser Testing**:
   - Write CDP test script `scripts/verify_hero_and_booking.js`:
     - Test hero text contrast and container bounding box.
     - Test scrolling from hero down through booking into philosophy with zero overlaps or visual collision.
     - Test opening the booking modal, verifying `overflow: hidden` on body, verifying zero background scroll movement.
     - Test closing modal and restoring scroll.
     - Test viewports: Desktop (1440px), Tablet (768px), Mobile (390px) with 0 horizontal overflow.
   - Run `npm run type-check` and `npm run build`.
