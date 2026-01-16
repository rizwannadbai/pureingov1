"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, User, ShoppingBag } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface Customer {
    id: string
    full_name: string | null
    phone: string | null
    created_at: string
    orders: { id: string; total_amount: number }[]
}

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const supabase = createClient()

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    id,
                    full_name,
                    phone,
                    created_at,
                    orders (id, total_amount)
                `)
                .order('created_at', { ascending: false })
                .limit(100)

            if (!error && data) {
                setCustomers(data)
            }
        } catch (error) {
            console.error('Error fetching customers:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredCustomers = customers.filter(customer => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return customer.full_name?.toLowerCase().includes(query) ||
            customer.phone?.includes(query) ||
            customer.id.toLowerCase().includes(query)
    })

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1></div>
                <Skeleton className="h-11 max-w-md rounded-xl" />
                <Skeleton className="h-96 rounded-2xl" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">View and manage your customer base ({customers.length} total)</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search customers..."
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-fresh-500 outline-none"
                />
            </div>

            {/* Customers Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Orders</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                                <th className="text-left px-5 py-4 text-xs font-medium text-gray-500 uppercase">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredCustomers.map((customer, index) => {
                                const totalSpent = customer.orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0
                                const orderCount = customer.orders?.length || 0
                                return (
                                    <motion.tr key={customer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.02 }} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {(customer.full_name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{customer.full_name || 'Unknown'}</p>
                                                    <p className="text-sm text-gray-500 truncate max-w-[200px]">{customer.id.slice(0, 12)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-600 dark:text-gray-300 text-sm">{customer.phone || '-'}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <ShoppingBag className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-900 dark:text-white">{orderCount}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{formatCurrency(totalSpent)}</td>
                                        <td className="px-5 py-4 text-gray-500 text-sm">
                                            {new Date(customer.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredCustomers.length === 0 && (
                    <div className="p-12 text-center">
                        <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No customers found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
