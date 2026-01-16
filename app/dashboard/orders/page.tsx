"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import type { Order, OrderStatus, Product } from "@/types"
import { toast } from "sonner"

type OrderWithItems = Order & {
    order_items: {
        id: string
        quantity: number
        price: number
        products: Product
    }[]
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700" },
    processing: { label: "Processing", color: "bg-purple-100 text-purple-700" },
    out_for_delivery: { label: "Out for Delivery", color: "bg-orange-100 text-orange-700" },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
}

function OrderDetailCard({ order }: { order: OrderWithItems }) {
    const [expanded, setExpanded] = useState(false)
    const status = statusConfig[order.order_status] || statusConfig.pending
    const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-fresh-100 overflow-hidden"
        >
            {/* Header */}
            <div
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-fresh-50/50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fresh-100 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-fresh-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">
                            #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">{formattedDate}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                        </span>
                        <p className="text-lg font-bold text-foreground mt-1">
                            ₹{order.total_amount.toLocaleString('en-IN')}
                        </p>
                    </div>
                    {expanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-fresh-100"
                    >
                        <div className="p-5">
                            {/* Items */}
                            <h4 className="text-sm font-medium text-muted-foreground mb-3">Order Items</h4>
                            <div className="space-y-2 mb-5">
                                {order.order_items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between py-2 border-b border-fresh-50 last:border-0"
                                    >
                                        <div>
                                            <p className="font-medium text-foreground">{item.products?.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-foreground">₹{item.price}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Payment Method</p>
                                    <p className="font-medium text-foreground capitalize">
                                        {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Razorpay'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Payment Status</p>
                                    <p className="font-medium text-foreground capitalize">{order.payment_status}</p>
                                </div>
                                {order.delivery_date && (
                                    <div className="col-span-2">
                                        <p className="text-muted-foreground">Delivered On</p>
                                        <p className="font-medium text-foreground">
                                            {new Date(order.delivery_date).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderWithItems[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    const fetchOrders = useCallback(async () => {
        setIsLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data, error } = await supabase
                .from("orders")
                .select(`
                    *,
                    order_items (
                        id,
                        quantity,
                        price,
                        products (*)
                    )
                `)
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })

            if (data) setOrders(data as any)
            if (error) {
                console.error("Error fetching orders:", error)
                toast.error("Failed to load your order history")
            }
        }
        setIsLoading(false)
    }, [supabase])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <div className="max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Order History
                </h1>
                <p className="text-muted-foreground">
                    View and track all your past and current orders.
                </p>
            </motion.div>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-fresh-50/50 rounded-2xl border border-fresh-100 animate-pulse" />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-fresh-100 p-12 text-center"
                >
                    <div className="w-16 h-16 bg-fresh-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-fresh-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">
                        Start shopping to see your orders here.
                    </p>
                    <Button asChild>
                        <a href="/products">Browse Products</a>
                    </Button>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <OrderDetailCard order={order} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
