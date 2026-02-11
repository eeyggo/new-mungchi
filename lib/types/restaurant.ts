export interface Restaurant {
  id: number;
  name: string;
  image: string;
  address: string;
  category: string;
  businessHours: string;
  hasGroupEventExpr: boolean; // 단체/간식행사 경험 유무
  specialNotes: string;
  tags: string[];
  phoneNumber: string;
  naverMapUrl: string;
  kakaoMapUrl?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantFilters {
  category?: string;
  tags?: string[];
  searchQuery?: string;
  userLocation?: {
    latitude: number;
    longitude: number;
  };
  maxDistance?: number; // km 단위
}
