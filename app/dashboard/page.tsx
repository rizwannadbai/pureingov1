"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
    Package, MapPin, User, ArrowRight, ShoppingBag, Calendar,
    TrendingUp, Clock, Gift, Star, ChevronRight, Zap, Heart,
    CreditCard, Truck, Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeliveryCalendar } from "@/components/dashboard/delivery-calendar"
import { SubscriptionManager } from "@/components/dashboard/subscription-manager"
import { createClient } from "@/lib/supabase"

// Dashboard Stats
const stats = [
    {
        label: "Total Orders",
        value: "12",
        change: "+2 this month",
        icon: Package,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        label: "Active Subscriptions",
        value: "2",
        change: "Running smoothly",
        icon: Calendar,
        color: "from-fresh-500 to-emerald-500",
        bgColor: "bg-fresh-50"
    },
    {
        label: "Reward Points",
        value: "850",
        change: "₹85 cashback",
        icon: Gift,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50"
    },
    {
        label: "Saved Addresses",
        value: "3",
        change: "Home, Office, Other",
        icon: MapPin,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50"
    },
]

// Quick Actions
const quickActions = [
    {
        title: "Browse Products",
        description: "Fresh fruits, vegetables & more",
        icon: ShoppingBag,
        href: "/products",
        color: "bg-fresh-500",
    },
    {
        title: "Track Order",
        description: "See where your order is",
        icon: Truck,
        href: "/track-order",
        color: "bg-blue-500",
    },
    {
        title: "My Wishlist",
        description: "Items you saved for later",
        icon: Heart,
        href: "/dashboard/wishlist",
        color: "bg-pink-500",
    },
    {
        title: "Payment Methods",
        description: "Manage your cards & UPI",
        icon: CreditCard,
        href: "/dashboard/profile",
        color: "bg-purple-500",
    },
]

// Recent Orders
const recentOrders = [
    {
        id: "ORD-1234",
        date: "Jan 15, 2026",
        total: "₹856",
        status: "Delivered",
        items: 3,
        image: "/daily_fruit_box.png"
    },
    {
        id: "ORD-1233",
        date: "Jan 12, 2026",
        total: "₹1,240",
        status: "Delivered",
        items: 5,
        image: "/couple_fruit_box.png"
    },
    {
        id: "ORD-1232",
        date: "Jan 8, 2026",
        total: "₹650",
        status: "Delivered",
        items: 2,
        image: "/family_fruit_box.png"
    },
]

// Active Subscriptions
const activeSubscriptions = [
    {
        name: "Daily Fresh Fruit Box",
        plan: "Monthly",
        nextDelivery: "Tomorrow, 6 AM",
        price: "₹2,899/mo",
        image: "/daily_fruit_box.png",
    },
    {
        name: "Fresh Orange Juice",
        plan: "Weekly",
        nextDelivery: "Mon, Wed, Fri",
        price: "₹599/week",
        image: "/fresh_juices_hero.png",
    },
]

// Get greeting based on time
const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
}

export default function DashboardPage() {
    const [userName, setUserName] = useState<string>("")
    const supabase = createClient()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // Try to get name from profile first
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('name')
                    .eq('id', user.id)
                    .single()

                const name = profile?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
                setUserName(name)
            }
        }
        fetchUser()
    }, [supabase])

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {getGreeting()}, {userName || 'there'}! 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Here&apos;s what&apos;s happening with your account today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Bell className="w-4 h-4" />
                        <span className="hidden sm:inline">Notifications</span>
                        <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                    </Button>
                    <Button size="sm" className="gap-2" asChild>
                        <Link href="/products">
                            <ShoppingBag className="w-4 h-4" />
                            Shop Now
                        </Link>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.label}
                            className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.change}</p>
                                </div>
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className={`absolute -right-4 -bottom-4 w-20 h-20 ${stat.bgColor} rounded-full opacity-50`} />
                        </div>
                    )
                })}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Subscriptions with Pause/Resume */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5"
                    >
                        <SubscriptionManager />
                    </motion.div>

                    {/* Recent Orders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Your order history</p>
                                </div>
                            </div>
                            <Link href="/dashboard/orders" className="text-sm text-fresh-600 hover:text-fresh-700 font-medium flex items-center gap-1">
                                View All
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
                                        <span className="text-xl">📦</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.date} • {order.items} items</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 dark:text-white">{order.total}</p>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {quickActions.map((action) => {
                                const Icon = action.icon
                                return (
                                    <Link
                                        key={action.title}
                                        href={action.href}
                                        className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-fresh-200 hover:shadow-md transition-all text-center"
                                    >
                                        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">{action.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{action.description}</p>
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="lg:col-span-1"
                >
                    <DeliveryCalendar />
                </motion.div>
            </div>

            {/* Promo Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative overflow-hidden bg-gradient-to-r from-fresh-500 via-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8"
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Star className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-white">
                            <h3 className="text-lg font-bold">Refer & Earn ₹200!</h3>
                            <p className="text-white/80 text-sm">Share Pureingo with friends and earn rewards</p>
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        className="bg-white text-fresh-600 hover:bg-white/90 shadow-lg"
                    >
                        Invite Friends
                    </Button>
                </div>
                {/* Decorative circles */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-white/10 rounded-full" />
            </motion.div>
        </div>
    )
}
