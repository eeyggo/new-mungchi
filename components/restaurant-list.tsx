'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RestaurantCard } from '@/components/restaurant-card';
import { RestaurantListHeader } from '@/components/restaurant-list-header';
import { FilterSheet } from '@/components/filter-sheet';
import { AdBanner } from '@/components/ad-banner';
import { Category, Restaurant } from '@/lib/types/restaurant';
import { calculateDistance } from '@/lib/utils/location';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleLocationToggle = (enabled: boolean, location?: { lat: number; lng: number }) => {
    setLocationEnabled(enabled);
    if (enabled && location) {
      setUserLocation(location);
    } else {
      setUserLocation(null);
    }
  };

  // 필터링 로직
  let filteredRestaurants = restaurants;

  // 1. 카테고리 필터
  if (selectedCategory !== '전체') {
    filteredRestaurants = filteredRestaurants.filter(r => r.category === selectedCategory);
  }

  // 2. 태그 필터 (AND)
  if (selectedTags.length > 0) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      selectedTags.every(tag => restaurant.tags?.includes(tag))
    );
  }

  // 3. 위치 기반 정렬
  if (locationEnabled && userLocation) {
    filteredRestaurants = filteredRestaurants
      .map(restaurant => ({
        ...restaurant,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.lat,
          restaurant.lng
        ),
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  const router = useRouter();

  const handleSelectRestaurant = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <RestaurantListHeader onFilterClick={() => setIsFilterOpen(true)} />

      <FilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        locationEnabled={locationEnabled}
        onLocationToggle={handleLocationToggle}
      />

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedCategory === '전체' ? '전체 맛집' : `${selectedCategory} 맛집`}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredRestaurants.length}곳)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length === 0 ? (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <p className="text-4xl">🤔</p>
              </div>
              <p className="text-gray-600 text-lg font-medium mb-1">조건에 맞는 식당이 없습니다</p>
              <p className="text-gray-400 text-sm">필터를 조금 더 넓게 설정해보세요</p>
              <button
                onClick={() => {
                  setSelectedCategory('전체');
                  setSelectedTags([]);
                  setLocationEnabled(false);
                }}
                className="mt-4 text-primary hover:underline text-sm font-medium"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelectRestaurant={handleSelectRestaurant}
              />
            ))
          )}
        </div>
      </main>

      <AdBanner />
    </div>
  );
}
