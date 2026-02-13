'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Category } from '@/lib/types/restaurant';

// [주석처리] lucide-react 아이콘 기반 카테고리 아이콘
// import {
//     Soup,
//     Beef,
//     Fish,
//     CookingPot,
//     Sandwich,
//     Salad,
//     IceCreamCone,
//     Croissant,
//     Pizza,
//     Coffee,
//     UtensilsCrossed,
// } from 'lucide-react';
//
// const CATEGORY_ICON_CONFIG: Record<Exclude<Category, '전체'>, { icon: typeof Soup; bg: string; color: string }> = {
//     '한식': { icon: Soup, bg: 'bg-orange-50', color: 'text-orange-400' },
//     '양식': { icon: Beef, bg: 'bg-red-50', color: 'text-red-400' },
//     '일식': { icon: Fish, bg: 'bg-blue-50', color: 'text-blue-400' },
//     '분식': { icon: CookingPot, bg: 'bg-rose-50', color: 'text-rose-400' },
//     '샌드위치': { icon: Sandwich, bg: 'bg-amber-50', color: 'text-amber-400' },
//     '샐러드': { icon: Salad, bg: 'bg-green-50', color: 'text-green-400' },
//     '디저트': { icon: IceCreamCone, bg: 'bg-pink-50', color: 'text-pink-400' },
//     '빵': { icon: Croissant, bg: 'bg-yellow-50', color: 'text-yellow-400' },
//     '패스트푸드': { icon: Pizza, bg: 'bg-orange-50', color: 'text-orange-400' },
//     '카페': { icon: Coffee, bg: 'bg-amber-50', color: 'text-amber-500' },
//     '기타': { icon: UtensilsCrossed, bg: 'bg-gray-50', color: 'text-gray-400' },
// };

// PNG 아이콘 기반 카테고리 아이콘
const CATEGORY_ICON_PNG: Record<Exclude<Category, '전체'>, string> = {
    '한식': '/images/icons/korean.png',
    '양식': '/images/icons/western.png',
    '일식': '/images/icons/japanese.png',
    '분식': '/images/icons/snack.png',
    '샌드위치': '/images/icons/sandwich.png',
    '샐러드': '/images/icons/salad.png',
    '디저트': '/images/icons/dessert.png',
    '빵': '/images/icons/bread.png',
    '패스트푸드': '/images/icons/fastfood.png',
    '카페': '/images/icons/cafe.png',
    '기타': '/images/icons/other.png',
};

interface RestaurantImageProps {
    src: string;
    alt: string;
    category?: Category;
    fill?: boolean;
    className?: string;
    sizes?: string;
    priority?: boolean;
}

export function RestaurantImage({ src, alt, category, fill, className, sizes, priority }: RestaurantImageProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        const iconSrc = category && category !== '전체'
            ? CATEGORY_ICON_PNG[category]
            : CATEGORY_ICON_PNG['기타'];

        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                <Image
                    src={iconSrc}
                    alt={category || '기타'}
                    fill
                    className="object-contain p-6"
                />
                {category && category !== '전체' && (
                    <span className="text-xs font-medium mt-2 text-gray-400">{category}</span>
                )}
            </div>
        );

        // [주석처리] lucide-react 아이콘 기반 폴백
        // const config = category && category !== '전체'
        //     ? CATEGORY_ICON_CONFIG[category]
        //     : CATEGORY_ICON_CONFIG['기타'];
        // const Icon = config.icon;
        //
        // return (
        //     <div className={`absolute inset-0 flex flex-col items-center justify-center ${config.bg}`}>
        //         <Icon className={`size-12 ${config.color}`} strokeWidth={1.5} />
        //         {category && category !== '전체' && (
        //             <span className={`text-xs font-medium mt-2 ${config.color}`}>{category}</span>
        //         )}
        //     </div>
        // );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill={fill}
            className={className}
            sizes={sizes}
            priority={priority}
            onError={() => setHasError(true)}
        />
    );
}
