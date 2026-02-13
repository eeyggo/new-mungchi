/*
  Design: Retro Modernism List Layout
  - Warm cream/pastel background gradient
  - Panel-based filter section
  - Clean card grid with generous spacing
  - Brand color for all key elements
*/

'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { RestaurantCard } from '@/components/restaurant-card';
import { RestaurantListHeader } from '@/components/restaurant-list-header';
import { FilterDrawer } from '@/components/filter-drawer';
import { CategoryChips } from '@/components/category-chips';
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

  const handleLocationToggle = useCallback((enabled: boolean, location?: { lat: number; lng: number }) => {
    setLocationEnabled(enabled);
    if (enabled && location) {
      setUserLocation(location);
    } else {
      setUserLocation(null);
    }
  }, []);

  const activeFilterCount =
    (selectedCategory !== '전체' ? 1 : 0) +
    selectedTags.length +
    (locationEnabled ? 1 : 0);

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    if (selectedCategory !== '전체') {
      result = result.filter(r => r.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter(restaurant =>
        selectedTags.every(tag => restaurant.tags?.includes(tag))
      );
    }

    if (locationEnabled && userLocation) {
      result = result
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

    return result;
  }, [restaurants, selectedCategory, selectedTags, locationEnabled, userLocation]);

  const router = useRouter();

  const handleSelectRestaurant = useCallback((id: string) => {
    router.push(`/restaurant/${id}`);
  }, [router]);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Checkered border at top */}
      <div className="checkered-border" />
      <RestaurantListHeader />

      <FilterDrawer
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        locationEnabled={locationEnabled}
        onLocationToggle={handleLocationToggle}
      />

      <main className="max-w-7xl mx-auto px-4 pb-6 pt-2 md:px-6 md:pb-8 md:pt-3 lg:px-8 lg:pb-10 lg:pt-4">
        {/* Filter Panel */}
        <div className="mb-6">
          <CategoryChips
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            locationEnabled={locationEnabled}
            onLocationToggle={(enabled) => handleLocationToggle(enabled)}
            onFilterClick={() => setIsFilterOpen(true)}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Section Header - 70s Bold Typography */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-retro-brown mb-2">
            {selectedCategory === '전체' ? '전체 맛집' : `${selectedCategory} 맛집`}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-1 w-16 bg-primary rounded-full" />
            <p className="text-lg text-muted-foreground font-medium">
              <span className="text-primary font-bold">{filteredRestaurants.length}곳</span>
            </p>
            <div className="h-1 w-16 bg-retro-orange rounded-full" />
          </div>
        </div>

        {/* Restaurant List - Vertical Stack */}
        <div className="space-y-6">
          {filteredRestaurants.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center justify-center">
              <div className="card-retro max-w-md mx-auto">
                <div className="bg-accent/50 p-6 rounded-full mb-6 inline-block">
                  <p className="text-5xl">🤔</p>
                </div>
                <p className="text-foreground text-2xl font-bold mb-2">
                  조건에 맞는 식당이 없습니다
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  필터를 조금 더 넓게 설정해보세요
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('전체');
                    setSelectedTags([]);
                    setLocationEnabled(false);
                  }}
                  className="pill-retro bg-primary text-primary-foreground hover-retro"
                >
                  필터 초기화
                </button>
              </div>
            </div>
          ) : (
            filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelectRestaurant={handleSelectRestaurant}
                index={index}
              />
            ))
          )}
        </div>

        {/* Promotional Panel (Partner CTA) */}
        {filteredRestaurants.length > 0 && (
          <div className="mt-16">
            <div className="cta-panel relative overflow-hidden">
              {/* Decorative geometric shapes */}
              <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary opacity-30" />
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-retro-orange opacity-20 rotate-45" />
              <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full bg-retro-red opacity-20" />
              
              <div className="max-w-2xl mx-auto text-center relative z-10">
                <h3 className="text-3xl md:text-5xl font-bold text-retro-brown mb-4">
                  식당을 운영하고 계신가요?
                </h3>
                <p className="text-foreground mb-8 leading-relaxed text-lg font-medium">
                  뭉치에 등록하고 더 많은 단체 고객을 만나보세요!
                </p>
                <button className="pill-retro bg-primary text-primary-foreground hover-retro text-lg px-10 py-4">
                  파트너 등록하기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <AdBanner />
    </div>
  );
}
