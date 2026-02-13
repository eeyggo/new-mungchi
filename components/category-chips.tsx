/*
  Design: Retro Modernism Filter Pills
  - Pill-shaped buttons with generous padding
  - Selected state uses brand color (#4D77FF)
  - Unselected uses ghost style with warm borders
  - Active filter count badge in brand color
*/

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
        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide pb-1">
            {/* Filter Button */}
            <button
                onClick={onFilterClick}
                className="shrink-0 pill bg-card text-foreground border border-border hover:border-brand hover:text-brand hover:shadow-retro transition-all"
            >
                <SlidersHorizontal className="h-4 w-4 inline-block mr-1.5" />
                필터
                {activeFilterCount > 0 && (
                    <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                        {activeFilterCount}
                    </span>
                )}
            </button>

            {/* Selected Category Chip */}
            {selectedCategory !== '전체' && (
                <button
                    onClick={() => onCategoryChange('전체')}
                    className="shrink-0 pill bg-brand text-primary-foreground border border-brand shadow-retro hover:shadow-retro-md transition-all"
                >
                    {selectedCategory}
                    <X className="h-3.5 w-3.5 ml-1.5" />
                </button>
            )}

            {/* Location Enabled Chip */}
            {locationEnabled && (
                <button
                    onClick={() => onLocationToggle(false)}
                    className="shrink-0 pill bg-brand text-primary-foreground border border-brand shadow-retro hover:shadow-retro-md transition-all"
                >
                    가까운순
                    <X className="h-3.5 w-3.5 ml-1.5" />
                </button>
            )}

            {/* Selected Tags Chips */}
            {selectedTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => removeTag(tag)}
                    className="shrink-0 pill bg-brand text-primary-foreground border border-brand shadow-retro hover:shadow-retro-md transition-all"
                >
                    {tag}
                    <X className="h-3.5 w-3.5 ml-1.5" />
                </button>
            ))}
        </div>
    )
}
