"use client"

import { motion } from "framer-motion"
import { Leaf, Heart, Shield, Truck, Users, Award } from "lucide-react"
import { Header, Footer } from "@/components/layout"

const values = [
    {
        icon: Heart,
        title: "Quality First",
        description: "We handpick every fruit and vegetable to ensure only the freshest produce reaches your table.",
    },
    {
        icon: Shield,
        title: "Trust & Transparency",
        description: "Know exactly where your food comes from. We partner with verified organic farms across India.",
    },
    {
        icon: Truck,
        title: "Reliable Delivery",
        description: "Same-day delivery to your doorstep. We handle your produce with care from farm to home.",
    },
    {
        icon: Leaf,
        title: "Sustainable Practices",
        description: "Eco-friendly packaging and support for local farmers who practice sustainable agriculture.",
    },
]

const team = [
    { name: "Rahul Sharma", role: "Founder & CEO", avatar: "RS" },
    { name: "Priya Patel", role: "Head of Operations", avatar: "PP" },
    { name: "Amit Kumar", role: "Supply Chain Lead", avatar: "AK" },
    { name: "Sneha Reddy", role: "Customer Experience", avatar: "SR" },
]

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-fresh-50/30 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-fresh-100 dark:bg-fresh-900/50 text-fresh-700 dark:text-fresh-300 rounded-full text-sm font-medium mb-4">
                            Our Story
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            About <span className="text-gradient">Pureingo</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            We started Pureingo with a simple mission: to make fresh, organic produce
                            accessible to every Indian household. What began as a small operation in
                            Mumbai has grown into a trusted platform serving thousands of families.
                        </p>
                    </motion.div>
                </section>

                {/* Mission Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-fresh-100 to-fresh-200 dark:from-fresh-900/50 dark:to-fresh-800/50 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center shadow-xl">
                                        <Leaf className="w-12 h-12 text-white" />
                                    </div>
                                    <p className="text-fresh-700 font-semibold text-lg">Farm Fresh Daily</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Our Mission
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                At Pureingo, we believe that everyone deserves access to fresh,
                                nutritious food. We work directly with farmers across Maharashtra,
                                Karnataka, and other states to bring you the finest produce without
                                the middlemen.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Our commitment goes beyond just delivering vegetables. We&apos;re
                                building a sustainable ecosystem that supports local farmers,
                                reduces food waste, and promotes healthy eating habits.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-8">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-fresh-600">50+</p>
                                    <p className="text-sm text-muted-foreground">Partner Farms</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-fresh-600">10K+</p>
                                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-fresh-600">500+</p>
                                    <p className="text-sm text-muted-foreground">Products</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto px-4 py-16 bg-fresh-50/50 dark:bg-gray-800/50 rounded-3xl my-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            These principles guide everything we do at Pureingo.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-fresh-100 dark:border-gray-700 text-center card-shadow"
                            >
                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center">
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                                <p className="text-sm text-muted-foreground">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Passionate people working to bring fresh produce to your doorstep.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    {member.avatar}
                                </div>
                                <h3 className="font-semibold text-foreground">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
