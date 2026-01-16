"use client"

import { motion } from "framer-motion"
import { Truck, Clock, Leaf, ShieldCheck, CreditCard, Headphones } from "lucide-react"

const features = [
    {
        icon: Leaf,
        title: "100% Fresh",
        description: "Handpicked fresh produce sourced directly from verified organic farms.",
        color: "bg-fresh-500",
    },
    {
        icon: Truck,
        title: "Free Delivery",
        description: "Enjoy free delivery on orders above ₹299. Fast and reliable service.",
        color: "bg-blue-500",
    },
    {
        icon: Clock,
        title: "Same Day Delivery",
        description: "Order before 2 PM and get your groceries delivered the same day.",
        color: "bg-orange-500",
    },
    {
        icon: ShieldCheck,
        title: "Quality Guaranteed",
        description: "Not satisfied? Get a full refund or replacement. No questions asked.",
        color: "bg-purple-500",
    },
    {
        icon: CreditCard,
        title: "Secure Payment",
        description: "Multiple payment options with 100% secure transactions via Razorpay.",
        color: "bg-teal-500",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Our customer support team is always ready to help you anytime.",
        color: "bg-pink-500",
    },
]

export function Features() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-fresh-50/50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <span className="inline-block px-4 py-1.5 bg-fresh-100 dark:bg-fresh-900/50 text-fresh-700 dark:text-fresh-300 rounded-full text-sm font-medium mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        The Pureingo Difference
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We&apos;re committed to bringing you the freshest produce with unmatched
                        quality and convenience.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-800 border border-fresh-100 dark:border-gray-700 card-shadow hover:card-shadow-hover transition-all duration-300 hover-lift">
                                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-fresh-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
