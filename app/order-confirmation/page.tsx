"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header, Footer } from "@/components/layout"

export default function OrderConfirmationPage() {
    // Generate a random order ID for display
    const orderId = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-lg mx-auto text-center"
                    >
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                        >
                            <CheckCircle className="w-14 h-14 text-green-600" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                Order Placed Successfully!
                            </h1>
                            <p className="text-muted-foreground mb-6">
                                Thank you for your order. We&apos;ve received your order and will begin processing it soon.
                            </p>
                        </motion.div>

                        {/* Order Details Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl border border-fresh-100 p-6 mb-8"
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-fresh-100 rounded-xl flex items-center justify-center">
                                    <Package className="w-6 h-6 text-fresh-600" />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                            <p className="text-2xl font-bold text-foreground mb-4">{orderId}</p>

                            <div className="border-t border-fresh-100 pt-4 mt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Estimated Delivery</span>
                                    <span className="font-medium text-foreground">Tomorrow, 9 AM - 12 PM</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* What's Next */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-fresh-50 rounded-2xl p-6 mb-8"
                        >
                            <h3 className="font-semibold text-foreground mb-3">What&apos;s Next?</h3>
                            <ul className="text-sm text-muted-foreground space-y-2 text-left">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-fresh-600 mt-0.5 flex-shrink-0" />
                                    <span>You&apos;ll receive an order confirmation email shortly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-fresh-600 mt-0.5 flex-shrink-0" />
                                    <span>We&apos;ll notify you when your order is out for delivery</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-fresh-600 mt-0.5 flex-shrink-0" />
                                    <span>Track your order in the Orders section of your dashboard</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 justify-center"
                        >
                            <Button asChild className="gap-2">
                                <Link href="/dashboard/orders">
                                    <Package className="w-4 h-4" />
                                    View Orders
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="gap-2">
                                <Link href="/products">
                                    <ArrowRight className="w-4 h-4" />
                                    Continue Shopping
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Home Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-8"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                                <Home className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    )
}
