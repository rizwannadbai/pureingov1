// Database types for Supabase
// These types match the database schema defined in the implementation plan

export type UserRole = 'USER' | 'ADMIN' | 'DELIVERY_PARTNER'

export interface Profile {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    role: UserRole
    created_at: string
}

export interface Address {
    id: string
    user_id: string
    city: string
    pincode: string
    full_address: string
    landmark: string | null
    is_default: boolean
    created_at: string
}

export type ProductCategory = 'subscription' | 'juice'
export type ProductUnit = 'month' | 'pack' | 'bottle'

export interface Product {
    id: string
    name: string
    category: ProductCategory
    price_per_kg: number // Price per unit (monthly for subscriptions)
    unit: ProductUnit
    image_url: string | null
    in_stock: boolean
    description: string | null
    subtitle?: string | null
    features?: string[]
    created_at: string
}

export type PaymentMethod = 'razorpay' | 'cod'
export type PaymentStatus = 'pending' | 'paid' | 'failed'
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled'

export interface Order {
    id: string
    user_id: string
    address_id: string
    total_amount: number
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    order_status: OrderStatus
    delivery_date: string | null
    razorpay_order_id: string | null
    razorpay_payment_id: string | null
    created_at: string
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    quantity: number
    price: number
    product?: Product
}

export type SubscriptionFrequency = 'daily' | 'alternate'
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled'

export interface Subscription {
    id: string
    user_id: string
    product_id: string
    quantity: number
    frequency: SubscriptionFrequency
    start_date: string
    status: SubscriptionStatus
    created_at: string
    product?: Product
}

// Database type for Supabase client
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile
                Insert: Omit<Profile, 'created_at'>
                Update: Partial<Omit<Profile, 'id' | 'created_at'>>
            }
            addresses: {
                Row: Address
                Insert: Omit<Address, 'id' | 'created_at'>
                Update: Partial<Omit<Address, 'id' | 'created_at'>>
            }
            products: {
                Row: Product
                Insert: Omit<Product, 'id' | 'created_at'>
                Update: Partial<Omit<Product, 'id' | 'created_at'>>
            }
            orders: {
                Row: Order
                Insert: Omit<Order, 'id' | 'created_at'>
                Update: Partial<Omit<Order, 'id' | 'created_at'>>
            }
            order_items: {
                Row: OrderItem
                Insert: Omit<OrderItem, 'id'>
                Update: Partial<Omit<OrderItem, 'id'>>
            }
            subscriptions: {
                Row: Subscription
                Insert: Omit<Subscription, 'id' | 'created_at'>
                Update: Partial<Omit<Subscription, 'id' | 'created_at'>>
            }
        }
    }
}
