import { getRestaurants } from '@/lib/data/restaurants';
import { RestaurantList } from '@/components/restaurant-list';

export default async function Home() {
  const restaurants = await getRestaurants();

  return <RestaurantList restaurants={restaurants} />;
}
