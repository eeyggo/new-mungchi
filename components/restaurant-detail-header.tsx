'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function RestaurantDetailHeader() {
    const router = useRouter();

    return (
        <div className="hidden md:block bg-white border-b sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-6 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                    <ChevronLeft className="size-5" />
                    <span className="text-sm font-medium">목록으로 돌아가기</span>
                </button>
            </div>
        </div>
    );
}
