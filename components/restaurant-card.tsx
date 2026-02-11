import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "@/lib/types/restaurant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <Link href={`/restaurant/${restaurant.id}`} className="block h-full">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={restaurant.id <= 4} // First few images load faster
                    />
                </div>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg font-semibold truncate">
                            {restaurant.name}
                        </CardTitle>
                        <Badge variant="default" className="shrink-0">
                            {restaurant.category}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5">
                        {restaurant.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                        {restaurant.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground self-center">
                                +{restaurant.tags.length - 3}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-auto">
                        {restaurant.address}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
