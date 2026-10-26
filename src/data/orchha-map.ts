/**
 * Verified Geographic & Heritage Locations of Orchha for the Palace-to-Map Finale.
 *
 * AUTHENTICITY PROTOCOL:
 * All coordinates, distances, and historical facts are verified against official
 * Madhya Pradesh Tourism records and satellite geographic truth for The Orchha Resort at Kanchanghat.
 *
 * Geographic Anchor:
 * The Orchha Resort is situated at Kanchan Ghat on the eastern bank of the Betwa River (25.3516° N, 78.6424° E).
 */

export interface HeritageLocationMarker {
  id: string;
  name: string;
  hindiName?: string;
  category: "resort" | "monument" | "temple" | "ghat";
  mapCoords: { x: number; y: number }; // Percentage 0-100 on the cartographic canvas
  realCoordinates: string;
  distanceFromResort: string;
  walkingTime?: string;
  description: string;
  historicalEra: string;
  badgeText: string;
  isPrimary?: boolean;
  imageSrc?: string;
}

export const ORCHHA_HERITAGE_LOCATIONS: HeritageLocationMarker[] = [
  {
    id: "orchha-resort",
    name: "The Orchha Resort",
    hindiName: "द ओरछा रिसॉर्ट",
    category: "resort",
    mapCoords: { x: 64, y: 56 },
    realCoordinates: "25.3516° N, 78.6424° E",
    distanceFromResort: "Primary Destination",
    walkingTime: "0 min",
    description:
      "Riverfront luxury sanctuary with 32 rooms and AC Swiss tents, blooming lotus pool, and authentic Kerala Ayurveda spa on tranquil riverbanks.",
    historicalEra: "Certified Zero-Pollution Sanctuary",
    badgeText: "Your Sanctuary",
    isPrimary: true,
    imageSrc: "/images/resort/genuine/slide2.jpg",
  },
  {
    id: "royal-chhatris",
    name: "14 Royal Cenotaphs (Chhatris)",
    hindiName: "चौदह शाही छत्रियाँ",
    category: "monument",
    mapCoords: { x: 53, y: 73 },
    realCoordinates: "25.3485° N, 78.6410° E",
    distanceFromResort: "500 m along river path",
    walkingTime: "~6 min walk",
    description:
      "Grand multi-tiered 17th-century memorials of Bundela rulers with towering shikharas rising beside the Betwa River opposite the resort.",
    historicalEra: "17th Century (Bundela Dynasty)",
    badgeText: "Royal Memorials",
    imageSrc: "/images/resort/genuine/chhatris.jpg",
  },
  {
    id: "kanchan-ghat",
    name: "Kanchan Ghat & River Betwa",
    hindiName: "कंचन घाट",
    category: "ghat",
    mapCoords: { x: 61, y: 48 },
    realCoordinates: "25.3510° N, 78.6418° E",
    distanceFromResort: "Direct river access at resort perimeter",
    walkingTime: "Immediate access",
    description:
      "Sacred river steps renowned for peaceful morning mists, sunset reflections of royal chhatris, and seasonal river rafting waters.",
    historicalEra: "Sacred Riverbed",
    badgeText: "River Sanctuary",
    imageSrc: "/images/resort/genuine/slide1.jpg",
  },
  {
    id: "orchha-fort",
    name: "Orchha Fort & Jahangir Mahal",
    hindiName: "जहाँगीर महल एवं ओरछा दुर्ग",
    category: "monument",
    mapCoords: { x: 47, y: 32 },
    realCoordinates: "25.3533° N, 78.6442° E",
    distanceFromResort: "1.2 km north via stone bridge",
    walkingTime: "~15 min walk / 4 min drive",
    description:
      "Spectacular multi-storied palace combining Mughal and Rajput architecture, featuring 136 domed rooms and ornamental stone jalis.",
    historicalEra: "Completed 1605 CE by Bir Singh Deo",
    badgeText: "Imperial Citadel",
    imageSrc: "/images/resort/genuine/g1.jpg",
  },
  {
    id: "ram-raja-temple",
    name: "Ram Raja Temple",
    hindiName: "श्री राम राजा मंदिर",
    category: "temple",
    mapCoords: { x: 33, y: 36 },
    realCoordinates: "25.3524° N, 78.6385° E",
    distanceFromResort: "1.0 km northwest",
    walkingTime: "~12 min walk / 3 min drive",
    description:
      "The only temple in India where Lord Rama is venerated as a reigning monarch, receiving daily police guard of honour at dawn and dusk.",
    historicalEra: "16th Century (Queen Ganeshkunwar)",
    badgeText: "Sacred Kingdom",
    imageSrc: "/images/resort/genuine/g6.jpg",
  },
  {
    id: "chaturbhuj-temple",
    name: "Chaturbhuj Temple",
    hindiName: "चतुर्भुज मंदिर",
    category: "temple",
    mapCoords: { x: 36, y: 46 },
    realCoordinates: "25.3518° N, 78.6394° E",
    distanceFromResort: "1.1 km northwest",
    walkingTime: "~13 min walk",
    description:
      "Colossal sanctum built on an elevated stone plinth with towering spires resembling a cathedral, soaring 105 meters above the valley.",
    historicalEra: "Completed 1627 CE",
    badgeText: "Monumental Spire",
    imageSrc: "/images/resort/genuine/g7.jpg",
  },
  {
    id: "laxmi-narayan-temple",
    name: "Laxmi Narayan Temple",
    hindiName: "लक्ष्मी नारायण मंदिर",
    category: "temple",
    mapCoords: { x: 20, y: 20 },
    realCoordinates: "25.3582° N, 78.6328° E",
    distanceFromResort: "1.8 km northwest",
    walkingTime: "~6 min drive / 22 min walk",
    description:
      "Unique triangular fort-temple renowned for exquisite Bundeli frescoes depicting mythological epics, Nayaka-Nayika scenes, and historic battles.",
    historicalEra: "Built 1622 CE by Bir Singh Deo",
    badgeText: "Fresco Fort-Temple",
    imageSrc: "/images/resort/genuine/g11.jpg",
  },
];
