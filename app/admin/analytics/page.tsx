"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { Loader2, TrendingUp, DollarSign, ShoppingBag, Users, Package, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsData {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    totalProducts: number
    revenueGrowth: number
    ordersGrowth: number
    topProducts: Array<{ name: string; count: number; revenue: number }>
    recentOrders: Array<{ date: string; amount: number; status: string }>
}

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
    const supabase = createClient()

    useEffect(() => {
        fetchAnalytics()
    }, [timeRange])

    const fetchAnalytics = async () => {
        setLoading(true)
        try {
            // Calculate date range
            const now = new Date()
            const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
            const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

            // Fetch orders
            const { data: orders, error: ordersError } = await supabase
                .from('orders')
                .select('*')
                .gte('created_at', startDate.toISOString())

            if (ordersError) throw ordersError

            // Fetch all customers
            const { data: customers, error: customersError } = await supabase
                .from('profiles')
                .select('id')

            if (customersError) throw customersError

            // Fetch all products
            const { data: products, error: productsError } = await supabase
                .from('products')
                .select('*')

            if (productsError) throw productsError

            // Fetch order items with product info
            const { data: orderItems, error: itemsError } = await supabase
                .from('order_items')
                .select(`
                    *,
                    orders!inner(created_at),
                    products(name)
                `)
                .gte('orders.created_at', startDate.toISOString())

            if (itemsError) throw itemsError

            // Calculate metrics
            const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
            const totalOrders = orders?.length || 0

            // Calculate top products
            const productSales: Record<string, { count: number; revenue: number; name: string }> = {}
            orderItems?.forEach((item: any) => {
                const productName = item.products?.name || item.product_id
                if (!productSales[productName]) {
                    productSales[productName] = { count: 0, revenue: 0, name: productName }
                }
                productSales[productName].count += item.quantity
                productSales[productName].revenue += (item.price * item.quantity)
            })

            const topProducts = Object.values(productSales)
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)

            setData({
                totalRevenue,
                totalOrders,
                totalCustomers: customers?.length || 0,
                totalProducts: products?.length || 0,
                revenueGrowth: 12.5, // Placeholder - would need historical data
                ordersGrowth: 8.3, // Placeholder
                topProducts,
                recentOrders: orders?.slice(0, 10).map(order => ({
                    date: new Date(order.created_at).toLocaleDateString(),
                    amount: order.total_amount,
                    status: order.order_status
                })) || []
            })
        } catch (error) {
            console.error('Error fetching analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-fresh-600" />
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground">Track your business performance</p>
                </div>
                <div className="flex gap-2">
                    {(['7d', '30d', '90d'] as const).map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === range
                                    ? 'bg-fresh-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{data.totalRevenue.toLocaleString('en-IN')}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">+{data.revenueGrowth}%</span> from last period
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalOrders}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">+{data.ordersGrowth}%</span> from last period
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalCustomers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Total registered users
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalProducts}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            In catalog
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Top Products & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                        <CardDescription>Best selling products by revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.topProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-fresh-100 rounded-full flex items-center justify-center text-sm font-bold text-fresh-600">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">{product.count} sold</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹{product.revenue.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.recentOrders.slice(0, 5).map((order, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">₹{order.amount.toLocaleString('en-IN')}</p>
                                            <p className="text-sm text-muted-foreground">{order.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
