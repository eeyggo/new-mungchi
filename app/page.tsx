import { Suspense } from 'react';
import { getRestaurants } from '@/lib/data/restaurants';
import { RestaurantList } from '@/components/restaurant-list';
import { RestaurantListSkeleton } from '@/components/restaurant-card-skeleton';

async function RestaurantListLoader() {
  const restaurants = await getRestaurants();
  return <RestaurantList restaurants={restaurants} />;
}

export default function Home() {
  return (
    <Suspense fallback={<RestaurantListSkeleton />}>
      <RestaurantListLoader />
    </Suspense>
  );
}
