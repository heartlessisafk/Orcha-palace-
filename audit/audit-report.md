# Orchha Resort Redesign — Reconnaissance & Audit Report
**Phase 1: Reverse Engineering, Asset Discovery & Design Intelligence**
*Document Version: 1.0.0 | Date: 2026-10-26 | Lead Frontend Architect & Reverse-Engineering Specialist*

---

## 1. Executive Summary

This comprehensive audit represents the conclusion of **Phase 1: Reconnaissance, Asset Discovery, and Design Intelligence** for the complete redesign of the Orchha Resort website. Our objective is to design and architect a premium ₹1,00,000-tier digital presence: understated luxury, warm Bundelkhandi hospitality, rapid performance, timeless typography, and high visual/behavioral fidelity adapted from the design reference (`https://fearless-gazelle-480293.framer.app/`), grounded strictly in the verified business truth of the actual resort (`https://www.orchharesort.com/`).

No production implementation, framework installation, or file overwrites have been initiated. All investigations were performed using non-destructive inspection tools, local evidence capture, and headless browser scenario analysis via Reverse Engineering Anything (REA).

### Key Takeaways at a Glance

1. **Environment State:** The project root (`/Users/sam/Projects/orccha`) was completely empty prior to this audit. The Antigravity CLI (`agy`) is operational at `/Users/sam/.local/bin/agy`. REA is fully functional as an MCP server with Playwright/Chromium capabilities. GSD is not present in the environment PATH. An isolated `/Users/sam/Projects/orccha/audit/` directory was established to house all audit deliverables, evidence bundles, DOM dumps, and captured screenshots without touching user application space.
2. **Design Reference Reverse-Engineered:** The reference website ("Constellare" Framer template) was captured at desktop (2880×1800 Retina) and mobile viewports. Full DOM trees, CSS tokens, font assets, component hierarchies, and animation signatures were extracted into `framer-evidence.json` (36 MB). The visual identity uses a deep midnight navy (`#0C1731`), warm heritage beige/cream (`#F4F0E6`), and bronze-gold accent (`#8C6D3F`), set in `Crimson Text` (editorial serif) and `DM Sans` / `Geist` (clean geometric sans).
3. **Resort Truth Verified:** Direct inspection of the live `orchharesort.com` DOM revealed definitive operational facts previously unverified or conflicting across OTAs:
   - **Total Room Count:** Exactly **32 well-decorated rooms and Swiss tents** (previously unconfirmed).
   - **Accommodations:** Standard Rooms, Deluxe Rooms, and Deluxe AC Swiss Tents (situated in the gardens adjacent to the historical Chhatris).
   - **Unique Amenities:** Lotus-shaped outdoor swimming pool with sun deck, poolside lounge bar, "Kaleva" multi-cuisine restaurant (specializing in pure vegetarian Bundeli, Indian, Chinese, and Continental cuisine), authentic Kerala Ayurvedic Spa with steam bath, riverside badminton and tennis courts, children's play park, and evening traditional folk dance performances.
   - **Verified Contact:** Address: Kanchanghat, Distt. Tikamgarh/Niwari, Orchha, MP; Phone: `+91 99262 19900` / `+91 562 2225712`; Email: `orchha@orchharesort.com`.
   - **Original Architect:** Yogesh Chandra (New Delhi).
   - **Current Booking Engine:** Basic direct enquiry script (`booking.html` / `booking.htm`) taking room count (1–3), adult count (1–5), and children count (0–4). No modern external PMS (SynXis, RezNext, Staah) is integrated into the current site.
4. **Google Photos Shared Album Status:** The provided shared album URL returned an immediate **HTTP 404 (Not Found)** from Google's servers. The link is either expired, revoked, or deleted. No credentials or login wall were involved; Google cannot locate the album ID. A practical, risk-free mitigation strategy (requesting a curated set of 20–30 high-resolution local assets across 10 categories) has been drafted.

---

## 2. Tools & Environment Verification

| Tool / Capability | Status | Implementation / Path | Verification Evidence |
|---|---|---|---|
| **Workspace** | Verified Empty | `/Users/sam/Projects/orccha` | `git status` returned not a git repo; no `package.json` |
| **Antigravity CLI** | Verified Active | `/Users/sam/.local/bin/agy` | CLI flags confirmed: `--mode`, `--model`, `--effort`, `-c` |
| **REA (MCP Server)** | Verified Active | Registered lazy MCP (`rea`) | Browser automation, DOM capture, screenshotting, evidence export verified |
| **Browser Engine** | Verified Active | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` | Headless Chrome 155.0.8059.84 used for scenario captures |
| **GSD Tooling** | Not Installed | PATH lookup failed | Command `gsd` not found. Phases structured manually following GSD conventions |
| **Audit Directory** | Created | `/Users/sam/Projects/orccha/audit/` | Contains reports, evidence JSON, extracted HTML, and Retina screenshots |

---

## 3. Inspection Coverage Matrix

| Investigation Stream | Target | Method Used | Result |
|---|---|---|---|
| **Design Reference** | `fearless-gazelle-480293.framer.app` | REA `capture_browser_scenario` | Full DOM (434 KB), 6 viewport screenshots, CSS tokens, animation analysis |
| **Existing Resort Website** | `www.orchharesort.com` | REA `capture_browser_scenario` | Live DOM (27 KB), Retina screenshot, meta tags, links, text dump |
| **OTA / Web Footprint** | MakeMyTrip, Agoda, TripAdvisor, Goibibo | Web aggregation & cross-referencing | Verified guest reviews, regional context, transit times, tariff ranges |
| **Resort Photo Album** | Google Photos Shared Album | Headless Chrome via REA | Conclusive **HTTP 404 Hard Error**. Access blocked server-side |

---

## 4. Key Findings

### 4.1 The Reference Website ("Constellare")
- **Layout & Rhythm:** Fluid single-page homepage with sticky glassmorphism navigation, high-impact hero with social proof badge ("4.9 Excellent"), scroll-synchronized word-by-word text reveal ("Our Philosophy"), 2×2 feature grid, 5-point tabbed interactive accordion ("How We Host"), 4-column CMS room cards, testimonial slider with avatar switcher, ambient interior video banner, 3-card journal section, collapsible accordion FAQ, and clean 4-column footer.
- **Color System:** Grounded in high-contrast elegance: deep navy (`#0C1731`), warm linen/beige (`#F4F0E6`), warm antique bronze/gold (`#8C6D3F`), dark espresso charcoal (`#260E01`), and pure white/off-white highlights (`#FFFFFF`, `#FDFBF7`).
- **Typography:** Two-tier luxury hierarchy: `Crimson Text` (Google Fonts, serif, 600 weight, editorial elegance for titles and philosophy text) paired with `DM Sans` / `Geist` (clean, highly legible sans-serif for UI labels, prices, navigation, and body copy).
- **Motion Principles:** Understated, scroll-driven micro-interactions:
  1. *Text Reveal:* Individual words transition from `opacity: 0.2` to `opacity: 1.0` as the viewport scrolls.
  2. *Card Zoom:* Room cards employ a 0.4s ease-out scale transform (`scale(1.03)`) on cursor hover.
  3. *Button Transitions:* Magnetic CTA buttons with sliding dual-arrow glyphs.
  4. *Accordions:* Smooth height animation (`transition: height 0.35s cubic-bezier(0.2, 0, 0, 1)`).

### 4.2 The Existing Orchha Resort Website
- **Architecture & Build:** Built by "India Interactive" as a legacy static HTML site with jQuery sliders. Contains outdated template remnants (e.g., "Stay up to date with the latest specials from Base Hotel" in the newsletter modal).
- **Core Strengths to Highlight:**
  - Picturesque location directly on the banks of the sacred Betwa River, directly overlooking the famous 14 historical Bundela Chhatris (cenotaphs).
  - Authentic heritage ambiance with zero-pollution natural surroundings.
  - Distinctive accommodation type: Luxury Swiss Tents alongside standard and deluxe heritage rooms.
  - "Lotus-shaped" swimming pool — a signature visual feature that sets the property apart.
  - Evening Bundeli folk dances and cultural activities on the lawns.
- **Weaknesses of Current Digital Presence:**
  - No mobile-first responsive architecture.
  - Fragmented, outdated visual styling with low-resolution stretched graphics.
  - Lack of a modern room-search interface.
  - No instant booking confirmation; forms route to generic email scripts.

### 4.3 Google Photos Album Status
- The album URL (`https://photos.google.com/share/AF1QipP3KsNe1SryrpfFbMM6VtUF9SEyuhtpcFm2glt41PeqqSHTfqZ0vyslSqBME0oRlg?pli=1&key=TWlkcW1VbWd3UEI0RVpVWGRTWkxub1hteHF5NWJR`) is definitively returning `HTTP 404 (Not Found)`.
- No session tokens, cookies, or authorization headers resolve the link. The resource no longer exists on Google's servers.
- **Action Taken:** Full fallback protocol defined in `asset-manifest.md`.

---

## 5. Unknowns & Critical Gaps

| ID | Item | Current Status | Impact on Phase 2 | Resolution Pathway |
|---|---|---|---|---|
| **UNK-01** | High-Res Logo Vector / SVG | Unknown; only low-res raster `logo.png` exists in legacy site | High | Request original vector SVG or redraw high-fidelity emblem in Phase 2 |
| **UNK-02** | Google Photos Album Access | 404 Server Error | Critical for genuine imagery | Request owner re-share or manual export of 25 curated JPEGs |
| **UNK-03** | Live PMS / Booking Engine API | None identified on site | Medium | Build modern enquiry widget with direct WhatsApp/email dispatch + OTA links |
| **UNK-04** | Room Pricing Authority | Discrepancies between legacy site and OTAs (₹4,000–₹8,500) | Low | Display "Starting from ₹4,500/night" with explicit "Taxes & seasonal rates apply" |
| **UNK-05** | Check-out Timing Discrepancy | OTAs state 10:00 AM vs 12:00 PM | Low | Standardize on 11:00 AM or 12:00 PM pending client confirmation |

---

## 6. Recommended Next Steps

1. **Client Milestone Approval:** Present this Phase 1 Reconnaissance package to the user for formal approval.
2. **Asset Procurement:** Request the 20–30 high-resolution original images from the owner following the manifest in `asset-manifest.md`.
3. **Phase 2 Implementation Setup:**
   - Initialize a modern Next.js 15 (App Router) + TypeScript + Tailwind CSS application in `/Users/sam/Projects/orccha`.
   - Install `framer-motion`, `lucide-react`, and `@fontsource/crimson-text` / `@fontsource/dm-sans`.
   - Implement the navy-beige design token system in Tailwind.
   - Build the mandatory room-search widget directly beneath the hero banner.
