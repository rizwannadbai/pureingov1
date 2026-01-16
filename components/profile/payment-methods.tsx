"use client"

import { motion } from "framer-motion"
import { CreditCard, Plus, Trash2, Receipt, RefreshCcw, CheckCircle, Wallet, Building, Smartphone, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface PaymentMethod {
    id: string
    type: 'visa' | 'mastercard' | 'upi' | 'netbanking'
    last4?: string
    upiId?: string
    bankName?: string
    isDefault?: boolean
    expiryDate?: string
}

interface Transaction {
    id: string
    date: string
    amount: number
    description: string
    status: 'completed' | 'pending' | 'refunded' | 'failed'
    method: string
}

interface PaymentMethodsProps {
    methods?: PaymentMethod[]
    transactions?: Transaction[]
    isLoading?: boolean
    onAddMethod?: () => void
    onRemoveMethod?: (id: string) => void
    onSetDefault?: (id: string) => void
}

export function PaymentMethods({
    methods = [],
    transactions = [],
    isLoading,
    onAddMethod,
    onRemoveMethod,
    onSetDefault
}: PaymentMethodsProps) {
    const methodIcons: Record<string, { icon: any; color: string; bg: string }> = {
        visa: { icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-100' },
        mastercard: { icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-100' },
        upi: { icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-100' },
        netbanking: { icon: Building, color: 'text-green-600', bg: 'bg-green-100' },
    }

    const statusConfig = {
        completed: { color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
        pending: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
        refunded: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Refunded' },
        failed: { color: 'text-red-600', bg: 'bg-red-100', label: 'Failed' },
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-fresh-100 p-6">
                    <Skeleton className="h-7 w-48 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Payment Methods */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <CreditCard className="w-6 h-6 text-fresh-600" />
                            Payment Methods
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Manage your saved payment options</p>
                    </div>
                    <Button className="gap-2" onClick={onAddMethod}>
                        <Plus className="w-4 h-4" />
                        Add New
                    </Button>
                </div>

                {methods.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <Wallet className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-semibold text-foreground mb-1">No payment methods</p>
                        <p className="text-sm text-muted-foreground mb-4">Add a card or UPI for faster checkout</p>
                        <Button variant="outline" className="gap-2" onClick={onAddMethod}>
                            <Plus className="w-4 h-4" />
                            Add Payment Method
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {methods.map((method, index) => {
                            const config = methodIcons[method.type] || methodIcons.visa
                            const Icon = config.icon
                            return (
                                <motion.div
                                    key={method.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative p-5 rounded-2xl border-2 transition-all ${method.isDefault ? 'border-fresh-500 bg-fresh-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                                >
                                    {method.isDefault && (
                                        <div className="absolute -top-2.5 left-4 bg-fresh-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            Default
                                        </div>
                                    )}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-xl ${config.bg} flex items-center justify-center`}>
                                                <Icon className={`w-7 h-7 ${config.color}`} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground capitalize">
                                                    {method.type} {method.last4 && `•••• ${method.last4}`}
                                                </p>
                                                {method.upiId && <p className="text-sm text-muted-foreground">{method.upiId}</p>}
                                                {method.bankName && <p className="text-sm text-muted-foreground">{method.bankName}</p>}
                                                {method.expiryDate && <p className="text-xs text-muted-foreground mt-1">Expires {method.expiryDate}</p>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {!method.isDefault && (
                                                <Button variant="ghost" size="sm" className="text-xs" onClick={() => onSetDefault?.(method.id)}>
                                                    Set Default
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 text-xs" onClick={() => onRemoveMethod?.(method.id)}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </motion.div>

            {/* Transaction History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Receipt className="w-6 h-6 text-fresh-600" />
                        Transaction History
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Recent payment activity</p>
                </div>

                {transactions.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Receipt className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-semibold text-foreground mb-1">No transactions yet</p>
                        <p className="text-sm text-muted-foreground">Your payment history will appear here</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {transactions.map((tx, index) => {
                            const status = statusConfig[tx.status]
                            return (
                                <motion.div
                                    key={tx.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${status.bg} flex items-center justify-center`}>
                                            {tx.status === 'refunded' ? <RefreshCcw className={`w-5 h-5 ${status.color}`} /> : <CheckCircle className={`w-5 h-5 ${status.color}`} />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{tx.description}</p>
                                            <p className="text-sm text-muted-foreground">{tx.date} • {tx.method}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${tx.status === 'refunded' ? 'text-blue-600' : 'text-foreground'}`}>
                                            {tx.status === 'refunded' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                                        </p>
                                        <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    )
}
