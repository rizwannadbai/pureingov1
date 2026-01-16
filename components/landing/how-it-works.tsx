"use client"

import { motion } from "framer-motion"
import { Search, ShoppingCart, Truck, Utensils } from "lucide-react"

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Browse & Select",
        description: "Explore our wide range of fresh fruits and vegetables. Use filters to find exactly what you need.",
    },
    {
        icon: ShoppingCart,
        step: "02",
        title: "Add to Cart",
        description: "Add your favorite items to the cart. Choose quantities as per your requirement.",
    },
    {
        icon: Truck,
        step: "03",
        title: "Schedule Delivery",
        description: "Select your preferred delivery slot. We deliver the same day for orders placed before 2 PM.",
    },
    {
        icon: Utensils,
        step: "04",
        title: "Enjoy Fresh",
        description: "Receive farm-fresh produce at your doorstep. Enjoy healthy, delicious meals with your family.",
    },
]

export function HowItWorks() {
    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-gray-900">
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
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Fresh in 4 Simple Steps
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Getting fresh produce delivered has never been easier.
                        Follow these simple steps to get started.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-20 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-fresh-200 via-fresh-400 to-fresh-200" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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
            </div>
        </section>
    )
}
