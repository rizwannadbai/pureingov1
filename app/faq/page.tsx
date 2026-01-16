"use client"

import { useState } from "react"
import { Header, Footer } from "@/components/layout"
import { HelpCircle, ChevronDown, Search, MessageCircle, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const faqs = [
    {
        category: "Orders & Delivery",
        questions: [
            { q: "What time will my order be delivered?", a: "All orders are delivered between 6 AM - 9 AM. You'll receive a notification when your delivery is on its way." },
            { q: "What is the minimum order value?", a: "The minimum order value is ₹199. Orders above ₹499 qualify for free delivery." },
            { q: "Can I schedule my delivery?", a: "Yes! You can schedule deliveries up to 7 days in advance from the checkout page." },
            { q: "What if I'm not available to receive my order?", a: "You can add delivery instructions for safe drop, or we'll try to contact you. If unreachable, the order will be returned." },
        ]
    },
    {
        category: "Products & Quality",
        questions: [
            { q: "Are your products organic?", a: "We offer both organic and conventionally grown produce. Look for the 'Organic' badge on products." },
            { q: "How do you ensure freshness?", a: "We source directly from farms and deliver within 24 hours of harvest. All products undergo quality checks." },
            { q: "What if I receive damaged products?", a: "Contact us within 24 hours with photos, and we'll process a full refund or replacement immediately." },
            { q: "Can I return products I don't like?", a: "Yes, we have a no-questions-asked return policy for unsatisfactory products within 24 hours of delivery." },
        ]
    },
    {
        category: "Payments & Subscriptions",
        questions: [
            { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery." },
            { q: "How do subscriptions work?", a: "Subscribe to receive regular deliveries. You can pause, modify, or cancel anytime from your dashboard." },
            { q: "Are there any hidden charges?", a: "No hidden charges! Delivery is free for orders above ₹499. Otherwise, a small delivery fee of ₹29 applies." },
            { q: "How do I get a refund?", a: "Refunds are processed to your original payment method within 3-5 business days." },
        ]
    },
    {
        category: "Account & App",
        questions: [
            { q: "How do I create an account?", a: "Click 'Get Started' and sign up with your email or phone number. Verification takes seconds!" },
            { q: "How do I track my order?", a: "Go to Dashboard > Orders and click on any order to see real-time tracking updates." },
            { q: "Can I add multiple delivery addresses?", a: "Yes! You can save multiple addresses in Dashboard > Addresses and choose during checkout." },
            { q: "How do referrals work?", a: "Share your unique referral code. When friends sign up and order, both of you get ₹100 credit!" },
        ]
    },
]

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (key: string) => {
        setOpenItems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
    }

    const filteredFaqs = faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0)

    return (
        <>
            <Header />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-fresh-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <HelpCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                            Find quick answers to common questions about orders, deliveries, and more.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-fresh-500 focus:ring-2 focus:ring-fresh-500/20 outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* FAQ List */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {filteredFaqs.map((category) => (
                            <div key={category.category} className="mb-10">
                                <h2 className="text-xl font-bold text-foreground mb-4">{category.category}</h2>
                                <div className="space-y-3">
                                    {category.questions.map((faq, idx) => {
                                        const key = `${category.category}-${idx}`
                                        const isOpen = openItems.includes(key)
                                        return (
                                            <div key={key} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                                <button
                                                    onClick={() => toggleItem(key)}
                                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="font-medium text-foreground pr-4">{faq.q}</span>
                                                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: 'auto' }}
                                                            exit={{ height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="px-5 pb-5 text-muted-foreground">{faq.a}</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                        <p className="text-muted-foreground mb-8">Our support team is here to help you</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button variant="outline" className="gap-2" asChild>
                                <Link href="/contact"><MessageCircle className="w-4 h-4" /> Live Chat</Link>
                            </Button>
                            <Button variant="outline" className="gap-2" asChild>
                                <Link href="mailto:support@pureingo.com"><Mail className="w-4 h-4" /> Email Us</Link>
                            </Button>
                            <Button variant="outline" className="gap-2" asChild>
                                <Link href="tel:+919876543210"><Phone className="w-4 h-4" /> Call Us</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
