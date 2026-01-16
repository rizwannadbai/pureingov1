"use client"

import { useEffect, useState } from "react"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"

export function FloatingCartBar() {
    const { items, getItemCount, getTotal, openCart } = useCartStore()
    const [mounted, setMounted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [prevCount, setPrevCount] = useState(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    const itemCount = mounted ? getItemCount() : 0
    const total = mounted ? getTotal() : 0

    // Show animation when item count changes
    useEffect(() => {
        if (mounted && itemCount > prevCount) {
            setIsVisible(true)
        }
        setPrevCount(itemCount)
    }, [itemCount, prevCount, mounted])

    // Hide when cart is empty
    useEffect(() => {
        if (itemCount === 0) {
            setIsVisible(false)
        } else if (itemCount > 0) {
            setIsVisible(true)
        }
    }, [itemCount])

    if (!mounted || !isVisible || itemCount === 0) return null

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
            <div className="container mx-auto max-w-lg">
                <div
                    className="pointer-events-auto bg-gradient-to-r from-fresh-600 to-emerald-600 rounded-2xl shadow-2xl shadow-fresh-500/30 overflow-hidden animate-slide-up"
                >
                    <button
                        onClick={openCart}
                        className="w-full flex items-center justify-between p-4 text-white hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            {/* Animated bag icon */}
                            <div className="relative">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                {/* Item count badge */}
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-fresh-600 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                                    {itemCount}
                                </div>
                            </div>

                            <div className="text-left">
                                <p className="text-sm text-white/80">
                                    {itemCount} {itemCount === 1 ? 'item' : 'items'} added
                                </p>
                                <p className="text-lg font-bold">
                                    {formatPrice(total)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-white text-fresh-600 font-bold px-5 py-3 rounded-xl">
                            <span>View Cart</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
