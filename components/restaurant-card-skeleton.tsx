import { Skeleton } from "@/components/ui/skeleton"

export function RestaurantCardSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-12 rounded-md" />
                </div>
                <Skeleton className="h-4 w-48 mb-2.5" />
                <Skeleton className="h-6 w-28 rounded-full" />
            </div>
        </div>
    )
}

export function RestaurantListSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header skeleton */}
            <div className="bg-white/80 border-b sticky top-0 z-50 w-full">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-sm" />
                        <Skeleton className="h-6 w-12" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                {/* Filter button + Category chips skeleton */}
                <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-9 w-20 rounded-full shrink-0" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-9 w-16 rounded-full shrink-0" />
                    ))}
                </div>

                {/* Title skeleton */}
                <div className="flex items-center mb-4">
                    <Skeleton className="h-7 w-28" />
                    <Skeleton className="h-4 w-10 ml-2" />
                </div>

                {/* Card grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <RestaurantCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
