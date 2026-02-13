// import { supabase } from '@/lib/supabase/client';
import { Restaurant, DbRestaurant, toRestaurant } from '@/lib/types/restaurant';

const RESTAURANT_COLUMNS = 'id, name, image_url, address, category, hours, has_group_order_experience, comment, tags, phone, naver_place_url, lat, lng';

// Mock data for testing design
const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: '본죽&비빔밥',
    imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80',
    address: '서울 성북구 안암동5가 146-18',
    category: '한식',
    hours: '매일 10:00 - 21:00',
    hasGroupOrderExperience: true,
    comment: '단체/간식행사 경험 있음',
    tags: ['비빔밥', '거북이'],
    phone: '02-1234-5678',
    naverPlaceUrl: 'https://naver.me/example',
    lat: 37.5665,
    lng: 127.0000,
  },
  {
    id: '2',
    name: '비비당',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
    address: '서울 성북구 안암동5가 147-5',
    category: '한식',
    hours: '매일 11:00 - 22:00',
    hasGroupOrderExperience: true,
    comment: '단체 주문 가능',
    tags: ['거북이', '닭'],
    phone: '02-2345-6789',
    naverPlaceUrl: 'https://naver.me/example',
    lat: 37.5665,
    lng: 127.0010,
  },
  {
    id: '3',
    name: '고래도키스',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
    address: '서울 동대문구 제기동 137-46',
    category: '돈까스',
    hours: '매일 11:00 - 21:00',
    hasGroupOrderExperience: false,
    comment: '',
    tags: ['돈까스', '스트릿푸드'],
    phone: '02-3456-7890',
    naverPlaceUrl: 'https://naver.me/example',
    lat: 37.5675,
    lng: 127.0020,
  },
  {
    id: '4',
    name: '밀플랜비',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    address: '서울 성북구 개운사길 52 1층',
    category: '양식',
    hours: '화-일 11:30 - 21:00',
    hasGroupOrderExperience: true,
    comment: '단체 예약 가능',
    tags: ['프로마쥬', '스트릿푸드'],
    phone: '02-4567-8901',
    naverPlaceUrl: 'https://naver.me/example',
    lat: 37.5685,
    lng: 127.0030,
  },
  {
    id: '5',
    name: '프로마쥬',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    address: '서울 성북구 안암로 103-149',
    category: '샌드위치',
    hours: '매일 10:00 - 20:00',
    hasGroupOrderExperience: false,
    comment: '',
    tags: ['샌드위치', '스트릿푸드'],
    phone: '02-5678-9012',
    naverPlaceUrl: 'https://naver.me/example',
    lat: 37.5695,
    lng: 127.0040,
  },
  {
    id: '6',
    name: '치비치비',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    address: '서울 성북구 성북구 안암동 103-101',
    category: '양식',
    hours: '매일 11:00 - 22:00',
    hasGroupOrderExperience: true,
    comment: '단체/간식행사 경험',
    tags: ['스테이크', '대접'],
    phone: '02-6789-0123',
    naverPlaceUrl: 'https://naver.me/example',
    lat: 37.5705,
    lng: 127.0050,
  },
];

export async function getRestaurants(): Promise<Restaurant[]> {
  // Return mock data instead of fetching from Supabase
  return Promise.resolve(MOCK_RESTAURANTS);
  
  /* Original Supabase code:
  const { data, error } = await supabase
    .from('restaurants')
    .select(RESTAURANT_COLUMNS)
    .order('id', { ascending: true });

  if (error) {
    console.error('Failed to fetch restaurants:', error);
    return [];
  }

  return (data as DbRestaurant[]).map(toRestaurant);
  */
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  // Return mock data instead of fetching from Supabase
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  return Promise.resolve(restaurant || null);
  
  /* Original Supabase code:
  const numericId = Number(id);
  if (!id || isNaN(numericId)) {
    return null;
  }

  const { data, error } = await supabase
    .from('restaurants')
    .select(RESTAURANT_COLUMNS)
    .eq('id', numericId)
    .single();

  if (error) {
    console.error('Failed to fetch restaurant:', error);
    return null;
  }

  return toRestaurant(data as DbRestaurant);
  */
}
