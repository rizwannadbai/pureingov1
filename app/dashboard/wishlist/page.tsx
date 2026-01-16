"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlistStore } from "@/store/wishlist-store"
import { useCartStore } from "@/store"
import { toast } from "sonner"
import { useState, useEffect } from "react"

export default function WishlistPage() {
    const { items, removeItem, clearWishlist } = useWishlistStore()
    const { addItem } = useCartStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleAddToCart = (item: typeof items[0]) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            unit: item.unit || 'kg',
            image: item.image,
        })
        toast.success(`${item.name} added to cart!`)
    }

    const handleRemove = (id: string) => {
        removeItem(id)
        toast.success("Removed from wishlist")
    }

    const handleClearAll = () => {
        clearWishlist()
        toast.success("Wishlist cleared")
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    if (!mounted) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="grid gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-red-500" />
                        </div>
                        My Wishlist
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>
                {items.length > 0 && (
                    <Button variant="outline" onClick={handleClearAll} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                )}
            </div>

            {items.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-12 h-12 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">Your wishlist is empty</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Start adding products you love by clicking the heart icon on any product
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/products" className="gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Browse Products
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                        >
                            {/* Image */}
                            <Link href={`/products/${item.id}`}>
                                <div className="relative aspect-[4/3] bg-gradient-to-br from-fresh-50 to-gray-100">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-16 h-16 bg-fresh-500 rounded-full flex items-center justify-center text-3xl">
                                                🍎
                                            </div>
                                        </div>
                                    )}
                                    {/* Remove Button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleRemove(item.id)
                                        }}
                                        className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Heart className="w-5 h-5" fill="currentColor" />
                                    </button>
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-5">
                                <Link href={`/products/${item.id}`}>
                                    <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-fresh-600 transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>
                                {item.category && (
                                    <p className="text-sm text-muted-foreground capitalize mb-3">
                                        {item.category}
                                    </p>
                                )}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xl font-bold text-fresh-600">
                                            {formatPrice(item.price)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            per {item.unit || 'kg'}
                                        </p>
                                    </div>
                                    <Button size="sm" className="gap-2" onClick={() => handleAddToCart(item)}>
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Continue Shopping */}
            {items.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/products" className="gap-2">
                            Continue Shopping
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            )}
        </div>
    )
}
