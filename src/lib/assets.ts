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
    title: "The Orchha Resort Aerial River Panorama & Royal Cenotaphs at Golden Hour",
    description: "Breathtaking aerial panorama of The Orchha Resort along the Betwa River with the 14 Royal Chhatris in the evening golden light",
    src: "/images/resort/hero/hero-aerial-chhatris-river.jpg",
    aspectRatio: "16:9",
    width: 1024,
    height: 576,
    alt: "Aerial panorama of The Orchha Resort nestled along the Betwa River with the 14 Royal Cenotaphs at golden hour",
    isStagingPlaceholder: false,
    targetPlacement: "Homepage Hero Section (Desktop)",
    replacementFileName: "hero-aerial-chhatris-river.jpg",
  },
  heroMobile: {
    id: "hero-mobile",
    category: "hero",
    title: "The Orchha Resort Aerial River Panorama & Royal Cenotaphs at Golden Hour",
    description: "Breathtaking aerial panorama of The Orchha Resort along the Betwa River with the 14 Royal Chhatris in the evening golden light",
    src: "/images/resort/hero/hero-aerial-chhatris-river.jpg",
    aspectRatio: "16:9",
    width: 1024,
    height: 576,
    alt: "Aerial panorama of The Orchha Resort nestled along the Betwa River with the 14 Royal Cenotaphs at golden hour",
    isStagingPlaceholder: false,
    targetPlacement: "Homepage Hero Section (Mobile)",
    replacementFileName: "hero-aerial-chhatris-river.jpg",
  },

  // Accommodations (50 Rooms Verified Inventory)
  roomStandard: {
    id: "room-standard",
    category: "rooms",
    title: "Standard Room Garden Facing",
    description: "Comfortable room interior featuring polished Pietra Dura marble floor inlay, handcrafted headboard, and king bed",
    src: "/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg",
    aspectRatio: "4:3",
    width: 1600,
    height: 2844,
    alt: "Standard Room Garden Facing bedroom interior with king bed and marble floor",
    isStagingPlaceholder: false,
    targetPlacement: "Our Rooms Showcase — Standard Room Garden Facing Category",
    replacementFileName: "room-deluxe-interior-panoramic.jpg",
  },
  roomDeluxe: {
    id: "room-deluxe",
    category: "rooms",
    title: "Deluxe Marble Bed Garden Facing",
    description: "Deluxe room with handcrafted marble bed, gold damask runner, Rajasthani diwan seating, and picture window overlooking the resort grounds",
    src: "/images/resort/curated/rooms/room-deluxe-king-pool-view.jpg",
    aspectRatio: "4:3",
    width: 1600,
    height: 2844,
    alt: "Deluxe Marble Bed Garden Facing room at The Orchha Resort",
    isStagingPlaceholder: false,
    targetPlacement: "Our Rooms Showcase — Deluxe Marble Bed Garden Facing Category",
    replacementFileName: "room-deluxe-king-pool-view.jpg",
  },
  roomSwissTent: {
    id: "room-swiss-tent",
    category: "rooms",
    title: "Deluxe Room Garden Facing",
    description: "Garden accommodation featuring insulated canvas walls, traditional Bundelkhand floral block print, double bed, and timber flooring",
    src: "/images/resort/curated/rooms/room-tent-interior-canopy.jpg",
    aspectRatio: "4:3",
    width: 1600,
    height: 2844,
    alt: "Deluxe Room Garden Facing accommodation in lush orchard setting",
    isStagingPlaceholder: false,
    targetPlacement: "Our Rooms Showcase — Deluxe Room Garden Facing Category",
    replacementFileName: "room-tent-interior-canopy.jpg",
  },
  roomSuite: {
    id: "room-suite",
    category: "rooms",
    title: "Super Deluxe Pool Facing",
    description: "Spacious salon of the Super Deluxe suite with carved wood diwan, upholstered seating, and panoramic views",
    src: "/images/resort/curated/rooms/room-suite-heritage-living.jpg",
    aspectRatio: "4:3",
    width: 1600,
    height: 2844,
    alt: "Super Deluxe Pool Facing accommodation with panoramic views and heritage decor",
    isStagingPlaceholder: false,
    targetPlacement: "Our Rooms Showcase — Super Deluxe Pool Facing Category",
    replacementFileName: "room-suite-heritage-living.jpg",
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
};
