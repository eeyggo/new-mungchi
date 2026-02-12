import { mockRestaurants } from "@/lib/data/mock-restaurants";
import { notFound } from "next/navigation";
import { RestaurantDetailHeader } from "@/components/restaurant-detail-header";
import { RestaurantDetailInfo } from "@/components/restaurant-detail-info";
import { RestaurantActionButtons } from "@/components/restaurant-action-buttons";

export function generateStaticParams() {
    return mockRestaurants.map((restaurant) => ({
        id: restaurant.id,
    }));
}

export default async function RestaurantDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const restaurant = mockRestaurants.find((r) => r.id === id);

    if (!restaurant) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white md:bg-gray-50">
            <RestaurantDetailHeader />
            <RestaurantDetailInfo restaurant={restaurant} />
            <RestaurantActionButtons restaurant={restaurant} />
        </div>
    );
}
