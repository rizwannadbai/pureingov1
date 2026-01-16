"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Heart, Check, Clock, Star, Leaf, Droplet, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header, Footer } from "@/components/layout"
import { useCartStore } from "@/store"
import { WishlistButton } from "@/components/products/wishlist-button"
import { toast } from "sonner"
import { getProductById, type Product } from "@/lib/products"

const categoryColors: Record<string, string> = {
    'fresh-juices': 'from-orange-500 to-yellow-500',
    'juice-packages': 'from-purple-500 to-pink-500',
    'fresh-fruit-boxes': 'from-red-500 to-orange-500',
    'sprouts': 'from-green-500 to-emerald-500',
    'sprout-packages': 'from-teal-500 to-green-500',
}

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const { addItem } = useCartStore()

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const prod = await getProductById(id)
            if (!prod) {
                router.push('/products')
                return
            }
            setProduct(prod)
            setLoading(false)
        }

        fetchProduct()
    }, [id, router])

    const handleAddToCart = () => {
        if (!product) return

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image
        })
        toast.success(`${product.name} added to cart!`)
    }

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 animate-spin text-fresh-600" />
                </main>
                <Footer />
            </>
        )
    }

    if (!product) return null

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-fresh-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Products
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className={`aspect-square rounded-3xl bg-gradient-to-br ${categoryColors[product.category]} overflow-hidden relative`}>
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/30 text-[120px]">
                                        {product.category === 'fresh-juices' && '🧃'}
                                        {product.category === 'juice-packages' && '📦'}
                                        {product.category === 'fresh-fruit-boxes' && '🍎'}
                                        {product.category === 'sprouts' && '🌱'}
                                        {product.category === 'sprout-packages' && '📦'}
                                    </div>
                                )}
                            </div>

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                                    {product.type === 'subscription' ? '📦 Subscription' : product.type === 'wellness' ? '✨ Wellness' : product.type === 'combo' ? '🔥 Combo' : '🥤 Single'}
                                </span>
                            </div>

                            {/* Wishlist */}
                            <div className="absolute top-4 right-4">
                                <WishlistButton
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image || '',
                                        category: product.category,
                                        unit: product.unit,
                                    }}
                                    size="lg"
                                />
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {/* Category Badge */}
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${categoryColors[product.category]} mb-4`}>
                                {product.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </span>

                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {product.name}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-6">
                                {product.long_description || product.description}
                            </p>

                            {/* Quick Benefits */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.benefits?.map((benefit, i) => (
                                    <span key={i} className="px-3 py-1 bg-fresh-100 text-fresh-700 rounded-full text-sm font-medium">
                                        {benefit}
                                    </span>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="bg-fresh-50 rounded-2xl p-6 mb-6">
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-4xl font-bold text-fresh-600">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-lg text-muted-foreground">/{product.unit}</span>
                                </div>

                                {product.duration && (
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Duration: {product.duration}
                                    </p>
                                )}

                                <div className="flex gap-3">
                                    <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                                        <ShoppingCart className="w-5 h-5" />
                                        {product.type === 'subscription' ? 'Subscribe Now' : 'Add to Cart'}
                                    </Button>
                                </div>
                            </div>

                            {/* Features */}
                            {product.features && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg text-foreground mb-3">Features</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {product.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-fresh-500" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Best Time to Consume */}
                            {product.best_time && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl mb-4">
                                    <Clock className="w-5 h-5 text-fresh-600 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-foreground">Best Time to Consume</p>
                                        <p className="text-sm text-muted-foreground">{product.best_time}</p>
                                    </div>
                                </div>
                            )}

                            {/* How to Consume */}
                            {product.how_to_consume && (
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                    <Leaf className="w-5 h-5 text-fresh-600 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-foreground">How to Consume</p>
                                        <p className="text-sm text-muted-foreground">{product.how_to_consume}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Detailed Benefits Section */}
                    {product.benefit_details && product.benefit_details.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-16"
                        >
                            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                                <Star className="w-6 h-6 text-yellow-500" />
                                Health Benefits
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {product.benefit_details?.map((detail, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-10 h-10 bg-fresh-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="w-5 h-5 text-fresh-600" />
                                        </div>
                                        <p className="text-foreground">{detail}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Nutrition Info */}
                    {product.nutrition_info && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-16"
                        >
                            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                                <Droplet className="w-6 h-6 text-blue-500" />
                                Nutrition Information
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {product.nutrition_info?.map((info, i) => {
                                    const [label, value] = info.split(': ')
                                    return (
                                        <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                                            <p className="text-2xl font-bold text-fresh-600">{value}</p>
                                            <p className="text-sm text-muted-foreground">{label}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.section>
                    )}

                    {/* Pureingo Promise */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16"
                    >
                        <div className="bg-gradient-to-r from-fresh-500 to-emerald-500 rounded-3xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-6">Pureingo Promise</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5" />
                                    <span>No Added Sugar</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5" />
                                    <span>Fresh Daily Preparation</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5" />
                                    <span>Hygienic Packaging</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-5 h-5" />
                                    <span>Daily Delivery</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
            <Footer />
        </>
    )
}
