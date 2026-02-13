/*
  Design: 1970s Retro Header
  - Bold bubble typography
  - Geometric shapes and decorative elements
  - Fixed header with brand blue logo
  - Warm beige background
*/

'use client';

import Image from 'next/image';

export function RestaurantListHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background border-b-4 border-[hsl(var(--border))] shadow-flat">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
                <div className="flex flex-col items-center gap-4">
                    {/* Logo with geometric shapes */}
                    <div className="relative">
                        {/* Decorative shapes */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-retro-orange hidden md:block" />
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-retro-yellow hidden md:block" />
                        
                        {/* Logo */}
                        <div className="w-16 h-16 bg-primary rounded-2xl p-2 border-thick-brown shadow-flat">
                            <Image
                                src="/images/logo-blue.png"
                                alt="뭉치"
                                width={64}
                                height={64}
                                className="object-contain w-full h-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* Title - Bold 70s Typography */}
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-primary bubble-text mb-1">
                            MUNGCHI
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-bold text-retro-brown -mt-2">
                            뭉치
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
                            '함께 즐기는 맛있는 70년대식 밥상'
                        </p>
                    </div>

                    {/* Decorative line with shapes */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <div className="h-0.5 w-16 bg-primary" />
                        <div className="w-3 h-3 bg-retro-yellow rounded-full" />
                        <div className="h-0.5 w-16 bg-retro-orange" />
                        <div className="w-3 h-3 bg-retro-orange rounded-full" />
                    </div>
                </div>
            </div>
        </header>
    );
}
