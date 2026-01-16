"use client"

import Link from "next/link"
import { ArrowRight, Truck, Leaf, Clock, ShieldCheck, Sparkles, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
    { value: "10K+", label: "Happy Customers", icon: Users },
    { value: "500+", label: "Fresh Products", icon: Leaf },
    { value: "99%", label: "On-Time Delivery", icon: Truck },
    { value: "4.9", label: "App Rating", icon: Star },
]

const features = [
    { icon: Clock, text: "6 AM Delivery", color: "text-blue-500" },
    { icon: Leaf, text: "100% Fresh", color: "text-fresh-500" },
    { icon: Truck, text: "Free Delivery", color: "text-orange-500" },
    { icon: ShieldCheck, text: "Quality Guaranteed", color: "text-purple-500" },
]

export function Hero() {
    return (
        <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-fresh-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            {/* Simple Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-fresh-200/30 dark:bg-fresh-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-20 lg:py-28 relative z-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left animate-fade-in">
                        {/* Live Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fresh-500 to-emerald-500 text-white px-4 py-2 rounded-full mb-6 shadow-lg shadow-fresh-500/25">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span className="text-sm font-medium">10,000+ customers ordering now</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
                            <span className="block">Fresh From</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fresh-500 via-emerald-500 to-fresh-600">
                                Farm to Table
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                            Experience the freshest fruits and vegetables delivered to your doorstep before 6 AM.
                            <span className="text-fresh-600 font-semibold"> Quality guaranteed.</span>
                        </p>

                        {/* Features Pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.text}
                                    className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md border border-gray-100 dark:border-gray-700"
                                >
                                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                                    <span className="text-sm font-medium text-foreground">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="gap-2 px-8 py-6 text-lg shadow-xl shadow-fresh-500/25 hover:scale-105 transition-transform" asChild>
                                <Link href="/products">
                                    <Sparkles className="w-5 h-5" />
                                    Shop Now
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-lg hover:scale-105 transition-transform" asChild>
                                <Link href="/how-it-works">
                                    See How It Works
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Glowing Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-fresh-400/40 to-emerald-400/40 rounded-full blur-3xl scale-90" />

                            {/* Main Circle */}
                            <div className="absolute inset-4 rounded-full border-2 border-dashed border-fresh-200 animate-spin-slow" />

                            {/* Center Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 bg-gradient-to-br from-fresh-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                                    <div className="text-center text-white">
                                        <div className="text-7xl mb-2 animate-pulse">🍎</div>
                                        <p className="text-2xl font-bold">Fresh Daily</p>
                                        <p className="text-fresh-100">100% Organic</p>
                                    </div>
                                </div>
                            </div>

                            {/* Orbiting Products - CSS animation */}
                            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "20s" }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl text-3xl">🥬</div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl text-3xl">🍊</div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl text-3xl">🥕</div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl text-3xl">🍇</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-16 lg:mt-24 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-fresh-100 to-emerald-100 dark:from-fresh-900/50 dark:to-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-fresh-600" />
                                    </div>
                                    <p className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
