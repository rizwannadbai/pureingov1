"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Gift, Truck, Bell } from "lucide-react"
import Link from "next/link"

interface Announcement {
    id: string
    message: string
    link?: string
    linkText?: string
    icon?: "sparkles" | "gift" | "truck" | "bell"
    bgGradient?: string
}

const announcements: Announcement[] = [
    {
        id: "1",
        message: "🎉 NEW: Fresh Mango Season is here! Try our Alphonso Mango Box",
        link: "/products",
        linkText: "Shop Now",
        icon: "sparkles",
        bgGradient: "from-orange-500 via-amber-500 to-yellow-500"
    },
    {
        id: "2",
        message: "🚀 Free Delivery on orders above ₹499 - Limited Time Offer!",
        link: "/products",
        linkText: "Order Now",
        icon: "truck",
        bgGradient: "from-emerald-500 via-green-500 to-teal-500"
    },
    {
        id: "3",
        message: "💪 NEW Immunity Booster Juice Pack - Stay healthy this season",
        link: "/products",
        linkText: "Explore",
        icon: "gift",
        bgGradient: "from-purple-500 via-violet-500 to-indigo-500"
    },
    {
        id: "4",
        message: "🌿 Introducing Organic Sprout Subscriptions - Pure & Fresh Daily",
        link: "/products",
        linkText: "Subscribe",
        icon: "bell",
        bgGradient: "from-green-500 via-emerald-500 to-lime-500"
    }
]

const iconMap = {
    sparkles: Sparkles,
    gift: Gift,
    truck: Truck,
    bell: Bell
}

export function AnnouncementBanner() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    if (!isVisible) return null

    const current = announcements[currentIndex]
    const Icon = iconMap[current.icon || "sparkles"]

    return (
        <div className={`relative overflow-hidden bg-gradient-to-r ${current.bgGradient} transition-all duration-500`}>
            <div className="relative container mx-auto px-4 py-2.5">
                <div className="flex items-center justify-center gap-3">
                    {/* Indicator dots */}
                    <div className="hidden sm:flex items-center gap-1.5 mr-4">
                        {announcements.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex
                                        ? "bg-white scale-125"
                                        : "bg-white/40 hover:bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-2 text-white">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">
                            {current.message}
                        </span>
                        {current.link && (
                            <Link
                                href={current.link}
                                className="ml-2 text-sm font-bold underline underline-offset-2 hover:no-underline transition-all whitespace-nowrap"
                            >
                                {current.linkText} →
                            </Link>
                        )}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                        aria-label="Dismiss announcement"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
