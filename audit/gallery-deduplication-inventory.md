# Orchha Resort — Gallery Deduplication & Curation Inventory

## Executive Summary
- **Total Ingested Images**: 300 assets from authentic Google Photos album
- **Curation Methodology**: Strict SHA-256 binary hash detection combined with 64-bit dHash perceptual image similarity analysis (Hamming distance threshold $\le 14$).
- **Duplicates Detected**: `orchha-photo-016` identified as byte-identical duplicate of `orchha-photo-015` (`dji_fly_20240520_180600_0067_1716208793115_video.jpg`). Excluded from gallery display.
- **Total Unique Curated Gallery Photos**: **48 unique photographs** (100% duplicate-free).

## Category Distribution

| Category ID | Category Name | Unique Photos | Reveal Slices (Groups of 3) |
| :--- | :--- | :--- | :--- |
| `all` | **All Curated Views** | **48** | 16 groups of 3 (3 $\to$ 6 $\to$ 9 ... $\to$ 48) |
| `aerial-landscapes` | Aerial & Grounds | **4** | 1 group(s) of 3 + 1 partial group of 1 |
| `architecture-exterior` | Architecture & Interiors | **7** | 2 group(s) of 3 + 1 partial group of 1 |
| `rooms-deluxe` | Deluxe Rooms | **4** | 1 group(s) of 3 + 1 partial group of 1 |
| `rooms-tents` | Luxury Swiss Tents | **3** | 1 group(s) of 3 |
| `rooms-suites` | Royal Heritage Suite | **1** | 0 group(s) of 3 + 1 partial group of 1 |
| `pool-gardens` | Lotus Pool & Gardens | **5** | 1 group(s) of 3 + 1 partial group of 2 |
| `dining-kaleva` | Kaleva Restaurant | **2** | 0 group(s) of 3 + 1 partial group of 2 |
| `dining-riverfront` | Riverfront Alfresco Dining | **5** | 1 group(s) of 3 + 1 partial group of 2 |
| `spa-kairali` | Kairali Ayurvedic Spa | **3** | 1 group(s) of 3 |
| `weddings-celebrations` | Weddings & Banquets | **5** | 1 group(s) of 3 + 1 partial group of 2 |
| `heritage-surroundings` | Heritage Cenotaphs | **5** | 1 group(s) of 3 + 1 partial group of 2 |
| `guest-experiences` | Guest Moments & Activities | **4** | 1 group(s) of 3 + 1 partial group of 1 |

## Excluded Duplicates Log

| ID | Original Filename | Duplicated Path | Primary Retained Asset | Reason |
| :--- | :--- | :--- | :--- | :--- |
| `orchha-photo-016` | `dji_fly_20240520_180600_...` | `/images/resort/curated/pool/pool-blooming-petal-splash.jpg` | `orchha-photo-015` (`/images/resort/curated/aerial/aerial-lotus-pool-geometry.jpg`) | Exact SHA-256 binary match; identical overhead drone frame of lotus pool |

## Complete Verified Unique Gallery Inventory (48 Assets)

| # | ID | Category | Title | Resolution | Curated Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `orchha-photo-001` | `heritage-surroundings` | Bundela Chhatris along River Betwa | 1080×1920 | `/images/resort/curated/heritage/heritage-chhatris-river-view.jpg` |
| 2 | `orchha-photo-003` | `heritage-surroundings` | Royal Cenotaphs at Golden Hour | 1080×1920 | `/images/resort/curated/heritage/heritage-cenotaphs-golden-hour.jpg` |
| 3 | `orchha-photo-004` | `heritage-surroundings` | Orchha Architectural Spires | 1080×1920 | `/images/resort/curated/heritage/heritage-monument-stone-spires.jpg` |
| 4 | `orchha-photo-010` | `pool-gardens` | Sunset Pool Reflection of Chhatris | 2160×3840 | `/images/resort/curated/pool/pool-chhatris-reflection-sunset.jpg` |
| 5 | `orchha-photo-011` | `aerial-landscapes` | Master Aerial View of Orchha Resort | 1512×2688 | `/images/resort/curated/aerial/aerial-resort-drone-chhatris.jpg` |
| 6 | `orchha-photo-012` | `aerial-landscapes` | Entrance Porte-Cochère & Star Roundabout | 1512×2688 | `/images/resort/curated/aerial/aerial-porte-cochere-star.jpg` |
| 7 | `orchha-photo-013` | `aerial-landscapes` | Panoramic Resort & River Triangle | 1512×2688 | `/images/resort/curated/aerial/aerial-resort-betwa-landscape.jpg` |
| 8 | `orchha-photo-014` | `aerial-landscapes` | Aerial View of Guest Wings & Lotus Pool | 1512×2688 | `/images/resort/curated/aerial/aerial-resort-guest-wings-pool.jpg` |
| 9 | `orchha-photo-015` | `pool-gardens` | Lotus Pool Geometry Overhead | 1512×2688 | `/images/resort/curated/aerial/aerial-lotus-pool-geometry.jpg` |
| 10 | `orchha-photo-030` | `dining-riverfront` | Riverfront Table Spread | 1564×878 | `/images/resort/curated/dining/dining-riverfront-alfresco.jpg` |
| 11 | `orchha-photo-031` | `guest-experiences` | Guests Relaxing at River Balustrade | 6000×3368 | `/images/resort/curated/experiences/experience-evening-riverfront-gathering.jpg` |
| 12 | `orchha-photo-032` | `rooms-deluxe` | Deluxe Room with Lotus Pool View | 2160×3840 | `/images/resort/curated/rooms/room-deluxe-king-pool-view.jpg` |
| 13 | `orchha-photo-035` | `rooms-deluxe` | Deluxe Room Interior Panoramic | 2160×3840 | `/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg` |
| 14 | `orchha-photo-036` | `rooms-deluxe` | Deluxe Room Media & Hospitality Station | 2160×3840 | `/images/resort/curated/rooms/room-deluxe-media-station.jpg` |
| 15 | `orchha-photo-047` | `rooms-deluxe` | En-Suite Bathroom & Marble Vanity | 2160×3840 | `/images/resort/curated/rooms/room-bathroom-marble-vanity.jpg` |
| 16 | `orchha-photo-056` | `rooms-tents` | Luxury Swiss AC Tent Interior | 2160×3840 | `/images/resort/curated/rooms/room-tent-interior-canopy.jpg` |
| 17 | `orchha-photo-057` | `rooms-tents` | Luxury Swiss Tent Dressing Vanity | 2160×3840 | `/images/resort/curated/rooms/room-tent-vanity-dressing.jpg` |
| 18 | `orchha-photo-060` | `rooms-tents` | Swiss Tent Verandah at Dusk | 2160×3840 | `/images/resort/curated/rooms/room-tent-verandah-twilight.jpg` |
| 19 | `orchha-photo-062` | `rooms-suites` | Royal Heritage Suite Living Salon | 2160×3840 | `/images/resort/curated/rooms/room-suite-heritage-living.jpg` |
| 20 | `orchha-photo-070` | `pool-gardens` | Lotus Pool Twilight Glow | 4028×2266 | `/images/resort/curated/pool/pool-lotus-twilight-glow.jpg` |
| 21 | `orchha-photo-075` | `dining-kaleva` | Kaleva Restaurant Entrance | 1080×1920 | `/images/resort/curated/dining/dining-kaleva-entrance.jpg` |
| 22 | `orchha-photo-080` | `dining-riverfront` | Al Fresco Pasta on River Balustrade | 1080×1920 | `/images/resort/curated/dining/dining-balustrade-sunset-pasta.jpg` |
| 23 | `orchha-photo-100` | `guest-experiences` | Morning Tea along River Betwa | 3072×4080 | `/images/resort/curated/experiences/experience-riverfront-tea-guests.jpg` |
| 24 | `orchha-photo-105` | `dining-riverfront` | Riverfront Patio Dining Spread | 2160×3840 | `/images/resort/curated/dining/dining-riverfront-patio-spread.jpg` |
| 25 | `orchha-photo-118` | `dining-riverfront` | Lawn Breakfast with Chhatris Backdrop | 1080×1920 | `/images/resort/curated/dining/dining-lawn-breakfast-chhatris.jpg` |
| 26 | `orchha-photo-120` | `architecture-exterior` | Orchha Resort Grand Entrance Facade | 6000×4000 | `/images/resort/curated/architecture/architecture-entrance-facade.jpg` |
| 27 | `orchha-photo-125` | `architecture-exterior` | Bundela Arches & Stone Masonry | 6000×4000 | `/images/resort/curated/architecture/architecture-bundela-arches.jpg` |
| 28 | `orchha-photo-140` | `dining-riverfront` | Garden Banquet Dining Setup | 6000×4000 | `/images/resort/curated/dining/dining-garden-banquet-setup.jpg` |
| 29 | `orchha-photo-150` | `heritage-surroundings` | Royal Cenotaphs Reflected in River Betwa | 4000×6000 | `/images/resort/curated/heritage/heritage-chhatris-reflection-river.jpg` |
| 30 | `orchha-photo-160` | `architecture-exterior` | Lobby Sandstone Ganesha Mural | 1080×1920 | `/images/resort/curated/architecture/architecture-lobby-ganesha.jpg` |
| 31 | `orchha-photo-169` | `architecture-exterior` | Lobby Lounge Marble Inlay & Deepam | 1080×1920 | `/images/resort/curated/architecture/architecture-lobby-deepam-inlay.jpg` |
| 32 | `orchha-photo-170` | `spa-kairali` | Kairali Ayurvedic Spa Welcome | 1080×1920 | `/images/resort/curated/spa/spa-kairali-welcome-banner.jpg` |
| 33 | `orchha-photo-171` | `guest-experiences` | River Observation Deck Vista | 1080×1920 | `/images/resort/curated/experiences/experience-observation-deck-view.jpg` |
| 34 | `orchha-photo-172` | `architecture-exterior` | Wooden Staircase to River Deck | 1080×1920 | `/images/resort/curated/architecture/architecture-riverfront-deck-stairs.jpg` |
| 35 | `orchha-photo-175` | `spa-kairali` | Heritage Wellness Corridor | 1080×1920 | `/images/resort/curated/spa/spa-heritage-wellness-corridor.jpg` |
| 36 | `orchha-photo-210` | `guest-experiences` | Riverside Garden Stroll | 1080×1920 | `/images/resort/curated/experiences/experience-riverside-stroll.jpg` |
| 37 | `orchha-photo-225` | `heritage-surroundings` | River Betwa Granite Cascades | 4032×3024 | `/images/resort/curated/heritage/heritage-betwa-river-boulders.jpg` |
| 38 | `orchha-photo-240` | `architecture-exterior` | Heritage Cottages at Dusk | 3024×4032 | `/images/resort/curated/architecture/architecture-cottage-facade-dusk.jpg` |
| 39 | `orchha-photo-260` | `weddings-celebrations` | Terrace Wedding Celebration at Sunset | 1080×1920 | `/images/resort/curated/weddings/wedding-terrace-celebration-sunset.jpg` |
| 40 | `orchha-photo-270` | `pool-gardens` | Pool Deck Loungers & Garden View | 3024×4032 | `/images/resort/curated/pool/pool-deck-loungers-day.jpg` |
| 41 | `orchha-photo-272` | `pool-gardens` | Night Pool Illumination | 3024×4032 | `/images/resort/curated/pool/pool-night-illumination.jpg` |
| 42 | `orchha-photo-280` | `architecture-exterior` | Crystal Chandelier in 8-Pointed Star Relief | 1920×1080 | `/images/resort/curated/architecture/architecture-crystal-chandelier.jpg` |
| 43 | `orchha-photo-281` | `weddings-celebrations` | Royal Banquet Hall Ambiance | 1080×1920 | `/images/resort/curated/weddings/wedding-banquet-royal-ambiance.jpg` |
| 44 | `orchha-photo-285` | `spa-kairali` | Ayurvedic Treatment Room Sanctuary | 3024×4032 | `/images/resort/curated/spa/spa-ayurvedic-treatment-sanctuary.jpg` |
| 45 | `orchha-photo-290` | `dining-kaleva` | Kaleva Restaurant Carved Apsara Pillars | 1080×1920 | `/images/resort/curated/dining/dining-kaleva-interior-apsara.jpg` |
| 46 | `orchha-photo-294` | `weddings-celebrations` | Royal Wedding Draped Entrance Walkway | 1080×1920 | `/images/resort/curated/weddings/wedding-canopy-drape-corridor.jpg` |
| 47 | `orchha-photo-298` | `weddings-celebrations` | Evening Lawn Reception Celebration | 3024×4032 | `/images/resort/curated/weddings/wedding-evening-garden-reception.jpg` |
| 48 | `orchha-photo-299` | `weddings-celebrations` | Emerald & Ivory Wedding Mandap Canopy | 3024×4032 | `/images/resort/curated/weddings/wedding-lawn-canopy-mandap.jpg` |
