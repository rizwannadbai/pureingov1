"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { Loader2, DollarSign, CheckCircle, XCircle, Clock, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Payment {
    id: string
    order_id: string
    amount: number
    payment_method: string
    payment_status: string
    razorpay_payment_id?: string
    created_at: string
    user_email?: string
    order_items_count?: number
}

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const supabase = createClient()

    useEffect(() => {
        fetchPayments()
    }, [])

    const fetchPayments = async () => {
        setLoading(true)
        try {
            const { data: orders, error } = await supabase
                .from('orders')
                .select(`
                    id,
                    total_amount,
                    payment_method,
                    payment_status,
                    razorpay_payment_id,
                    created_at,
                    profiles:user_id(email),
                    order_items(id)
                `)
                .order('created_at', { ascending: false })

            if (error) throw error

            const paymentsData: Payment[] = orders?.map((order: any) => ({
                id: order.id,
                order_id: order.id,
                amount: order.total_amount,
                payment_method: order.payment_method,
                payment_status: order.payment_status,
                razorpay_payment_id: order.razorpay_payment_id,
                created_at: order.created_at,
                user_email: order.profiles?.email,
                order_items_count: order.order_items?.length || 0
            })) || []

            setPayments(paymentsData)
        } catch (error) {
            console.error('Error fetching payments:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredPayments = payments.filter(payment => {
        const matchesSearch =
            payment.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.razorpay_payment_id?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || payment.payment_status === statusFilter

        return matchesSearch && matchesStatus
    })

    const stats = {
        total: payments.reduce((sum, p) => sum + p.amount, 0),
        paid: payments.filter(p => p.payment_status === 'paid').reduce((sum, p) => sum + p.amount, 0),
        pending: payments.filter(p => p.payment_status === 'pending').reduce((sum, p) => sum + p.amount, 0),
        failed: payments.filter(p => p.payment_status === 'failed').length
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Payments</h1>
                <p className="text-muted-foreground">Track all payment transactions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{stats.total.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Paid</CardTitle>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">₹{stats.paid.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="w-4 h-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">₹{stats.pending.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Failed</CardTitle>
                        <XCircle className="w-4 h-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <Input
                    placeholder="Search by order ID, email, or payment ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                />
                <div className="flex gap-2">
                    {['all', 'paid', 'pending', 'failed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === status
                                    ? 'bg-fresh-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Payments Table */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-fresh-600" />
                </div>
            ) : (
                <div className="bg-white rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left p-4 font-medium">Order ID</th>
                                    <th className="text-left p-4 font-medium">Customer</th>
                                    <th className="text-left p-4 font-medium">Amount</th>
                                    <th className="text-left p-4 font-medium">Method</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                    <th className="text-left p-4 font-medium">Date</th>
                                    <th className="text-left p-4 font-medium">Payment ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="p-4 font-mono text-sm">{payment.order_id.slice(0, 8)}...</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">{payment.user_email || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">₹{payment.amount.toLocaleString('en-IN')}</td>
                                        <td className="p-4">
                                            <Badge variant="outline">
                                                {payment.payment_method === 'razorpay' ? 'Online' : 'COD'}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <Badge className={
                                                payment.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                                                    payment.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                            }>
                                                {payment.payment_status}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(payment.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-muted-foreground">
                                            {payment.razorpay_payment_id?.slice(0, 16) || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPayments.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No payments found
                        </div>
                    )}
                </div>
            )}

            <div className="text-sm text-muted-foreground">
                Showing {filteredPayments.length} of {payments.length} payments
            </div>
        </div>
    )
}
