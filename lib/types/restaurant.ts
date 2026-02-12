export type Category = '전체' | '한식' | '양식' | '카페' | '기타';

export interface Restaurant {
  id: string;
  name: string;
  category: Category;
  description: string;
  address: string;
  imageUrl: string;
  phone: string;
  hours: string;
  hasGroupOrderExperience: boolean;
  comment: string;
  tags: string[];
  naverPlaceUrl: string;
  lat: number;
  lng: number;
  distance?: number;
}

export interface RestaurantFilters {
  category?: string;
}
