/**
 * Dedicated Asset Registry for the Weddings Page (/weddings).
 *
 * AUTHENTICITY & PHOTO INTEGRITY:
 * All assets used are authentic photographs of The Orchha Resort property
 * and verified wedding setup photography from official property events.
 * Zero generic stock wedding imagery or AI hallucinations.
 */

export interface WeddingAsset {
  id: string;
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  source: string;
  spaceType: "lawn" | "stage" | "canopy" | "celebration" | "ballroom" | "pool" | "tent";
}

export const WEDDING_ASSETS: Record<string, WeddingAsset> = {
  // 1. Royal Couple Celebration & Floral Canopy Walk (Main Wedding Hero)
  royalCoupleMandap: {
    id: "royal-couple-mandap",
    title: "Royal Couple Celebration & Floral Canopy Walk",
    description: "Bride and groom walking hand in hand under an illuminated royal floral canopy with crystal chandeliers and draped pavilions at The Orchha Resort",
    src: "/images/weddings/wedding-royal-couple-mandap.jpg",
    width: 2048,
    height: 1160,
    alt: "Bride and groom under the illuminated royal floral canopy with crystal chandeliers at The Orchha Resort",
    source: "Authentic Orchha Resort wedding photography",
    spaceType: "celebration",
  },

  // 2. Grand Couple Celebration & Stage Performance
  sangeetCelebration: {
    id: "sangeet-celebration",
    title: "Royal Stage & Sangeet Celebrations",
    description: "Evening stage celebration with pyrotechnic fountains, theatrical lighting, and entertainment at the resort's grand event grounds",
    src: "/images/weddings/wedding-sangeet-celebration.jpg",
    width: 1024,
    height: 576,
    alt: "Couple celebration on the illuminated royal stage with cold pyro fountains at The Orchha Resort",
    source: "Verified property event photography (Orchha Resort grounds)",
    spaceType: "celebration",
  },

  // 2. Aerial Night View of Grand Banquet Lawns
  aerialLawnNight: {
    id: "aerial-lawn-night",
    title: "The Grand Riverfront Banquet Lawns",
    description: "Aerial view of the illuminated wedding lawns featuring a covered entrance walkway, central pavilion, banquet setups, and open-sky seating",
    src: "/images/weddings/wedding-aerial-lawn-night.jpg",
    width: 1024,
    height: 576,
    alt: "Aerial view of the illuminated wedding banquet lawn setup at night at The Orchha Resort",
    source: "Verified aerial event photography (Orchha Resort wedding lawn)",
    spaceType: "lawn",
  },

  // 3. Grand Reception Stage with Jaali & Chandeliers
  grandReceptionStage: {
    id: "grand-reception-stage",
    title: "Grand Royal Reception Stage",
    description: "Architectural white jaali carved stage backdrop adorned with multi-tiered crystal chandeliers, fresh floral cascades, and royal velvet lounge seating",
    src: "/images/weddings/wedding-grand-reception-stage.jpg",
    width: 1024,
    height: 576,
    alt: "Elaborate white jaali reception stage setup with crystal chandeliers and fresh flowers at The Orchha Resort",
    source: "Verified property event setup photography",
    spaceType: "stage",
  },

  // 4. Mandap & Banquet Canopy with Hanging Lotus Lamps
  mandapCanopy: {
    id: "mandap-canopy",
    title: "Canopied Royal Mandap Pavilion",
    description: "Intricately styled wedding canopy with hanging warm-lit lotus lamps, fresh mogra tassels, mirrored mosaic pillars, and royal dining banquets",
    src: "/images/weddings/wedding-mandap-canopy.jpg",
    width: 1024,
    height: 576,
    alt: "Royal wedding canopy decorated with hanging illuminated lotus lamps and floral tassels at The Orchha Resort",
    source: "Verified property event decor photography",
    spaceType: "canopy",
  },

  // 5. Verified 1,500 sq ft Ballroom
  royalBallroom: {
    id: "royal-ballroom",
    title: "The Royal Ballroom",
    description: "1,500 sq ft pillarless climate-controlled indoor hall ideal for intimate Sangeet rehearsals, Haldi ceremonies, and pre-wedding gatherings",
    src: "/images/resort/genuine/conference2.jpg",
    width: 900,
    height: 600,
    alt: "1,500 sq ft indoor Ballroom at The Orchha Resort",
    source: "Official Orchha Resort website asset (conference2.jpg)",
    spaceType: "ballroom",
  },

  // 6. Lotus Poolside Promenade
  lotusPoolside: {
    id: "lotus-poolside",
    title: "The Lotus Poolside Promenade",
    description: "Signature lotus-petal shaped swimming pool terrace offering an idyllic open-air setting for vibrant Mehendi afternoons and sundowner cocktails",
    src: "/images/resort/genuine/swimming.jpg",
    width: 900,
    height: 600,
    alt: "The Lotus-shaped swimming pool at The Orchha Resort",
    source: "Official Orchha Resort website asset (swimming.jpg)",
    spaceType: "pool",
  },

  // 7. Evening Courtyard & Folk Dance Lawn
  eveningCourtyard: {
    id: "evening-courtyard",
    title: "Courtyard Celebration Lawns",
    description: "Lantern-lit open garden lawns perfect for dinner receptions, live Bundeli folk performances, and under-the-stars gatherings",
    src: "/images/resort/genuine/14.jpg",
    width: 900,
    height: 600,
    alt: "Evening illuminated lawn setup at The Orchha Resort",
    source: "Official Orchha Resort website asset (14.jpg)",
    spaceType: "lawn",
  },

  // 8. Deluxe Accommodations for Wedding Guests
  guestSwissTents: {
    id: "guest-swiss-tents",
    title: "Deluxe Accommodations for Wedding Guests",
    description: "Safari-style air-conditioned garden tents providing romantic and exclusive private stays for wedding VIPs and bridal entourages",
    src: "/images/resort/genuine/g6.jpg",
    width: 525,
    height: 350,
    alt: "Deluxe Air-Conditioned Swiss Tent in lush garden setting at The Orchha Resort",
    source: "Official Orchha Resort website asset (g6.jpg)",
    spaceType: "tent",
  },
};
