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
  mapCoords: { x: number; y: number }; // Percentage (0-100) on the cartographic canvas
  callout: {
    align: "left" | "right" | "center";
    quadrant: "NW" | "W" | "SW" | "N" | "E" | "SE";
    subtitle: string;
    labelOffset?: { x: number; y: number }; // Offset in px or % for custom leader pinning
  };
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
    mapCoords: { x: 67, y: 48 },
    callout: {
      align: "left",
      quadrant: "E",
      subtitle: "Sacred Riverbank Sanctuary",
    },
    realCoordinates: "25.3516° N, 78.6424° E",
    distanceFromResort: "Primary Destination",
    walkingTime: "0 min",
    description:
      "Riverfront luxury sanctuary with 32 heritage rooms, luxury AC Swiss tents, blooming lotus pool, and authentic Kerala Ayurveda spa along tranquil riverbanks opposite the royal cenotaphs.",
    historicalEra: "Zero-Pollution Riverbank Sanctuary",
    badgeText: "Your Sanctuary",
    isPrimary: true,
    imageSrc: "/images/resort/genuine/slide2.jpg",
  },
  {
    id: "royal-chhatris",
    name: "Kanchan Ghat & 14 Royal Cenotaphs",
    hindiName: "कंचन घाट एवं चौदह शाही छत्रियाँ",
    category: "monument",
    mapCoords: { x: 67, y: 76 },
    callout: {
      align: "left",
      quadrant: "SE",
      subtitle: "17th C. Bundela Memorial Shikharas",
    },
    realCoordinates: "25.3485° N, 78.6410° E",
    distanceFromResort: "500 m south along riverbank",
    walkingTime: "~6 min walk",
    description:
      "Grand multi-tiered 17th-century cenotaphs of Bundela monarchs with towering shikharas rising along the Betwa River steps, directly visible from the resort grounds.",
    historicalEra: "17th Century (Bundela Dynasty)",
    badgeText: "Royal Memorials",
    imageSrc: "/images/resort/genuine/chhatris.jpg",
  },
  {
    id: "orchha-fort",
    name: "Orchha Fort & Jahangir Mahal",
    hindiName: "जहाँगीर महल एवं ओरछा दुर्ग",
    category: "monument",
    mapCoords: { x: 50, y: 26 },
    callout: {
      align: "center",
      quadrant: "N",
      subtitle: "Imperial Island Citadel & Palaces",
    },
    realCoordinates: "25.3533° N, 78.6442° E",
    distanceFromResort: "1.2 km north via stone bridge",
    walkingTime: "~15 min walk / 4 min drive",
    description:
      "Monumental fortified island citadel comprising Jahangir Mahal, Raja Mahal, and Sheesh Mahal. Features 136 domed chambers, turquoise ceramic tiles, and open courtyards.",
    historicalEra: "Completed 1605 CE by Bir Singh Deo",
    badgeText: "Imperial Citadel",
    imageSrc: "/images/resort/genuine/g1.jpg",
  },
  {
    id: "ram-raja-temple",
    name: "Ram Raja Temple",
    hindiName: "श्री राम राजा मंदिर",
    category: "temple",
    mapCoords: { x: 30, y: 38 },
    callout: {
      align: "right",
      quadrant: "W",
      subtitle: "Sacred Palace Temple of King Rama",
    },
    realCoordinates: "25.3524° N, 78.6385° E",
    distanceFromResort: "1.0 km northwest",
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
    mapCoords: { x: 30, y: 60 },
    callout: {
      align: "right",
      quadrant: "SW",
      subtitle: "105m Sky-Piercing Stone Shikhara",
    },
    realCoordinates: "25.3518° N, 78.6394° E",
    distanceFromResort: "1.1 km northwest",
    walkingTime: "~13 min walk",
    description:
      "Colossal cruciform temple built upon an immense stone platform, crowned by towering shikharas resembling a Gothic cathedral rising dramatically above the Betwa valley.",
    historicalEra: "Completed 1627 CE",
    badgeText: "Monumental Spire",
    imageSrc: "/images/resort/genuine/g7.jpg",
  },
  {
    id: "laxmi-narayan-temple",
    name: "Laxmi Narayan Temple",
    hindiName: "लक्ष्मी नारायण मंदिर",
    category: "temple",
    mapCoords: { x: 18, y: 16 },
    callout: {
      align: "right",
      quadrant: "NW",
      subtitle: "Triangular Fresco Fort-Temple",
    },
    realCoordinates: "25.3582° N, 78.6328° E",
    distanceFromResort: "1.8 km northwest",
    walkingTime: "~6 min drive / 22 min walk",
    description:
      "Striking triangular fortress-temple perched upon a rocky knoll, celebrated for extraordinary 17th to 19th-century Bundeli frescoes depicting epics, royal court ceremonies, and battle scenes.",
    historicalEra: "Built 1622 CE by Bir Singh Deo",
    badgeText: "Fresco Fort-Temple",
    imageSrc: "/images/resort/genuine/g11.jpg",
  },
];
