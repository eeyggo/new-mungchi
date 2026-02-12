import Image from "next/image";
import { Restaurant } from "@/lib/types/restaurant";
import { CheckCircle2, MapPin } from 'lucide-react';
import { formatDistance } from "@/lib/utils/location";

interface RestaurantCardProps {
    restaurant: Restaurant;
    onSelectRestaurant: (id: string) => void;
}

export function RestaurantCard({ restaurant, onSelectRestaurant }: RestaurantCardProps) {
    return (
        <button
            onClick={() => onSelectRestaurant(restaurant.id)}
            className="group block w-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Distance Badge if available */}
                {restaurant.distance !== undefined && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <MapPin className="size-3" />
                        {formatDistance(restaurant.distance)}
                    </div>
                )}

                {/* Tags overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent pt-8">
                    <div className="flex flex-wrap gap-1.5 justify-end">
                        {restaurant.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] font-medium text-white px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-md border border-white/10">
                                {tag}
                            </span>
                        ))}
                        {restaurant.tags && restaurant.tags.length > 2 && (
                            <span className="text-[10px] font-medium text-white px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-md border border-white/10">
                                +{restaurant.tags.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 text-left">
                <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-lg truncate pr-2 group-hover:text-primary transition-colors">
                        {restaurant.name}
                    </h3>
                    <div className="shrink-0 px-2 py-1 bg-gray-50 text-xs font-medium text-gray-600 rounded-md border border-gray-100">
                        {restaurant.category}
                    </div>
                </div>

                <p className="text-sm text-gray-500 line-clamp-1 mb-2.5 flex items-center gap-1">
                    {restaurant.address}
                </p>

                {restaurant.hasGroupOrderExperience && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                        <CheckCircle2 className="size-3.5" />
                        <span>단체/간식 경험</span>
                    </div>
                )}
            </div>
        </button>
    );
}
