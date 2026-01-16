"use client"

import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { FilterState } from "@/types"

interface ProductFiltersProps {
    filters: FilterState
    onFilterChange: (filters: FilterState) => void
    productCount: number
}

export function ProductFilters({ filters, onFilterChange, productCount }: ProductFiltersProps) {
    const categories = [
        { value: 'all', label: 'All Products' },
        { value: 'subscription', label: 'Subscriptions' },
        { value: 'juice', label: 'Juices' },
    ] as const

    const sortOptions = [
        { value: 'name', label: 'Name' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
    ] as const

    const handleCategoryChange = (category: FilterState['category']) => {
        onFilterChange({ ...filters, category })
    }

    const handleSearchChange = (search: string) => {
        onFilterChange({ ...filters, search })
    }

    const handleSortChange = (sortBy: FilterState['sortBy']) => {
        onFilterChange({ ...filters, sortBy })
    }

    const handleClearFilters = () => {
        onFilterChange({
            category: 'all',
            search: '',
            inStock: false,
            sortBy: 'name',
        })
    }

    const hasActiveFilters = filters.category !== 'all' || filters.search !== '' || filters.sortBy !== 'name'

    return (
        <div className="space-y-6">
            {/* Search and Sort Row */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search subscriptions, juices..."
                        value={filters.search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10"
                    />
                    {filters.search && (
                        <button
                            onClick={() => handleSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
                        className="h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <Button
                            key={cat.value}
                            variant={filters.category === cat.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleCategoryChange(cat.value)}
                            className={filters.category === cat.value ? '' : 'border-fresh-200 text-foreground hover:bg-fresh-50 hover:text-fresh-600'}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>

                {/* Results count and clear */}
                <div className="flex items-center gap-3 ml-auto">
                    <span className="text-sm text-muted-foreground">
                        {productCount} product{productCount !== 1 ? 's' : ''} found
                    </span>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearFilters}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-4 h-4 mr-1" />
                            Clear filters
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
