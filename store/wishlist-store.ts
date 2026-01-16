import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
    id: string
    name: string
    price: number
    image: string
    category?: string
    unit?: string
}

interface WishlistState {
    items: WishlistItem[]
    addItem: (item: WishlistItem) => void
    removeItem: (id: string) => void
    isInWishlist: (id: string) => boolean
    clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const exists = get().items.some((i) => i.id === item.id)
                if (!exists) {
                    set((state) => ({
                        items: [...state.items, item],
                    }))
                }
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }))
            },

            isInWishlist: (id) => {
                return get().items.some((item) => item.id === id)
            },

            clearWishlist: () => {
                set({ items: [] })
            },
        }),
        {
            name: 'pureingo-wishlist',
        }
    )
)
