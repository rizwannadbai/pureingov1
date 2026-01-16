"use client"

import { motion } from "framer-motion"
import { Search, ShoppingCart, Truck, Utensils, Leaf, Clock, Shield, Phone } from "lucide-react"
import { Header, Footer } from "@/components/layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Choose Your Plan",
        description: "Browse our subscription plans - Daily, Couple, or Family box. Pick the one that fits your lifestyle.",
    },
    {
        icon: ShoppingCart,
        step: "02",
        title: "Subscribe",
        description: "Complete your subscription with a simple checkout. Choose monthly or quarterly billing.",
    },
    {
        icon: Truck,
        step: "03",
        title: "Daily Delivery",
        description: "Wake up to fresh fruits at your doorstep every morning. We deliver before 9 AM.",
    },
    {
        icon: Utensils,
        step: "04",
        title: "Enjoy Fresh",
        description: "Enjoy 100% fresh, hand-picked fruits every day. Stay healthy with Pureingo.",
    },
]

const benefits = [
    {
        icon: Leaf,
        title: "100% Fresh & Organic",
        description: "Hand-picked fruits from trusted farms, delivered within 24 hours of harvest."
    },
    {
        icon: Clock,
        title: "Daily Morning Delivery",
        description: "Start your day fresh with fruits delivered before 9 AM, every single day."
    },
    {
        icon: Shield,
        title: "Quality Guaranteed",
        description: "Not satisfied? We'll replace or refund. No questions asked."
    },
    {
        icon: Phone,
        title: "Flexible Subscriptions",
        description: "Pause, skip, or cancel anytime. No lock-in contracts."
    }
]

export default function HowItWorksPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 bg-fresh-100 dark:bg-fresh-900/50 text-fresh-700 dark:text-fresh-300 rounded-full text-sm font-medium mb-4">
                            How It Works
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            Fresh Fruits in 4 Simple Steps
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Getting fresh fruits delivered daily has never been easier. Here&apos;s how Pureingo works.
                        </p>
                    </motion.div>

                    {/* Steps Section */}
                    <section className="mb-20">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            {/* Connection Line (Desktop) */}
                            <div className="hidden lg:block absolute top-20 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-fresh-200 via-fresh-400 to-fresh-200" />

                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="relative"
                                >
                                    <div className="text-center">
                                        {/* Step Number & Icon */}
                                        <div className="relative inline-flex mb-6">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center shadow-xl relative z-10">
                                                <step.icon className="w-9 h-9 text-white" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-sm font-bold text-fresh-600 z-20">
                                                {step.step}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-semibold text-foreground mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Benefits Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
                            Why Choose Pureingo?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl border border-fresh-100 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-14 h-14 bg-fresh-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <benefit.icon className="w-7 h-7 text-fresh-600" />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* CTA Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="bg-gradient-to-r from-fresh-500 to-fresh-600 rounded-3xl p-10 text-white">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Ready to Start Fresh?
                            </h2>
                            <p className="text-fresh-100 mb-6 max-w-xl mx-auto">
                                Join thousands of happy customers enjoying fresh fruits delivered daily.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/products">View Plans</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
            <Footer />
        </>
    )
}
