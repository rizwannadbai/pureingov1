"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, MessageCircle, FileText, Shield, ChevronRight, Send, Loader2, Headphones, BookOpen, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import Link from "next/link"

interface SupportSectionProps {
    isLoading?: boolean
    onRaiseTicket?: (subject: string, message: string) => Promise<void>
    onStartChat?: () => void
}

const faqs = [
    { q: "How do I cancel my subscription?", a: "Go to the Subscription tab and click 'Cancel Subscription'. You'll continue to have access until the end of your billing period." },
    { q: "When will I receive my order?", a: "Fresh produce is delivered between 6 AM - 9 AM daily. You can track your order in the Orders section." },
    { q: "How do I change my delivery address?", a: "Navigate to Personal Information and update your delivery address there." },
    { q: "What if my fruits are damaged?", a: "Contact our support team within 24 hours with photos, and we'll process a full refund or replacement." },
    { q: "How do referrals work?", a: "Share your referral code from the Wallet section. Both you and your friend get ₹100 credit when they sign up and place their first order." },
]

export function SupportSection({ isLoading, onRaiseTicket, onStartChat }: SupportSectionProps) {
    const [showTicketForm, setShowTicketForm] = useState(false)
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    const handleSubmitTicket = async () => {
        if (!subject.trim() || !message.trim()) {
            toast.error("Please fill in all fields")
            return
        }
        setIsSubmitting(true)
        await onRaiseTicket?.(subject, message)
        toast.success("Support ticket created! We'll get back to you soon.")
        setIsSubmitting(false)
        setShowTicketForm(false)
        setSubject("")
        setMessage("")
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map(i => <Skeleton key={i} className="h-40 rounded-3xl" />)}
                </div>
                <Skeleton className="h-64 rounded-3xl" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowTicketForm(!showTicketForm)}
                    className="bg-gradient-to-br from-fresh-500 to-fresh-600 rounded-3xl p-6 text-left text-white shadow-lg group"
                >
                    <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <HelpCircle className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Raise a Ticket</h3>
                    <p className="text-fresh-100">Report an issue or request help from our team</p>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStartChat}
                    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-left text-white shadow-lg group"
                >
                    <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Headphones className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Live Chat</h3>
                    <p className="text-purple-100">Chat with our support team in real-time</p>
                </motion.button>
            </motion.div>

            {/* Ticket Form */}
            <AnimatePresence>
                {showTicketForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg overflow-hidden"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-1">Create Support Ticket</h3>
                        <p className="text-sm text-muted-foreground mb-6">We typically respond within 24 hours</p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                                <Input
                                    placeholder="What do you need help with?"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                                <textarea
                                    placeholder="Describe your issue in detail..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full h-36 p-4 rounded-xl border border-input resize-none text-sm focus:ring-2 focus:ring-fresh-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={handleSubmitTicket} className="gap-2" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    Submit Ticket
                                </Button>
                                <Button variant="ghost" onClick={() => setShowTicketForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAQs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-fresh-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-fresh-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                        <p className="text-sm text-muted-foreground">Quick answers to common questions</p>
                    </div>
                </div>
                <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                                <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${expandedFaq === idx ? 'rotate-90' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {expandedFaq === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-4 pb-4 text-muted-foreground">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Contact & Legal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
                <Link href="mailto:support@pureingo.com" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-fresh-200 transition-colors group">
                    <Mail className="w-5 h-5 text-fresh-600" />
                    <span className="font-medium text-foreground">Email Support</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/terms" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-fresh-200 transition-colors group">
                    <FileText className="w-5 h-5 text-fresh-600" />
                    <span className="font-medium text-foreground">Terms of Service</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/privacy" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-fresh-200 transition-colors group">
                    <Shield className="w-5 h-5 text-fresh-600" />
                    <span className="font-medium text-foreground">Privacy Policy</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
            </motion.div>
        </div>
    )
}
