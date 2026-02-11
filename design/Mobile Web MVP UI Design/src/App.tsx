import { useState } from 'react';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantDetail } from './components/RestaurantDetail';

export default function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  if (selectedRestaurant) {
    return <RestaurantDetail id={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />;
  }

  return <RestaurantList onSelectRestaurant={setSelectedRestaurant} />;
}
