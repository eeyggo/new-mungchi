export type Category = '전체' | '한식' | '양식' | '일식' | '분식' | '샌드위치' | '샐러드' | '디저트' | '빵' | '패스트푸드' | '카페' | '기타';

export const CATEGORIES: Category[] = ['전체', '한식', '양식', '일식', '분식', '샌드위치', '샐러드', '디저트', '빵', '패스트푸드', '카페', '기타'];

const PLACEHOLDER_IMAGE = '/images/placeholder-restaurant.svg';

export interface Restaurant {
  id: string;
  name: string;
  category: Category;
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
  comment: string | null;
  tags: string[];
  phone: string | null;
  naver_place_url: string | null;
  lat: number;
  lng: number;
  created_at: string;
}

function toCategory(value: string): Category {
  const valid = CATEGORIES.filter((c): c is Category => c !== '전체');
  return valid.includes(value as Category) ? (value as Category) : '기타';
}

export function toRestaurant(db: DbRestaurant): Restaurant {
  return {
    id: String(db.id),
    name: db.name,
    imageUrl: db.image_url || PLACEHOLDER_IMAGE,
    address: db.address,
    category: toCategory(db.category),
    hours: db.hours ?? '',
    hasGroupOrderExperience: db.has_group_order_experience,
    comment: db.comment ?? '',
    tags: db.tags ?? [],
    phone: db.phone ?? '',
    naverPlaceUrl: db.naver_place_url ?? '',
    lat: db.lat,
    lng: db.lng,
  };
}
