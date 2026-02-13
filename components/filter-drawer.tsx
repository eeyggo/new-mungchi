"use client"

import * as React from "react"
import { Check, MapPin, Loader2, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Category, CATEGORIES } from "@/lib/types/restaurant"

interface FilterDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedCategory: Category
    onCategoryChange: (category: Category) => void
    selectedTags: string[]
    onTagsChange: (tags: string[]) => void
    locationEnabled: boolean
    onLocationToggle: (enabled: boolean, userLocation?: { lat: number; lng: number }) => void
}

const ALL_TAGS = [
    '#가성비', '#단체석', '#뒷풀이',
    '#간식행사', '#떡볶이', '#단체주문',
    '#점심', '#혼밥',
    '#이색맛집', '#커리', '#룸완비',
    '#치맥', '#전통',
    '#단체도시락', '#행사', '#배달',
    '#피자', '#뷔페', '#런치세트',
    '#꿔바로우', '#중식맛집', '#데이트',
    '#단체커피', '#회의', '#노트북',
    '#야식', '#술안주'
];

export function FilterDrawer({
    open,
    onOpenChange,
    selectedCategory,
    onCategoryChange,
    selectedTags,
    onTagsChange,
    locationEnabled,
    onLocationToggle,
}: FilterDrawerProps) {
    const [isLocLoading, setIsLocLoading] = React.useState(false);

    const handleLocationSwitch = async (checked: boolean) => {
        if (checked) {
            setIsLocLoading(true);
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                onLocationToggle(true, userLocation);
            } catch (error) {
                console.error("Location error:", error);
                alert('위치 권한이 필요합니다. 브라우저 설정에서 위치 권한을 허용해주세요.');
                onLocationToggle(false);
            } finally {
                setIsLocLoading(false);
            }
        } else {
            onLocationToggle(false);
        }
    };

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter((t) => t !== tag));
        } else {
            onTagsChange([...selectedTags, tag]);
        }
    };

    const handleReset = () => {
        onCategoryChange('전체');
        onTagsChange([]);
        onLocationToggle(false);
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[85vh]">
                <DrawerHeader className="px-6">
                    <DrawerTitle className="text-xl font-bold">필터 설정</DrawerTitle>
                    <DrawerDescription>
                        원하는 조건으로 식당을 찾아보세요.
                    </DrawerDescription>
                </DrawerHeader>

                <ScrollArea className="flex-1 overflow-auto px-6">
                    <div className="space-y-6 pb-6">
                        {/* Category Section */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium leading-none text-muted-foreground">카테고리</h3>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((category) => (
                                    <Badge
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        className="cursor-pointer px-4 py-2 text-sm font-normal transition-all hover:bg-primary/90 hover:text-white"
                                        onClick={() => onCategoryChange(category)}
                                    >
                                        {category}
                                        {selectedCategory === category && <Check className="ml-2 h-3 w-3" />}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Location Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-medium leading-none text-muted-foreground">위치 기반 정렬</h3>
                                    <p className="text-xs text-muted-foreground">내 위치에서 가까운 순으로 정렬합니다.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isLocLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                                    <Switch
                                        checked={locationEnabled}
                                        onCheckedChange={handleLocationSwitch}
                                        disabled={isLocLoading}
                                    />
                                </div>
                            </div>
                            {locationEnabled && (
                                <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 p-2 rounded-md">
                                    <MapPin className="h-3 w-3" />
                                    <span>현재 위치를 기준으로 정렬 중입니다.</span>
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Tags Section */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium leading-none text-muted-foreground">태그</h3>
                            <div className="flex flex-wrap gap-2">
                                {ALL_TAGS.map((tag) => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <Badge
                                            key={tag}
                                            variant={isSelected ? "secondary" : "outline"}
                                            className={`cursor-pointer px-3 py-1.5 text-sm font-normal transition-all ${isSelected
                                                    ? "bg-primary/15 text-primary hover:bg-primary/20 border-primary/20"
                                                    : "text-muted-foreground hover:bg-secondary/50"
                                                }`}
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <DrawerFooter className="border-t flex-row gap-3">
                    <Button variant="ghost" className="flex-1 gap-2" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                        초기화
                    </Button>
                    <Button className="flex-[2]" onClick={() => onOpenChange(false)}>
                        필터 적용하기
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
