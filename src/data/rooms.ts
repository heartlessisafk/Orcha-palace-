import { RoomDetails } from "@/types/room";

/**
 * Verified Accommodation Data for The Orchha Resort.
 * Grounded in Phase 1 audit: 32 rooms total inventory, verified categories & amenities.
 */
export const VERIFIED_ROOMS: RoomDetails[] = [
  {
    id: "standard-room",
    category: "standard",
    name: "Standard Heritage Room",
    tagline: "Serene garden retreat with traditional comforts",
    description:
      "Spacious and peaceful, our Standard Rooms offer serene garden views, comfortable king or twin bedding, handcrafted wood furnishings, and an ensuite marble bathroom with 24-hour hot water.",
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
    ],
    imageKey: "roomStandard",
    inventoryNote: "14 Rooms in main heritage wing",
  },
  {
    id: "deluxe-room",
    category: "deluxe",
    name: "Deluxe Marble Room",
    tagline: "Expansive luxury with views of the lotus pool",
    description:
      "Finished with polished Indian marble floors and bespoke Bundeli craftsmanship, Deluxe Rooms feature an open seating area, enhanced floor plans, and expansive views overlooking the lotus-shaped swimming pool.",
    startingPriceInr: 6000,
    areaSqFt: 280,
    bedType: "King-size Heritage Bed",
    maxOccupancy: {
      adults: 3,
      children: 1,
    },
    views: ["Lotus Swimming Pool", "Riverbank Gardens"],
    keyAmenities: [
      "Lotus Pool View Balcony / Window",
      "Premium Marble Bathroom",
      "Luxury Herbal Toiletries",
      "Satellite LED TV",
      "Mini-bar & Safe",
      "Express Room Service",
      "Complimentary Wi-Fi",
    ],
    imageKey: "roomDeluxe",
    badge: "Most Popular",
    inventoryNote: "10 Rooms overlooking central pool deck",
  },
  {
    id: "deluxe-swiss-tent",
    category: "swiss-tent",
    name: "Deluxe AC Swiss Tent",
    tagline: "Authentic glamping under the stars near the Royal Chhatris",
    description:
      "Our signature accommodation: permanent luxury Swiss tents situated in lush orchards near the historical Chhatris. Featuring heavy insulated canvas, individual air-conditioning, attached modern tiled bathrooms, and private sit-out verandahs ideal for birdwatching.",
    startingPriceInr: 5200,
    areaSqFt: 320,
    bedType: "King Bed with Custom Linen",
    maxOccupancy: {
      adults: 2,
      children: 1,
    },
    views: ["Orchha Chhatris Panorama", "Riverbank Orchards"],
    keyAmenities: [
      "Attached Permanent Modern Bath",
      "Full Climate Air-Conditioning",
      "Private Sit-out Verandah",
      "Birdwatcher's Sanctuary Setting",
      "Daily Tea / Coffee Station",
      "Authentic Glamping Experience",
      "Quiet Zero-Pollution Zone",
    ],
    imageKey: "roomSwissTent",
    badge: "Signature Experience",
    inventoryNote: "6 Luxury Tents in riverside gardens",
  },
  {
    id: "royal-heritage-suite",
    category: "suite",
    name: "Royal Heritage Suite",
    tagline: "Regal living with panoramic Betwa river and monument horizons",
    description:
      "The pinnacle of Bundelkhandi hospitality. The Royal Heritage Suite encompasses a master bedroom, separate formal reception parlor, bespoke antique decor, and a private stone balcony directly framing the Betwa River and 14 royal cenotaphs.",
    startingPriceInr: 8500,
    areaSqFt: 450,
    bedType: "Four-poster Royal King Bed",
    maxOccupancy: {
      adults: 3,
      children: 2,
    },
    views: ["Direct Betwa River Panorama", "14 Royal Cenotaphs Horizon"],
    keyAmenities: [
      "Separate Living Room Parlor",
      "Panoramic Riverfront Balcony",
      "Deep Soaking Tub & Walk-in Shower",
      "Personalized Concierge Assistance",
      "Complimentary Evening High Tea",
      "Dual LED TVs",
      "Welcome Fresh Fruit Basket",
    ],
    imageKey: "roomSuite",
    badge: "Exclusive Suite",
    inventoryNote: "2 Exclusive Suites on upper heritage floor",
  },
];
