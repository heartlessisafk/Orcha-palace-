export type RoomCategory = "standard" | "deluxe" | "swiss-tent" | "suite";

export interface RoomAmenity {
  name: string;
  iconName?: string;
}

export interface RoomDetails {
  id: string;
  category: RoomCategory;
  name: string;
  tagline: string;
  description: string;
  startingPriceInr: number;
  areaSqFt: number;
  bedType: string;
  maxOccupancy: {
    adults: number;
    children: number;
  };
  views: string[];
  keyAmenities: string[];
  imageKey: string;
  badge?: string;
  inventoryNote?: string;
}

export interface SearchQuery {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  roomCount: number;
  preferredCategory?: RoomCategory;
}
