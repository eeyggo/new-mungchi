/*
  Design: Retro Modernism Card
  - Clean card structure with rounded corners (20-24px)
  - Thumbnail with soft background
  - Rating badge with primary-soft background
  - Category chips with brand color for emphasis
  - Hover: 2-4px lift + shadow enhancement
*/

import { Restaurant } from "@/lib/types/restaurant";
import { RestaurantImage } from "@/components/restaurant-image";
import { CheckCircle2, MapPin, Star } from 'lucide-react';
import { formatDistance } from "@/lib/utils/location";

interface RestaurantCardProps {
    restaurant: Restaurant;
    onSelectRestaurant: (id: string) => void;
}

export function RestaurantCard({ restaurant, onSelectRestaurant }: RestaurantCardProps) {
    return (
        <button
            onClick={() => onSelectRestaurant(restaurant.id)}
            className="group block w-full bg-card rounded-[20px] overflow-hidden border border-border shadow-retro hover:shadow-retro-lg hover:-translate-y-1 transition-all duration-300"
        >
            {/* Thumbnail with soft cream/blue tint background */}
            <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-background-alt to-accent overflow-hidden">
                <RestaurantImage
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    category={restaurant.category}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Distance Badge - Top Left */}
                {restaurant.distance !== undefined && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-card/95 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-retro border border-border">
                        <MapPin className="size-3 text-brand" />
                        {formatDistance(restaurant.distance)}
                    </div>
                )}

                {/* Rating Badge - Top Right (if we add rating later) */}
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-brand-soft backdrop-blur-sm text-brand text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="size-3 fill-current" />
                    4.5
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 text-left">
                {/* Restaurant Name & Category */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-foreground text-lg leading-tight pr-2 group-hover:text-brand transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {restaurant.name}
                    </h3>
                </div>

                {/* Address */}
                <p className="text-sm text-muted-foreground line-clamp-1 mb-3 flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0" />
                    {restaurant.address}
                </p>

                {/* Tags/Category Chips */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {/* Category chip - always primary color */}
                    <span className="pill-sm bg-brand-soft text-brand border border-brand/20">
                        {restaurant.category}
                    </span>
                    
                    {/* Additional tags */}
                    {restaurant.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="pill-sm bg-accent text-accent-foreground border border-border">
                            {tag}
                        </span>
                    ))}
                    {restaurant.tags && restaurant.tags.length > 2 && (
                        <span className="pill-sm bg-accent text-accent-foreground border border-border">
                            +{restaurant.tags.length - 2}
                        </span>
                    )}
                </div>

                {/* Group Order Experience Badge */}
                {restaurant.hasGroupOrderExperience && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-soft text-brand text-xs font-semibold rounded-full border border-brand/20">
                        <CheckCircle2 className="size-3.5" />
                        <span>단체/간식행사 경험</span>
                    </div>
                )}
            </div>
        </button>
    );
}
