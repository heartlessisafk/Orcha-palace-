/**
 * Dedicated Asset Registry for the Heritage About Page (/about).
 *
 * RESEARCH & AUTHENTICITY INTEGRITY:
 * All images under `GENUINE_RESORT_ASSETS` are authentic photographs of The Orchha Resort
 * downloaded directly from the official property website (`orchharesort.com`).
 * Destination monument photographs are strictly categorized under `DESTINATION_MONUMENT_ASSETS`
 * and clearly designated as historic landmarks of Orchha rather than resort buildings.
 */

export interface HeritageAsset {
  id: string;
  category: "resort" | "monument";
  title: string;
  description: string;
  src: string;
  originalUrl: string;
  width: number;
  height: number;
  alt: string;
  isGenuineResort: boolean;
  section: string;
}

export const ABOUT_HERITAGE_ASSETS: Record<string, HeritageAsset> = {
  // 1. Cinematic Hero — Resort Entrance & Evening Pavilions
  heroPavilions: {
    id: "hero-pavilions",
    category: "resort",
    title: "Panoramic Aerial Sunset of The Orchha Resort and Royal Cenotaphs",
    description: "Breathtaking high-altitude sunset panorama capturing The Orchha Resort along the Betwa River directly facing the 14 historic Royal Chhatris",
    src: "/images/resort/curated/aerial/aerial-resort-chhatris-sunset-panorama.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/slides/slide1.jpg",
    width: 2560,
    height: 1450,
    alt: "Aerial sunset panorama of The Orchha Resort and the 14 Royal Chhatris on the Betwa River",
    isGenuineResort: true,
    section: "Section A: Cinematic Opening",
  },

  // 2. The Place Beside the Betwa — Facade & Lawns
  riverSetting: {
    id: "river-setting",
    category: "resort",
    title: "Resort Facade & Riverfront Lawns",
    description: "Panoramic view of The Orchha Resort nestled beside the Betwa River at Kanchanghat",
    src: "/images/resort/genuine/slide2.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/slides/slide2.jpg",
    width: 1349,
    height: 600,
    alt: "Panoramic view of The Orchha Resort facade and manicured lawns at Kanchanghat",
    isGenuineResort: true,
    section: "Section B: The Place Beside the Betwa",
  },

  // 3. Garden Walkways
  gardenWalkways: {
    id: "garden-walkways",
    category: "resort",
    title: "Manicured Flora & Pathways",
    description: "Tree-shaded garden walkways within the zero-pollution riverfront property",
    src: "/images/resort/genuine/15.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/15.jpg",
    width: 900,
    height: 600,
    alt: "Tranquil tree-lined garden walkways at The Orchha Resort",
    isGenuineResort: true,
    section: "Section B: Riverfront Sanctuary",
  },

  // 4. Lotus-Shaped Swimming Pool
  lotusPool: {
    id: "lotus-pool",
    category: "resort",
    title: "Lotus-Shaped Swimming Pool",
    description: "The resort's central lotus-shaped outdoor pool surrounded by sun loungers and greenery",
    src: "/images/resort/genuine/swimming.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/swimming.jpg",
    width: 900,
    height: 600,
    alt: "Genuine Lotus-Shaped outdoor swimming pool at The Orchha Resort",
    isGenuineResort: true,
    section: "Section D: Architecture & Spaces",
  },

  // 5. Pool at Dusk
  poolDusk: {
    id: "pool-dusk",
    category: "resort",
    title: "Poolside Reflections at Twilight",
    description: "Warm lights reflecting across the lotus pool with resort architectural pavilions in the background",
    src: "/images/resort/genuine/slide4.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/slides/slide4.jpg",
    width: 1349,
    height: 600,
    alt: "The Orchha Resort swimming pool illuminated at dusk with terracotta pavilion reflections",
    isGenuineResort: true,
    section: "Section D: Architecture & Spaces",
  },

  // 6. Deluxe Swiss Tents
  swissTents: {
    id: "swiss-tents",
    category: "resort",
    title: "Deluxe Air-Conditioned Swiss Tents",
    description: "One of the 11 luxury AC Swiss tents nestled privately in the resort gardens",
    src: "/images/resort/genuine/g6.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/g6.jpg",
    width: 525,
    height: 350,
    alt: "Exterior view of luxury AC Swiss Tent in the gardens of The Orchha Resort",
    isGenuineResort: true,
    section: "Section D: Swiss Tents & Spaces",
  },

  // 7. Deluxe Guest Room Interior
  deluxeRoom: {
    id: "deluxe-room",
    category: "resort",
    title: "Deluxe Room Interior",
    description: "Tastefully appointed contemporary room interior designed with warm timber finishes",
    src: "/images/resort/genuine/13.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/13.jpg",
    width: 900,
    height: 600,
    alt: "Spacious Deluxe Room interior with contemporary woodwork at The Orchha Resort",
    isGenuineResort: true,
    section: "Section D: Accommodation",
  },

  // 8. Stone Baradari & Architectural Details
  architecturalDetails: {
    id: "architectural-details",
    category: "resort",
    title: "Courtyard Baradari & Stone Craft",
    description: "Pillared baradari pavilion and traditional stone courtyard detailing designed by Yogesh Chandra",
    src: "/images/resort/genuine/16.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/16.jpg",
    width: 900,
    height: 600,
    alt: "Traditional stone courtyard baradari and architectural details at The Orchha Resort",
    isGenuineResort: true,
    section: "Section D: Architectural Craft",
  },

  // 9. Kaleva Restaurant
  kalevaDining: {
    id: "kaleva-dining",
    category: "resort",
    title: "Kaleva Multi-Cuisine Restaurant",
    description: "The elegant interior dining hall of Kaleva offering Indian, Continental, and Chinese cuisine",
    src: "/images/resort/genuine/kaleva.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/kaleva.jpg",
    width: 900,
    height: 600,
    alt: "Kaleva Multi-Cuisine Restaurant dining hall at The Orchha Resort",
    isGenuineResort: true,
    section: "Section E: Hospitality & Kaleva",
  },

  // 9b. Betwa View Dining (Riverside Dining)
  betwaViewDining: {
    id: "betwa-view-dining",
    category: "resort",
    title: "Betwa View Dining",
    description: "An inviting riverside dining experience overlooking the tranquil waters of the Betwa, where guests can enjoy memorable meals surrounded by the natural beauty of Orchha",
    src: "/images/resort/curated/dining/dining-riverfront-alfresco.jpg",
    originalUrl: "/images/resort/curated/dining/dining-riverfront-alfresco.jpg",
    width: 1564,
    height: 878,
    alt: "Betwa View Dining al fresco table setting overlooking River Betwa at The Orchha Resort",
    isGenuineResort: true,
    section: "Section E: Hospitality & Dining",
  },

  // 10. Ayurveda Spa Room
  ayurvedaSpaRoom: {
    id: "ayurveda-spa-room",
    category: "resort",
    title: "Ayurveda Wellness Therapy Suite",
    description: "Dedicated Kerala Ayurveda therapy room with traditional Shirodhara setup",
    src: "/images/resort/genuine/spa2.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/spa2.jpg",
    width: 900,
    height: 600,
    alt: "Ayurveda Spa therapy suite at The Orchha Resort",
    isGenuineResort: true,
    section: "Section E: Wellness & Recreation",
  },

  // 11. Riverside Tennis & Sports
  riversideSports: {
    id: "riverside-sports",
    category: "resort",
    title: "Riverside Tennis & Badminton Court",
    description: "Outdoor sports court situated along the resort grounds bordering the river",
    src: "/images/resort/genuine/tennis.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/tennis.jpg",
    width: 900,
    height: 600,
    alt: "Outdoor tennis court on the grounds of The Orchha Resort",
    isGenuineResort: true,
    section: "Section E: Recreation",
  },

  // 12. Historic 14 Chhatris on Kanchan Ghat (Destination Landmark)
  historicChhatris: {
    id: "historic-chhatris",
    category: "monument",
    title: "14 Royal Cenotaphs (Kanchan Ghat)",
    description: "17th-century memorials to Bundela kings rising along the riverbank opposite Kanchanghat viewed from the resort gardens",
    src: "/images/resort/curated/heritage/heritage-chhatris-garden-monument-view.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/chhatris.jpg",
    width: 2048,
    height: 1528,
    alt: "Historical 14 Royal Chhatris cenotaphs rising across the resort gardens and flora at Orchha",
    isGenuineResort: false,
    section: "Section C: The Spirit of Orchha",
  },

  // 13. Evening Banquet Courtyard
  banquetCourtyard: {
    id: "banquet-courtyard",
    category: "resort",
    title: "Evening Banquet & Cultural Courtyard",
    description: "Open-air evening lawn setup for traditional folk dance performances and private celebrations",
    src: "/images/resort/genuine/14.jpg",
    originalUrl: "https://www.orchharesort.com/system/images/14.jpg",
    width: 900,
    height: 600,
    alt: "Evening lawn setup for celebrations and folk dance at The Orchha Resort",
    isGenuineResort: true,
    section: "Section E: Evening Cultural Life",
  },
};
