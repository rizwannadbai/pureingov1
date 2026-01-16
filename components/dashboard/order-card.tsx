"use client"

import { motion } from "framer-motion"
import { Package, ChevronRight } from "lucide-react"
import type { Order, OrderStatus } from "@/types"

interface OrderCardProps {
    order: Order & { items?: { name: string; quantity: number }[] }
    onClick?: () => void
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700" },
    processing: { label: "Processing", color: "bg-purple-100 text-purple-700" },
    out_for_delivery: { label: "Out for Delivery", color: "bg-orange-100 text-orange-700" },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
}

export function OrderCard({ order, onClick }: OrderCardProps) {
    const status = statusConfig[order.order_status]
    const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            onClick={onClick}
            className="bg-white rounded-xl p-5 border border-fresh-100 hover:border-fresh-200 hover:shadow-md transition-all cursor-pointer"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-fresh-100 rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-fresh-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">#{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">{formattedDate}</p>
                    </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.label}
                </span>
            </div>

            {order.items && order.items.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                        {order.items.slice(0, 2).map(item => `${item.name} x${item.quantity}`).join(", ")}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-fresh-50">
                <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-lg font-bold text-foreground">₹{order.total_amount.toLocaleString('en-IN')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
        </motion.div>
    )
}
