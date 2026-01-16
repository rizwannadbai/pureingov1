import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    name: string
    price: number
    basePrice?: number  // Original price per unit (for duration calculations)
    quantity: number
    unit?: string
    image?: string
    duration?: string   // 'day' | 'week' | 'month'
    durationDays?: number
}

export const DURATION_OPTIONS = [
    { id: 'day', label: '1 Day', days: 1, badge: 'Try' },
    { id: 'week', label: '1 Week', days: 7, badge: 'Popular' },
    { id: 'month', label: '1 Month', days: 30, badge: 'Best Value' },
] as const

interface CartState {
    items: CartItem[]
    isOpen: boolean
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    updateDuration: (id: string, durationId: string) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
    openCart: () => void
    closeCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id)

                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                            ),
                        }
                    } else {
                        // Store base price for duration calculations
                        const newItem = {
                            ...item,
                            quantity,
                            basePrice: item.basePrice || item.price,
                            duration: item.duration || 'day',
                            durationDays: item.durationDays || 1,
                        }
                        return { items: [...state.items, newItem] }
                    }
                })
            },

            removeItem: (id) => {
                set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
            },

            updateQuantity: (id, quantity) => {
                set((state) => {
                    if (quantity <= 0) {
                        return { items: state.items.filter((i) => i.id !== id) }
                    } else {
                        return {
                            items: state.items.map((i) =>
                                i.id === id ? { ...i, quantity } : i
                            ),
                        }
                    }
                })
            },

            updateDuration: (id, durationId) => {
                const duration = DURATION_OPTIONS.find(d => d.id === durationId)
                if (!duration) return

                set((state) => ({
                    items: state.items.map((i) => {
                        if (i.id !== id) return i
                        const basePrice = i.basePrice || i.price
                        return {
                            ...i,
                            duration: durationId,
                            durationDays: duration.days,
                            price: basePrice * duration.days,
                            unit: duration.label,
                        }
                    }),
                }))
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            },

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: 'pureingo-cart',
            partialize: (state) => ({ items: state.items }),
        }
    )
)
