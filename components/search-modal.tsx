"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { allProducts } from "@/data/products"

interface SearchResult {
    id: string
    name: string
    price: number
    image: string
    category?: string
}

const recentSearches = ["Fresh Mango", "Organic Apple", "Juice Pack", "Daily Box"]
const trendingProducts = ["Daily Fresh Fruit Box", "Mixed Fruit Juice", "Seasonal Fruits"]

export function SearchModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    // Convert allProducts to searchable format (filter out products without images)
    const searchableProducts: SearchResult[] = allProducts
        .filter(p => p.image)
        .map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image!,
            category: p.category,
        }))

    // Keyboard shortcut to open search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Search logic
    useEffect(() => {
        if (query.length > 1) {
            const filtered = searchableProducts.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category?.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 6)
            setResults(filtered)
        } else {
            setResults([])
        }
    }, [query])

    const handleClose = () => {
        setIsOpen(false)
        setQuery("")
        setResults([])
    }

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <Search className="w-4 h-4" />
                <span className="text-sm hidden md:inline">Search products...</span>
                <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                    ⌘K
                </kbd>
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Search Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                            {/* Search Input */}
                            <div className="flex items-center border-b border-gray-100 dark:border-gray-700 px-4">
                                <Search className="w-5 h-5 text-gray-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search products, categories..."
                                    className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                                />
                                {query && (
                                    <button
                                        onClick={() => setQuery("")}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                    >
                                        <X className="w-4 h-4 text-gray-400" />
                                    </button>
                                )}
                            </div>

                            {/* Results or Suggestions */}
                            <div className="max-h-96 overflow-y-auto p-2">
                                {results.length > 0 ? (
                                    // Search Results
                                    <div className="space-y-1">
                                        {results.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                onClick={handleClose}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {product.name}
                                                    </p>
                                                    {product.category && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {product.category}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="font-bold text-fresh-600">
                                                    ₹{product.price}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    // Default Suggestions
                                    <div className="space-y-4 p-2">
                                        {/* Recent Searches */}
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                <Clock className="w-4 h-4" />
                                                Recent Searches
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {recentSearches.map((search) => (
                                                    <button
                                                        key={search}
                                                        onClick={() => setQuery(search)}
                                                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                                    >
                                                        {search}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Trending */}
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                <TrendingUp className="w-4 h-4" />
                                                Trending
                                            </div>
                                            <div className="space-y-1">
                                                {trendingProducts.map((product) => (
                                                    <button
                                                        key={product}
                                                        onClick={() => setQuery(product)}
                                                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                                    >
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {product}
                                                        </span>
                                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center justify-between text-xs text-gray-400">
                                <span>
                                    Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd> to close
                                </span>
                                <span>
                                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↵</kbd> to select
                                </span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
