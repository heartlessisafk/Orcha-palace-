import { RoomDetails } from "@/types/room";

/**
 * Verified Accommodation Data for The Orchha Resort.
 * Grounded in genuine property audit: 50 rooms total inventory, verified categories & amenities.
 * All photographs sourced strictly from authentic local curated repository.
 * Exactly two room categories:
 * 1. Standard Room (standard)
 * 2. Deluxe Room (deluxe)
 */
export const VERIFIED_ROOMS: RoomDetails[] = [
  {
    id: "standard-room",
    category: "standard",
    name: "Standard Room",
    tagline: "Serene garden retreat with traditional comforts",
    description:
      "Spacious and peaceful, our Standard accommodations offer serene garden views, comfortable king or twin bedding, handcrafted wood furnishings, Pietra Dura marble floor inlays, and an ensuite marble bathroom with 24-hour hot water.",
    startingPriceInr: 4500,
    areaSqFt: 225,
    bedType: "King Bed or Twin Beds",
    maxOccupancy: {
      adults: 2,
      children: 1,
    },
    views: ["Landscaped Gardens", "Quiet Courtyard"],
    keyAmenities: [
      "Climate Air-Conditioning",
      "Flat-screen Satellite TV",
      "High-speed Wi-Fi",
      "Tea & Coffee Maker",
      "Mini-bar Refrigerator",
      "Digital Safety Vault",
      "24-Hour Room Service",
      "Marble Ensuite Bathroom",
    ],
    imageKey: "roomStandard",
    inventoryNote: "25 Rooms in main heritage wing",
    badge: "Heritage Classic",
    features: [
      "Authentic Pietra Dura floral marble floor inlay",
      "Handcrafted Bundelkhandi teak headboard and side tables",
      "Garden-facing casement windows with sheer and blackout drapes",
      "Ensuite marble vanity with walk-in hot shower",
      "Dedicated writing desk and high-speed Wi-Fi connectivity",
    ],
    specs: [
      { label: "Room Size", value: "225 sq ft (21 m²)" },
      { label: "Bed Configuration", value: "1 King or 2 Twin Beds" },
      { label: "Maximum Guests", value: "2 Adults + 1 Child" },
      { label: "View Perspective", value: "Lush Inner Courtyard & Flora" },
      { label: "Flooring", value: "Polished Indian White Marble" },
      { label: "Climate Control", value: "Individual Remote Air-Conditioning" },
    ],
    gallery: [
      {
        src: "/images/resort/curated/rooms/room-standard-twin-garden.jpg",
        alt: "Standard Room with twin beds, handcrafted wooden headboard, and marble floor inlay",
        caption: "Comfortable twin bedroom with polished Indian white marble and handcrafted furnishings",
      },
      {
        src: "/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg",
        alt: "Standard Room bedroom interior with king bed and marble floor",
        caption: "Bedroom suite featuring polished Pietra Dura marble floor inlay",
      },
      {
        src: "/images/resort/curated/rooms/room-deluxe-media-station.jpg",
        alt: "Workstation, satellite TV, and beverage amenities in Standard Room",
        caption: "Workstation, LED satellite entertainment, and daily tea service",
      },
      {
        src: "/images/resort/curated/rooms/room-bathroom-marble-vanity.jpg",
        alt: "Ensuite polished marble bathroom vanity and walk-in shower",
        caption: "Ensuite polished white marble vanity with premium herbal bath amenities",
      },
      {
        src: "/images/resort/curated/architecture/architecture-lobby-ganesha.jpg",
        alt: "Sandstone carved Ganesha sculpture in the central heritage lobby corridor",
        caption: "Heritage architectural corridor leading to the ground-floor guest rooms",
      },
    ],
  },
  {
    id: "deluxe-room",
    category: "deluxe",
    name: "Deluxe Room",
    tagline: "Expansive luxury with handcrafted marble bed and garden tranquility",
    description:
      "Finished with polished Indian marble floors, handcrafted marble bed design, and bespoke Bundeli craftsmanship, Deluxe rooms feature an open sitting area, enhanced floor plans, and expansive picture windows overlooking the resort gardens and lotus pool.",
    startingPriceInr: 6000,
    areaSqFt: 280,
    bedType: "King-size Heritage Bed",
    maxOccupancy: {
      adults: 3,
      children: 1,
    },
    views: ["Landscaped Gardens", "Lotus Pool Deck"],
    keyAmenities: [
      "Lotus Pool View Picture Window",
      "Premium Marble Bathroom with Tub",
      "Luxury Ayurvedic Herbal Toiletries",
      "Satellite LED TV & Media Station",
      "Mini-bar & Electronic Safe",
      "Express 24-Hour Room Service",
      "Complimentary High-speed Wi-Fi",
      "Rajasthani Diwan Seating Corner",
    ],
    imageKey: "roomDeluxe",
    badge: "Most Popular",
    inventoryNote: "25 Rooms overlooking central pool deck",
    features: [
      "Panoramic picture window directly framing the lotus swimming pool",
      "Handcrafted wooden seating diwan with silk cushions",
      "Custom woven gold damask bed runners and high-thread-count Egyptian cotton linens",
      "Expansive marble ensuite bathroom with deep counter vanity",
      "Complimentary daily mineral water and Bundeli herbal tea station",
    ],
    specs: [
      { label: "Room Size", value: "280 sq ft (26 m²)" },
      { label: "Bed Configuration", value: "1 King-size Heritage Bed" },
      { label: "Maximum Guests", value: "3 Adults + 1 Child" },
      { label: "View Perspective", value: "Lush Landscaped Gardens & Pool Deck" },
      { label: "Flooring", value: "Imported Indian Marble with Inlay" },
      { label: "Balcony / Outlook", value: "Large Picture Bay Window" },
    ],
    gallery: [
      {
        src: "/images/resort/curated/rooms/room-deluxe-marble-bed-interior.jpg",
        alt: "Deluxe Room bedroom with handcrafted carved marble bed and canopy",
        caption: "Handcrafted white marble bed with royal canopy drape and Pietra Dura inlaid marble table",
      },
      {
        src: "/images/resort/curated/rooms/room-deluxe-king-pool-view.jpg",
        alt: "Deluxe Room bedroom overlooking the lush resort grounds",
        caption: "King bedroom with direct picture window perspective of the lotus pool",
      },
      {
        src: "/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg",
        alt: "Spacious Deluxe Room interior with king bed and polished marble floor",
        caption: "Spacious layout with polished marble flooring and carved furniture",
      },
      {
        src: "/images/resort/curated/rooms/room-bathroom-marble-vanity.jpg",
        alt: "Deluxe ensuite bathroom with marble vanity and walk-in hot shower",
        caption: "Spacious ensuite bathroom with polished marble vanity counter",
      },
      {
        src: "/images/resort/curated/pool/pool-deck-loungers-day.jpg",
        alt: "Sun loungers on the central lotus pool deck directly below deluxe rooms",
        caption: "The central lotus pool deck just steps from your ground-level room",
      },
    ],
  },
];
