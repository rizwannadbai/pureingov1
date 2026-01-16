"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    CreditCard, Download, Filter, ChevronDown, CheckCircle,
    AlertCircle, Clock, ArrowUpRight, ArrowDownLeft, Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header, Footer } from "@/components/layout"

interface Transaction {
    id: string
    type: "subscription" | "order" | "refund" | "reward"
    description: string
    amount: number
    currency: string
    status: "completed" | "pending" | "failed"
    date: string
    method: string
    orderId?: string
}

const sampleTransactions: Transaction[] = [
    {
        id: "TXN-001",
        type: "subscription",
        description: "Monthly Subscription - Daily Fresh Fruit Box",
        amount: -2899,
        currency: "INR",
        status: "completed",
        date: "Jan 15, 2024",
        method: "UPI - ***1234",
    },
    {
        id: "TXN-002",
        type: "order",
        description: "Order #ORD-2024-002",
        amount: -599,
        currency: "INR",
        status: "completed",
        date: "Jan 14, 2024",
        method: "Credit Card - ****4242",
        orderId: "ORD-2024-002",
    },
    {
        id: "TXN-003",
        type: "refund",
        description: "Refund for Order #ORD-2024-001",
        amount: 299,
        currency: "INR",
        status: "completed",
        date: "Jan 12, 2024",
        method: "Original Payment Method",
        orderId: "ORD-2024-001",
    },
    {
        id: "TXN-004",
        type: "reward",
        description: "Referral Reward - Friend Joined",
        amount: 100,
        currency: "INR",
        status: "completed",
        date: "Jan 10, 2024",
        method: "Wallet Credit",
    },
    {
        id: "TXN-005",
        type: "subscription",
        description: "Weekly Juice Pack Renewal",
        amount: -599,
        currency: "INR",
        status: "pending",
        date: "Jan 8, 2024",
        method: "UPI - ***1234",
    },
]

const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount)
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(absAmount)
}

const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
        case "completed":
            return <CheckCircle className="w-4 h-4 text-green-500" />
        case "pending":
            return <Clock className="w-4 h-4 text-yellow-500" />
        case "failed":
            return <AlertCircle className="w-4 h-4 text-red-500" />
    }
}

const getStatusBadge = (status: Transaction["status"]) => {
    const styles = {
        completed: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
        pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
        failed: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    }
    return styles[status]
}

export default function PaymentHistoryPage() {
    const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
    const [showFilters, setShowFilters] = useState(false)

    const filteredTransactions = sampleTransactions.filter(t => {
        if (filter === "all") return true
        return t.status === filter
    })

    const totalSpent = sampleTransactions
        .filter(t => t.amount < 0 && t.status === "completed")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const totalEarned = sampleTransactions
        .filter(t => t.amount > 0 && t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0)

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Payment History
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            View all your transactions and payments
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center">
                                    <ArrowUpRight className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(totalSpent)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                                    <ArrowDownLeft className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Earned/Refunds</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(totalEarned)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                            {["all", "completed", "pending"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                            ? "bg-fresh-500 text-white"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>

                    {/* Transactions List */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {filteredTransactions.length === 0 ? (
                            <div className="p-12 text-center">
                                <CreditCard className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredTransactions.map((transaction, index) => (
                                    <motion.div
                                        key={transaction.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-4 md:p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <div className="flex items-start md:items-center gap-4">
                                            {/* Icon */}
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${transaction.amount > 0
                                                    ? "bg-green-100 dark:bg-green-900/50"
                                                    : "bg-gray-100 dark:bg-gray-700"
                                                }`}>
                                                {transaction.amount > 0 ? (
                                                    <ArrowDownLeft className="w-5 h-5 text-green-600" />
                                                ) : (
                                                    <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start md:items-center justify-between gap-2 flex-col md:flex-row">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {transaction.description}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                                            {transaction.method}
                                                        </p>
                                                    </div>
                                                    <div className="text-left md:text-right">
                                                        <p className={`font-bold ${transaction.amount > 0
                                                                ? "text-green-600"
                                                                : "text-gray-900 dark:text-white"
                                                            }`}>
                                                            {transaction.amount > 0 ? "+" : "-"}{formatCurrency(transaction.amount)}
                                                        </p>
                                                        <div className="flex items-center gap-2 justify-start md:justify-end mt-1">
                                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(transaction.status)}`}>
                                                                {transaction.status}
                                                            </span>
                                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {transaction.date}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
