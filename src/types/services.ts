export type ServiceCategory = "restaurant" | "hotel" | "vehicle" | "tour";

export interface ServicePost {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  images: string[]; // Base64 or URLs
  price?: string;
  contact?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  serviceId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface TourBooking {
  id: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  customerCCCD: string;
  tourDate: string;
  numberOfPeople: number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}
