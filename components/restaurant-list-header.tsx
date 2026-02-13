'use client';

import Image from 'next/image';

export function RestaurantListHeader() {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 w-full transition-all">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center">
                <div className="flex items-center gap-2">
                    <Image src="/images/logo-blue.png" alt="뭉치" width={32} height={32} className="rounded-sm object-contain" />
                    <h1 className="font-extrabold text-xl tracking-tight text-gray-900">뭉치</h1>
                </div>
            </div>
        </header>
    );
}
