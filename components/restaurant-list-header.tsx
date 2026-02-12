'use client';

import Image from 'next/image';
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RestaurantListHeaderProps {
    onFilterClick?: () => void;
}

export function RestaurantListHeader({ onFilterClick }: RestaurantListHeaderProps) {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 w-full transition-all">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* using public path for logo */}
                    <Image src="/images/logo-blue.png" alt="뭉치" width={32} height={32} className="rounded-sm object-contain" />
                    <h1 className="font-extrabold text-xl tracking-tight text-gray-900">뭉치</h1>
                </div>
                {onFilterClick && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onFilterClick}
                        className="text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                )}
            </div>
        </header>
    );
}
