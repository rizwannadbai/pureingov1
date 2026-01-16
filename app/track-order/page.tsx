"use client"

import { useState } from "react"
import { Header, Footer } from "@/components/layout"
import { Search, Package, Truck, CheckCircle, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("")
    const [isTracking, setIsTracking] = useState(false)
    const [orderStatus, setOrderStatus] = useState<null | 'preparing' | 'dispatched' | 'out-for-delivery' | 'delivered'>(null)

    const handleTrack = () => {
        if (orderId.trim()) {
            setIsTracking(true)
            // Simulate tracking - in real app, this would call an API
            setTimeout(() => {
                setOrderStatus('out-for-delivery')
            }, 1000)
        }
    }

    const steps = [
        { id: 'preparing', label: 'Order Preparing', icon: Package, time: '5:30 AM' },
        { id: 'dispatched', label: 'Dispatched', icon: Truck, time: '5:45 AM' },
        { id: 'out-for-delivery', label: 'Out for Delivery', icon: MapPin, time: '6:15 AM' },
        { id: 'delivered', label: 'Delivered', icon: CheckCircle, time: 'Estimated 6:30 AM' },
    ]

    const getStepIndex = () => {
        return steps.findIndex(s => s.id === orderStatus)
    }

    return (
        <>
            <Header />
            <main className="pt-20 min-h-screen">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-fresh-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Package className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Track Your Order</h1>
                        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                            Enter your order ID to see real-time delivery updates
                        </p>

                        {/* Search */}
                        <div className="max-w-md mx-auto flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Enter Order ID (e.g., ORD-ABC123)"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-fresh-500 focus:ring-2 focus:ring-fresh-500/20 outline-none"
                                />
                            </div>
                            <Button size="lg" onClick={handleTrack}>Track</Button>
                        </div>
                    </div>
                </section>

                {/* Tracking Result */}
                {isTracking && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-16"
                    >
                        <div className="container mx-auto px-4 max-w-2xl">
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order ID</p>
                                        <p className="text-lg font-semibold text-foreground">{orderId || 'ORD-ABC123'}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-fresh-100 text-fresh-700 rounded-full text-sm font-medium">
                                        In Transit
                                    </span>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-0">
                                    {steps.map((step, index) => {
                                        const currentIndex = getStepIndex()
                                        const isComplete = index <= currentIndex
                                        const isCurrent = index === currentIndex
                                        const Icon = step.icon

                                        return (
                                            <div key={step.id} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isComplete ? 'bg-fresh-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    {index < steps.length - 1 && (
                                                        <div className={`w-0.5 h-16 ${index < currentIndex ? 'bg-fresh-500' : 'bg-gray-200'}`} />
                                                    )}
                                                </div>
                                                <div className="pb-8">
                                                    <p className={`font-semibold ${isComplete ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                        {step.label}
                                                        {isCurrent && <span className="ml-2 text-fresh-600">(Current)</span>}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {step.time}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Delivery Info */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                                    <p className="font-medium text-foreground">123 Main Street, Mumbai 400001</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Help Section */}
                {!isTracking && (
                    <section className="py-16">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-xl font-semibold mb-4">Can't find your order ID?</h2>
                            <p className="text-muted-foreground mb-6">
                                Check your email for the order confirmation or visit your dashboard
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Button variant="outline" asChild>
                                    <Link href="/dashboard/orders">View My Orders</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/contact">Contact Support</Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    )
}
