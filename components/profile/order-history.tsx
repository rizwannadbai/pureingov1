"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Eye, Download, RotateCcw, Search, Filter, ChevronDown, ShoppingBag, Truck, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface Order {
    id: string
    date: string
    total: number
    status: 'delivered' | 'shipped' | 'processing' | 'cancelled'
    items: { name: string; quantity: number; image?: string }[]
}

interface OrderHistoryProps {
    orders?: Order[]
    isLoading?: boolean
    onViewDetails?: (orderId: string) => void
    onDownloadInvoice?: (orderId: string) => void
    onReorder?: (orderId: string) => void
}

export function OrderHistory({ orders = [], isLoading, onViewDetails, onDownloadInvoice, onReorder }: OrderHistoryProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [showFilters, setShowFilters] = useState(false)

    const statusConfig = {
        delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' },
        shipped: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Shipped' },
        processing: { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Processing' },
        cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Cancelled' },
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    if (isLoading) {
        return (
            <div className="bg-white rounded-3xl border border-fresh-100 p-6 shadow-lg">
                <Skeleton className="h-7 w-48 mb-6" />
                <Skeleton className="h-12 w-full mb-4" />
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-28 w-full mb-3 rounded-2xl" />)}
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Package className="w-6 h-6 text-fresh-600" />
                        Order History
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">{orders.length} orders found</p>
                </div>
                <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="w-4 h-4" />
                    Filters
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
            </div>

            {/* Filters */}
            {showFilters && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-gray-50 rounded-2xl"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by Order ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 px-4 rounded-lg border border-input bg-white text-sm min-w-[150px]"
                    >
                        <option value="all">All Status</option>
                        <option value="delivered">Delivered</option>
                        <option value="shipped">Shipped</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </motion.div>
            )}

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                    <Button>Browse Products</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order, index) => {
                        const status = statusConfig[order.status]
                        const StatusIcon = status.icon
                        return (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-5 bg-gray-50 hover:bg-fresh-50/50 rounded-2xl border border-transparent hover:border-fresh-200 transition-all"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                            <Package className="w-7 h-7 text-fresh-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <p className="font-bold text-foreground">{order.id}</p>
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                {order.items[0] && ` • ${order.items[0].name}`}
                                                {order.items.length > 1 && ` +${order.items.length - 1} more`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 ml-auto">
                                        <p className="text-xl font-bold text-fresh-600">₹{order.total.toLocaleString('en-IN')}</p>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => onViewDetails?.(order.id)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => onDownloadInvoice?.(order.id)}>
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => onReorder?.(order.id)}>
                                                <RotateCcw className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </motion.div>
    )
}
