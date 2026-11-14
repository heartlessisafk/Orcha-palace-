# Phase 23: Correct Homepage Hero Location Label (Client Feedback Fix 05)

## Objective
Update the location badge in the Homepage hero section to the exact client-approved text:
`KANCHANGHAT · ORCHHA, MADHYA PRADESH, INDIA`

## Requirements
- Replace `Betwa River Sanctuary · Orchha, Madhya Pradesh` in [HeroScrollBookingSequence.tsx](file:///Users/sam/Projects/orccha/src/components/hero/HeroScrollBookingSequence.tsx#L106-L109).
- Use exact client wording: `KANCHANGHAT · ORCHHA, MADHYA PRADESH, INDIA`.
- Preserve the existing location pin icon (`MapPin`).
- Maintain the navy and gold brand aesthetic (`bg-brand-gold/20 border-brand-gold/40 text-brand-gold-light`).
- Ensure the label fits cleanly on desktop (1440px), tablet (768px), and mobile (390px) without awkward wrapping or overflow.
- Verify 0 regressions, clean build, and 0 console errors.
