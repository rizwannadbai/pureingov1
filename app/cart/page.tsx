"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header, Footer } from "@/components/layout"
import { useCartStore } from "@/store"

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotal } = useCartStore()
    const [mounted, setMounted] = useState(false)

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white pt-24 pb-16">
                    <div className="container mx-auto px-4">
                        <div className="animate-pulse">
                            <div className="h-10 w-48 bg-gray-200 rounded mb-8" />
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-24 bg-gray-200 rounded-xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    const subtotal = getTotal()
    const deliveryFee = subtotal > 500 ? 0 : 40
    const total = subtotal + deliveryFee

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                            <ShoppingCart className="w-8 h-8 text-fresh-600" />
                            Your Cart
                        </h1>
                        <p className="text-muted-foreground">
                            {items.length} {items.length === 1 ? "item" : "items"} in your cart
                        </p>
                    </motion.div>

                    {items.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-fresh-100 p-12 text-center max-w-lg mx-auto"
                        >
                            <div className="w-20 h-20 bg-fresh-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-10 h-10 text-fresh-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Looks like you haven&apos;t added any fresh produce yet.
                            </p>
                            <Button asChild className="gap-2">
                                <Link href="/products">
                                    Start Shopping
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                            className="bg-white rounded-xl border border-fresh-100 p-4 flex items-center gap-4"
                                        >
                                            {/* Product Image */}
                                            <div className="w-20 h-20 bg-gradient-to-br from-fresh-100 to-fresh-200 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Leaf className="w-8 h-8 text-fresh-600" />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-foreground truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    ₹{item.price} / {item.unit}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg bg-fresh-50 hover:bg-fresh-100 flex items-center justify-center transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg bg-fresh-50 hover:bg-fresh-100 flex items-center justify-center transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Price & Remove */}
                                            <div className="text-right">
                                                <p className="font-bold text-foreground">
                                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 mt-1"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                    Remove
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="lg:col-span-1"
                            >
                                <div className="bg-white rounded-2xl border border-fresh-100 p-6 sticky top-24">
                                    <h2 className="text-lg font-semibold text-foreground mb-4">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Delivery Fee</span>
                                            <span className="font-medium">
                                                {deliveryFee === 0 ? (
                                                    <span className="text-green-600">Free</span>
                                                ) : (
                                                    `₹${deliveryFee}`
                                                )}
                                            </span>
                                        </div>
                                        {deliveryFee > 0 && (
                                            <p className="text-xs text-fresh-600">
                                                Add ₹{500 - subtotal} more for free delivery
                                            </p>
                                        )}
                                        <div className="border-t border-fresh-100 pt-3">
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Total</span>
                                                <span className="font-bold text-lg">
                                                    ₹{total.toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button asChild className="w-full gap-2" size="lg">
                                        <Link href="/checkout">
                                            Proceed to Checkout
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Button>

                                    <Link
                                        href="/products"
                                        className="block text-center text-sm text-fresh-600 hover:text-fresh-700 mt-4"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
