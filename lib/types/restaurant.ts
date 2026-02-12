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

// Supabase DB 행 타입 (snake_case)
export interface DbRestaurant {
  id: number;
  name: string;
  image_url: string | null;
  address: string;
  category: string;
  hours: string | null;
  has_group_order_experience: boolean;
  description: string | null;
  comment: string | null;
  tags: string[];
  phone: string | null;
  naver_place_url: string | null;
  lat: number;
  lng: number;
  created_at: string;
}

export function toRestaurant(db: DbRestaurant): Restaurant {
  return {
    id: String(db.id),
    name: db.name,
    imageUrl: db.image_url ?? '',
    address: db.address,
    category: db.category as Category,
    hours: db.hours ?? '',
    hasGroupOrderExperience: db.has_group_order_experience,
    description: db.description ?? '',
    comment: db.comment ?? '',
    tags: db.tags ?? [],
    phone: db.phone ?? '',
    naverPlaceUrl: db.naver_place_url ?? '',
    lat: db.lat,
    lng: db.lng,
  };
}
