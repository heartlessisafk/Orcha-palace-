/**
 * Centralized site configuration and verified business facts for The Orchha Resort.
 * Sourced directly from Phase 1 verified audit documentation.
 */

export const SITE_CONFIG = {
  name: "The Orchha Resort",
  shortName: "Orchha Resort",
  tagline: "Sanctuary by the River Betwa",
  metaDescription:
    "Experience understated royal luxury at The Orchha Resort. Located on the serene banks of the river Betwa in Orchha, featuring 32 heritage rooms & luxury Swiss tents, lotus pool, and authentic Kerala Ayurveda.",
  propertyFacts: {
    totalRooms: 44,
    categories: [
      "Standard Room Garden Facing",
      "Deluxe Room Garden Facing",
      "Deluxe Marble Bed Garden Facing",
      "Super Deluxe Pool Facing",
    ],
    architect: "Yogesh Chandra (New Delhi)",
    signatureFeatures: [
      "Lotus-shaped outdoor swimming pool",
      "Direct views of the 14 Royal Chhatris",
      "Kaleva multi-cuisine restaurant & lounge bar",
      "Kerala Ayurveda spa with herbal steam bath",
      "Riverside tennis and badminton courts",
      "Evening traditional Bundeli folk dance performances",
    ],
  },
  contact: {
    phonePrimary: "+91 99262 19900",
    phoneDesk: "+91 562 2225712",
    phoneReservationsAlternate: "+91 93195 55232",
    email: "orchha@orchharesort.com",
    address: {
      line1: "Kanchanghat, By the River Betwa",
      line2: "Off Jhansi–Khajuraho Highway",
      city: "Orchha",
      district: "Niwari (formerly Tikamgarh)",
      state: "Madhya Pradesh",
      pinCode: "472246",
      country: "India",
    },
    coordinates: {
      lat: 25.3448,
      lng: 78.6395,
    },
    timings: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      reception: "24 Hours / 365 Days",
    },
  },
  transit: {
    nearestRail: "Jhansi Junction (Virangana Lakshmibai) — 18 km (~35 mins)",
    nearestAirport: "Gwalior Airport (GWL) — 125 km (~3 hrs via NH 44)",
    secondaryAirport: "Khajuraho Airport (HJR) — 170 km (~3.5 hrs)",
  },
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "/about" },
      { label: "Rooms", href: "/#rooms" },
      { label: "Gallery", href: "/gallery" },
      { label: "Ayurveda Spa", href: "/spa" },
      { label: "Weddings", href: "/weddings" },
      { label: "Heritage Guide", href: "/about#heritage" },
    ],
    footer: {
      explore: [
        { label: "The Resort Story", href: "/about" },
        { label: "Photo Gallery", href: "/gallery" },
        { label: "Accommodations", href: "/#rooms" },
        { label: "Kaleva Restaurant", href: "/#dining" },
        { label: "Ayurvedic Wellness", href: "/spa" },
        { label: "Royal Weddings", href: "/weddings" },
        { label: "14 Royal Chhatris", href: "/about#spirit" },
      ],
      legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Cancellation Policy", href: "/cancellations" },
      ],
    },
  },
  otaLinks: {
    makeMyTrip: "https://www.makemytrip.com/hotels/the_orchha_resort-details-orchha.html",
    agoda: "https://www.agoda.com/the-orchha-resort/hotel/orchha-in.html",
  },
};
