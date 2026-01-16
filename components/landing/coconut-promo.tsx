"use client"

import Image from "next/image"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { toast } from "sonner"

export function CoconutPromo() {
    const addItem = useCartStore((state) => state.addItem)
    const openCart = useCartStore((state) => state.openCart)

    const handleAddToCart = () => {
        addItem({
            id: "coconut-water",
            name: "Fresh Tender Coconut Water",
            price: 69,
            quantity: 1,
            image: "/coconut-water.jpg",
        })
        toast.success("🥥 Coconut Water added to cart!")
        openCart()
    }

    return (
        <section className="py-8 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 p-8 md:p-12">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="relative z-10 text-center text-white">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-semibold">NEW ADD-ON</span>
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            {/* Coconut Image */}
                            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-110" />
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                                    <Image
                                        src="/coconut-water.jpg"
                                        alt="Fresh Tender Coconut Water with Straw"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                {/* Sparkle effects */}
                                <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
                                <div className="absolute -bottom-1 -left-2 text-xl animate-pulse" style={{ animationDelay: "0.5s" }}>💧</div>
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-4xl font-bold mb-2">
                                    Fresh Tender Coconut Water
                                </h3>
                                <p className="text-lg md:text-xl text-white/90 mb-1">
                                    🌴 With Straw • Straight from the Shell
                                </p>
                                <p className="text-white/80 text-sm md:text-base max-w-md">
                                    Nature's perfect hydration! Pure, refreshing & packed with electrolytes
                                </p>
                            </div>

                            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <p className="text-sm text-white/80 mb-1">Only</p>
                                <div className="text-4xl md:text-5xl font-bold mb-1">
                                    ₹69
                                </div>
                                <p className="text-sm text-white/80 mb-4">per coconut</p>
                                <Button
                                    size="lg"
                                    className="bg-white text-teal-600 hover:bg-white/90 font-bold shadow-xl"
                                    onClick={handleAddToCart}
                                >
                                    Add to Order 🌴
                                </Button>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm md:text-base">
                            <span className="bg-white/10 px-4 py-2 rounded-full">💧 Stay Hydrated</span>
                            <span className="bg-white/10 px-4 py-2 rounded-full">🏃 Post-Workout Essential</span>
                            <span className="bg-white/10 px-4 py-2 rounded-full">☀️ Beat the Heat</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
