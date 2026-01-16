"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ShoppingBag, ShoppingCart, Heart, User } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { useState, useEffect } from "react"

const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/products", icon: ShoppingBag, label: "Products" },
    { href: "/cart", icon: ShoppingCart, label: "Cart", showBadge: "cart" },
    { href: "/dashboard/wishlist", icon: Heart, label: "Wishlist", showBadge: "wishlist" },
    { href: "/dashboard", icon: User, label: "Account" },
]

export function MobileNav() {
    const pathname = usePathname()
    const { items: cartItems } = useCartStore()
    const { items: wishlistItems } = useWishlistStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Don't show on dashboard pages (they have their own nav)
    if (pathname?.startsWith("/dashboard") && pathname !== "/dashboard/wishlist") {
        return null
    }

    // Don't show on login/signup pages
    if (pathname === "/login" || pathname === "/signup") {
        return null
    }

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/" && pathname?.startsWith(item.href))
                    const Icon = item.icon

                    let badgeCount = 0
                    if (item.showBadge === "cart") badgeCount = cartItems.length
                    if (item.showBadge === "wishlist") badgeCount = wishlistItems.length

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center flex-1 h-full relative"
                        >
                            <div className="relative">
                                <Icon className={`w-5 h-5 transition-colors ${isActive
                                    ? "text-fresh-600"
                                    : "text-gray-500 dark:text-gray-400"
                                    }`} />
                                {badgeCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 w-4 h-4 bg-fresh-500 text-white text-xs rounded-full flex items-center justify-center"
                                    >
                                        {badgeCount > 9 ? "9+" : badgeCount}
                                    </motion.span>
                                )}
                            </div>
                            <span className={`text-xs mt-1 transition-colors ${isActive
                                ? "text-fresh-600 font-medium"
                                : "text-gray-500 dark:text-gray-400"
                                }`}>
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-indicator"
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-fresh-500 rounded-b-full"
                                />
                            )}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
