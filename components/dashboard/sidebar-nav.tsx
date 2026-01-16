"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { User, MapPin, Package, Home, Shield, CreditCard, Settings, HelpCircle, Wallet, Crown, Heart, Star, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const mainNavItems = [
    {
        href: "/dashboard",
        label: "Overview",
        icon: Home,
        color: "from-blue-500 to-blue-600",
    },
    {
        href: "/dashboard/orders",
        label: "My Orders",
        icon: Package,
        color: "from-orange-500 to-orange-600",
    },
    {
        href: "/dashboard/wishlist",
        label: "Wishlist",
        icon: Heart,
        color: "from-red-500 to-red-600",
    },
    {
        href: "/dashboard/addresses",
        label: "Addresses",
        icon: MapPin,
        color: "from-green-500 to-green-600",
    },
]

const profileSections = [
    { id: "profile", label: "Personal Info", icon: User, color: "from-purple-500 to-purple-600" },
    { id: "security", label: "Security", icon: Shield, color: "from-red-500 to-red-600" },
    { id: "subscription", label: "Subscription", icon: Crown, color: "from-yellow-500 to-yellow-600" },
    { id: "payments", label: "Payments", icon: CreditCard, color: "from-pink-500 to-pink-600" },
    { id: "wallet", label: "Wallet & Rewards", icon: Wallet, color: "from-emerald-500 to-emerald-600" },
    { id: "preferences", label: "Settings", icon: Settings, color: "from-gray-500 to-gray-600" },
    { id: "support", label: "Help & Support", icon: HelpCircle, color: "from-cyan-500 to-cyan-600" },
]

interface SidebarNavProps {
    onLogout?: () => void
    userName?: string
}

export function SidebarNav({ onLogout, userName }: SidebarNavProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const activeSection = searchParams.get('section') || 'profile'

    const isProfilePage = pathname === '/dashboard/profile'

    return (
        <div className="flex flex-col flex-1">
            {/* Main Navigation */}
            <nav className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">
                    {userName || 'Dashboard'}
                </p>
                {mainNavItems.map((item, index) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r text-white shadow-md " + item.color
                                        : "text-muted-foreground hover:bg-fresh-50 hover:text-foreground"
                                )}
                            >
                                <div className={cn(
                                    "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                                    isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-fresh-100"
                                )}>
                                    <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-fresh-600")} />
                                </div>
                                <span className="flex-1">{item.label}</span>
                            </Link>
                        </motion.div>
                    )
                })}
            </nav>

            {/* Profile Sections */}
            <nav className="mt-6 space-y-1.5 flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">
                    My Account
                </p>
                {profileSections.map((item, index) => {
                    const isActive = isProfilePage && activeSection === item.id
                    const Icon = item.icon

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + mainNavItems.length) * 0.03 }}
                        >
                            <Link
                                href={`/dashboard/profile?section=${item.id}`}
                                className={cn(
                                    "group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative",
                                    isActive
                                        ? "bg-gradient-to-r text-white shadow-md " + item.color
                                        : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                    isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"
                                )}>
                                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700")} />
                                </div>
                                <span className="flex-1">{item.label}</span>
                                {isActive && (
                                    <div className="w-1.5 h-6 bg-white/30 rounded-full" />
                                )}
                            </Link>
                        </motion.div>
                    )
                })}
            </nav>

            {/* Premium Card */}
            <div className="mx-2 my-4 p-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <Star className="w-7 h-7 mb-2 opacity-80" />
                <h4 className="font-bold text-sm mb-1">Go Premium</h4>
                <p className="text-xs opacity-80 mb-3">Free delivery & exclusive discounts</p>
                <Link
                    href="/pricing"
                    className="inline-block bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                >
                    Upgrade Now
                </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 pt-3 px-2">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <LogOut className="w-4 h-4 text-red-500" />
                    </div>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
