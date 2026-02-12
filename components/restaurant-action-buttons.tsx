'use client';

import { Phone } from 'lucide-react';
import { Restaurant } from '@/lib/types/restaurant';

interface RestaurantActionButtonsProps {
    restaurant: Restaurant;
}

export function RestaurantActionButtons({ restaurant }: RestaurantActionButtonsProps) {
    const handleCall = () => {
        window.location.href = `tel:${restaurant.phone}`;
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-40">
            <button
                onClick={handleCall}
                className="w-full bg-black text-white py-4 rounded-lg font-medium active:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
                <Phone className="size-5" />
                전화해서 주문하기
            </button>
        </div>
    );
}
