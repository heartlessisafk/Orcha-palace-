# Orchha Resort — Photographic Asset Manifest & Discovery Plan
**Phase 1: Digital Asset Audit, Retrieval Status & Photography Protocol**
*Document Version: 1.0.0 | Date: 2026-10-26 | Lead Frontend Architect & Asset Discovery Specialist*

---

## 1. Executive Summary: Photography Status

A luxury ₹1,00,000-tier heritage resort website relies fundamentally on high-resolution, evocative, authentic property photography rather than generic stock imagery.

During this reconnaissance phase, we investigated three asset sources:
1. **Google Photos Shared Album** (`https://photos.google.com/share/AF1QipP3KsNe1SryrpfFbMM6VtUF9SEyuhtpcFm2glt41PeqqSHTfqZ0vyslSqBME0oRlg...`): Definitively investigated via REA headless browser automation. Returned a hard **HTTP 404 (Not Found)** error from Google's servers. The share token is no longer active.
2. **Existing Live Website Assets** (`system/images/*` on `orchharesort.com`): Low-resolution legacy raster files (typically 600×400 or 800×500 compressed JPEGs). Suitable only as reference compositions, not production-quality hero banners.
3. **Reference Website Media Assets** (`framerusercontent.com`): 30 high-definition WebP/PNG assets reverse-engineered from Constellare. While aesthetically superior, these depict an alpine/urban contemporary hotel and cannot be used as permanent imagery for a Bundelkhandi heritage resort.

To ensure rapid, unblocked progress, this manifest establishes:
- The exact failure analysis and technical explanation of the Google Photos link.
- A curated, prioritized catalog of the **25 critical photographs** required from the resort owner.
- A production-grade asset architecture guaranteeing no fragile or temporary authenticated URLs are ever embedded in code.

---

## 2. Technical Investigation of Google Photos Shared Album

### 2.1 Direct Browser Evidence
- **Target URL:** `https://photos.google.com/share/AF1QipP3KsNe1SryrpfFbMM6VtUF9SEyuhtpcFm2glt41PeqqSHTfqZ0vyslSqBME0oRlg?pli=1&key=TWlkcW1VbWd3UEI0RVpVWGRTWkxub1hteHF5NWJR`
- **Execution Engine:** REA Playwright headless Chromium (155.0.8059.84).
- **Network Response:** Status Code `404 Not Found`.
- **Server Returned DOM:**
  ```html
  <title>Error 404 (Not Found)!!1</title>
  <p><b>404.</b> <ins>That's an error.</ins></p>
  <p>The requested URL was not found on this server. <ins>That's all we know.</ins></p>
  ```
- **Conclusion:** No authentication barrier, CAPTCHA, or geographic block was encountered. The URL identifier is invalid or has been permanently deleted/revoked by the owner.

### 2.2 Strict Asset Delivery Policy
To protect production stability:
> [!CAUTION]
> Under no circumstances will temporary Google Photos session links (`lh3.googleusercontent.com/pw/...`) be embedded in production HTML/CSS. Google session URLs expire in 60 minutes and produce broken image icons. All production photographs will be stored locally as optimized WebP/AVIF assets in the project repository (`/public/images/...`).

---

## 3. Curated Target Asset Inventory (The 25 Key Shots)

To begin implementation without delay, the resort owner should provide the following **25 high-resolution photographs** (exported at original quality):

| Index | Category | Shot Description / Composition | Intended Placement | Recommended Min. Resolution | Priority |
|---|---|---|---|---|---|
| **IMG-01** | **Hero Exterior** | Wide panoramic landscape: Lotus pool in foreground, main resort facade, and evening sunset glow | Homepage Hero Banner (Desktop) | 2880 × 1620 (16:9) | 🥇 Critical |
| **IMG-02** | **Hero Exterior** | Vertical dramatic composition: Royal Chhatris across the Betwa river with resort lawns | Hero Banner (Mobile) & Story | 1080 × 1920 (9:16) | 🥇 Critical |
| **IMG-03** | **Architecture** | Front palace porch, traditional archways, and warm illuminated entrance lanterns | "Our Philosophy" Intro Section | 1920 × 1080 (16:9) | 🥈 High |
| **IMG-04** | **Room: Deluxe** | Wide interior: King bed, heritage wooden headboard, marble floor, crisp white linens | "Our Rooms" Showcase Card 1 | 1600 × 1200 (4:3) | 🥇 Critical |
| **IMG-05** | **Room: Standard**| Cozy bedroom interior, garden view window, sitting armchair, warm bedside lamp | "Our Rooms" Showcase Card 2 | 1600 × 1200 (4:3) | 🥇 Critical |
| **IMG-06** | **Room: Swiss Tent**| Exterior shot of luxury canvas Swiss tent nestled among trees with private sit-out | "Our Rooms" Showcase Card 3 | 1600 × 1200 (4:3) | 🥇 Critical |
| **IMG-07** | **Room: Swiss Tent**| Interior of Swiss tent: Bedding, air-conditioner, timber furnishings, tiled bathroom door | Room Detail Modal / Drawer | 1600 × 1200 (4:3) | 🥈 High |
| **IMG-08** | **Room: Suite** | Expansive master bedroom with adjacent heritage seating parlor | "Our Rooms" Showcase Card 4 | 1600 × 1200 (4:3) | 🥈 High |
| **IMG-09** | **Bathroom** | Modern clean ensuite marble bathroom with vanity mirror and walk-in shower | Amenities Feature Grid | 1200 × 900 (4:3) | 🥉 Medium |
| **IMG-10** | **Swimming Pool** | Daytime crystal-clear overhead/deck view showing the distinctive lotus flower shape | Amenities & Experience Section | 1920 × 1080 (16:9) | 🥇 Critical |
| **IMG-11** | **Swimming Pool** | Pool loungers, sun umbrellas, and poolside beverage table | Value Proposition Card | 1200 × 900 (4:3) | 🥈 High |
| **IMG-12** | **Dining: Kaleva** | Elegant dining hall interior: Table settings, heritage wall art, and ambient lighting | Dining Section Lead Image | 1920 × 1080 (16:9) | 🥇 Critical |
| **IMG-13** | **Dining: Food** | Artfully plated Bundelkhandi royal thali / regional vegetarian specialties | Dining Interactive Card | 1200 × 900 (4:3) | 🥈 High |
| **IMG-14** | **Lounge Bar** | Poolside bar counter with colorful evening cocktails and dusk lighting | Dining & Nightlife Card | 1200 × 900 (4:3) | 🥉 Medium |
| **IMG-15** | **Gardens** | Manicured central green lawns with flowering bougainvillea and stone pathways | Nature & Setting Section | 1600 × 1060 (3:2) | 🥈 High |
| **IMG-16** | **Riverside** | Serene view of the Betwa river boulders and riverbank from the resort boundary | Location & Surroundings Banner| 1920 × 1080 (16:9) | 🥇 Critical |
| **IMG-17** | **Spa** | Ayurvedic treatment room with traditional wooden Droni table and brass oil vessel | Ayurveda & Spa Section | 1600 × 1200 (4:3) | 🥈 High |
| **IMG-18** | **Spa / Steam** | Steam bath room / wellness relaxation lounge | Spa Feature Card | 1200 × 900 (4:3) | 🥉 Medium |
| **IMG-19** | **Activities** | Riverside tennis / badminton court with teenagers playing | Family & Sports Card | 1200 × 900 (4:3) | 🥉 Medium |
| **IMG-20** | **Activities** | Evening Bundeli folk dancers in colorful attire performing on the lawn | Cultural Experiences Section | 1600 × 1060 (3:2) | 🥇 Critical |
| **IMG-21** | **Conference** | Corporate boardroom / banquet hall set up with projector and seminar seating | Corporate & Events Section | 1600 × 1060 (3:2) | 🥈 High |
| **IMG-22** | **Destination Wedding**| Lawn banquet setup under fairy lights with stage decor for evening wedding | Celebrations Showcase | 1920 × 1080 (16:9) | 🥈 High |
| **IMG-23** | **Monument: Chhatris**| Golden hour sunset silhouette of the 14 Chhatris along the river | Historical Heritage Guide | 1920 × 1080 (16:9) | 🥇 Critical |
| **IMG-24** | **Monument: Fort** | Orchha Fort & Jahangir Mahal towering over town | Local Sightseeing Guide | 1600 × 1060 (3:2) | 🥈 High |
| **IMG-25** | **Details / Hospitality**| Traditional guest welcome: Garland, folded hands (Namaste), brass welcome lamps | Social Proof / Testimonials | 1200 × 900 (4:3) | 🥈 High |

---

## 4. Phase 1 Mocking & Placeholder Strategy

To begin immediate development without waiting for the photo delivery, we will implement an intelligent two-tier staging strategy:

1. **Compositional Prototyping (Phase 2):** Use curated royalty-free architectural photographs of royal Madhya Pradesh / Rajasthani heritage palaces, luxury glamping tents, and marble pools from Unsplash/Pexels with identical aspect ratios, focal points, and color grading matching our Navy & Beige palette.
2. **One-Click Asset Swap:** All image paths will be mapped through a single typed asset dictionary:
   ```typescript
   // src/lib/assets.ts
   export const RESORT_IMAGES = {
     hero: {
       bannerDesktop: '/images/hero/orchha-hero-desktop.webp',
       bannerMobile: '/images/hero/orchha-hero-mobile.webp',
       alt: 'The Orchha Resort panoramic view overlooking the Betwa river',
     },
     rooms: {
       standard: '/images/rooms/orchha-standard-room.webp',
       deluxe: '/images/rooms/orchha-deluxe-room.webp',
       swissTent: '/images/rooms/orchha-swiss-tent.webp',
       suite: '/images/rooms/orchha-heritage-suite.webp',
     },
     dining: {
       restaurant: '/images/dining/kaleva-restaurant.webp',
       foodPlatter: '/images/dining/bundeli-thali.webp',
       poolsideBar: '/images/dining/poolside-bar.webp',
     },
     amenities: {
       lotusPool: '/images/amenities/lotus-pool.webp',
       ayurvedaSpa: '/images/amenities/ayurveda-spa.webp',
       tennisCourt: '/images/amenities/riverside-sports.webp',
     },
     heritage: {
       chhatrisSunset: '/images/heritage/orchha-chhatris.webp',
       fortComplex: '/images/heritage/orchha-fort.webp',
     }
   };
   ```
3. **Format & Optimization Pipeline:** When the client delivers the original files:
   - Convert all RAW/JPEG files to **WebP (quality 85)** and **AVIF (quality 80)**.
   - Generate responsive `srcset` resolutions: `640w`, `1080w`, `1920w`, `2880w`.
   - Implement native Next.js `<Image />` optimization with blur placeholder hashes (`plaiceholder`).
