/*
  Design: 1970s Retro Catalog Card
  - Thick brown borders, flat shadows
  - Geometric frame with diagonal stripes accent
  - Icon-based (not photo-based) food illustrations
  - Bold typography, numbered badges
  - Flat color blocks for categories
*/

import { Restaurant } from "@/lib/types/restaurant";
import { RestaurantImage } from "@/components/restaurant-image";
import { Users, MapPin, Star } from 'lucide-react';

interface RestaurantCardProps {
    restaurant: Restaurant;
    onSelectRestaurant: (id: string) => void;
    index: number; // For catalog numbering
}

export function RestaurantCard({ restaurant, onSelectRestaurant, index }: RestaurantCardProps) {
    return (
        <button
            onClick={() => onSelectRestaurant(restaurant.id)}
            className="card-retro hover-retro w-full group relative"
        >
            {/* Diagonal stripe accent in corner */}
            <div className="absolute top-0 left-0 w-16 h-16 diagonal-stripes rounded-tl-[var(--radius)]" />
            
            <div className="flex items-center gap-4">
                {/* Left: Icon Circle */}
                <div className="icon-circle shrink-0 relative">
                    <RestaurantImage
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        category={restaurant.category}
                        fill
                        className="object-cover rounded-full p-4"
                        sizes="128px"
                    />
                    {/* Halftone texture overlay */}
                    <div className="absolute inset-0 halftone-dots rounded-full pointer-events-none opacity-20" />
                </div>

                {/* Right: Restaurant Info */}
                <div className="flex-1 text-left min-w-0">
                    {/* Restaurant Name - Bold 70s Typography */}
                    <h3 className="text-xl md:text-2xl font-bold text-retro-brown mb-1 group-hover:text-primary transition-colors">
                        {restaurant.name}
                    </h3>

                    {/* Address */}
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate">{restaurant.address}</span>
                    </p>

                    {/* Category Pills & Rating */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {/* Category - Primary Blue */}
                        <span className="pill-retro-sm bg-primary text-primary-foreground">
                            {restaurant.category}
                        </span>
                        
                        {/* Additional tags */}
                        {restaurant.tags?.slice(0, 1).map(tag => (
                            <span key={tag} className="pill-retro-sm bg-card text-foreground border-2 border-[hsl(var(--border))]">
                                {tag}
                            </span>
                        ))}

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 text-retro-yellow">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="size-4 fill-current" />
                            ))}
                        </div>
                    </div>

                    {/* Group Order Badge */}
                    {restaurant.hasGroupOrderExperience && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-retro-orange text-white text-xs font-bold rounded-full">
                            <Users className="size-3.5" />
                            <span>단체석 완비</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Catalog Number Badge - Bottom Right */}
            <div className="absolute -bottom-2 -right-2 badge-number">
                {index + 1}
            </div>
        </button>
    );
}
