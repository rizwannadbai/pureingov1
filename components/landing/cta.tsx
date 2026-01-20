"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"

export function CTA() {
    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fresh-500 via-fresh-600 to-emerald-600 p-10 md:p-16 lg:p-20"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-fresh-400/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    {/* Background Beams Animation */}
                    <BackgroundBeams className="opacity-70" />

                    {/* Floating Leaf Icons */}
                    <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center animate-float">
                        <Leaf className="w-8 h-8 text-white/50" />
                    </div>
                    <div className="absolute bottom-10 left-10 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                        <Leaf className="w-6 h-6 text-white/50" />
                    </div>

                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium mb-6">
                            Limited Time Offer
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Get ₹100 Off on Your First Order!
                        </h2>

                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                            Join thousands of happy customers enjoying fresh, organic produce
                            delivered to their doorstep. Use code <span className="font-bold">FRESH100</span> at checkout.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="xl"
                                className="bg-white text-fresh-600 hover:bg-white/90 hover:text-fresh-700 shadow-xl"
                                asChild
                            >
                                <Link href="/signup">
                                    Start Shopping
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                size="xl"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                                asChild
                            >
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/80 text-sm">
                            <span>✓ No minimum order</span>
                            <span>✓ Free delivery above ₹299</span>
                            <span>✓ 100% satisfaction guarantee</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
