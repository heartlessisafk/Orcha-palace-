export type RoomCategory =
  | "deluxe-garden-view-king-bed"
  | "deluxe-garden-view-twin-bed"
  | "deluxe-marble-bed"
  | "standard-bed"
  | "super-deluxe-pool-view"
  | "standard"
  | "deluxe"
  | string;

export interface RoomAmenity {
  name: string;
  iconName?: string;
}

export interface RoomGalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface RoomSpecItem {
  label: string;
  value: string;
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
  gallery?: RoomGalleryImage[];
  features?: string[];
  specs?: RoomSpecItem[];
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
