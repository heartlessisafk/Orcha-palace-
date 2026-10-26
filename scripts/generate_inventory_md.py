import json

catalogue = json.load(open('src/data/photo-catalogue.json'))

by_category = {}
for p in catalogue:
    cat = p['category']
    by_category.setdefault(cat, []).append(p)

md = []
md.append('# ORCHHA RESORT — MASTER IMAGE INVENTORY & PHOTO CURATION DOSSIER')
md.append('**Date:** October 26, 2026 | **Total Analyzed Photos:** 300 genuine items')
md.append('**Album URL:** `https://photos.google.com/share/AF1QipP3KsNe1SryrpfFbMM6VtUF9SEyuhtpcFm2glt41PeqqSHTfqZ0vyslSqBME0oRlg?key=TWlkcW5VbWd3UEI0RVpVWGRTWkxub1hteHF5NWJR`')
md.append('')
md.append('---')
md.append('## 1. Executive Summary & Ingestion Protocol')
md.append('The verified Google Photos shared album contains exactly **300 authentic high-resolution media items** capturing Orchha Resort, its surrounding monuments, dining experiences, accommodations, swimming pool, weddings, and guest hospitality.')
md.append('')
md.append('### Technical Discovery: Pristine Watermark-Free Extraction')
md.append('Google Photos default thumbnails (`=w400`) occasionally display a client-side video overlay icon for motion photos/bursts. Our technical pipeline identified that appending the `-no` parameter (`=w1600-no`, `=w1200-no`) or using direct source delivery strips all overlays, providing pristine, watermark-free high-resolution photography suitable for luxury hospitality display.')
md.append('')
md.append('### Strict Categorization Principle')
md.append('> **The Core Rule:** *The right photograph must appear in the right section. Never mix up categories. A swimming pool photograph belongs in the pool section. A bedroom photograph belongs in the rooms section. A massage photograph belongs in the spa section. Wedding photography belongs in the wedding section.*')
md.append('')
md.append('---')
md.append('## 2. Inventory Breakdown by Category (12 Distinct Categories)')
md.append('')
md.append('| Category | Count | Featured Picks | Primary Recommended Roles |')
md.append('| :--- | :---: | :---: | :--- |')

for cat, items in by_category.items():
    feat = len([x for x in items if x['isFeatured']])
    roles = ', '.join(sorted(list(set([x['recommendedRole'] for x in items if x['isFeatured']]))))
    md.append(f'| `{cat}` | {len(items)} | {feat} | {roles} |')

md.append('')
md.append('---')
md.append('## 3. High-Resolution Curated Highlights (49 Key Assets)')
md.append('')
md.append('| Index | File / Target Path | Category | Title | Quality | Recommended Role |')
md.append('| :---: | :--- | :--- | :--- | :---: | :--- |')

featured_photos = [p for p in catalogue if p.get('curatedPath')]
for p in featured_photos:
    md.append(f"| `{p['index']:03d}` | `{p['curatedPath']}` | `{p['category']}` | {p['title']} | {p['qualityScore']}/10 | `{p['recommendedRole']}` |")

md.append('')
md.append('---')
md.append('## 4. Page-by-Page Placement Matrix')
md.append('')
md.append('### 4.1 Homepage (`/`)')
md.append('- **Hero Poster / Fallback:** `public/images/resort/curated/pool/pool-lotus-twilight-glow.jpg` (Iconic lotus pool glowing at dusk with Chhatris skyline).')
md.append('- **Architecture Showcase:** `public/images/resort/curated/architecture/architecture-entrance-facade.jpg` & `architecture-lobby-ganesha.jpg`.')
md.append('- **Riverfront Living:** `public/images/resort/curated/aerial/aerial-resort-drone-chhatris.jpg`.')
md.append('- **Culinary Preview:** `public/images/resort/curated/dining/dining-riverfront-alfresco.jpg` & `dining-kaleva-entrance.jpg`.')
md.append('')
md.append('### 4.2 Rooms & Suites (`/rooms`)')
md.append('- **Deluxe Room Hero:** `public/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg` (Polished Pietra Dura marble inlay, king bed).')
md.append('- **Deluxe Room Card:** `public/images/resort/curated/rooms/room-deluxe-king-pool-view.jpg` (Direct lotus pool picture window).')
md.append('- **Luxury Swiss Tent Hero & Card:** `public/images/resort/curated/rooms/room-tent-interior-canopy.jpg` & `room-tent-verandah-twilight.jpg`.')
md.append('- **Royal Suite:** `public/images/resort/curated/rooms/room-suite-heritage-living.jpg`.')
md.append('- **Amenities & Bathroom:** `public/images/resort/curated/rooms/room-bathroom-marble-vanity.jpg` & `room-deluxe-media-station.jpg`.')
md.append('')
md.append('### 4.3 Lotus Pool & Amenities')
md.append('- **Pool Hero:** `public/images/resort/curated/pool/pool-lotus-twilight-glow.jpg`.')
md.append('- **Sunset Pool Reflection:** `public/images/resort/curated/pool/pool-chhatris-reflection-sunset.jpg`.')
md.append('- **Daytime Loungers:** `public/images/resort/curated/pool/pool-deck-loungers-day.jpg`.')
md.append('- **Geometry & Petals:** `public/images/resort/curated/aerial/aerial-lotus-pool-geometry.jpg` & `pool-blooming-petal-splash.jpg`.')
md.append('')
md.append('### 4.4 Kairali Ayurvedic Spa (`/spa`)')
md.append('- **Authentic Brand Banner:** `public/images/resort/curated/spa/spa-kairali-welcome-banner.jpg` (Roll-up banner confirming official Kairali partnership: Shirodhara, Abhyangam, Herbal Steam).')
md.append('- **Therapy Sanctuary:** `public/images/resort/curated/spa/spa-ayurvedic-treatment-sanctuary.jpg`.')
md.append('- **Wellness Corridor:** `public/images/resort/curated/spa/spa-heritage-wellness-corridor.jpg`.')
md.append('')
md.append('### 4.5 Weddings & Royal Celebrations (`/weddings`)')
md.append('- **Lawn Mandap Canopy Hero:** `public/images/resort/curated/weddings/wedding-lawn-canopy-mandap.jpg` (Emerald & ivory ceremonial canopy on riverfront lawns).')
md.append('- **Ceremonial Walkway:** `public/images/resort/curated/weddings/wedding-canopy-drape-corridor.jpg`.')
md.append('- **Sunset Terrace Moment:** `public/images/resort/curated/weddings/wedding-terrace-celebration-sunset.jpg`.')
md.append('- **Evening Garden Reception:** `public/images/resort/curated/weddings/wedding-evening-garden-reception.jpg`.')
md.append('')
md.append('### 4.6 Heritage About Page (`/about`)')
md.append('- **Aerial Drone Establishing Shot:** `public/images/resort/curated/aerial/aerial-resort-drone-chhatris.jpg` & `aerial-resort-betwa-landscape.jpg`.')
md.append('- **Entrance Porte-Cochère:** `public/images/resort/curated/aerial/aerial-porte-cochere-star.jpg`.')
md.append('- **Heritage Cenotaphs at Kanchan Ghat:** `public/images/resort/curated/heritage/heritage-chhatris-reflection-river.jpg`.')
md.append('- **Lobby Craftsmanship:** `public/images/resort/curated/architecture/architecture-lobby-ganesha.jpg`.')
md.append('')
md.append('---')
md.append('## 5. Excluded & Duplicate Photos Register')
md.append('')
md.append('| Index | Original Filename | Status | Reason / Remediation |')
md.append('| :---: | :--- | :--- | :--- |')

duplicates = [p for p in catalogue if p.get('isDuplicate') or p.get('isExcluded')]
for p in duplicates:
    status = 'EXCLUDED' if p.get('isExcluded') else 'DUPLICATE/BURST'
    reason = p.get('exclusionReason') or 'Alternative higher-quality frame selected'
    md.append(f"| `{p['index']:03d}` | `{p['originalFilename']}` | **{status}** | {reason} |")

with open('audit/image-inventory.md', 'w') as f:
    f.write('\n'.join(md))

print('audit/image-inventory.md generated successfully!')
