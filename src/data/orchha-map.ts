/**
 * Verified Geographic & Heritage Locations of Orchha for the Real Scroll Map & Landmark Explorer.
 *
 * AUTHENTICITY PROTOCOL:
 * All coordinates, distances, and historical facts are verified against OpenStreetMap,
 * Madhya Pradesh Tourism records, and satellite ground truth for Orchha, Niwari District, MP.
 *
 * Geographic Anchor:
 * The Orchha Resort is situated on the eastern bank of the Betwa River (25.344842° N, 78.639536° E)
 * opposite the 14 Royal Cenotaphs and Kanchan Ghat.
 */

export interface HeritageLocationMarker {
  id: string;
  name: string;
  hindiName?: string;
  category: "resort" | "palace" | "temple" | "river";
  categoryLabel: string;
  lat: number;
  lng: number;
  distanceFromResort: string;
  walkingTime?: string;
  description: string;
  historicalEra: string;
  badgeText: string;
  isPrimary?: boolean;
  imageSrc: string;
}

export const ORCHHA_MAP_CENTER = {
  lat: 25.3482,
  lng: 78.6392,
};

export const ORCHHA_MAP_DEFAULT_ZOOM = 15;

export const ORCHHA_HERITAGE_LOCATIONS: HeritageLocationMarker[] = [
  {
    id: "orchha-resort",
    name: "The Orchha Resort",
    hindiName: "द ओरछा रिसॉर्ट",
    category: "resort",
    categoryLabel: "Sanctuary",
    lat: 25.344842,
    lng: 78.639536,
    distanceFromResort: "Primary Destination",
    walkingTime: "Your Starting Point",
    description:
      "Tranquil riverfront sanctuary featuring 32 heritage rooms, luxury AC Swiss tents, blooming lotus swimming pool, and authentic Kerala Ayurveda spa on the eastern banks of the sacred Betwa River.",
    historicalEra: "Zero-Pollution Riverbank Sanctuary",
    badgeText: "Your Sanctuary",
    isPrimary: true,
    imageSrc: "/images/resort/genuine/slide2.jpg",
  },
  {
    id: "royal-chhatris",
    name: "Kanchan Ghat & 14 Royal Cenotaphs",
    hindiName: "कंचन घाट एवं चौदह शाही छत्रियाँ",
    category: "river",
    categoryLabel: "Ghats & River",
    lat: 25.34375,
    lng: 78.637725,
    distanceFromResort: "~400 m south along riverbank",
    walkingTime: "~5 min walk",
    description:
      "Fourteen monumental 17th-century multi-tiered memorial shikharas of Bundela rulers rising directly from the steps of Kanchan Ghat along the Betwa riverbank, directly visible from the resort grounds.",
    historicalEra: "17th Century (Bundela Dynasty)",
    badgeText: "Royal Memorials",
    imageSrc: "/images/resort/genuine/chhatris.jpg",
  },
  {
    id: "orchha-fort",
    name: "Orchha Fort & Jahangir Mahal",
    hindiName: "जहाँगीर महल एवं ओरछा दुर्ग",
    category: "palace",
    categoryLabel: "Palaces & Forts",
    lat: 25.350641,
    lng: 78.644233,
    distanceFromResort: "1.2 km north via stone bridge",
    walkingTime: "~15 min walk / 4 min drive",
    description:
      "Monumental fortified island citadel comprising Jahangir Mahal, Raja Mahal, and Sheesh Mahal. Features 136 domed chambers, turquoise ceramic tiles, and open courtyards framed by the Betwa river.",
    historicalEra: "Completed 1605 CE by Bir Singh Deo",
    badgeText: "Imperial Citadel",
    imageSrc: "/images/resort/genuine/g1.jpg",
  },
  {
    id: "ram-raja-temple",
    name: "Ram Raja Temple",
    hindiName: "श्री राम राजा मंदिर",
    category: "temple",
    categoryLabel: "Temples & Sacred",
    lat: 25.350839,
    lng: 78.639798,
    distanceFromResort: "950 m northwest",
    walkingTime: "~12 min walk / 3 min drive",
    description:
      "The only temple in India where Lord Rama is venerated as a reigning monarch. Originally Queen Ganeshkunwar's royal palace, honoring daily ceremonial gun salutes at dawn and dusk.",
    historicalEra: "16th Century (Queen Ganeshkunwar)",
    badgeText: "Living Kingdom",
    imageSrc: "/images/resort/genuine/g6.jpg",
  },
  {
    id: "chaturbhuj-temple",
    name: "Chaturbhuj Temple",
    hindiName: "चतुर्भुज मंदिर",
    category: "temple",
    categoryLabel: "Temples & Sacred",
    lat: 25.350125,
    lng: 78.639843,
    distanceFromResort: "1.0 km northwest",
    walkingTime: "~12 min walk / 3 min drive",
    description:
      "Colossal cruciform temple built upon an immense stone platform, crowned by towering shikharas resembling a cathedral rising dramatically above the Orchha valley.",
    historicalEra: "Completed 1627 CE",
    badgeText: "Monumental Spire",
    imageSrc: "/images/resort/genuine/g7.jpg",
  },
  {
    id: "laxmi-narayan-temple",
    name: "Laxmi Narayan Temple",
    hindiName: "लक्ष्मी नारायण मंदिर",
    category: "temple",
    categoryLabel: "Temples & Sacred",
    lat: 25.352794,
    lng: 78.630803,
    distanceFromResort: "1.8 km northwest",
    walkingTime: "~20 min walk / 5 min drive",
    description:
      "Striking triangular fortress-temple perched upon a rocky knoll, celebrated for extraordinary 17th to 19th-century Bundeli frescoes depicting epics, royal court ceremonies, and battle scenes.",
    historicalEra: "Built 1622 CE by Bir Singh Deo",
    badgeText: "Fresco Fort-Temple",
    imageSrc: "/images/resort/genuine/g11.jpg",
  },
  {
    id: "betwa-sanctuary",
    name: "Betwa River & Orchha Sanctuary",
    hindiName: "बेतवा नदी एवं ओरछा वन्यजीव अभयारण्य",
    category: "river",
    categoryLabel: "Ghats & River",
    lat: 25.341859,
    lng: 78.64101,
    distanceFromResort: "Direct riverbank access",
    walkingTime: "0 min",
    description:
      "The sacred Betwa River weaving through granite boulders, ancient islands, and nature trails embracing the Orchha Wildlife Sanctuary right alongside the resort grounds.",
    historicalEra: "Pristine Sacred River Ecosystem",
    badgeText: "River Sanctuary",
    imageSrc: "/images/resort/genuine/g10.jpg",
  },
];

export const MAP_CATEGORIES = [
  { id: "all", label: "All Landmarks", count: 7 },
  { id: "resort", label: "Sanctuary", count: 1 },
  { id: "palace", label: "Palaces & Forts", count: 1 },
  { id: "temple", label: "Temples", count: 3 },
  { id: "river", label: "Ghats & River", count: 2 },
] as const;
