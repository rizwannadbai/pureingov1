"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import {
    ArrowLeft, Package, Truck, CheckCircle, Clock, User, MapPin,
    Phone, Mail, CreditCard, Edit, Printer, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const orderStatuses = [
    { value: "pending", label: "Pending", icon: Clock, color: "yellow" },
    { value: "processing", label: "Processing", icon: Package, color: "blue" },
    { value: "out_for_delivery", label: "Out for Delivery", icon: Truck, color: "purple" },
    { value: "delivered", label: "Delivered", icon: CheckCircle, color: "green" },
    { value: "cancelled", label: "Cancelled", icon: AlertCircle, color: "red" },
]

// Sample order data - in production, fetch from API
const orderData = {
    id: "ORD-2024-001",
    customer: {
        name: "Rahul Sharma",
        email: "rahul@email.com",
        phone: "+91 98765 43210",
    },
    items: [
        { name: "Daily Fresh Fruit Box", quantity: 1, price: 2899, image: "/fruit-box.png" },
        { name: "Fresh Orange Juice", quantity: 2, price: 199, image: "/juice.png" },
    ],
    subtotal: 3297,
    deliveryFee: 0,
    discount: 0,
    total: 3297,
    status: "pending",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    createdAt: "2024-01-16T08:30:00",
    deliveryAddress: {
        line1: "123 Green Lane",
        line2: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400058",
    },
    deliveryPerson: null,
    notes: "Please leave at door if not home",
}

export default function AdminOrderDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [currentStatus, setCurrentStatus] = useState(orderData.status)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStatusUpdate = async (newStatus: string) => {
        setIsUpdating(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCurrentStatus(newStatus)
        setIsUpdating(false)
        toast.success(`Order status updated to ${orderStatuses.find(s => s.value === newStatus)?.label}`)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const currentStatusIndex = orderStatuses.findIndex(s => s.value === currentStatus)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/orders"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Order {params.id}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                            Placed on {new Date(orderData.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Printer className="w-4 h-4" />
                        Print Invoice
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Timeline */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-6">Order Status</h2>

                        <div className="flex items-center justify-between mb-8">
                            {orderStatuses.slice(0, 4).map((status, index) => {
                                const Icon = status.icon
                                const isActive = index <= currentStatusIndex && currentStatus !== "cancelled"
                                const isCurrent = status.value === currentStatus
                                return (
                                    <div key={status.value} className="flex-1 flex flex-col items-center relative">
                                        {/* Line */}
                                        {index < 3 && (
                                            <div className={`absolute top-5 left-1/2 w-full h-0.5 ${index < currentStatusIndex && currentStatus !== "cancelled"
                                                    ? "bg-fresh-500"
                                                    : "bg-gray-200 dark:bg-gray-700"
                                                }`} />
                                        )}
                                        {/* Circle */}
                                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${isActive
                                                ? "bg-fresh-500 text-white"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                            } ${isCurrent ? "ring-4 ring-fresh-100 dark:ring-fresh-900" : ""}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className={`mt-2 text-xs font-medium ${isActive ? "text-gray-900 dark:text-white" : "text-gray-400"
                                            }`}>
                                            {status.label}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Update Status Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {orderStatuses.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => handleStatusUpdate(status.value)}
                                    disabled={isUpdating || currentStatus === status.value}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentStatus === status.value
                                            ? "bg-fresh-500 text-white"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                        } disabled:opacity-50`}
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Order Items</h2>

                        <div className="space-y-4">
                            {orderData.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                        <Package className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Qty: {item.quantity} × {formatCurrency(item.price)}
                                        </p>
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(item.quantity * item.price)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                                <span className="text-gray-900 dark:text-white">{formatCurrency(orderData.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            {orderData.discount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Discount</span>
                                    <span className="text-green-600">-{formatCurrency(orderData.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100 dark:border-gray-700">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-gray-900 dark:text-white">{formatCurrency(orderData.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-gray-900 dark:text-white">Customer</h2>
                            <Link href="#" className="text-fresh-600 hover:text-fresh-700 text-sm">View Profile</Link>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white font-bold">
                                {orderData.customer.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{orderData.customer.name}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-300">{orderData.customer.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-300">{orderData.customer.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Delivery Address</h2>

                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="text-gray-600 dark:text-gray-300 text-sm">
                                <p>{orderData.deliveryAddress.line1}</p>
                                <p>{orderData.deliveryAddress.line2}</p>
                                <p>{orderData.deliveryAddress.city}, {orderData.deliveryAddress.state}</p>
                                <p>{orderData.deliveryAddress.pincode}</p>
                            </div>
                        </div>

                        {orderData.notes && (
                            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    <strong>Note:</strong> {orderData.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Payment</h2>

                        <div className="flex items-center gap-3 mb-3">
                            <CreditCard className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">{orderData.paymentMethod}</span>
                        </div>

                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${orderData.paymentStatus === "paid"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                                : orderData.paymentStatus === "refunded"
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                            }`}>
                            <CheckCircle className="w-3.5 h-3.5" />
                            {orderData.paymentStatus.charAt(0).toUpperCase() + orderData.paymentStatus.slice(1)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
