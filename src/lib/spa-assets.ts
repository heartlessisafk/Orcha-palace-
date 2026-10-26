/**
 * Centralized Typed Spa Asset Registry for Orchha Palace Hotel Spa.
 *
 * ABSOLUTE PHOTOGRAPHY RESTRICTION:
 * All photographs in this registry are strictly extracted from the 11-page
 * official Orchha Palace Hotel Spa PDF brochure (`Spa 2(1).pdf`).
 * No external, stock, or generated photographs are permitted on this route.
 */

export interface SpaAsset {
  id: string;
  treatmentName: string;
  pdfPage: number;
  master: string;
  card: string;
  square: string;
  width: number;
  height: number;
  alt: string;
}

export const SPA_PHOTOGRAPHY_REGISTRY: Record<string, SpaAsset> = {
  abhyangam: {
    id: "abhyangam",
    treatmentName: "Abhyangam",
    pdfPage: 1,
    master: "/images/spa/catalog/abhyangam.jpg",
    card: "/images/spa/catalog/abhyangam_card.jpg",
    square: "/images/spa/catalog/abhyangam_square.jpg",
    width: 615,
    height: 865,
    alt: "Authentic full-body Ayurvedic oil massage using warm medicated herbal oils at Orchha Palace Spa",
  },
  shirodhara: {
    id: "shirodhara",
    treatmentName: "Shirodhara",
    pdfPage: 2,
    master: "/images/spa/catalog/shirodhara.jpg",
    card: "/images/spa/catalog/shirodhara_card.jpg",
    square: "/images/spa/catalog/shirodhara_square.jpg",
    width: 585,
    height: 885,
    alt: "Traditional brass vessel pouring warm herbal oil steadily over the forehead at Orchha Palace Spa",
  },
  "marma-massage": {
    id: "marma-massage",
    treatmentName: "Marma Massage",
    pdfPage: 3,
    master: "/images/spa/catalog/marma-massage.jpg",
    card: "/images/spa/catalog/marma-massage_card.jpg",
    square: "/images/spa/catalog/marma-massage_square.jpg",
    width: 620,
    height: 840,
    alt: "Therapeutic massage focused on vital body energy points with Ayurvedic potlis and warm oils",
  },
  nasyam: {
    id: "nasyam",
    treatmentName: "Nasyam",
    pdfPage: 4,
    master: "/images/spa/catalog/nasyam.jpg",
    card: "/images/spa/catalog/nasyam_card.jpg",
    square: "/images/spa/catalog/nasyam_square.jpg",
    width: 620,
    height: 840,
    alt: "Traditional Panchakarma therapy with medicated herbal oils gently applied through nasal passages",
  },
  "herbal-facial": {
    id: "herbal-facial",
    treatmentName: "Herbal Facial",
    pdfPage: 5,
    master: "/images/spa/catalog/herbal-facial.jpg",
    card: "/images/spa/catalog/herbal-facial_card.jpg",
    square: "/images/spa/catalog/herbal-facial_square.jpg",
    width: 620,
    height: 840,
    alt: "Refreshing facial treatment with pure botanical herbal skincare ingredients and gentle brush application",
  },
  "synchronized-massage": {
    id: "synchronized-massage",
    treatmentName: "Synchronized Massage",
    pdfPage: 6,
    master: "/images/spa/catalog/synchronized-massage.jpg",
    card: "/images/spa/catalog/synchronized-massage_card.jpg",
    square: "/images/spa/catalog/synchronized-massage_square.jpg",
    width: 620,
    height: 810,
    alt: "Special four-hand massage performed by two therapists in harmonious synchronized movements",
  },
  "ayur-herbal-wrap": {
    id: "ayur-herbal-wrap",
    treatmentName: "Ayur Herbal Wrap",
    pdfPage: 7,
    master: "/images/spa/catalog/ayur-herbal-wrap.jpg",
    card: "/images/spa/catalog/ayur-herbal-wrap_card.jpg",
    square: "/images/spa/catalog/ayur-herbal-wrap_square.jpg",
    width: 615,
    height: 515,
    alt: "Traditional herbal body wrap using natural Ayurvedic ingredients for deep hydration and detox",
  },
  reflexology: {
    id: "reflexology",
    treatmentName: "Reflexology",
    pdfPage: 8,
    master: "/images/spa/catalog/reflexology.jpg",
    card: "/images/spa/catalog/reflexology_card.jpg",
    square: "/images/spa/catalog/reflexology_square.jpg",
    width: 630,
    height: 545,
    alt: "Natural healing reflexology based on pressure points in the feet and hands for total relaxation",
  },
  "deep-tissue-massage": {
    id: "deep-tissue-massage",
    treatmentName: "Deep Tissue Massage",
    pdfPage: 9,
    master: "/images/spa/catalog/deep-tissue-massage.jpg",
    card: "/images/spa/catalog/deep-tissue-massage_card.jpg",
    square: "/images/spa/catalog/deep-tissue-massage_square.jpg",
    width: 610,
    height: 800,
    alt: "Focused massage therapy working on deeper muscle layers to relieve stiffness and physical tension",
  },
  "head-scalp-massage": {
    id: "head-scalp-massage",
    treatmentName: "Head & Scalp Massage",
    pdfPage: 10,
    master: "/images/spa/catalog/head-scalp-massage.jpg",
    card: "/images/spa/catalog/head-scalp-massage_card.jpg",
    square: "/images/spa/catalog/head-scalp-massage_square.jpg",
    width: 630,
    height: 535,
    alt: "Calming therapy for the head, neck, and shoulders to ease scalp tension and restore peaceful clarity",
  },
  "body-exfoliation-massage": {
    id: "body-exfoliation-massage",
    treatmentName: "Body Exfoliation Massage",
    pdfPage: 11,
    master: "/images/spa/catalog/body-exfoliation-massage.jpg",
    card: "/images/spa/catalog/body-exfoliation-massage_card.jpg",
    square: "/images/spa/catalog/body-exfoliation-massage_square.jpg",
    width: 620,
    height: 840,
    alt: "Refreshing body exfoliation using gentle herbal granules to smoothen skin and stimulate circulation",
  },
};

export const SPA_DECORATIVE_ASSETS = {
  royalCrest: {
    src: "/images/spa/extracted/crest_transparent.png",
    width: 160,
    height: 170,
    alt: "Orchha Palace Hotel Spa Royal Elephant Crest",
  },
  botanicalBranch: {
    src: "/images/spa/extracted/botanical_transparent.png",
    width: 170,
    height: 230,
    alt: "Traditional Ayurvedic botanical leaf illustration",
  },
  heroShirodhara: {
    src: "/images/spa/catalog/hero_shirodhara.jpg",
    width: 585,
    height: 885,
    alt: "Orchha Palace Hotel Spa Shirodhara Cinematic Hero",
  },
  heroAbhyangam: {
    src: "/images/spa/catalog/hero_abhyangam.jpg",
    width: 615,
    height: 865,
    alt: "Orchha Palace Hotel Spa Abhyangam Cinematic Composition",
  },
};
