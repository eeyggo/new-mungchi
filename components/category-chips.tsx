/*
  Design: 1970s Retro Filter Pills
  - Bold pill buttons with numbered badges
  - Selected state uses primary blue
  - Thick borders, flat shadows
  - Catalog-style numbering
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
                className="shrink-0 pill-retro-sm bg-card text-foreground border-2 border-[hsl(var(--border))] hover-retro relative"
            >
                <SlidersHorizontal className="h-4 w-4 inline-block mr-1.5" />
                필터
                {activeFilterCount > 0 && (
                    <span className="ml-1.5 badge-number text-[10px] w-6 h-6">
                        {activeFilterCount}
                    </span>
                )}
            </button>

            {/* Selected Category Chip */}
            {selectedCategory !== '전체' && (
                <button
                    onClick={() => onCategoryChange('전체')}
                    className="shrink-0 pill-retro-sm bg-primary text-primary-foreground hover-retro"
                >
                    {selectedCategory}
                    <X className="h-3.5 w-3.5 ml-1.5" />
                </button>
            )}

            {/* Location Enabled Chip */}
            {locationEnabled && (
                <button
                    onClick={() => onLocationToggle(false)}
                    className="shrink-0 pill-retro-sm bg-primary text-primary-foreground hover-retro"
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
                    className="shrink-0 pill-retro-sm bg-primary text-primary-foreground hover-retro"
                >
                    {tag}
                    <X className="h-3.5 w-3.5 ml-1.5" />
                </button>
            ))}
        </div>
    )
}
