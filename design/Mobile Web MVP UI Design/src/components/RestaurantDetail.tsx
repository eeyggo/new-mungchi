import { ChevronLeft, MapPin, ExternalLink, CheckCircle2, Phone } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantDetailProps {
  id: string;
  onBack: () => void;
}

export function RestaurantDetail({ id, onBack }: RestaurantDetailProps) {
  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return null;
  }

  const handleCall = () => {
    window.location.href = `tel:${restaurant.phone}`;
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50">
      {/* Desktop Header */}
      <div className="hidden md:block bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="size-5" />
            <span className="text-sm font-medium">목록으로 돌아가기</span>
          </button>
        </div>
      </div>

      <div className="md:max-w-4xl md:mx-auto md:my-6 md:bg-white md:rounded-xl md:overflow-hidden md:shadow-lg">
        {/* Header Image */}
        <div className="relative h-64 md:h-96 bg-gray-100">
          <ImageWithFallback
            src={`https://source.unsplash.com/1200x800/?${encodeURIComponent(restaurant.imageUrl)}`}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          
          {/* Back Button - Mobile Only */}
          <button
            onClick={onBack}
            className="md:hidden absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md active:bg-gray-100"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white rounded-full text-sm font-medium shadow-md">
            {restaurant.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-8">
          {/* Basic Info */}
          <div className="pb-5 md:pb-6 border-b">
            <h1 className="font-bold mb-3 md:mb-4">{restaurant.name}</h1>
            
            <div className="flex items-start gap-2 mb-2 md:mb-3">
              <MapPin className="size-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{restaurant.address}</p>
              </div>
              <a
                href={restaurant.naverPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1 px-2 py-1 text-xs bg-green-50 text-green-700 rounded active:bg-green-100 hover:bg-green-100 transition-colors"
              >
                네이버
                <ExternalLink className="size-3" />
              </a>
            </div>

            <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="text-gray-500 w-16 md:w-20">영업시간</span>
                <span className="text-gray-900">{restaurant.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="text-gray-500 w-16 md:w-20">전화번호</span>
                <span className="text-gray-900">{restaurant.phone}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="py-5 md:py-6 border-b space-y-4">
            {/* Group Order Experience */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {restaurant.hasGroupOrderExperience ? (
                  <>
                    <CheckCircle2 className="size-5 text-green-600" />
                    <span className="text-sm md:text-base font-medium text-green-700">단체주문 경험 있음</span>
                  </>
                ) : (
                  <>
                    <div className="size-5 border-2 border-gray-300 rounded-full" />
                    <span className="text-sm md:text-base font-medium text-gray-600">단체주문 경험 확인 필요</span>
                  </>
                )}
              </div>
            </div>

            {/* Comment */}
            {restaurant.comment && (
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{restaurant.comment}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="py-5 md:py-6">
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button - Desktop: Inside Card */}
        <div className="hidden md:block px-8 pb-8">
          <button
            onClick={handleCall}
            className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 active:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="size-5" />
            전화해서 주문하기
          </button>
        </div>
      </div>

      {/* CTA Button - Mobile: Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleCall}
          className="w-full bg-black text-white py-4 rounded-lg font-medium active:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <Phone className="size-5" />
          전화해서 주문하기
        </button>
      </div>
    </div>
  );
}