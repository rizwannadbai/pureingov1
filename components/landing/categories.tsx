"use client"

import Link from "next/link"
import { Droplet, Package, Sprout, ArrowRight, Crown, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

// Main Products - Fruit Boxes (Subscriptions)
const mainProducts = [
    {
        id: "box-daily",
        name: "Daily Fresh Fruit Box",
        description: "For individuals - fresh fruits every morning",
        price: "₹2,899",
        emoji: "🍎",
        color: "from-red-500 to-orange-500",
        bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
        features: ["1-person portion", "Daily delivery", "Premium fruits"],
    },
    {
        id: "box-couple",
        name: "Couple Fruit Box",
        description: "Double portion for couples",
        price: "₹4,999",
        emoji: "🍊",
        color: "from-orange-500 to-amber-500",
        bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
        features: ["2-person portion", "Premium mix", "Smart packaging"],
    },
    {
        id: "box-family",
        name: "Family Fruit Box",
        description: "For families of 3-5 members",
        price: "₹8,999",
        emoji: "🍇",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
        features: ["3-5 member portions", "Weekly variety", "Best value"],
    },
]

// Add-ons
const addons = [
    {
        id: "fresh-juices",
        name: "Fresh Juices",
        description: "24 varieties of freshly pressed juices",
        icon: Droplet,
        emoji: "🧃",
        color: "from-orange-500 to-yellow-500",
        count: "24",
    },
    {
        id: "juice-packages",
        name: "Juice Packages",
        description: "Subscription juice plans",
        icon: Package,
        emoji: "📦",
        color: "from-purple-500 to-pink-500",
        count: "4",
    },
    {
        id: "sprouts",
        name: "Fresh Sprouts",
        description: "High-protein ready-to-eat sprouts",
        icon: Sprout,
        emoji: "🌱",
        color: "from-green-500 to-emerald-500",
        count: "7",
    },
    {
        id: "sprout-packages",
        name: "Sprout Packages",
        description: "Monthly sprout subscriptions",
        icon: Package,
        emoji: "📦",
        color: "from-teal-500 to-green-500",
        count: "3",
    },
]

export function Categories() {
    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-14 animate-fade-in">
                    <span className="inline-block px-4 py-1.5 bg-fresh-100 dark:bg-fresh-900/50 text-fresh-700 dark:text-fresh-300 rounded-full text-sm font-medium mb-4">
                        🛒 Our Products
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Fresh Fruit{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-500 to-emerald-500">
                            Subscriptions
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Hand-picked fruits delivered daily. Choose your perfect plan.
                    </p>
                </div>

                {/* MAIN PRODUCTS: Fruit Box Subscriptions */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Monthly Subscriptions
                        </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {mainProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Link
                                    href={`/products/${product.id}`}
                                    className={`block relative p-6 rounded-3xl ${product.bgColor} dark:from-gray-800 dark:to-gray-800 border-2 border-transparent hover:border-fresh-300 dark:hover:border-fresh-500 transition-all duration-300 group hover:shadow-xl`}
                                >
                                    {/* Price Badge */}
                                    <div className={`absolute top-4 right-4 bg-gradient-to-r ${product.color} text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                                        {product.price}/mo
                                    </div>

                                    <div className="text-5xl mb-4">{product.emoji}</div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-fresh-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        {product.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="text-xs font-medium px-2 py-1 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-700 dark:text-gray-300"
                                            >
                                                ✓ {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center text-fresh-600 font-medium text-sm group-hover:text-fresh-700">
                                        <span>Subscribe Now</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ADD-ONS */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Gift className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Add-Ons - Enhance Your Subscription
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {addons.map((addon, index) => (
                            <div
                                key={addon.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                            >
                                <Link
                                    href={`/products?addon=${addon.id}`}
                                    className="block p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:border-fresh-200 dark:hover:border-fresh-600 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${addon.color} flex items-center justify-center text-lg`}>
                                            {addon.emoji}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground group-hover:text-fresh-600 transition-colors text-sm">
                                                {addon.name}
                                            </h3>
                                            <span className="text-xs text-muted-foreground">
                                                {addon.count} products
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {addon.description}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <Button size="lg" className="gap-2 px-8" asChild>
                        <Link href="/products">
                            View All Products
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
