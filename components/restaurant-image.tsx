'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const PLACEHOLDER_IMAGE = '/images/placeholder-restaurant.svg';

interface RestaurantImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    priority?: boolean;
}

export function RestaurantImage({ src, alt, fill, className, sizes, priority }: RestaurantImageProps) {
    const [hasError, setHasError] = useState(false);
    const imgSrc = src || PLACEHOLDER_IMAGE;

    if (hasError || !src) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                <ImageOff className="size-8 mb-1" />
                <span className="text-xs">이미지 없음</span>
            </div>
        );
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill={fill}
            className={className}
            sizes={sizes}
            priority={priority}
            onError={() => setHasError(true)}
        />
    );
}
