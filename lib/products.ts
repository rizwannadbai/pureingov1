// Product helper functions for Supabase
import { createClient } from './supabase'

export type ProductCategory =
    | 'fresh-juices'
    | 'juice-packages'
    | 'fresh-fruit-boxes'
    | 'sprouts'
    | 'sprout-packages'

export interface Product {
    id: string
    name: string
    category: ProductCategory
    type?: string
    description: string
    long_description?: string
    price: number
    unit: string
    image?: string
    in_stock?: boolean
    stock_quantity?: number

    // JSON fields
    benefits?: string[]
    benefit_details?: string[]
    features?: string[]
    nutrition_info?: string[]

    duration?: string
    how_to_consume?: string
    best_time?: string

    created_at?: string
    updated_at?: string
}

/**
 * Fetch all products from Supabase
 */
export async function getProducts(): Promise<Product[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .order('name')

    if (error) {
        console.error('Error fetching products:', error)
        return []
    }

    return data || []
}

/**
 * Fetch single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching product:', error)
        return null
    }

    return data
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('in_stock', true)
        .order('name')

    if (error) {
        console.error('Error fetching products by category:', error)
        return []
    }

    return data || []
}

/**
 * Fetch products by type (single, combo, subscription, etc.)
 */
export async function getProductsByType(type: string): Promise<Product[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', type)
        .eq('in_stock', true)
        .order('name')

    if (error) {
        console.error('Error fetching products by type:', error)
        return []
    }

    return data || []
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<Product[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('in_stock', true)
        .order('name')

    if (error) {
        console.error('Error searching products:', error)
        return []
    }

    return data || []
}

/**
 * Get product categories with counts
 */
export async function getCategories() {
    const supabase = createClient()

    // Fetch all products to count by category
    const { data, error } = await supabase
        .from('products')
        .select('category')
        .eq('in_stock', true)

    if (error || !data) {
        return [
            { id: 'fresh-fruit-boxes', name: 'Fresh Fruit Boxes', count: 0 },
            { id: 'fresh-juices', name: 'Fresh Juices', count: 0 },
            { id: 'juice-packages', name: 'Juice Packages', count: 0 },
            { id: 'sprouts', name: 'Sprouts', count: 0 },
            { id: 'sprout-packages', name: 'Sprout Packages', count: 0 },
        ]
    }

    // Count categories
    const counts: Record<string, number> = {}
    data.forEach(item => {
        counts[item.category] = (counts[item.category] || 0) + 1
    })

    return [
        { id: 'fresh-fruit-boxes', name: 'Fresh Fruit Boxes', count: counts['fresh-fruit-boxes'] || 0, isMain: true },
        { id: 'fresh-juices', name: 'Fresh Juices', count: counts['fresh-juices'] || 0, isAddon: true },
        { id: 'juice-packages', name: 'Juice Packages', count: counts['juice-packages'] || 0, isAddon: true },
        { id: 'sprouts', name: 'Sprouts', count: counts['sprouts'] || 0, isAddon: true },
        { id: 'sprout-packages', name: 'Sprout Packages', count: counts['sprout-packages'] || 0, isAddon: true },
    ]
}
