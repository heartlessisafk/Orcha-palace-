import { SearchQuery, RoomCategory } from "./room";

export type BookingHandoffMethod = "whatsapp" | "email" | "ota-makemytrip" | "ota-agoda" | "phone";

export interface BookingValidationResult {
  isValid: boolean;
  errors: {
    checkInDate?: string;
    checkOutDate?: string;
    guests?: string;
    roomCount?: string;
  };
}

export interface BookingEnquiryPayload extends SearchQuery {
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  specialRequests?: string;
  selectedCategoryName?: string;
}

export interface BookingHandoffTarget {
  id: BookingHandoffMethod;
  name: string;
  description: string;
  icon: string;
  generateUrl: (payload: BookingEnquiryPayload) => string;
}
