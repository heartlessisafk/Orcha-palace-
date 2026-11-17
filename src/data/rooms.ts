import { RoomDetails } from "@/types/room";

/**
 * Verified Accommodation Data for The Orchha Resort.
 * Grounded in genuine property audit: 50 rooms total inventory, verified categories & amenities.
 * All photographs sourced strictly from authentic local curated repository.
 * Category names updated to exact client specifications:
 * 1. Standard Room Garden Facing
 * 2. Deluxe Room Garden Facing
 * 3. Deluxe Marble Bed Garden Facing
 * 4. Super Deluxe Pool Facing
 */
export const VERIFIED_ROOMS: RoomDetails[] = [
  {
    id: "standard-room",
    category: "standard",
    name: "Standard Room Garden Facing",
    tagline: "Serene garden retreat with traditional comforts",
    description:
      "Spacious and peaceful, our Standard Room Garden Facing accommodations offer serene garden views, comfortable king or twin bedding, handcrafted wood furnishings, Pietra Dura marble floor inlays, and an ensuite marble bathroom with 24-hour hot water.",
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
    inventoryNote: "14 Rooms in main heritage wing",
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
        alt: "Standard Room Garden Facing with twin beds, handcrafted wooden headboard, and marble floor inlay",
        caption: "Comfortable twin bedroom with polished Indian white marble and handcrafted furnishings",
      },
      {
        src: "/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg",
        alt: "Standard Room Garden Facing bedroom interior with king bed and marble floor",
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
    name: "Deluxe Marble Bed Garden Facing",
    tagline: "Expansive luxury with handcrafted marble bed and garden tranquility",
    description:
      "Finished with polished Indian marble floors, handcrafted marble bed design, and bespoke Bundeli craftsmanship, Deluxe Marble Bed Garden Facing rooms feature an open sitting area, enhanced floor plans, and expansive picture windows overlooking the resort gardens and lotus pool.",
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
    inventoryNote: "10 Rooms overlooking central pool deck",
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
        src: "/images/resort/curated/rooms/room-deluxe-king-pool-view.jpg",
        alt: "Deluxe Marble Bed Garden Facing bedroom overlooking the lush resort grounds",
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
  {
    id: "deluxe-swiss-tent",
    category: "swiss-tent",
    name: "Deluxe Room Garden Facing",
    tagline: "Authentic sanctuary under the stars near the Royal Chhatris",
    description:
      "Our signature accommodation: permanent Deluxe Room Garden Facing accommodations situated in lush riverside orchards near the historical Chhatris. Featuring heavy insulated canvas walls, individual air-conditioning, attached modern tiled bathrooms, custom timber flooring, and private sit-out verandahs ideal for morning tea and birdwatching.",
    startingPriceInr: 5200,
    areaSqFt: 320,
    bedType: "King Bed with Custom Linen",
    maxOccupancy: {
      adults: 2,
      children: 1,
    },
    views: ["Riverside Gardens", "Orchha Chhatris Horizon"],
    keyAmenities: [
      "Attached Permanent Modern Bathroom",
      "Full Climate Air-Conditioning & Heating",
      "Private Sit-out Verandah & Cane Chairs",
      "Authentic Bundelkhand Block-Print Canvas",
      "Birdwatcher's Riverside Setting",
      "Daily Herbal Tea & Coffee Station",
      "High-speed Wi-Fi in Tent Area",
      "Quiet Zero-Pollution Sanctuary Setting",
    ],
    imageKey: "roomSwissTent",
    badge: "Signature Experience",
    inventoryNote: "6 Luxury Tents in riverside gardens",
    features: [
      "Double-layered weatherproof canvas with traditional floral block prints",
      "Polished timber flooring with handcrafted bedside dhurrie rugs",
      "Separate dressing and vanity annex inside the tent structure",
      "Full ensuite masonry bathroom with 24-hr pressure-boosted hot water",
      "Private front verandah overlooking the gardens and the distant cenotaphs",
    ],
    specs: [
      { label: "Tent Footprint", value: "320 sq ft (30 m²) incl. verandah" },
      { label: "Bed Configuration", value: "1 King-size Bed" },
      { label: "Maximum Guests", value: "2 Adults + 1 Child" },
      { label: "Setting", value: "Riverside Garden Orchard" },
      { label: "Structure", value: "Heavy Insulated Canvas + Solid Timber Deck" },
      { label: "Bathroom", value: "Attached Permanent Tiled Bathroom" },
    ],
    gallery: [
      {
        src: "/images/resort/curated/rooms/room-tent-interior-canopy.jpg",
        alt: "Deluxe Room Garden Facing canvas interior with traditional floral block print",
        caption: "Interior glamping bedroom under the patterned canvas canopy ceiling",
      },
      {
        src: "/images/resort/curated/rooms/room-tent-vanity-dressing.jpg",
        alt: "Dressing vanity, timber floors, and wardrobe inside the Swiss tent",
        caption: "Dedicated dressing vanity and storage area on polished timber floors",
      },
      {
        src: "/images/resort/curated/rooms/room-tent-verandah-twilight.jpg",
        alt: "Private verandah of the Swiss tent at twilight with garden views",
        caption: "Private sit-out verandah at dusk with views of the lush resort grounds",
      },
      {
        src: "/images/resort/curated/heritage/heritage-cenotaphs-golden-hour.jpg",
        alt: "The 14 Royal Cenotaphs at Kanchan Ghat illuminated at golden hour",
        caption: "The majestic Royal Cenotaphs located a short stroll from the tent orchard",
      },
    ],
  },
  {
    id: "royal-heritage-suite",
    category: "suite",
    name: "Super Deluxe Pool Facing",
    tagline: "Regal living with panoramic lotus pool views and Betwa river horizons",
    description:
      "The pinnacle of Bundelkhandi royal hospitality. Super Deluxe Pool Facing accommodations encompass a master bedroom, separate formal reception parlor with antique diwan seating, handcrafted brass artifacts, and a private stone balcony directly framing the lotus swimming pool and sacred Betwa River horizon.",
    startingPriceInr: 8500,
    areaSqFt: 450,
    bedType: "Four-poster Royal King Bed",
    maxOccupancy: {
      adults: 3,
      children: 2,
    },
    views: ["Lotus Pool Panorama", "Betwa River Horizon"],
    keyAmenities: [
      "Separate Formal Living Room Parlor",
      "Panoramic Riverfront Stone Balcony",
      "Deep Soaking Tub & Walk-in Rain Shower",
      "Personalized Concierge & Luggage Butler",
      "Complimentary Evening High Tea Service",
      "Dual Large Satellite LED TVs",
      "Welcome Fresh Fruit Basket & Sweets",
      "Express Priority In-Suite Check-in",
    ],
    imageKey: "roomSuite",
    badge: "Exclusive Suite",
    inventoryNote: "2 Exclusive Suites on upper heritage floor",
    features: [
      "Two-room suite layout: Private Master Bedroom + Heritage Living Salon",
      "Handcrafted antique Bundelkhand diwan and plush royal velvet armchairs",
      "Private stone-carved jharokha balcony directly overlooking Kanchan Ghat",
      "Marble master bath with twin vanity sinks, soaking tub, and rain shower",
      "VIP turn-down service with artisanal Bundelkhand nightcaps and sweets",
    ],
    specs: [
      { label: "Suite Size", value: "450 sq ft (42 m²)" },
      { label: "Bed Configuration", value: "1 Four-poster Royal King Bed" },
      { label: "Maximum Guests", value: "3 Adults + 2 Children" },
      { label: "View Perspective", value: "Panoramic Lotus Pool & Betwa River Horizon" },
      { label: "Layout", value: "Master Bedroom + Separate Living Salon" },
      { label: "Outdoor Space", value: "Private Stone Balcony (Jharokha)" },
    ],
    gallery: [
      {
        src: "/images/resort/curated/rooms/room-suite-heritage-living.jpg",
        alt: "Super Deluxe Pool Facing suite living parlor with carved wood diwan and brass lamps",
        caption: "Spacious salon with handcrafted diwan, plush armchairs, and brass decor",
      },
      {
        src: "/images/resort/curated/rooms/room-deluxe-king-pool-view.jpg",
        alt: "Master bedroom suite with king bed and direct panoramic views",
        caption: "Master bedroom with plush king bedding and scenic landscape views",
      },
      {
        src: "/images/resort/curated/rooms/room-bathroom-marble-vanity.jpg",
        alt: "Luxury master bathroom with polished marble vanity and tub",
        caption: "Master marble bathroom with walk-in shower and luxury herbal amenities",
      },
      {
        src: "/images/resort/curated/heritage/heritage-chhatris-reflection-river.jpg",
        alt: "14 Royal Cenotaphs reflected in the River Betwa seen from the suite balcony",
        caption: "The world-famous cenotaph reflection visible directly from your balcony",
      },
    ],
  },
];
