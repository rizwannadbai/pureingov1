"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Droplet, Package, Apple, Sprout, Check, ArrowRight, ShoppingCart, Star, Sparkles, Crown, Gift, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header, Footer } from "@/components/layout"
import { useCartStore } from "@/store"
import { WishlistButton } from "@/components/products/wishlist-button"
import { toast } from "sonner"
import {
    getProducts,
    getProductsByCategory,
    type Product,
    type ProductCategory
} from "@/lib/products"

const categoryIcons: Record<ProductCategory, any> = {
    'fresh-juices': Droplet,
    'juice-packages': Package,
    'fresh-fruit-boxes': Apple,
    'sprouts': Sprout,
    'sprout-packages': Package,
}

const categoryColors: Record<ProductCategory, string> = {
    'fresh-juices': 'from-orange-500 to-yellow-500',
    'juice-packages': 'from-purple-500 to-pink-500',
    'fresh-fruit-boxes': 'from-red-500 to-orange-500',
    'sprouts': 'from-green-500 to-emerald-500',
    'sprout-packages': 'from-teal-500 to-green-500',
}

const addonCategories = [
    { id: 'fresh-juices', name: 'Fresh Juices' },
    { id: 'juice-packages', name: 'Juice Packages' },
    { id: 'sprouts', name: 'Sprouts' },
    { id: 'sprout-packages', name: 'Sprout Packages' },
]

export default function ProductsPage() {
    const [activeAddon, setActiveAddon] = useState<string>('fresh-juices')
    const [fruitBoxes, setFruitBoxes] = useState<Product[]>([])
    const [addonProducts, setAddonProducts] = useState<Record<string, Product[]>>({})
    const [loading, setLoading] = useState(true)
    const { addItem } = useCartStore()

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)

            // Fetch fruit boxes (main products)
            const boxes = await getProductsByCategory('fresh-fruit-boxes')
            setFruitBoxes(boxes)

            // Fetch addon products for all categories
            const addons: Record<string, Product[]> = {}
            for (const category of addonCategories) {
                const products = await getProductsByCategory(category.id as ProductCategory)
                addons[category.id] = products
            }
            setAddonProducts(addons)

            setLoading(false)
        }

        fetchProducts()
    }, [])

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault()
        e.stopPropagation()

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image
        })

        toast.success(`${product.name} added to cart!`)
    }

    const currentAddons = addonProducts[activeAddon]

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 bg-fresh-100 dark:bg-fresh-900/50 text-fresh-700 dark:text-fresh-300 rounded-full text-sm font-medium mb-4">
                            Pure. Fresh. Everyday.
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            Fresh Fruit Subscriptions
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Hand-picked, 100% fresh fruits delivered to your doorstep every morning. Choose your perfect plan.
                        </p>
                    </motion.div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <Loader2 className="w-12 h-12 animate-spin text-fresh-600" />
                        </div>
                    ) : (
                        <>

                            {/* =============================================== */}
                            {/* MAIN PRODUCTS: Fresh Fruit Boxes */}
                            {/* =============================================== */}
                            <section className="mb-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 mb-8"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                        <Crown className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            Our Subscription Plans
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Daily fresh fruit delivery • No commitment • Cancel anytime
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {fruitBoxes.map((box, idx) => (
                                        <motion.div
                                            key={box.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Link
                                                href={`/products/${box.id}`}
                                                className="group block bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden hover:border-fresh-300 dark:hover:border-fresh-500 hover:shadow-2xl transition-all duration-300"
                                            >
                                                {/* Image */}
                                                <div className="relative h-56 bg-gradient-to-br from-red-100 to-orange-100 overflow-hidden">
                                                    {box.image && (
                                                        <Image
                                                            src={box.image}
                                                            alt={box.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    )}

                                                    {/* Badge */}
                                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-fresh-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                                        ⭐ Most Popular
                                                    </div>

                                                    {/* Wishlist */}
                                                    <div className="absolute top-4 right-4">
                                                        <WishlistButton
                                                            product={{
                                                                id: box.id,
                                                                name: box.name,
                                                                price: box.price,
                                                                image: box.image || '',
                                                                category: box.category,
                                                                unit: box.unit,
                                                            }}
                                                            size="sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-fresh-600 transition-colors">
                                                        {box.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        {box.description}
                                                    </p>

                                                    {/* Features */}
                                                    <div className="bg-fresh-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                                                        <ul className="space-y-2">
                                                            {box.features?.slice(0, 3).map((feature, i) => (
                                                                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                                                                    <Check className="w-4 h-4 text-fresh-500 flex-shrink-0" />
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Benefits Tags */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {box.benefits?.map((benefit, i) => (
                                                            <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                                                                {benefit}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Price & CTA */}
                                                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                                        <div>
                                                            <span className="text-3xl font-bold text-fresh-600">
                                                                ₹{box.price.toLocaleString('en-IN')}
                                                            </span>
                                                            <span className="text-xs opacity-75">({addonCategories.find(c => c.id === activeAddon)?.name || activeAddon})</span>
                                                        </div>
                                                        <Button
                                                            size="lg"
                                                            className="gap-2"
                                                            onClick={(e) => handleAddToCart(e, box)}
                                                        >
                                                            Subscribe
                                                            <ArrowRight className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* =============================================== */}
                            {/* ADD-ONS Section */}
                            {/* =============================================== */}
                            <section>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-8"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <Gift className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            Add-Ons
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Enhance your subscription with fresh juices & sprouts
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Addon Category Tabs */}
                                <div className="mb-8 overflow-x-auto pb-2">
                                    <div className="flex gap-3 min-w-max">
                                        {addonCategories.map((cat) => {
                                            const CatIcon = categoryIcons[cat.id as ProductCategory]
                                            const isActive = activeAddon === cat.id
                                            return (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setActiveAddon(cat.id)}
                                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                                        ? `bg-gradient-to-r ${categoryColors[cat.id as ProductCategory]} text-white shadow-lg`
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:border-fresh-300'
                                                        }`}
                                                >
                                                    <CatIcon className="w-4 h-4" />
                                                    <span>{cat.name}</span>
                                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100'
                                                        }`}>
                                                        {addonProducts[cat.id]?.length || 0}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Addon Products Grid */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeAddon}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`grid gap-4 ${activeAddon.includes('package')
                                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                                            }`}
                                    >
                                        {currentAddons.map((product, idx) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.03 }}
                                            >
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-fresh-200 transition-all duration-300"
                                                >
                                                    {/* Image/Header */}
                                                    <div className={`relative h-28 bg-gradient-to-br ${categoryColors[activeAddon as ProductCategory]} overflow-hidden`}>
                                                        {product.image ? (
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/30 text-4xl">
                                                                {activeAddon === 'fresh-juices' && '🧃'}
                                                                {activeAddon === 'juice-packages' && '📦'}
                                                                {activeAddon === 'sprouts' && '🌱'}
                                                                {activeAddon === 'sprout-packages' && '📦'}
                                                            </div>
                                                        )}

                                                        {/* Type Badge */}
                                                        {product.type && product.type !== 'single' && (
                                                            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[10px] font-medium capitalize flex items-center gap-1">
                                                                {product.type === 'wellness' && <Sparkles className="w-2.5 h-2.5 text-purple-500" />}
                                                                {product.type === 'combo' && <Star className="w-2.5 h-2.5 text-orange-500" />}
                                                                {product.type === 'subscription' && '📦'}
                                                                {product.type}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-3">
                                                        <h3 className="font-medium text-sm text-foreground mb-1 group-hover:text-fresh-600 transition-colors line-clamp-1">
                                                            {product.name}
                                                        </h3>

                                                        {/* Benefits */}
                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {product.benefits?.slice(0, 2).map((benefit, i) => (
                                                                <span key={i} className="text-[10px] bg-fresh-50 text-fresh-700 px-1.5 py-0.5 rounded-full">
                                                                    {benefit}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Price & CTA */}
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div>
                                                                <span className="text-sm font-bold text-fresh-600">
                                                                    ₹{product.price}
                                                                </span>
                                                                <span className="text-[10px] text-muted-foreground">
                                                                    /{product.unit}
                                                                </span>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-7 px-2 text-xs hover:bg-fresh-50 hover:text-fresh-600"
                                                                onClick={(e) => handleAddToCart(e, product)}
                                                            >
                                                                <ShoppingCart className="w-3 h-3 mr-1" />
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </section>

                            {/* Brand Promise */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-20"
                            >
                                <div className="bg-gradient-to-r from-fresh-500 to-emerald-500 rounded-3xl p-10 text-white text-center">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                        Our Promise
                                    </h2>
                                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5" />
                                            <span>No Added Sugar</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5" />
                                            <span>Fresh Daily Preparation</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5" />
                                            <span>Hygienic Packaging</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5" />
                                            <span>Daily Delivery</span>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-fresh-100 max-w-xl mx-auto">
                                        Pureingo focuses on daily health habits, not one-time purchases. Start your wellness journey today.
                                    </p>
                                    <Button size="lg" variant="secondary" className="mt-6 gap-2" asChild>
                                        <Link href="/signup">
                                            Get Started <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.section>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
