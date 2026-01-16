"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Eye } from "lucide-react"

interface ViewedProduct {
    id: string
    name: string
    price: number
    image: string
    viewedAt: number
}

const STORAGE_KEY = "pureingo-recently-viewed"
const MAX_ITEMS = 8

// Utility functions to manage recently viewed products
export function addToRecentlyViewed(product: Omit<ViewedProduct, "viewedAt">) {
    if (typeof window === "undefined") return

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        const items: ViewedProduct[] = stored ? JSON.parse(stored) : []

        // Remove if already exists
        const filtered = items.filter(i => i.id !== product.id)

        // Add to beginning
        const updated = [{ ...product, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
        console.error("Failed to save recently viewed", e)
    }
}

export function getRecentlyViewed(): ViewedProduct[] {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch (e) {
        return []
    }
}

// React Component
export function RecentlyViewed() {
    const [products, setProducts] = useState<ViewedProduct[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setProducts(getRecentlyViewed())
    }, [])

    if (!mounted || products.length === 0) return null

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-fresh-100 dark:bg-fresh-900/50 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-fresh-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Viewed</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pick up where you left off</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {products.slice(0, 4).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/products/${product.id}`}
                                className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative aspect-square bg-gradient-to-br from-fresh-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 p-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Eye className="w-4 h-4 text-fresh-600" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-fresh-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-fresh-600 font-bold mt-1">
                                        ₹{product.price}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
