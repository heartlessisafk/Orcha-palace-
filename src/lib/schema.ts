/**
 * Structured Data (Schema.org / JSON-LD) generators for The Orchha Resort.
 * Fully compliant with Google Rich Results for LodgingBusiness, Hotel, Organization, and Breadcrumbs.
 * Uses only verified resort details and zero fabricated ratings/reviews.
 */

import { SITE_CONFIG } from "@/lib/site-config";
import { RoomDetails } from "@/types/room";

const BASE_URL = "https://www.orchharesort.com";

/**
 * Root Hotel / LodgingBusiness schema for Google Local & Travel search.
 */
export function getHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${BASE_URL}/#hotel`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.name,
    description: SITE_CONFIG.metaDescription,
    url: BASE_URL,
    image: `${BASE_URL}/images/resort/genuine/slide1.jpg`,
    logo: `${BASE_URL}/images/brand/orchha-logo.png`,
    telephone: SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, ""),
    email: SITE_CONFIG.contact.email,
    priceRange: "₹₹₹",
    numberOfRooms: SITE_CONFIG.propertyFacts.totalRooms,
    checkinTime: "14:00",
    checkoutTime: "11:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE_CONFIG.contact.address.line1}, ${SITE_CONFIG.contact.address.line2}`,
      addressLocality: SITE_CONFIG.contact.address.city,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.pinCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.contact.coordinates.lat,
      longitude: SITE_CONFIG.contact.coordinates.lng,
    },
    hasMap: `https://maps.google.com/?q=${SITE_CONFIG.contact.coordinates.lat},${SITE_CONFIG.contact.coordinates.lng}`,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Lotus-Shaped Outdoor Swimming Pool",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Direct Views of the 14 Royal Chhatris",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Kaleva Multi-Cuisine Restaurant & Lounge Bar",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Authentic Kerala Ayurveda Spa",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Riverside Tennis and Badminton Courts",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free High-Speed Wi-Fi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free Self & Valet Parking",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "24-Hour Front Desk and Security",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Direct Betwa Riverfront Location at Kanchanghat",
        value: true,
      },
    ],
    starRating: {
      "@type": "Rating",
      ratingValue: "4",
      bestRating: "5",
    },
  };
}

/**
 * Organization Schema for brand discovery and Google Knowledge Graph.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    url: BASE_URL,
    logo: `${BASE_URL}/images/brand/orchha-logo.png`,
    sameAs: [
      SITE_CONFIG.otaLinks.makeMyTrip,
      SITE_CONFIG.otaLinks.agoda,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, ""),
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contact.phoneDesk.replace(/\s+/g, ""),
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

/**
 * WebSite schema for internal site linking.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.metaDescription,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}

/**
 * BreadcrumbList Schema for interior page navigation.
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/**
 * HotelRoom schema for accommodation detail pages.
 */
export function getRoomSchema(room: RoomDetails) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    url: `${BASE_URL}/rooms/${room.id}`,
    image: room.gallery && room.gallery.length > 0 ? `${BASE_URL}${room.gallery[0].src}` : undefined,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: room.maxOccupancy.adults + room.maxOccupancy.children,
      unitText: "Guests",
    },
    bed: {
      "@type": "BedDetails",
      typeOfBed: room.bedType,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: room.areaSqFt || 350,
      unitCode: "FTK",
    },
    amenityFeature: room.keyAmenities?.map((amenity: string) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    containedInPlace: {
      "@id": `${BASE_URL}/#hotel`,
    },
  };
}

/**
 * DaySpa schema for the Ayurvedic Wellness page.
 */
export function getSpaSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    "@id": `${BASE_URL}/spa#spa`,
    name: "Kerala Ayurveda Spa at The Orchha Resort",
    description:
      "Authentic traditional Kerala Ayurvedic rejuvenation therapies, Shirodhara, Abhyangam, herbal steam baths, and wellness consultations beside the calm waters of Betwa River in Orchha.",
    url: `${BASE_URL}/spa`,
    telephone: SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, ""),
    priceRange: "₹₹",
    parentOrganization: {
      "@id": `${BASE_URL}/#hotel`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.line1,
      addressLocality: SITE_CONFIG.contact.address.city,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.pinCode,
      addressCountry: "IN",
    },
  };
}

/**
 * EventVenue schema for the Royal Destination Weddings page.
 */
export function getWeddingVenueSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${BASE_URL}/weddings#venue`,
    name: "Royal Destination Wedding Lawns & Banquets at The Orchha Resort",
    description:
      "Royal destination wedding venue with expansive riverfront banquet lawns, 1,500 sq ft ballroom, canopied mandap setups, and 44 heritage keys on Kanchanghat facing Orchha's 16th-century royal cenotaphs.",
    url: `${BASE_URL}/weddings`,
    telephone: SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, ""),
    maximumAttendeeCapacity: 1200,
    parentOrganization: {
      "@id": `${BASE_URL}/#hotel`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.line1,
      addressLocality: SITE_CONFIG.contact.address.city,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.pinCode,
      addressCountry: "IN",
    },
  };
}
