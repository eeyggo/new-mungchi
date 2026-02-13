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
    <div className="min-h-screen bg-gradient-to-br from-background via-background-alt to-accent/30 pb-24 md:pb-0">
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

        {/* Section Header with brand accent */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              {selectedCategory === '전체' ? '전체 맛집' : `${selectedCategory} 맛집`}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-brand font-semibold">{filteredRestaurants.length}곳</span>의 식당이 있습니다
            </p>
          </div>
          {/* Brand accent line */}
          <div className="hidden md:block h-0.5 flex-1 max-w-[200px] ml-8 bg-gradient-to-r from-brand/40 to-transparent rounded-full" />
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredRestaurants.length === 0 ? (
            <div className="col-span-full py-24 text-center flex flex-col items-center justify-center">
              <div className="panel-soft max-w-md mx-auto">
                <div className="bg-accent/50 p-6 rounded-full mb-6 inline-block">
                  <p className="text-5xl">🤔</p>
                </div>
                <p className="text-foreground text-xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
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
                  className="pill bg-brand text-primary-foreground hover:shadow-retro-md transition-all"
                >
                  필터 초기화
                </button>
              </div>
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

        {/* Promotional Panel (Partner CTA) */}
        {filteredRestaurants.length > 0 && (
          <div className="mt-16">
            <div className="panel bg-gradient-to-br from-brand/10 via-accent/30 to-background-alt border-brand/20">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  식당을 운영하고 계신가요?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  뭉치에 등록하고 더 많은 단체 고객을 만나보세요. 
                  간편한 등록 절차로 빠르게 시작할 수 있습니다.
                </p>
                <button className="pill bg-brand text-primary-foreground shadow-retro-md hover:shadow-retro-lg hover:scale-105 transition-all text-base px-8 py-3">
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
