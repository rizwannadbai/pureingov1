"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Heart, Plus, Minus, Star, Check, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore, DURATION_OPTIONS } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { toast } from "sonner"

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    unit?: string
    category?: string
    rating?: number
    reviews?: number
    features?: string[]
    inStock?: boolean
}

interface ProductQuickViewProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
    const [quantity, setQuantity] = useState(1)
    const [selectedDuration, setSelectedDuration] = useState("day")
    const { addItem } = useCartStore()
    const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()

    const isInWishlist = product ? wishlistItems.some(i => i.id === product.id) : false

    useEffect(() => {
        if (isOpen) {
            setQuantity(1)
            setSelectedDuration("day")
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!product) return null

    const handleAddToCart = () => {
        const duration = DURATION_OPTIONS.find(d => d.id === selectedDuration)
        addItem({
            id: product.id,
            name: product.name,
            price: product.price * (duration?.days || 1),
            basePrice: product.price,
            image: product.image,
            unit: duration?.label || "1 Day",
            duration: selectedDuration,
            durationDays: duration?.days || 1,
        }, quantity)
        toast.success(`${product.name} added to cart!`)
        onClose()
    }

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id)
            toast.success("Removed from wishlist")
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                unit: product.unit,
            })
            toast.success("Added to wishlist!")
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Image Section */}
                            <div className="relative bg-gradient-to-br from-fresh-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 p-8 flex items-center justify-center min-h-[300px]">
                                <div className="relative w-full max-w-[280px] aspect-square">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-xl"
                                    />
                                </div>

                                {/* Fresh Badge */}
                                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-fresh-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                    <Leaf className="w-4 h-4" />
                                    100% Fresh
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-6 md:p-8">
                                {/* Category */}
                                {product.category && (
                                    <span className="text-sm text-fresh-600 font-medium">
                                        {product.category}
                                    </span>
                                )}

                                {/* Title */}
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    {product.name}
                                </h2>

                                {/* Rating */}
                                {product.rating && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {product.rating}
                                            </span>
                                        </div>
                                        {product.reviews && (
                                            <span className="text-gray-500 text-sm">
                                                ({product.reviews} reviews)
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 mt-4">
                                    {product.description}
                                </p>

                                {/* Features */}
                                {product.features && product.features.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {product.features.slice(0, 3).map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Check className="w-4 h-4 text-fresh-500" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Price */}
                                <div className="mt-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            ₹{product.price}
                                        </span>
                                        <span className="text-gray-500">/{product.unit || "kg"}</span>
                                    </div>
                                </div>

                                {/* Duration Selection */}
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Select Duration
                                    </p>
                                    <div className="flex gap-2">
                                        {DURATION_OPTIONS.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setSelectedDuration(option.id)}
                                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${selectedDuration === option.id
                                                        ? "bg-fresh-500 text-white"
                                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="mt-4 flex items-center gap-4">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Quantity
                                    </p>
                                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex gap-3">
                                    <Button
                                        onClick={handleAddToCart}
                                        className="flex-1 gap-2"
                                        size="lg"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={handleWishlistToggle}
                                        className={isInWishlist ? "text-red-500 border-red-200" : ""}
                                    >
                                        <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500" : ""}`} />
                                    </Button>
                                </div>

                                {/* View Full Details Link */}
                                <div className="mt-4 text-center">
                                    <Link
                                        href={`/products/${product.id}`}
                                        onClick={onClose}
                                        className="text-fresh-600 hover:text-fresh-700 text-sm font-medium"
                                    >
                                        View Full Product Details →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
