import { RoomDetails } from "@/types/room";

/**
 * Official Room Categories & Verified Photography for The Orchha Resort.
 * Sourced directly from official Google Drive folders:
 * 1. Deluxe garden view king bed (3 photos)
 * 2. Deluxe garden view twin bed (5 photos)
 * 3. Deluxe marble bed (3 photos)
 * 4. Standard bed (4 photos)
 * 5. Super deluxe pool view (4 photos)
 *
 * Strict Rule: Each category contains strictly and exclusively the photographs
 * from its corresponding Google Drive folder.
 */
export const VERIFIED_ROOMS: RoomDetails[] = [
  {
    id: "deluxe-garden-view-king-bed",
    category: "deluxe-garden-view-king-bed",
    name: "Deluxe garden view king bed",
    tagline: "Serene garden sanctuary with king-size heritage comfort",
    description:
      "Spacious and peaceful, the Deluxe garden view king bed room offers lush garden vistas, an expansive king-size bed, handcrafted furnishings, and modern climate control for an unhurried heritage stay.",
    startingPriceInr: 6000,
    areaSqFt: 280,
    bedType: "1 King Bed",
    maxOccupancy: {
      adults: 2,
      children: 1,
    },
    views: ["Landscaped Gardens", "Quiet Courtyard"],
    keyAmenities: [
      "Garden View Windows",
      "Climate Air-Conditioning",
      "Ensuite Marble Bathroom",
      "High-speed Wi-Fi",
      "LED Satellite TV",
      "Tea & Coffee Maker",
      "Mini-bar Refrigerator",
      "24-Hour Room Service",
    ],
    imageKey: "roomDeluxeGardenKing",
    inventoryNote: "Official Category 1 — Google Drive",
    badge: "Garden View",
    features: [
      "Lush garden outlook through large casement windows",
      "Expansive king-size bed with crisp luxury linens",
      "Pietra Dura marble flooring with handcrafted accents",
      "Ensuite marble bathroom with walk-in hot shower",
      "Dedicated work table and beverage refreshment center",
    ],
    specs: [
      { label: "Room Size", value: "280 sq ft (26 m²)" },
      { label: "Bed Configuration", value: "1 King Bed" },
      { label: "Maximum Guests", value: "2 Adults + 1 Child" },
      { label: "View Perspective", value: "Lush Landscaped Gardens" },
      { label: "Flooring", value: "Polished Indian White Marble" },
      { label: "Climate Control", value: "Individual Remote Air-Conditioning" },
    ],
    gallery: [
      {
        src: "/images/rooms/deluxe-garden-view-king-bed/modern-hotel-bedroom-with-garden-view.png",
        alt: "Modern Hotel Bedroom with Garden View - Deluxe garden view king bed",
        caption: "Modern Hotel Bedroom with Garden View",
      },
      {
        src: "/images/rooms/deluxe-garden-view-king-bed/modern-hotel-room-with-floral-bed-accents.png",
        alt: "Modern Hotel Room with Floral Bed Accents - Deluxe garden view king bed",
        caption: "Modern Hotel Room with Floral Bed Accents",
      },
      {
        src: "/images/rooms/deluxe-garden-view-king-bed/warm-neutral-modern-hotel-room.png",
        alt: "Warm Neutral Modern Hotel Room - Deluxe garden view king bed",
        caption: "Warm Neutral Modern Hotel Room",
      },
    ],
  },
  {
    id: "deluxe-garden-view-twin-bed",
    category: "deluxe-garden-view-twin-bed",
    name: "Deluxe garden view twin bed",
    tagline: "Bright and spacious twin-bed retreat overlooking tranquil flora",
    description:
      "Ideal for companions and families traveling together, this bright accommodation features two comfortable twin beds, peaceful perspectives of the resort gardens and historic temple spires, and complete modern hospitality.",
    startingPriceInr: 6000,
    areaSqFt: 280,
    bedType: "2 Twin Beds",
    maxOccupancy: {
      adults: 2,
      children: 1,
    },
    views: ["Lush Courtyard Gardens", "Historic Temple Spire"],
    keyAmenities: [
      "Two Twin Beds",
      "Garden & Courtyard Views",
      "Climate Air-Conditioning",
      "Ensuite Marble Bathroom",
      "High-speed Wi-Fi",
      "LED Satellite TV",
      "Daily Tea Service",
      "Electronic Safe",
    ],
    imageKey: "roomDeluxeGardenTwin",
    inventoryNote: "Official Category 2 — Google Drive",
    badge: "Garden Twin",
    features: [
      "Two separate plush twin beds with individual reading illumination",
      "Courtyard garden perspective framing historic temple spires",
      "Polished marble floor with handcrafted teak bedside tables",
      "Spacious ensuite vanity with walk-in hot shower",
      "In-room tea/coffee station and electronic safety locker",
    ],
    specs: [
      { label: "Room Size", value: "280 sq ft (26 m²)" },
      { label: "Bed Configuration", value: "2 Twin Beds" },
      { label: "Maximum Guests", value: "2 Adults + 1 Child" },
      { label: "View Perspective", value: "Courtyard & Historic Temple Spire" },
      { label: "Flooring", value: "Polished Indian White Marble" },
      { label: "Climate Control", value: "Individual Remote Air-Conditioning" },
    ],
    gallery: [
      {
        src: "/images/rooms/deluxe-garden-view-twin-bed/bright-modern-twin-bed-hotel-room.png",
        alt: "Bright Modern Twin-Bed Hotel Room - Deluxe garden view twin bed",
        caption: "Bright Modern Twin-Bed Hotel Room",
      },
      {
        src: "/images/rooms/deluxe-garden-view-twin-bed/bright-twin-bed-hotel-room-retreat.png",
        alt: "Bright Twin-Bed Hotel Room Retreat - Deluxe garden view twin bed",
        caption: "Bright Twin-Bed Hotel Room Retreat",
      },
      {
        src: "/images/rooms/deluxe-garden-view-twin-bed/lush-courtyard-guesthouse-with-temple-spire.png",
        alt: "Lush Courtyard Guesthouse with Temple Spire - Deluxe garden view twin bed",
        caption: "Lush Courtyard Guesthouse with Temple Spire",
      },
      {
        src: "/images/rooms/deluxe-garden-view-twin-bed/modern-twin-room-with-garden-view.png",
        alt: "Modern Twin Room with Garden View - Deluxe garden view twin bed",
        caption: "Modern Twin Room with Garden View",
      },
      {
        src: "/images/rooms/deluxe-garden-view-twin-bed/neat-twin-beds-in-a-modern-hotel-room.png",
        alt: "Neat Twin Beds in a Modern Hotel Room - Deluxe garden view twin bed",
        caption: "Neat Twin Beds in a Modern Hotel Room",
      },
    ],
  },
  {
    id: "deluxe-marble-bed",
    category: "deluxe-marble-bed",
    name: "Deluxe marble bed",
    tagline: "Classic luxury featuring handcrafted marble bed craftsmanship",
    description:
      "Distinguished by an iconic handcrafted marble bed with royal canopy drapes and polished marble floors, combining traditional Bundeli artistry with stately comfort.",
    startingPriceInr: 6500,
    areaSqFt: 300,
    bedType: "1 Handcrafted Marble King Bed",
    maxOccupancy: {
      adults: 2,
      children: 1,
    },
    views: ["Heritage Courtyard", "Manicured Lawns"],
    keyAmenities: [
      "Handcrafted White Marble Bed",
      "Canopy Bed Draping",
      "Pietra Dura Inlaid Coffee Table",
      "Polished Marble Bathroom",
      "Climate Air-Conditioning",
      "LED Satellite TV",
      "Complimentary High-speed Wi-Fi",
      "24-Hour Room Service",
    ],
    imageKey: "roomDeluxeMarble",
    badge: "Heritage Signature",
    inventoryNote: "Official Category 3 — Google Drive",
    features: [
      "Handcrafted royal white marble bed with decorative canopy draping",
      "Bespoke Pietra Dura floral marble inlay on flooring and table surfaces",
      "Heritage courtyard and manicured lawn perspectives",
      "Deep marble counter vanity with premium herbal bath amenities",
      "Bespoke handcrafted Bundelkhandi teak furniture pieces",
    ],
    specs: [
      { label: "Room Size", value: "300 sq ft (28 m²)" },
      { label: "Bed Configuration", value: "1 Handcrafted Marble King Bed" },
      { label: "Maximum Guests", value: "2 Adults + 1 Child" },
      { label: "View Perspective", value: "Heritage Courtyard & Lawns" },
      { label: "Flooring", value: "Polished Indian White Marble with Inlay" },
      { label: "Climate Control", value: "Individual Remote Air-Conditioning" },
    ],
    gallery: [
      {
        src: "/images/rooms/deluxe-marble-bed/classic-luxury-bedroom-interior.png",
        alt: "Classic Luxury Bedroom Interior - Deluxe marble bed",
        caption: "Classic Luxury Bedroom Interior",
      },
      {
        src: "/images/rooms/deluxe-marble-bed/elegant-classic-hotel-bedroom.png",
        alt: "Elegant Classic Hotel Bedroom - Deluxe marble bed",
        caption: "Elegant Classic Hotel Bedroom",
      },
      {
        src: "/images/rooms/deluxe-marble-bed/elegant-traditional-hotel-room.png",
        alt: "Elegant Traditional Hotel Room - Deluxe marble bed",
        caption: "Elegant Traditional Hotel Room",
      },
    ],
  },
  {
    id: "standard-bed",
    category: "standard-bed",
    name: "Standard bed",
    tagline: "Timeless heritage room with warm tones and classic hospitality",
    description:
      "Comfortable and elegantly appointed, our Standard bed accommodations offer warm neutral palettes, traditional wood accents, climate control, and full ensuite amenities for a peaceful stay.",
    startingPriceInr: 4500,
    areaSqFt: 225,
    bedType: "1 Comfortable Double Bed",
    maxOccupancy: {
      adults: 2,
      children: 1,
    },
    views: ["Quiet Courtyard", "Inner Garden"],
    keyAmenities: [
      "Comfortable Bedding",
      "Climate Air-Conditioning",
      "Ensuite Bathroom with 24-hr Hot Water",
      "Satellite LED TV",
      "High-speed Wi-Fi",
      "Tea & Coffee Station",
      "Electronic Vault",
      "Daily Housekeeping",
    ],
    imageKey: "roomStandardBed",
    badge: "Classic Comfort",
    inventoryNote: "Official Category 4 — Google Drive",
    features: [
      "Warm-toned interior styling with handcrafted wooden headboard",
      "Quiet inner courtyard perspective ensuring undisturbed sleep",
      "White marble flooring with subtle floral Pietra Dura inlay",
      "Ensuite bathroom with hot shower and natural Ayurvedic soaps",
      "Convenient digital safe and bedside charging ports",
    ],
    specs: [
      { label: "Room Size", value: "225 sq ft (21 m²)" },
      { label: "Bed Configuration", value: "1 Double Bed" },
      { label: "Maximum Guests", value: "2 Adults + 1 Child" },
      { label: "View Perspective", value: "Quiet Courtyard & Garden" },
      { label: "Flooring", value: "Polished Indian White Marble" },
      { label: "Climate Control", value: "Individual Remote Air-Conditioning" },
    ],
    gallery: [
      {
        src: "/images/rooms/standard-bed/classic-beige-hotel-bedroom-interior.png",
        alt: "Classic Beige Hotel Bedroom Interior - Standard bed",
        caption: "Classic Beige Hotel Bedroom Interior",
      },
      {
        src: "/images/rooms/standard-bed/classic-warm-toned-hotel-bedroom.png",
        alt: "Classic Warm-Toned Hotel Bedroom - Standard bed",
        caption: "Classic Warm-Toned Hotel Bedroom",
      },
      {
        src: "/images/rooms/standard-bed/elegant-cream-and-gold-hotel-room.png",
        alt: "Elegant Cream-and-Gold Hotel Room - Standard bed",
        caption: "Elegant Cream-and-Gold Hotel Room",
      },
      {
        src: "/images/rooms/standard-bed/elegant-warmly-lit-hotel-suite.png",
        alt: "Elegant Warmly Lit Hotel Suite - Standard bed",
        caption: "Elegant Warmly Lit Hotel Suite",
      },
    ],
  },
  {
    id: "super-deluxe-pool-view",
    category: "super-deluxe-pool-view",
    name: "Super deluxe pool view",
    tagline: "Prime architectural outlook over the blooming lotus pool",
    description:
      "Our premier accommodation framing direct vistas of the illuminated lotus swimming pool through ornate heritage windows, complete with refined marble styling, sitting lounge area, and spacious luxury.",
    startingPriceInr: 7500,
    areaSqFt: 340,
    bedType: "1 King Bed",
    maxOccupancy: {
      adults: 3,
      children: 1,
    },
    views: ["Lotus Pool", "Central Courtyard"],
    keyAmenities: [
      "Direct Lotus Pool View",
      "Expansive Sitting Lounge",
      "Premium Marble Bathroom",
      "Ayurvedic Herbal Toiletries",
      "Satellite LED Media Station",
      "Mini-bar Refrigerator",
      "Complimentary High-speed Wi-Fi",
      "Express 24-Hour Room Service",
    ],
    imageKey: "roomSuperDeluxePool",
    badge: "Premier Pool View",
    inventoryNote: "Official Category 5 — Google Drive",
    features: [
      "Panoramic picture window directly framing the central lotus-shaped pool",
      "Spacious open sitting area with Rajasthani diwan and silk cushions",
      "Custom gold damask bed drapery and high-thread-count Egyptian cotton linens",
      "Ensuite marble bathroom with deep soaking tub and shower",
      "Complimentary daily mineral water and Bundeli herbal tea service",
    ],
    specs: [
      { label: "Room Size", value: "340 sq ft (32 m²)" },
      { label: "Bed Configuration", value: "1 King Bed" },
      { label: "Maximum Guests", value: "3 Adults + 1 Child" },
      { label: "View Perspective", value: "Lotus Swimming Pool & Courtyard" },
      { label: "Flooring", value: "Imported Indian Marble with Inlay" },
      { label: "Balcony / Outlook", value: "Large Bay Picture Window" },
    ],
    gallery: [
      {
        src: "/images/rooms/super-deluxe-pool-view/bright-hotel-bedroom-with-pool-view.png",
        alt: "Bright Hotel Bedroom with Pool View - Super deluxe pool view",
        caption: "Bright Hotel Bedroom with Pool View",
      },
      {
        src: "/images/rooms/super-deluxe-pool-view/elegant-cream-and-marble-hotel-room.png",
        alt: "Elegant Cream and Marble Hotel Room - Super deluxe pool view",
        caption: "Elegant Cream and Marble Hotel Room",
      },
      {
        src: "/images/rooms/super-deluxe-pool-view/elegant-warm-toned-hotel-room-interior.png",
        alt: "Elegant Warm-Toned Hotel Room Interior - Super deluxe pool view",
        caption: "Elegant Warm-Toned Hotel Room Interior",
      },
      {
        src: "/images/rooms/super-deluxe-pool-view/sunlit-poolside-courtyard-through-ornate-windows.png",
        alt: "Sunlit Poolside Courtyard Through Ornate Windows - Super deluxe pool view",
        caption: "Sunlit Poolside Courtyard Through Ornate Windows",
      },
    ],
  },
];
