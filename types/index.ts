export * from './database'

// UI Types
export interface NavLink {
    href: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
}

export interface CartItemDisplay {
    id: string
    name: string
    price: number
    quantity: number
    unit: string
    image?: string
    category: 'fruit' | 'vegetable'
}

export interface FilterState {
    category: 'all' | 'subscription' | 'juice'
    search: string
    inStock: boolean
    sortBy: 'name' | 'price-asc' | 'price-desc'
}
