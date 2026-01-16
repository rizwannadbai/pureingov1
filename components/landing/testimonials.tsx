"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Priya Sharma",
        location: "Mumbai",
        avatar: "PS",
        rating: 5,
        text: "The quality of fruits and vegetables is exceptional! I've been ordering from Pureingo for 6 months now and have never been disappointed. Same-day delivery is a lifesaver.",
    },
    {
        name: "Rahul Verma",
        location: "Pune",
        avatar: "RV",
        rating: 5,
        text: "Finally, a service that delivers truly fresh produce. The organic vegetables taste just like the ones from my grandma's farm. Highly recommend!",
    },
    {
        name: "Anita Desai",
        location: "Thane",
        avatar: "AD",
        rating: 5,
        text: "The subscription feature is amazing. I get fresh fruits every alternate day without having to order again. Great customer service too!",
    },
    {
        name: "Vikram Singh",
        location: "Navi Mumbai",
        avatar: "VS",
        rating: 5,
        text: "Best online grocery service for fresh produce. The packaging is eco-friendly and the delivery is always on time. Worth every rupee!",
    },
]

export function Testimonials() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-fresh-50/50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
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
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what our happy
                        customers have to say about Pureingo.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 lg:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-fresh-100 dark:border-gray-700 card-shadow hover:card-shadow-hover transition-all duration-300"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-foreground/80 leading-relaxed mb-6">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center text-white font-semibold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
