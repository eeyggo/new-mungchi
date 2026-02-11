import Link from "next/link";
import Image from "next/image";
import { mockRestaurants } from "@/lib/data/mock-restaurants";
import { RestaurantCard } from "@/components/restaurant-card";
import logoBlue from "../design/logo/logo-blue.png";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <header className="mb-8 text-center py-6">
          <div className="relative w-32 h-16 mx-auto mb-4">
            <Image
              src={logoBlue}
              alt="뭉치"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            뭉치 🍚
          </h1>
          <p className="text-muted-foreground text-sm md:text-base break-keep">
            고려대 인근 단체 식사 주문 가능한 식당을 한 곳에서
          </p>
        </header>

        {/* 리스트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </main>
  );
}
