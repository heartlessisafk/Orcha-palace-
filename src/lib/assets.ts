/**
 * Centralized Typed Asset Dictionary for The Orchha Resort Redesign.
 *
 * REPLACEMENT PROTOCOL:
 * The Google Photos shared album was verified HTTP 404 in Phase 1 reconnaissance.
 * This dictionary isolates all image paths in a single typed map.
 * When genuine resort photographs are provided by the client, replace files in `/public/images/*`
 * or update the `src` string here. No temporary authenticated URLs are permitted.
 *
 * All placeholder images in this phase are explicitly flagged as `isStagingPlaceholder: true`
 * and are used strictly to validate responsive layout, aspect ratios, and color harmony.
 */

export interface ResortAsset {
  id: string;
  category: "hero" | "rooms" | "dining" | "amenities" | "heritage" | "brand";
  title: string;
  description: string;
  src: string;
  aspectRatio: "16:9" | "4:3" | "3:2" | "1:1" | "9:16";
  width: number;
  height: number;
  alt: string;
  isStagingPlaceholder: boolean;
  targetPlacement: string;
  replacementFileName: string;
}

export const RESORT_ASSETS: Record<string, ResortAsset> = {
  // Brand Assets
  logoSvg: {
    id: "logo-svg",
    category: "brand",
    title: "Orchha Resort Royal Emblem",
    description: "Vector emblem featuring heritage arches and floral motifs",
    src: "/images/brand/orchha-emblem.svg",
    aspectRatio: "1:1",
    width: 120,
    height: 120,
    alt: "The Orchha Resort Logo",
    isStagingPlaceholder: true,
    targetPlacement: "Header Navbar and Footer",
    replacementFileName: "logo-vector.svg",
  },

  // Hero Video & Photography
  heroVideo: {
    id: "hero-video",
    category: "hero",
    title: "Cinematic Heritage Resort Ambient Video",
    description: "Atmospheric luxury slow-pan of calm water reflections, glowing evening lanterns and palace stone",
    src: "https://assets.mixkit.co/videos/preview/mixkit-sunset-over-a-calm-river-and-historical-palace-42468-large.mp4",
    aspectRatio: "16:9",
    width: 1920,
    height: 1080,
    alt: "Cinematic atmospheric footage of heritage riverside architecture (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Homepage Cinematic Full-Viewport Hero Background",
    replacementFileName: "VID-01-orchha-resort-drone-cinematic.mp4",
  },
  heroDesktop: {
    id: "hero-desktop",
    category: "hero",
    title: "The Royal Cenotaphs at Golden Sunrise on River Betwa (4K UHD)",
    description: "Breathtaking 4K Ultra-HD panorama of the ancient Bundela Cenotaphs (Chhatris) across the mist and waters of River Betwa at golden sunrise",
    src: "/images/resort/hero/hero-aerial-chhatris-river.jpg",
    aspectRatio: "16:9",
    width: 3840,
    height: 2865,
    alt: "Golden sunrise over River Betwa with morning mist and the monumental 14 Royal Cenotaphs in Orchha",
    isStagingPlaceholder: false,
    targetPlacement: "Homepage Hero Section (Desktop)",
    replacementFileName: "hero-aerial-chhatris-river.jpg",
  },
  heroMobile: {
    id: "hero-mobile",
    category: "hero",
    title: "The Royal Cenotaphs at Golden Sunrise on River Betwa (4K UHD)",
    description: "Breathtaking 4K Ultra-HD panorama of the ancient Bundela Cenotaphs (Chhatris) across the mist and waters of River Betwa at golden sunrise",
    src: "/images/resort/hero/hero-aerial-chhatris-river.jpg",
    aspectRatio: "16:9",
    width: 3840,
    height: 2865,
    alt: "Golden sunrise over River Betwa with morning mist and the monumental 14 Royal Cenotaphs in Orchha",
    isStagingPlaceholder: false,
    targetPlacement: "Homepage Hero Section (Mobile)",
    replacementFileName: "hero-aerial-chhatris-river.jpg",
  },

  // Accommodations (50 Rooms Verified Inventory)
  roomStandard: {
    id: "room-standard",
    category: "rooms",
    title: "Standard Room",
    description: "Comfortable room interior featuring twin beds, polished Pietra Dura marble floor inlay, handcrafted wooden headboard, and dressing vanity",
    src: "/images/resort/curated/rooms/room-standard-twin-garden.jpg",
    aspectRatio: "4:3",
    width: 2048,
    height: 1528,
    alt: "Standard Room with twin beds and marble floor inlay at The Orchha Resort",
    isStagingPlaceholder: false,
    targetPlacement: "Our Rooms Showcase — Standard Room Category",
    replacementFileName: "room-standard-twin-garden.jpg",
  },
  roomDeluxe: {
    id: "room-deluxe",
    category: "rooms",
    title: "Deluxe Room",
    description: "Deluxe room featuring handcrafted carved white marble bed with royal canopy drapes, Pietra Dura marble coffee table, and polished marble floors",
    src: "/images/resort/curated/rooms/room-deluxe-marble-bed-interior.jpg",
    aspectRatio: "4:3",
    width: 2048,
    height: 1528,
    alt: "Deluxe Room bedroom with carved marble bed and canopy at The Orchha Resort",
    isStagingPlaceholder: false,
    targetPlacement: "Our Rooms Showcase — Deluxe Room Category",
    replacementFileName: "room-deluxe-marble-bed-interior.jpg",
  },

  // Amenities & Dining
  lotusPool: {
    id: "lotus-pool",
    category: "amenities",
    title: "Lotus-Shaped Swimming Pool",
    description: "Signature blooming lotus-silhouette pool with kids petal pool and sun deck loungers",
    src: "/images/resort/curated/pool/pool-lotus-twilight-glow.jpg",
    aspectRatio: "16:9",
    width: 1600,
    height: 900,
    alt: "Lotus shaped outdoor swimming pool at twilight",
    isStagingPlaceholder: false,
    targetPlacement: "Signature Amenities Section",
    replacementFileName: "pool-lotus-twilight-glow.jpg",
  },
  kalevaDining: {
    id: "kaleva-dining",
    category: "dining",
    title: "Kaleva Multi-Cuisine Restaurant",
    description: "Hand-carved sandstone pillar capitals depicting celestial Bundelkhand Apsaras in Kaleva Restaurant",
    src: "/images/resort/curated/dining/dining-kaleva-interior-apsara.jpg",
    aspectRatio: "16:9",
    width: 1080,
    height: 1920,
    alt: "Kaleva restaurant interior with hand-carved stone pillars",
    isStagingPlaceholder: false,
    targetPlacement: "Culinary & Dining Section",
    replacementFileName: "dining-kaleva-interior-apsara.jpg",
  },
  ayurvedaSpa: {
    id: "ayurveda-spa",
    category: "amenities",
    title: "Kairali Ayurveda Rejuvenation Spa",
    description: "Authentic herbal massage treatment room and herbal steam bath sanctuary",
    src: "/images/resort/curated/spa/spa-ayurvedic-treatment-sanctuary.jpg",
    aspectRatio: "4:3",
    width: 1600,
    height: 2133,
    alt: "Kairali Ayurvedic therapy sanctuary at The Orchha Resort",
    isStagingPlaceholder: false,
    targetPlacement: "Ayurveda Wellness Section",
    replacementFileName: "spa-ayurvedic-treatment-sanctuary.jpg",
  },
  spaHero: {
    id: "spa-hero",
    category: "amenities",
    title: "Serene Ayurvedic Sanctuary",
    description: "Calming therapy sanctuary prepared with warm golden illumination for Ayurvedic wellness treatments",
    src: "/images/resort/curated/spa/spa-ayurvedic-treatment-sanctuary.jpg",
    aspectRatio: "16:9",
    width: 1600,
    height: 2133,
    alt: "Serene luxury wellness sanctuary with ambient warm lighting",
    isStagingPlaceholder: false,
    targetPlacement: "Dedicated Spa Page Hero (/spa)",
    replacementFileName: "spa-ayurvedic-treatment-sanctuary.jpg",
  },
  spaShirodhara: {
    id: "spa-shirodhara",
    category: "amenities",
    title: "Traditional Kairali Shirodhara Therapy",
    description: "Resort reception feature displaying the official Kairali Ayurvedic Spa banner highlighting authentic Shirodhara treatments",
    src: "/images/resort/curated/spa/spa-kairali-welcome-banner.jpg",
    aspectRatio: "4:3",
    width: 1080,
    height: 1920,
    alt: "Official Kairali Spa welcome banner at The Orchha Resort",
    isStagingPlaceholder: false,
    targetPlacement: "Spa Treatments Showcase — Shirodhara Card",
    replacementFileName: "spa-kairali-welcome-banner.jpg",
  },
  spaSteamBath: {
    id: "spa-steam-bath",
    category: "amenities",
    title: "Swedana Herbal Steam Chamber & Wellness Corridor",
    description: "Tranquil corridor leading to the wellness therapy and Ayurvedic treatment rooms",
    src: "/images/resort/curated/spa/spa-heritage-wellness-corridor.jpg",
    aspectRatio: "4:3",
    width: 1080,
    height: 1920,
    alt: "Heritage wellness corridor leading to therapy suites",
    isStagingPlaceholder: false,
    targetPlacement: "Spa Facilities Showcase — Herbal Steam Bath",
    replacementFileName: "spa-heritage-wellness-corridor.jpg",
  },
  spaHerbs: {
    id: "spa-herbs",
    category: "amenities",
    title: "Riverside Garden Wellness Setting",
    description: "Fresh botanicals and river breeze along the private Betwa riverfront",
    src: "/images/resort/curated/dining/dining-riverfront-alfresco.jpg",
    aspectRatio: "4:3",
    width: 1564,
    height: 878,
    alt: "Riverside wellness setting along the Betwa River",
    isStagingPlaceholder: false,
    targetPlacement: "Spa Philosophy & Editorial Storytelling",
    replacementFileName: "dining-riverfront-alfresco.jpg",
  },
  chhatrisHeritage: {
    id: "chhatris-heritage",
    category: "heritage",
    title: "Historical 14 Royal Chhatris Reflected in Betwa",
    description: "Sony Alpha DSLR perspective of the 14 Royal Chhatris reflected in the calm waters of Kanchan Ghat",
    src: "/images/resort/curated/heritage/heritage-chhatris-reflection-river.jpg",
    aspectRatio: "16:9",
    width: 1600,
    height: 2400,
    alt: "14 Royal Cenotaphs reflected in River Betwa at Kanchan Ghat",
    isStagingPlaceholder: false,
    targetPlacement: "Heritage & Location Guide Section",
    replacementFileName: "heritage-chhatris-reflection-river.jpg",
  },
  heritageGeographyHero: {
    id: "heritage-geography-hero",
    category: "heritage",
    title: "Poolside Sanctuary Overlooking Ancient Chhatris",
    description: "Vibrant golden-hour atmosphere by the lotus pool with resort guests enjoying cocktails against the backdrop of Orchha's historic spires",
    src: "/images/resort/curated/heritage/heritage-geography-poolside-hero.jpg",
    aspectRatio: "16:9",
    width: 2560,
    height: 1706,
    alt: "Poolside relaxation at The Orchha Resort overlooking the ancient Chhatris",
    isStagingPlaceholder: false,
    targetPlacement: "The Heritage Geography of Orchha Interactive Cartographic Finale Hero",
    replacementFileName: "heritage-geography-poolside-hero.jpg",
  },
};
