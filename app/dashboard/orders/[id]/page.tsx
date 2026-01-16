"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    Package, Truck, CheckCircle, Clock, MapPin, Phone,
    ArrowLeft, RefreshCw, MessageSquare, Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header, Footer } from "@/components/layout"

interface OrderStep {
    status: string
    label: string
    description: string
    time: string | null
    completed: boolean
    current: boolean
}

// Sample order data
const orderData = {
    id: "ORD-2024-001",
    date: "Jan 15, 2024",
    items: [
        { name: "Daily Fresh Fruit Box", quantity: 1, price: 2899, image: "/fruit-box.png" },
        { name: "Fresh Orange Juice", quantity: 2, price: 199, image: "/juice.png" },
    ],
    total: 3297,
    status: "out_for_delivery",
    deliveryAddress: "123 Green Lane, Andheri West, Mumbai 400058",
    deliveryPerson: {
        name: "Rahul Kumar",
        phone: "+91 98765 43210",
        rating: 4.8,
    },
    estimatedTime: "9:00 AM - 10:00 AM",
}

const orderSteps: OrderStep[] = [
    {
        status: "confirmed",
        label: "Order Confirmed",
        description: "Your order has been received",
        time: "8:00 AM",
        completed: true,
        current: false,
    },
    {
        status: "processing",
        label: "Processing",
        description: "We're preparing your items",
        time: "8:15 AM",
        completed: true,
        current: false,
    },
    {
        status: "out_for_delivery",
        label: "Out for Delivery",
        description: "Your order is on the way",
        time: "8:45 AM",
        completed: true,
        current: true,
    },
    {
        status: "delivered",
        label: "Delivered",
        description: "Enjoy your fresh produce!",
        time: null,
        completed: false,
        current: false,
    },
]

export default function OrderTrackingPage() {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1500)
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Back Button */}
                    <Link
                        href="/dashboard/orders"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-fresh-600 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Orders
                    </Link>

                    {/* Order Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Track Order
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Order {orderData.id} • {orderData.date}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={refreshing}
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                                Refresh
                            </Button>
                        </div>

                        {/* Estimated Delivery */}
                        <div className="bg-fresh-50 dark:bg-fresh-900/30 rounded-xl p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-fresh-500 rounded-xl flex items-center justify-center text-white">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-fresh-700 dark:text-fresh-300">Estimated Delivery</p>
                                <p className="font-bold text-fresh-800 dark:text-fresh-200 text-lg">
                                    {orderData.estimatedTime}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-6">Order Status</h2>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                            {orderSteps.map((step, index) => (
                                <motion.div
                                    key={step.status}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative flex gap-4 pb-8 last:pb-0"
                                >
                                    {/* Status dot */}
                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${step.completed
                                            ? "bg-fresh-500 text-white"
                                            : step.current
                                                ? "bg-fresh-500 text-white animate-pulse"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                        }`}>
                                        {step.completed ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : step.current ? (
                                            <Truck className="w-5 h-5" />
                                        ) : (
                                            <Package className="w-5 h-5" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-medium ${step.completed || step.current
                                                    ? "text-gray-900 dark:text-white"
                                                    : "text-gray-400 dark:text-gray-500"
                                                }`}>
                                                {step.label}
                                            </h3>
                                            {step.time && (
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {step.time}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Person */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Delivery Partner</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {orderData.deliveryPerson.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {orderData.deliveryPerson.name}
                                </p>
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    {orderData.deliveryPerson.rating}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                </Button>
                                <Button variant="outline" size="sm">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Chat
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Delivery Address</h2>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 flex-1">
                                {orderData.deliveryAddress}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
