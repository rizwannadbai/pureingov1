"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Package, Truck, CreditCard, Gift, Check, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Notification {
    id: string
    type: "order" | "delivery" | "payment" | "promo"
    title: string
    message: string
    timestamp: Date
    read: boolean
    link?: string
}

// Sample notifications - in production, fetch from API
const sampleNotifications: Notification[] = [
    {
        id: "1",
        type: "delivery",
        title: "Delivery Tomorrow",
        message: "Your Daily Fresh Fruit Box will arrive by 9 AM",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
    },
    {
        id: "2",
        type: "order",
        title: "Order Confirmed",
        message: "Order #ORD-2024-001 has been confirmed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        link: "/dashboard/orders",
    },
    {
        id: "3",
        type: "promo",
        title: "Weekend Special! 🎉",
        message: "Get 20% off on all fruit boxes this weekend",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true,
    },
    {
        id: "4",
        type: "payment",
        title: "Payment Successful",
        message: "₹2,899 debited for Monthly Subscription",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        read: true,
    },
]

const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
        case "order":
            return Package
        case "delivery":
            return Truck
        case "payment":
            return CreditCard
        case "promo":
            return Gift
        default:
            return Bell
    }
}

const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
        case "order":
            return "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
        case "delivery":
            return "bg-fresh-100 text-fresh-600 dark:bg-fresh-900/50 dark:text-fresh-400"
        case "payment":
            return "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
        case "promo":
            return "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400"
        default:
            return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
    }
}

export function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
    const [mounted, setMounted] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)

    const unreadCount = notifications.filter(n => !n.read).length

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        )
    }

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }

    const clearAll = () => {
        setNotifications([])
        setIsOpen(false)
    }

    if (!mounted) return null

    return (
        <div className="relative" ref={panelRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                            <div className="flex items-center gap-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs text-fresh-600 hover:text-fresh-700 font-medium"
                                    >
                                        Mark all read
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                        <Bell className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notification) => {
                                    const Icon = getNotificationIcon(notification.type)
                                    return (
                                        <div
                                            key={notification.id}
                                            onClick={() => markAsRead(notification.id)}
                                            className={`p-4 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${!notification.read ? "bg-fresh-50/30 dark:bg-fresh-900/10" : ""
                                                }`}
                                        >
                                            <div className="flex gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                            {notification.title}
                                                        </p>
                                                        {!notification.read && (
                                                            <span className="w-2 h-2 bg-fresh-500 rounded-full flex-shrink-0 mt-1.5" />
                                                        )}
                                                    </div>
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                                <button
                                    onClick={clearAll}
                                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    Clear all
                                </button>
                                <button className="text-xs text-fresh-600 hover:text-fresh-700 font-medium">
                                    View all notifications
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
