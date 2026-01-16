"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Package, Users, Truck, Clock, CheckCircle,
    AlertCircle, ArrowUpRight, ArrowDownRight, IndianRupee
} from "lucide-react"
import { createClient } from "@/lib/supabase"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface Order {
    id: string
    created_at: string
    total_amount: number
    order_status: string
    profiles: {
        full_name: string | null
    } | null
    order_items: {
        id: string
    }[]
}

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

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([])
    const [stats, setStats] = useState({
        todayOrders: 0,
        todayRevenue: 0,
        totalCustomers: 0,
        pendingDeliveries: 0,
    })
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            // Fetch recent orders with profile info
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select(`
                    id,
                    created_at,
                    total_amount,
                    order_status,
                    profiles!user_id (full_name),
                    order_items (id)
                `)
                .order('created_at', { ascending: false })
                .limit(5)

            if (!ordersError && ordersData) {
                setOrders(ordersData as any)
            }

            // Get today's date range
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            // Fetch today's orders count
            const { count: todayCount } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', today.toISOString())
                .lt('created_at', tomorrow.toISOString())

            // Fetch today's revenue
            const { data: revenueData } = await supabase
                .from('orders')
                .select('total_amount')
                .gte('created_at', today.toISOString())
                .lt('created_at', tomorrow.toISOString())
                .eq('payment_status', 'paid')

            const todayRevenue = revenueData?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0

            // Fetch total customers
            const { count: customerCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })

            // Fetch pending deliveries
            const { count: pendingCount } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })
                .in('order_status', ['pending', 'confirmed', 'processing', 'out_for_delivery'])

            setStats({
                todayOrders: todayCount || 0,
                todayRevenue,
                totalCustomers: customerCount || 0,
                pendingDeliveries: pendingCount || 0,
            })
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)

        if (diffMins < 1) return "Just now"
        if (diffMins < 60) return `${diffMins} min ago`

        const diffHours = Math.floor(diffMins / 60)
        if (diffHours < 24) return `${diffHours}h ago`

        const diffDays = Math.floor(diffHours / 24)
        return `${diffDays}d ago`
    }

    const statCards = [
        { label: "Today's Orders", value: stats.todayOrders.toString(), icon: Package, color: "from-blue-500 to-blue-600", href: "/admin/orders" },
        { label: "Revenue Today", value: formatCurrency(stats.todayRevenue), icon: IndianRupee, color: "from-green-500 to-emerald-600", href: "/admin/payments" },
        { label: "Total Customers", value: stats.totalCustomers.toString(), icon: Users, color: "from-purple-500 to-purple-600", href: "/admin/customers" },
        { label: "Pending Deliveries", value: stats.pendingDeliveries.toString(), icon: Truck, color: "from-orange-500 to-orange-600", href: "/admin/orders?status=pending" },
    ]

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Loading...</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
                </div>
                <Skeleton className="h-96 rounded-2xl" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                            <Link href={stat.href} className="block bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>

            {/* Recent Orders */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-sm text-fresh-600 hover:text-fresh-700 font-medium">View All →</Link>
                </div>

                {orders.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order ID</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Items</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {orders.map((order) => {
                                    const statusConfig = getStatusConfig(order.order_status)
                                    const StatusIcon = statusConfig.icon
                                    return (
                                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-5 py-4">
                                                <Link href={`/admin/orders/${order.id}`} className="font-medium text-fresh-600 hover:text-fresh-700">
                                                    {order.id.slice(0, 8)}...
                                                </Link>
                                            </td>
                                            <td className="px-5 py-4 text-gray-900 dark:text-white">{order.profiles?.full_name || 'Unknown'}</td>
                                            <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{order.order_items?.length || 0} items</td>
                                            <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{formatCurrency(order.total_amount)}</td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {statusConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500 dark:text-gray-400 text-sm">{formatTimeAgo(order.created_at)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
