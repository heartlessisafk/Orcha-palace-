import { SearchQuery, RoomDetails } from "@/types/room";
import { BookingValidationResult, BookingEnquiryPayload, BookingHandoffTarget } from "@/types/booking";
import { SITE_CONFIG } from "./site-config";

/**
 * Validates search query parameters for the room search interface.
 */
export function validateSearchQuery(query: Partial<SearchQuery>): BookingValidationResult {
  const errors: BookingValidationResult["errors"] = {};

  if (!query.checkInDate) {
    errors.checkInDate = "Please select a check-in date";
  }

  if (!query.checkOutDate) {
    errors.checkOutDate = "Please select a check-out date";
  }

  if (query.checkInDate && query.checkOutDate) {
    const checkIn = new Date(query.checkInDate);
    const checkOut = new Date(query.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      errors.checkInDate = "Check-in date cannot be in the past";
    }

    if (checkOut <= checkIn) {
      errors.checkOutDate = "Check-out date must be after check-in date";
    }
  }

  const adults = query.adults ?? 0;
  if (adults < 1) {
    errors.guests = "At least 1 adult is required";
  } else if (adults > 5) {
    errors.guests = "Maximum 5 adults allowed per room search";
  }

  const roomCount = query.roomCount ?? 0;
  if (roomCount < 1 || roomCount > 3) {
    errors.roomCount = "Select between 1 and 3 rooms";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates formatted WhatsApp reservation URL for the direct concierge desk.
 * Phone verified: +91 99262 19900
 */
export function generateWhatsAppBookingUrl(payload: BookingEnquiryPayload): string {
  const lines = [
    `*Reservation Enquiry — The Orchha Resort*`,
    `----------------------------------------`,
    `Check-in: ${payload.checkInDate}`,
    `Check-out: ${payload.checkOutDate}`,
    `Rooms: ${payload.roomCount}`,
    `Guests: ${payload.adults} Adults${payload.children > 0 ? `, ${payload.children} Children` : ""}`,
    payload.selectedCategoryName ? `Preferred Room: ${payload.selectedCategoryName}` : null,
    payload.guestName ? `Guest Name: ${payload.guestName}` : null,
    payload.specialRequests ? `Special Requests: ${payload.specialRequests}` : null,
    `----------------------------------------`,
    `Sent from Orchha Resort Website Concierge`,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  const phone = SITE_CONFIG.contact.phonePrimary.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${text}`;
}

/**
 * Generates formatted mailto URL for direct email reservations.
 */
export function generateEmailBookingUrl(payload: BookingEnquiryPayload): string {
  const subject = encodeURIComponent(
    `Room Reservation Enquiry: ${payload.checkInDate} to ${payload.checkOutDate} (${payload.adults} Adults, ${payload.roomCount} Rooms)`
  );

  const body = encodeURIComponent(
    `Dear Reservations Team,\n\nI would like to enquire about room availability at The Orchha Resort with the following details:\n\n` +
      `- Check-In Date: ${payload.checkInDate}\n` +
      `- Check-Out Date: ${payload.checkOutDate}\n` +
      `- Number of Rooms: ${payload.roomCount}\n` +
      `- Number of Adults: ${payload.adults}\n` +
      `- Number of Children: ${payload.children}\n` +
      (payload.selectedCategoryName ? `- Preferred Category: ${payload.selectedCategoryName}\n` : "") +
      (payload.guestName ? `- Guest Name: ${payload.guestName}\n` : "") +
      (payload.guestPhone ? `- Contact Phone: ${payload.guestPhone}\n` : "") +
      (payload.specialRequests ? `- Special Requests: ${payload.specialRequests}\n` : "") +
      `\nPlease let me know availability and tariff options.\n\nThank you.`
  );

  return `mailto:${SITE_CONFIG.contact.email}?subject=${subject}&body=${body}`;
}

/**
 * Available booking handoff targets.
 */
export const BOOKING_HANDOFF_TARGETS: BookingHandoffTarget[] = [
  {
    id: "whatsapp",
    name: "Instant WhatsApp Concierge",
    description: "Connect directly with our 24/7 on-property reservation desk for personalized rates and room selection.",
    icon: "MessageCircle",
    generateUrl: generateWhatsAppBookingUrl,
  },
  {
    id: "email",
    name: "Direct Email Reservation",
    description: "Send a formal enquiry to orchha@orchharesort.com with customized itinerary requests.",
    icon: "Mail",
    generateUrl: generateEmailBookingUrl,
  },
  {
    id: "ota-makemytrip",
    name: "MakeMyTrip Instant Booking",
    description: "Reserve with instant automated card payment on MakeMyTrip.",
    icon: "ExternalLink",
    generateUrl: () => SITE_CONFIG.otaLinks.makeMyTrip,
  },
  {
    id: "ota-agoda",
    name: "Agoda Instant Booking",
    description: "Official listing on Agoda with international card support.",
    icon: "ExternalLink",
    generateUrl: () => SITE_CONFIG.otaLinks.agoda,
  },
];
