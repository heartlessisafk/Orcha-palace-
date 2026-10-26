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
    title: "Orchha Resort Lotus Pool & Heritage Facade at Twilight",
    description: "Panoramic view of the blooming lotus pool and illuminated palace wings",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2880&q=85",
    aspectRatio: "16:9",
    width: 2880,
    height: 1620,
    alt: "The Orchha Resort panoramic grounds and illuminated pool at dusk (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Homepage Hero Section (Desktop)",
    replacementFileName: "IMG-01-hero-exterior-lotus-pool.webp",
  },
  heroMobile: {
    id: "hero-mobile",
    category: "hero",
    title: "Betwa River & Heritage Cenotaphs Vertical Crop",
    description: "Dramatic vertical view of the river boulders and ancient Chhatris",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1080&q=85",
    aspectRatio: "9:16",
    width: 1080,
    height: 1920,
    alt: "Royal Chhatris along the Betwa River (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Homepage Hero Section (Mobile)",
    replacementFileName: "IMG-02-hero-mobile-chhatris.webp",
  },

  // Accommodations (32 Rooms Verified Inventory)
  roomStandard: {
    id: "room-standard",
    category: "rooms",
    title: "Standard Heritage Room",
    description: "Garden-view comfortable heritage room with marble ensuite bath",
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Standard Heritage Room bedroom interior (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Our Rooms Showcase — Standard Category",
    replacementFileName: "IMG-05-standard-room-interior.webp",
  },
  roomDeluxe: {
    id: "room-deluxe",
    category: "rooms",
    title: "Deluxe Marble Room",
    description: "Spacious pool-facing room with polished Indian marble and teakwood furniture",
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Deluxe Marble Room with sitting area and pool view (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Our Rooms Showcase — Deluxe Category",
    replacementFileName: "IMG-04-deluxe-room-interior.webp",
  },
  roomSwissTent: {
    id: "room-swiss-tent",
    category: "rooms",
    title: "Deluxe AC Swiss Tent",
    description: "Luxury canvas glamping nestled in green orchards overlooking the Chhatris",
    src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Luxury AC Swiss Tent in riverside gardens (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Our Rooms Showcase — Swiss Tent Glamping Category",
    replacementFileName: "IMG-06-swiss-tent-exterior.webp",
  },
  roomSuite: {
    id: "room-suite",
    category: "rooms",
    title: "Royal Heritage Suite",
    description: "Expansive suite with master bedroom, private parlor, and panoramic Betwa river balcony",
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Royal Heritage Suite with river views (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Our Rooms Showcase — Royal Suite Category",
    replacementFileName: "IMG-08-heritage-suite-interior.webp",
  },

  // Amenities & Dining
  lotusPool: {
    id: "lotus-pool",
    category: "amenities",
    title: "Lotus-Shaped Swimming Pool",
    description: "Iconic lotus-silhouette pool with kids pool and sun deck loungers",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "16:9",
    width: 1920,
    height: 1080,
    alt: "Lotus shaped outdoor swimming pool (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Signature Amenities Section",
    replacementFileName: "IMG-10-lotus-pool-deck.webp",
  },
  kalevaDining: {
    id: "kaleva-dining",
    category: "dining",
    title: "Kaleva Multi-Cuisine Restaurant",
    description: "Traditional royal dining hall serving Bundelkhandi specialties and world cuisine",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "16:9",
    width: 1920,
    height: 1080,
    alt: "Kaleva restaurant interior with warm ambient illumination (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Culinary & Dining Section",
    replacementFileName: "IMG-12-kaleva-restaurant-hall.webp",
  },
  ayurvedaSpa: {
    id: "ayurveda-spa",
    category: "amenities",
    title: "Kerala Ayurveda Rejuvenation Spa",
    description: "Authentic herbal massage treatment room and herbal steam bath suite",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Ayurvedic therapy massage suite with brass oils (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Ayurveda Wellness Section",
    replacementFileName: "IMG-17-ayurveda-spa-suite.webp",
  },
  spaHero: {
    id: "spa-hero",
    category: "amenities",
    title: "Serene Ayurvedic Sanctuary & Brass Oils",
    description: "Immersive tranquil retreat atmosphere with warm teakwood, brass lamps, and traditional linens",
    src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=2880&q=85",
    aspectRatio: "16:9",
    width: 2880,
    height: 1620,
    alt: "Serene luxury wellness sanctuary with ambient warm lighting (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Dedicated Spa Page Hero (/spa)",
    replacementFileName: "IMG-17-spa-hero-sanctuary.webp",
  },
  spaShirodhara: {
    id: "spa-shirodhara",
    category: "amenities",
    title: "Traditional Shirodhara Therapy",
    description: "Continuous rhythmic stream of warm herbal oil poured onto the third-eye chakra",
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Ayurvedic Shirodhara brass vessel and warm herbal oil therapy (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Spa Treatments Showcase — Shirodhara Card",
    replacementFileName: "IMG-18-spa-shirodhara-treatment.webp",
  },
  spaSteamBath: {
    id: "spa-steam-bath",
    category: "amenities",
    title: "Swedana Herbal Steam Chamber",
    description: "Traditional herbal steam cabinet for full-body toxin elimination and circulation",
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Herbal steam bath and massage therapy room (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Spa Facilities Showcase — Herbal Steam Bath",
    replacementFileName: "IMG-18-spa-steam-bath.webp",
  },
  spaHerbs: {
    id: "spa-herbs",
    category: "amenities",
    title: "Medicinal Ayurvedic Herbs & Natural Poultice",
    description: "Fresh botanicals, crushed medicinal leaves, and warm medicated massage oils",
    src: "https://images.unsplash.com/photo-1512290900672-1f558a38c4bb?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    alt: "Ayurvedic herbal ingredients, oils, and brass bowls (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Spa Philosophy & Editorial Storytelling",
    replacementFileName: "IMG-19-spa-herbs-ingredients.webp",
  },
  chhatrisHeritage: {
    id: "chhatris-heritage",
    category: "heritage",
    title: "Historical 14 Royal Chhatris",
    description: "17th-century multi-storied cenotaphs of Bundela kings along the Betwa River",
    src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "16:9",
    width: 1920,
    height: 1080,
    alt: "14 Royal Cenotaphs of Orchha at golden hour (Staging Composition)",
    isStagingPlaceholder: true,
    targetPlacement: "Heritage & Location Guide Section",
    replacementFileName: "IMG-23-orchha-chhatris-riverbank.webp",
  },
};
