import { useState } from 'react';
import { Link2, CheckCircle2 } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantListProps {
  onSelectRestaurant: (id: string) => void;
}

type Category = '전체' | '한식' | '양식' | '카페' | '기타';

export function RestaurantList({ onSelectRestaurant }: RestaurantListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [showCopyToast, setShowCopyToast] = useState(false);

  const categories: Category[] = ['전체', '한식', '양식', '카페', '기타'];

  const filteredRestaurants = selectedCategory === '전체' 
    ? restaurants 
    : restaurants.filter(r => r.category === selectedCategory);

  const handleCopyLink = () => {
    const url = window.location.href;
    
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setShowCopyToast(true);
          setTimeout(() => setShowCopyToast(false), 2000);
        })
        .catch(() => {
          // Fallback to older method
          fallbackCopyTextToClipboard(url);
        });
    } else {
      // Fallback to older method
      fallbackCopyTextToClipboard(url);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-bold">뭉치</h1>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 rounded-full active:bg-gray-200 hover:bg-gray-200 transition-colors"
          >
            <Link2 className="size-4" />
            링크 복사하기
          </button>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 active:bg-gray-200 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Restaurant List */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map(restaurant => (
            <button
              key={restaurant.id}
              onClick={() => onSelectRestaurant(restaurant.id)}
              className="bg-white rounded-lg overflow-hidden shadow-sm active:shadow-md hover:shadow-md transition-shadow text-left"
            >
              {/* Desktop: Vertical Card Layout */}
              <div className="hidden md:block">
                <div className="relative h-48 bg-gray-100">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/600x400/?${encodeURIComponent(restaurant.imageUrl)}`}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.hasGroupOrderExperience && (
                    <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                      <CheckCircle2 className="size-4 text-white" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium rounded-full">
                    {restaurant.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{restaurant.address}</p>
                </div>
              </div>

              {/* Mobile: Horizontal Card Layout */}
              <div className="flex gap-3 p-3 md:hidden">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/400x400/?${encodeURIComponent(restaurant.imageUrl)}`}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.hasGroupOrderExperience && (
                    <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
                      <CheckCircle2 className="size-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                    <span className="flex-shrink-0 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                      {restaurant.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{restaurant.description}</p>
                  <p className="mt-1.5 text-xs text-gray-500 truncate">{restaurant.address}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Ad Banner - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-200 border-t md:hidden">
        <div className="h-16 flex items-center justify-center text-sm text-gray-500">
          광고 영역
        </div>
      </div>

      {/* Ad Banner - Desktop */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 pb-8">
        <div className="bg-gray-200 border rounded-lg h-24 flex items-center justify-center text-sm text-gray-500">
          광고 영역
        </div>
      </div>

      {/* Copy Toast */}
      {showCopyToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm shadow-lg">
          링크가 복사되었습니다
        </div>
      )}
    </div>
  );
}