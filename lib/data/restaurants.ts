import { supabase } from '@/lib/supabase/client';
import { Restaurant, DbRestaurant, toRestaurant } from '@/lib/types/restaurant';

const RESTAURANT_COLUMNS = 'id, name, image_url, address, category, hours, has_group_order_experience, comment, tags, phone, naver_place_url, lat, lng';

export async function getRestaurants(): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select(RESTAURANT_COLUMNS)
    .order('id', { ascending: true });

  if (error) {
    console.error('Failed to fetch restaurants:', error);
    return [];
  }

  return (data as DbRestaurant[]).map(toRestaurant);
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
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
}
