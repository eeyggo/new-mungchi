"use client"

import { SlidersHorizontal, X } from "lucide-react"
import { Category } from "@/lib/types/restaurant"

interface CategoryChipsProps {
    selectedCategory: Category
    onCategoryChange: (category: Category) => void
    selectedTags: string[]
    onTagsChange: (tags: string[]) => void
    locationEnabled: boolean
    onLocationToggle: (enabled: boolean) => void
    onFilterClick: () => void
    activeFilterCount: number
}

export function CategoryChips({
    selectedCategory,
    onCategoryChange,
    selectedTags,
    onTagsChange,
    locationEnabled,
    onLocationToggle,
    onFilterClick,
    activeFilterCount,
}: CategoryChipsProps) {
    const removeTag = (tag: string) => {
        onTagsChange(selectedTags.filter((t) => t !== tag))
    }

    return (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
                onClick={onFilterClick}
                className="shrink-0 h-9 inline-flex items-center gap-1.5 px-4 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-primary/30 hover:text-primary transition-all"
            >
                <SlidersHorizontal className="h-4 w-4" />
                필터
                {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                        {activeFilterCount}
                    </span>
                )}
            </button>

            {selectedCategory !== '전체' && (
                <button
                    onClick={() => onCategoryChange('전체')}
                    className="shrink-0 h-9 inline-flex items-center gap-1 px-4 rounded-full text-sm font-medium bg-primary text-white border border-primary shadow-sm transition-all"
                >
                    {selectedCategory}
                    <X className="h-3.5 w-3.5" />
                </button>
            )}

            {locationEnabled && (
                <button
                    onClick={() => onLocationToggle(false)}
                    className="shrink-0 h-9 inline-flex items-center gap-1 px-4 rounded-full text-sm font-medium bg-primary text-white border border-primary shadow-sm transition-all"
                >
                    가까운순
                    <X className="h-3.5 w-3.5" />
                </button>
            )}

            {selectedTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => removeTag(tag)}
                    className="shrink-0 h-9 inline-flex items-center gap-1 px-4 rounded-full text-sm font-medium bg-primary text-white border border-primary shadow-sm transition-all"
                >
                    {tag}
                    <X className="h-3.5 w-3.5" />
                </button>
            ))}
        </div>
    )
}
