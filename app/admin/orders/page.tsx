"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
    Search, Filter, Download, ChevronDown, Clock, Package,
    Truck, CheckCircle, AlertCircle, Eye, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

interface Order {
    id: string
    user_id: string
    total_amount: number
    order_status: string
    payment_status: string
    created_at: string
    profiles: {
        full_name: string | null
        phone: string | null
    } | null
    order_items: {
        id: string
        product_id: string
        quantity: number
        price: number
    }[]
}

const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "out_for_delivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
]

const getStatusConfig = (status: string) => {
    switch (status) {
        case "pending":
            return { label: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300", icon: Clock }
        case "confirmed":
        case "processing":
            return { label: "Processing", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300", icon: Package }
        case "out_for_delivery":
            return { label: "Out for Delivery", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300", icon: Truck }
        case "delivered":
            return { label: "Delivered", color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300", icon: CheckCircle }
        case "cancelled":
            return { label: "Cancelled", color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300", icon: AlertCircle }
        default:
            return { label: status || "Unknown", color: "bg-gray-100 text-gray-700", icon: Package }
    }
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        fetchOrders()
    }, [statusFilter])

    const fetchOrders = async () => {
        // Fetch orders with profiles
        try {
            let query = supabase
                .from('orders')
                .select(`
                    id,
                    user_id,
                    total_amount,
                    order_status,
                    payment_status,
                    created_at,
                    profiles!user_id (full_name, phone),
                    order_items (id, product_id, quantity, price)
                `)
                .order('created_at', { ascending: false })

            if (statusFilter !== "all") {
                query = query.eq('order_status', statusFilter)
            }

            const { data, error } = await query.limit(50)

            if (!error && data) {
                setOrders(data as any)
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredOrders = orders.filter(order => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return order.id.toLowerCase().includes(query) ||
            order.profiles?.full_name?.toLowerCase().includes(query) ||
            order.profiles?.phone?.includes(query)
    })

    const toggleSelectOrder = (id: string) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([])
        } else {
            setSelectedOrders(filteredOrders.map(o => o.id))
        }
    }

    const handleExportCSV = () => {
        if (filteredOrders.length === 0) {
            toast.error("No orders to export")
            return
        }

        const headers = ["Order ID", "Date", "Customer Name", "Customer Phone", "Status", "Items Count", "Total Amount", "Payment Status"]
        const csvContent = [
            headers.join(","),
            ...filteredOrders.map(order => [
                order.id,
                new Date(order.created_at).toLocaleDateString(),
                `"${order.profiles?.full_name || 'Unknown'}"`,
                order.profiles?.phone || '-',
                order.order_status,
                order.order_items?.length || 0,
                order.total_amount,
                order.payment_status
            ].join(","))
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("Orders exported successfully")
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1></div>
                <div className="flex gap-4">
                    <Skeleton className="h-11 flex-1 max-w-md rounded-xl" />
                    <Skeleton className="h-11 w-44 rounded-xl" />
                </div>
                <Skeleton className="h-96 rounded-2xl" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track all customer orders</p>
                </div>
                <Button className="gap-2" onClick={handleExportCSV}>
                    <Download className="w-4 h-4" />
                    Export Orders
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by order ID, customer name..."
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-fresh-500 outline-none"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        className="flex items-center gap-2 h-11 px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium min-w-[180px]"
                    >
                        <Filter className="w-4 h-4 text-gray-400" />
                        {statusOptions.find(s => s.value === statusFilter)?.label}
                        <ChevronDown className="w-4 h-4 ml-auto" />
                    </button>
                    {showStatusDropdown && (
                        <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-10">
                            {statusOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => { setStatusFilter(option.value); setShowStatusDropdown(false) }}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${statusFilter === option.value ? "text-fresh-600 font-medium" : "text-gray-700 dark:text-gray-300"}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedOrders.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 p-4 bg-fresh-50 dark:bg-fresh-900/30 rounded-xl">
                    <span className="text-sm font-medium text-fresh-700 dark:text-fresh-300">{selectedOrders.length} selected</span>
                    <div className="flex gap-2 ml-auto">
                        <Button size="sm" variant="outline">Mark Delivered</Button>
                        <button onClick={() => setSelectedOrders([])} className="p-2 hover:bg-fresh-100 rounded-lg"><X className="w-4 h-4" /></button>
                    </div>
                </motion.div>
            )}

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-5 py-4 text-left">
                                    <input type="checkbox" checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-fresh-600" />
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Order</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Items</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="text-right px-5 py-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredOrders.map((order, index) => {
                                const statusConfig = getStatusConfig(order.order_status)
                                const StatusIcon = statusConfig.icon
                                return (
                                    <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.02 }} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-5 py-4">
                                            <input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => toggleSelectOrder(order.id)} className="w-4 h-4 rounded border-gray-300 text-fresh-600" />
                                        </td>
                                        <td className="px-5 py-4">
                                            <Link href={`/admin/orders/${order.id}`} className="font-medium text-fresh-600 hover:text-fresh-700">{order.id.slice(0, 8)}...</Link>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-gray-900 dark:text-white">{order.profiles?.full_name || 'Unknown'}</p>
                                            <p className="text-sm text-gray-500">{order.profiles?.phone || '-'}</p>
                                        </td>
                                        <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{order.order_items?.length || 0} items</td>
                                        <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{formatCurrency(order.total_amount)}</td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {statusConfig.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 text-sm">{formatDate(order.created_at)}</td>
                                        <td className="px-5 py-4 text-right">
                                            <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-fresh-600">
                                                <Eye className="w-4 h-4" />View
                                            </Link>
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="p-12 text-center">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
