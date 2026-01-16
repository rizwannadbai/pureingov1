"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Minus, ShoppingCart, Leaf, Check, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store"
import { WishlistButton } from "./wishlist-button"
import type { Product } from "@/types"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { items, addItem, updateQuantity } = useCartStore()

    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem?.quantity || 0

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price_per_kg,
            unit: product.unit,
            image: product.image_url || undefined,
        })
    }

    const handleUpdateQuantity = (newQuantity: number) => {
        updateQuantity(product.id, newQuantity)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const isSubscription = product.category === 'subscription'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-2xl border border-fresh-100 card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden"
        >
            {/* Category Badge */}
            <div className="absolute top-3 left-3 z-10">
                <Badge
                    variant={isSubscription ? 'default' : 'success'}
                    className="capitalize"
                >
                    {isSubscription ? 'Subscription' : 'Juice Pack'}
                </Badge>
            </div>

            {/* Wishlist Button */}
            <div className="absolute top-3 right-3 z-10">
                {product.in_stock ? (
                    <WishlistButton
                        product={{
                            id: product.id,
                            name: product.name,
                            price: product.price_per_kg,
                            image: product.image_url || '',
                            category: product.category,
                            unit: product.unit,
                        }}
                        size="sm"
                    />
                ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                )}
            </div>

            {/* Image Container */}
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-fresh-50 to-fresh-100 overflow-hidden">
                    {product.image_url ? (
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center shadow-lg">
                                {isSubscription ? (
                                    <Package className="w-10 h-10 text-white" />
                                ) : (
                                    <Leaf className="w-10 h-10 text-white" />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Link>

            {/* Content */}
            <div className="p-5">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-fresh-600 transition-colors cursor-pointer">
                        {product.name}
                    </h3>
                </Link>

                {product.subtitle && (
                    <p className="text-sm text-fresh-600 font-medium mb-2">
                        {product.subtitle}
                    </p>
                )}

                {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                    <div className="mb-4 space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-fresh-500 flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-fresh-600">
                            {formatPrice(product.price_per_kg)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            per {product.unit === 'month' ? 'month' : product.unit}
                            {isSubscription && ' • Delivery included'}
                        </p>
                    </div>

                    {/* Add to Cart / Quantity Controls */}
                    {product.in_stock ? (
                        quantity === 0 ? (
                            <Button
                                size="sm"
                                onClick={handleAddToCart}
                                className="gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {isSubscription ? 'Subscribe' : 'Add'}
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 bg-fresh-50 rounded-lg p-1">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-fresh-600 hover:bg-fresh-100"
                                    onClick={() => handleUpdateQuantity(quantity - 1)}
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-semibold text-fresh-700">
                                    {quantity}
                                </span>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-fresh-600 hover:bg-fresh-100"
                                    onClick={() => handleUpdateQuantity(quantity + 1)}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        )
                    ) : (
                        <Button size="sm" disabled>
                            Unavailable
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
