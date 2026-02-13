import { supabase } from '@/lib/supabase/client';
import { Restaurant, DbRestaurant, toRestaurant } from '@/lib/types/restaurant';

export async function getRestaurants(): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Failed to fetch restaurants:', error);
    return [];
  }

  return (data as DbRestaurant[]).map(toRestaurant);
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', Number(id))
    .single();

  if (error) {
    console.error('Failed to fetch restaurant:', error);
    return null;
  }

  return toRestaurant(data as DbRestaurant);
}
