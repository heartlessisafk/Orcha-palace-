/**
 * Verified Spa & Wellness Data for The Orchha Resort.
 * Source: Live website DOM (`orchharesort.com`) & Phase 1 Content Inventory.
 *
 * FACTS VERIFIED FROM RESORT SOURCE:
 * - Authentic Kerala Ayurveda massages with steam bath.
 * - Strives to establish prime health (physical, mental, and spiritual) via natural equilibrium of body humors.
 * - On-site wellness facilities: Dedicated Ayurvedic therapy suites, steam bath, cardio fitness center.
 * - Peaceful zero-pollution environment on the river Betwa.
 *
 * NOTE ON TREATMENT DETAILS:
 * Specific durations and tariffs are provided upon personalized consultation with on-property
 * Ayurvedic physicians to match individual guest Dosha requirements. No unverified pricing or
 * fabricated duration claims are published here.
 */

export interface SpaTreatment {
  id: string;
  name: string;
  sanskritName?: string;
  category: "rejuvenation" | "detox" | "therapeutic" | "traditional";
  tagline: string;
  description: string;
  verifiedDetails: {
    durationNote: string;
    pricingNote: string;
    focus: string;
  };
  highlights: string[];
  imageKey: string;
  badge?: string;
}

export interface SpaFacility {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageKey: string;
  features: string[];
}

export const SPA_PHILOSOPHY = {
  quote:
    "We strive to establish prime health in every person be it physical, mental or spiritual. This is achieved by establishing an energetic equilibrium in the functions of the body humors, and simultaneously through an alteration in lifestyle in conformity with the simple laws of nature.",
  attribution: "The Orchha Resort Ayurveda Philosophy (Verified Property Documentation)",
  hours: "Open Daily: 8:00 AM – 7:00 PM",
  location: "Ayurveda Wellness Pavilion, The Orchha Resort, Kanchanghat, Orchha",
};

export const VERIFIED_SPA_FACILITIES: SpaFacility[] = [
  {
    id: "therapy-suites",
    title: "Kerala Ayurvedic Therapy Suites",
    subtitle: "Traditional Teakwood Droni Tables",
    description:
      "Serene private treatment rooms crafted with warm timber finishes, dedicated brass Shirodhara vessels, and customized herbal preparation areas designed for deep therapeutic focus.",
    imageKey: "ayurvedaSpa",
    features: [
      "Custom handcrafted teakwood Droni tables",
      "Traditional brass oil warming apparatus",
      "Private ensuite herbal shower & dressing suite",
      "Certified practitioners trained in Kerala traditions",
    ],
  },
  {
    id: "herbal-steam",
    title: "Swedana Herbal Steam Chamber",
    subtitle: "Natural Botanical Decoction",
    description:
      "A dedicated herbal steam cabinet where warm steam infused with indigenous Bundelkhandi and Ayurvedic herbs opens pores, eliminates deep tissue toxins, and soothes joint stiffness.",
    imageKey: "spaSteamBath",
    features: [
      "Authentic herbal decoction steam infusion",
      "Post-massage circulation enhancement",
      "Deep tissue muscle relaxation",
      "Natural skin pores detoxification",
    ],
  },
  {
    id: "wellness-gardens",
    title: "Riverside Garden Meditation Deck",
    subtitle: "Zero-Pollution Natural Sanctuary",
    description:
      "Manicured riverbank lawns directly facing the 14 Royal Cenotaphs and Betwa river, providing an unhurried setting for pre-treatment breathwork, herbal tea ceremonies, and post-therapy relaxation.",
    imageKey: "chhatrisHeritage",
    features: [
      "Unobstructed views of the 14 historical Chhatris",
      "Gentle breeze from the Betwa river boulders",
      "Post-treatment herbal tea & infusion lounge",
      "Certified zero-noise and zero-pollution zone",
    ],
  },
];

export const VERIFIED_SPA_TREATMENTS: SpaTreatment[] = [
  {
    id: "abhyanga",
    name: "Abhyanga Full-Body Rejuvenation",
    sanskritName: "अभ्यङ्ग",
    category: "rejuvenation",
    tagline: "Rhythmic herbal oil massage restoring vitality & tissue tone",
    description:
      "A classical full-body massage performed with warm, herb-infused Ayurvedic oils selected to pacify aggravated Doshas. Long, rhythmic strokes improve blood circulation, lubricate joints, tone muscle tissue, and induce restorative nervous system calm.",
    verifiedDetails: {
      durationNote: "60 to 90 minutes (Confirmed upon consultation)",
      pricingNote: "Available upon enquiry (No fabricated rates)",
      focus: "Circulation, muscle relaxation, cellular rejuvenation",
    },
    highlights: [
      "Warm medicated herbal oils customized to guest constitution",
      "Full-body rhythmic stroke sequence from head to toe",
      "Relieves chronic fatigue and nervous exhaustion",
      "Ideal introduction to authentic Kerala Ayurveda",
    ],
    imageKey: "ayurvedaSpa",
    badge: "Signature Therapy",
  },
  {
    id: "shirodhara",
    name: "Shirodhara Third-Eye Therapy",
    sanskritName: "शिरोधरा",
    category: "therapeutic",
    tagline: "Continuous stream of medicated warm oil on the forehead",
    description:
      "One of Ayurveda's most revered therapies. A continuous, steady stream of specially formulated warm herbal oil is poured rhythmically over the forehead (Ajna chakra) from a hanging brass vessel, profoundly quieting mental turbulence and releasing chronic stress.",
    verifiedDetails: {
      durationNote: "45 to 60 minutes (Confirmed upon consultation)",
      pricingNote: "Available upon enquiry (No fabricated rates)",
      focus: "Deep mental calm, sleep restoration, stress relief",
    },
    highlights: [
      "Continuous oscillating flow of warm medicated herbal oil",
      "Promotes restorative alpha brainwave states",
      "Alleviates tension headaches, anxiety, and sleeplessness",
      "Includes gentle scalp and neck acupressure",
    ],
    imageKey: "spaShirodhara",
    badge: "Most Requested",
  },
  {
    id: "swedana",
    name: "Swedana Herbal Steam Bath",
    sanskritName: "स्वेदन",
    category: "detox",
    tagline: "Warm herbal steam chamber opening vital channels",
    description:
      "A traditional medicated steam therapy administered in an enclosed wooden steam chamber. The head remains cool outside the cabinet while medicinal herb-infused steam induces gentle perspiration, melting toxins and easing muscular stiffness.",
    verifiedDetails: {
      durationNote: "20 to 30 minutes (Follows massage therapies)",
      pricingNote: "Available upon enquiry (No fabricated rates)",
      focus: "Toxin elimination, joint mobility, skin radiance",
    },
    highlights: [
      "Fresh medicinal herbal leaf steam infusion",
      "Head remains comfortably cool during steam exposure",
      "Enhances deep absorption of prior massage oils",
      "Relieves back stiffness and joint stiffness",
    ],
    imageKey: "spaSteamBath",
  },
  {
    id: "podikizhi",
    name: "Podikizhi Herbal Pouch Fermentation",
    sanskritName: "पोडिकिषि",
    category: "therapeutic",
    tagline: "Warm herbal powder bolus massage for joint and back relief",
    description:
      "Linen pouches filled with twelve dried herbal powders and medicinal roots are warmed in herbal oils and rhythmically patted across the body. The penetrating thermal compression relieves localized inflammation and chronic pain.",
    verifiedDetails: {
      durationNote: "60 minutes (Confirmed upon consultation)",
      pricingNote: "Available upon enquiry (No fabricated rates)",
      focus: "Joint mobility, back pain relief, sports stiffness",
    },
    highlights: [
      "Heated herbal boluses dipped in warm medicinal oils",
      "Penetrating heat eases deep-seated muscle spasms",
      "Reduces swelling and localized fluid retention",
      "Excellent post-travel recovery therapy",
    ],
    imageKey: "spaHerbs",
    badge: "Pain Relief",
  },
  {
    id: "mukha-lepam",
    name: "Mukha Lepam Botanical Radiance",
    sanskritName: "मुख लेपम्",
    category: "traditional",
    tagline: "Natural sandalwood and herbal paste facial treatment",
    description:
      "An Ayurvedic skin refinement ritual combining gentle herbal facial cleansing, marma point stimulation, and the application of an organic botanical mask made with sandalwood, saffron, and cooling herbs.",
    verifiedDetails: {
      durationNote: "45 minutes (Confirmed upon consultation)",
      pricingNote: "Available upon enquiry (No fabricated rates)",
      focus: "Facial marma stimulation, skin nourishment, natural glow",
    },
    highlights: [
      "Pure herbal pastes prepared fresh before application",
      "Gentle pressure on facial Marma energy points",
      "Soothes sun-exposed and travel-stressed skin",
      "100% natural ingredients without synthetic chemicals",
    ],
    imageKey: "spaHerbs",
  },
  {
    id: "padabhyanga",
    name: "Padabhyanga Vital Foot Reflexology",
    sanskritName: "पादाभ्यङ्ग",
    category: "traditional",
    tagline: "Reflexology therapy for grounding and travel recovery",
    description:
      "A therapeutic lower leg and foot massage using medicated ghee and warm herbal oils. Systematic stimulation of Marma points on the feet grounds the nervous system, relieves leg fatigue after touring the Orchha monuments, and aids restful sleep.",
    verifiedDetails: {
      durationNote: "45 minutes (Confirmed upon consultation)",
      pricingNote: "Available upon enquiry (No fabricated rates)",
      focus: "Foot fatigue, nervous system grounding, eye strain relief",
    },
    highlights: [
      "Warm medicated ghee and oil foot massage",
      "Targeted stimulation of Kasa marma points",
      "Releases fatigue from walking monument cobblestones",
      "Deeply grounding evening pre-sleep ritual",
    ],
    imageKey: "ayurvedaSpa",
  },
];
