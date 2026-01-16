"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, CreditCard, Banknote, ArrowLeft, Check, Loader2, Leaf, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header, Footer } from "@/components/layout"
import { useCartStore } from "@/store"
import { useAddressStore } from "@/store/address-store"
import { createClient } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import Script from "next/script"

type PaymentMethod = "razorpay" | "cod"

declare global {
    interface Window {
        Razorpay: any
    }
}

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getTotal, clearCart } = useCartStore()

    // Use Zustand store for addresses
    const addresses = useAddressStore((state) => state.addresses)
    const getDefaultAddress = useAddressStore((state) => state.getDefaultAddress)

    const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay")
    const [isPlacing, setIsPlacing] = useState(false)
    const [mounted, setMounted] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Set default address when component mounts or addresses change
    useEffect(() => {
        if (mounted && addresses.length > 0 && !selectedAddress) {
            const defaultAddr = getDefaultAddress()
            if (defaultAddr) {
                setSelectedAddress(defaultAddr.id)
            } else {
                setSelectedAddress(addresses[0].id)
            }
        }
    }, [mounted, addresses, selectedAddress, getDefaultAddress])

    if (!mounted) return null

    // Redirect if cart is empty
    if (items.length === 0) {
        router.push("/cart")
        return null
    }

    const subtotal = getTotal()
    const deliveryFee = subtotal > 500 ? 0 : 40
    const total = subtotal + deliveryFee

    const saveOrderToSupabase = async (paymentDetails: {
        payment_id?: string
        order_id?: string
        status?: 'paid' | 'pending'
    }) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        // 1. Create Order
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert({
                user_id: user.id,
                address_id: selectedAddress,
                total_amount: total,
                payment_method: paymentMethod,
                payment_status: paymentDetails.status || (paymentMethod === 'cod' ? 'pending' : 'paid'),
                order_status: 'confirmed',
                razorpay_order_id: paymentDetails.order_id || null,
                razorpay_payment_id: paymentDetails.payment_id || null,
            })
            .select()
            .single()

        if (orderError) throw orderError

        // 2. Create Order Items
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
        }))

        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems)

        if (itemsError) throw itemsError

        return order
    }

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address")
            return
        }

        setIsPlacing(true)

        try {
            if (paymentMethod === "razorpay") {
                // 1. Create Razorpay Order via our API
                const res = await fetch('/api/create-razorpay-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: total, receipt: `order_${Date.now()}` }),
                })
                const rzpOrder = await res.json()

                if (!rzpOrder.id) throw new Error("Failed to create Razorpay order")

                // 2. Open Razorpay Checkout
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: rzpOrder.amount,
                    currency: rzpOrder.currency,
                    name: "Pureingo",
                    description: "Order Payment",
                    order_id: rzpOrder.id,
                    handler: async function (response: any) {
                        try {
                            // 3. Save Order to Supabase on success
                            await saveOrderToSupabase({
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                status: 'paid'
                            })
                            toast.success("Payment successful!")
                            clearCart()
                            router.push("/dashboard/orders")
                        } catch (err) {
                            console.error("Error saving order after payment:", err)
                            toast.error("Payment successful but failed to save order. Please contact support.")
                        }
                    },
                    prefill: {
                        name: "", // Will be filled from auth
                        email: "",
                    },
                    theme: {
                        color: "#16a34a",
                    },
                }

                const rzp = new window.Razorpay(options)
                rzp.open()
            } else {
                // COD Flow
                await saveOrderToSupabase({ status: 'pending' })
                toast.success("Order placed successfully!")
                clearCart()
                router.push("/dashboard/orders")
            }
        } catch (error: any) {
            console.error("Order placement error:", error)
            toast.error(error.message || "Failed to place order. Please try again.")
        } finally {
            setIsPlacing(false)
        }
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Title Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <Link
                                href="/cart"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Cart
                            </Link>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                Checkout
                            </h1>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-3 space-y-6">
                                {/* Delivery Address */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-2xl border border-fresh-100 p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-fresh-600" />
                                            Delivery Address
                                        </h2>
                                        <Link
                                            href="/dashboard/addresses"
                                            className="text-sm text-fresh-600 hover:text-fresh-700"
                                        >
                                            Manage
                                        </Link>
                                    </div>

                                    {addresses.length === 0 ? (
                                        <div className="text-center py-6">
                                            <p className="text-muted-foreground mb-4">
                                                No saved addresses. Add one to continue.
                                            </p>
                                            <Button asChild variant="outline" className="gap-2">
                                                <Link href="/dashboard/addresses">
                                                    <Plus className="w-4 h-4" />
                                                    Add Address
                                                </Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {addresses.map((addr) => (
                                                <label
                                                    key={addr.id}
                                                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr.id
                                                        ? "border-fresh-500 bg-fresh-50"
                                                        : "border-fresh-100 hover:border-fresh-200"
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        value={addr.id}
                                                        checked={selectedAddress === addr.id}
                                                        onChange={() => setSelectedAddress(addr.id)}
                                                        className="sr-only"
                                                    />
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${selectedAddress === addr.id
                                                            ? "border-fresh-500 bg-fresh-500"
                                                            : "border-gray-300"
                                                            }`}>
                                                            {selectedAddress === addr.id && (
                                                                <Check className="w-3 h-3 text-white" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-foreground">
                                                                {addr.full_address}
                                                            </p>
                                                            {addr.landmark && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    {addr.landmark}
                                                                </p>
                                                            )}
                                                            <p className="text-sm text-muted-foreground">
                                                                {addr.city} - {addr.pincode}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>

                                {/* Payment Method */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-2xl border border-fresh-100 p-6"
                                >
                                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-fresh-600" />
                                        Payment Method
                                    </h2>

                                    <div className="space-y-3">
                                        <label
                                            className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "razorpay"
                                                ? "border-fresh-500 bg-fresh-50"
                                                : "border-fresh-100 hover:border-fresh-200"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="razorpay"
                                                checked={paymentMethod === "razorpay"}
                                                onChange={() => setPaymentMethod("razorpay")}
                                                className="sr-only"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "razorpay"
                                                    ? "border-fresh-500 bg-fresh-500"
                                                    : "border-gray-300"
                                                    }`}>
                                                    {paymentMethod === "razorpay" && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="w-5 h-5 text-blue-600" />
                                                    <span className="font-medium">Pay Online (Razorpay)</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 ml-8">
                                                Credit/Debit Card, UPI, Net Banking, Wallets
                                            </p>
                                        </label>

                                        <label
                                            className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "cod"
                                                ? "border-fresh-500 bg-fresh-50"
                                                : "border-fresh-100 hover:border-fresh-200"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={() => setPaymentMethod("cod")}
                                                className="sr-only"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod"
                                                    ? "border-fresh-500 bg-fresh-500"
                                                    : "border-gray-300"
                                                    }`}>
                                                    {paymentMethod === "cod" && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Banknote className="w-5 h-5 text-green-600" />
                                                    <span className="font-medium">Cash on Delivery</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 ml-8">
                                                Pay when your order is delivered
                                            </p>
                                        </label>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Order Summary */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="lg:col-span-2"
                            >
                                <div className="bg-white rounded-2xl border border-fresh-100 p-6 sticky top-24">
                                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                                    {/* Items Preview */}
                                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-fresh-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Leaf className="w-5 h-5 text-fresh-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-medium">
                                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-fresh-100 pt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Delivery</span>
                                            <span>
                                                {deliveryFee === 0 ? (
                                                    <span className="text-green-600">Free</span>
                                                ) : (
                                                    `₹${deliveryFee}`
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-fresh-100">
                                            <span>Total</span>
                                            <span>₹{total.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handlePlaceOrder}
                                        disabled={isPlacing || !selectedAddress}
                                        className="w-full mt-6 gap-2"
                                        size="lg"
                                    >
                                        {isPlacing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Placing Order...
                                            </>
                                        ) : (
                                            `Place Order • ₹${total.toLocaleString('en-IN')}`
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
