/**
 * Official Treatment Catalogue for Orchha Palace Hotel Spa
 * Source: Official 11-page Spa Brochure (`Spa 2(1).pdf`)
 *
 * Strict Compliance:
 * - All 11 treatments are transcribed verbatim from pages 1-11.
 * - Exact listed durations and prices (all in INR).
 * - Exact qualification "+ Taxes As Applicable" on all treatments.
 * - Verified booking enquiry phone numbers: 9516006201, 8103953727.
 * - Photographs linked exclusively to extracted assets in `/images/spa/catalog/*`.
 */

import { SPA_PHOTOGRAPHY_REGISTRY, SpaAsset } from "@/lib/spa-assets";

export type SpaCategory =
  | "all"
  | "massages"
  | "panchakarma"
  | "targeted"
  | "scrubs-wraps";

export interface SpaCategoryOption {
  id: SpaCategory;
  label: string;
  shortLabel: string;
  count: number;
  description: string;
}

export interface SpaTreatmentItem {
  id: string;
  name: string;
  sanskritName: string;
  subtitle: string;
  category: SpaCategory;
  categoryLabel: string;
  pdfPage: number;
  description: string;
  duration: string;
  durationMinutes: number;
  price: number;
  priceFormatted: string;
  taxQualification: string;
  asset: SpaAsset;
  featured?: boolean;
  tag?: string;
}

export const SPA_CONTACT_INFO = {
  brandName: "Orchha Palace Hotel Spa",
  subtitle: "Ayurvedic Wellness & Rejuvenation",
  phonePrimary: "9516006201",
  phonePrimaryFormatted: "+91 95160 06201",
  phoneSecondary: "8103953727",
  phoneSecondaryFormatted: "+91 81039 53727",
  location: "The Orchha Resort, Kanchanghat, Orchha, Madhya Pradesh",
  hours: "Open Daily: 8:00 AM – 7:00 PM",
};

export const SPA_CATEGORIES: SpaCategoryOption[] = [
  {
    id: "all",
    label: "All Therapies",
    shortLabel: "All",
    count: 11,
    description: "Complete catalogue of 11 traditional royal Ayurvedic therapies",
  },
  {
    id: "massages",
    label: "Ayurvedic Massages",
    shortLabel: "Massages",
    count: 4,
    description: "Warm herbal oil therapies, vital energy points & four-hand synchronization",
  },
  {
    id: "panchakarma",
    label: "Panchakarma Rituals",
    shortLabel: "Panchakarma",
    count: 2,
    description: "Deep meditative Shirodhara & classical Nasyam respiratory therapy",
  },
  {
    id: "targeted",
    label: "Targeted & Express",
    shortLabel: "Targeted",
    count: 2,
    description: "Pressure point reflexology and focused head & scalp de-stressing",
  },
  {
    id: "scrubs-wraps",
    label: "Wraps, Scrubs & Facials",
    shortLabel: "Skin & Detox",
    count: 3,
    description: "Botanical body wraps, gentle exfoliation & rejuvenating herbal facials",
  },
];

export const SPA_CATALOGUE: SpaTreatmentItem[] = [
  {
    id: "abhyangam",
    name: "Abhyangam",
    sanskritName: "अभ्यंगम्",
    subtitle: "Full-Body Warm Medicated Oil Massage",
    category: "massages",
    categoryLabel: "Ayurvedic Massage",
    pdfPage: 1,
    description:
      "An authentic Ayurvedic full-body oil massage using warm medicated herbal oils. This therapy helps improve blood circulation, relax tired muscles, nourish the skin, and restore balance to the body and mind.",
    duration: "50 Minutes",
    durationMinutes: 50,
    price: 2200,
    priceFormatted: "₹2,200",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["abhyangam"],
    featured: true,
    tag: "Signature Therapy",
  },
  {
    id: "shirodhara",
    name: "Shirodhara",
    sanskritName: "शिरोधारा",
    subtitle: "Continuous Warm Medicated Oil Forehead Flow",
    category: "panchakarma",
    categoryLabel: "Panchakarma Ritual",
    pdfPage: 2,
    description:
      "A deeply calming Ayurvedic therapy where warm herbal oil is poured steadily over the forehead. It helps relax the nervous system, reduce stress, calm the mind, and promote deep mental peace.",
    duration: "60 Minutes",
    durationMinutes: 60,
    price: 3080,
    priceFormatted: "₹3,080",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["shirodhara"],
    featured: true,
    tag: "Royal Calming",
  },
  {
    id: "marma-massage",
    name: "Marma Massage",
    sanskritName: "मर्म मसाज",
    subtitle: "Vital Energy Point Therapy",
    category: "massages",
    categoryLabel: "Therapeutic Massage",
    pdfPage: 3,
    description:
      "A traditional therapeutic massage focused on the vital energy points of the body. This treatment helps release tension, improve energy flow, reduce discomfort, and support overall relaxation and well-being.",
    duration: "60 Minutes",
    durationMinutes: 60,
    price: 2750,
    priceFormatted: "₹2,750",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["marma-massage"],
    tag: "Energy Balance",
  },
  {
    id: "nasyam",
    name: "Nasyam",
    sanskritName: "नस्यम्",
    subtitle: "Panchakarma Nasal Application Therapy",
    category: "panchakarma",
    categoryLabel: "Panchakarma Therapy",
    pdfPage: 4,
    description:
      "A traditional Panchakarma therapy where medicated herbal oils are gently applied through the nasal passage. It may help clear congestion, ease sinus discomfort, refresh the head, and support better breathing.",
    duration: "25 Minutes",
    durationMinutes: 25,
    price: 880,
    priceFormatted: "₹880",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["nasyam"],
    tag: "Sinus & Clarity",
  },
  {
    id: "herbal-facial",
    name: "Herbal Facial",
    sanskritName: "हर्बल फेशियल",
    subtitle: "Botanical Skin Nourishment & Radiance",
    category: "scrubs-wraps",
    categoryLabel: "Herbal Skincare",
    pdfPage: 5,
    description:
      "A refreshing facial treatment using herbal skincare ingredients tailored for your skin. It helps cleanse, nourish, brighten, and rejuvenate the skin, leaving the face feeling fresh and naturally glowing.",
    duration: "35 Minutes",
    durationMinutes: 35,
    price: 1650,
    priceFormatted: "₹1,650",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["herbal-facial"],
    tag: "Natural Glow",
  },
  {
    id: "synchronized-massage",
    name: "Synchronized Massage",
    sanskritName: "सिंक्रनाइज़्ड मसाज",
    subtitle: "Harmonious Four-Hand Dual Therapist Massage",
    category: "massages",
    categoryLabel: "Four-Hand Therapy",
    pdfPage: 6,
    description:
      "A special four-hand massage performed by two therapists in synchronized movements. This deeply relaxing treatment helps relieve fatigue, improve circulation, tone the body, and create a feeling of complete relaxation.",
    duration: "50 Minutes",
    durationMinutes: 50,
    price: 3300,
    priceFormatted: "₹3,300",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["synchronized-massage"],
    featured: true,
    tag: "Four-Hand Luxury",
  },
  {
    id: "ayur-herbal-wrap",
    name: "Ayur Herbal Wrap",
    sanskritName: "आयुर् हर्बल रैप",
    subtitle: "Full-Body Botanical Decoction Wrap",
    category: "scrubs-wraps",
    categoryLabel: "Herbal Body Wrap",
    pdfPage: 7,
    description:
      "A traditional herbal body wrap using natural Ayurvedic ingredients. This treatment helps hydrate, detoxify, refresh the skin, and provide a calming full-body relaxation experience.",
    duration: "50 Minutes",
    durationMinutes: 50,
    price: 3520,
    priceFormatted: "₹3,520",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["ayur-herbal-wrap"],
    tag: "Deep Detox",
  },
  {
    id: "reflexology",
    name: "Reflexology",
    sanskritName: "रिफ्लेक्सोलॉजी",
    subtitle: "Pressure Point Feet & Hand Therapy",
    category: "targeted",
    categoryLabel: "Pressure Point Therapy",
    pdfPage: 8,
    description:
      "A natural healing therapy based on pressure points in the feet and hands. Reflexology helps relax the body, reduce tiredness, improve comfort, and restore a sense of balance.",
    duration: "25 Minutes",
    durationMinutes: 25,
    price: 1320,
    priceFormatted: "₹1,320",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["reflexology"],
    tag: "Foot & Hand Relief",
  },
  {
    id: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    sanskritName: "डीप टिश्यू मसाज",
    subtitle: "Focused Muscular Relief & Tension Release",
    category: "massages",
    categoryLabel: "Deep Muscle Therapy",
    pdfPage: 9,
    description:
      "A focused massage therapy that works on deeper muscle layers and specific areas of tension. It helps relieve muscle stiffness, ease body pain, and support relaxation after physical stress.",
    duration: "30 Minutes",
    durationMinutes: 30,
    price: 1760,
    priceFormatted: "₹1,760",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["deep-tissue-massage"],
    tag: "Muscle Release",
  },
  {
    id: "head-scalp-massage",
    name: "Head & Scalp Massage",
    sanskritName: "हेड एंड स्कैल्प मसाज",
    subtitle: "Head, Neck & Shoulder Tension Release",
    category: "targeted",
    categoryLabel: "Head & Neck Relief",
    pdfPage: 10,
    description:
      "A relaxing treatment for the head, neck, and shoulders. It helps reduce stress, ease scalp tension, refresh the mind, and promote a calming sense of relaxation.",
    duration: "30 Minutes",
    durationMinutes: 30,
    price: 1100,
    priceFormatted: "₹1,100",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["head-scalp-massage"],
    tag: "Stress Release",
  },
  {
    id: "body-exfoliation-massage",
    name: "Body Exfoliation Massage",
    sanskritName: "बॉडी एक्सफोलिएशन मसाज",
    subtitle: "Gentle Herbal Granule Dead-Cell Scrub",
    category: "scrubs-wraps",
    categoryLabel: "Body Exfoliation",
    pdfPage: 11,
    description:
      "A refreshing body treatment using gentle exfoliation to remove dead skin cells and improve circulation. It helps smoothen the skin, refresh the body, and leave you feeling clean, soft, and rejuvenated.",
    duration: "45 Minutes",
    durationMinutes: 45,
    price: 2860,
    priceFormatted: "₹2,860",
    taxQualification: "+ Taxes As Applicable",
    asset: SPA_PHOTOGRAPHY_REGISTRY["body-exfoliation-massage"],
    tag: "Skin Renewal",
  },
];
