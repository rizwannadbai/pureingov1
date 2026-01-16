"use client"

import { motion } from "framer-motion"
import { Wallet, Gift, History, Users, Copy, Check, Sparkles, TrendingUp, ArrowUpRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { toast } from "sonner"

interface WalletSectionProps {
    balance?: number
    rewardPoints?: number
    referralCode?: string
    referralEarnings?: number
    totalReferrals?: number
    cashbackHistory?: { id: string; date: string; amount: number; description: string }[]
    isLoading?: boolean
}

export function WalletSection({
    balance = 0,
    rewardPoints = 0,
    referralCode = "PUREINGO123",
    referralEarnings = 0,
    totalReferrals = 0,
    cashbackHistory = [],
    isLoading
}: WalletSectionProps) {
    const [copied, setCopied] = useState(false)

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode)
        setCopied(true)
        toast.success("Referral code copied!")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: 'Join Pureingo',
                text: `Use my referral code ${referralCode} to get ₹100 off your first order!`,
                url: `https://pureingo.com/ref/${referralCode}`,
            })
        } else {
            handleCopyCode()
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map(i => <Skeleton key={i} className="h-40 rounded-3xl" />)}
                </div>
                <Skeleton className="h-48 rounded-3xl" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Balance Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Wallet Balance */}
                <div className="relative bg-gradient-to-br from-fresh-500 via-fresh-600 to-emerald-600 rounded-3xl p-6 text-white overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <span className="text-fresh-100 font-medium">Wallet Balance</span>
                        </div>
                        <p className="text-4xl font-bold mb-2">₹{balance.toLocaleString('en-IN')}</p>
                        <p className="text-fresh-100 text-sm">Available for your next order</p>
                    </div>
                </div>

                {/* Reward Points */}
                <div className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-3xl p-6 text-white overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="text-purple-100 font-medium">Reward Points</span>
                        </div>
                        <p className="text-4xl font-bold mb-2">{rewardPoints.toLocaleString('en-IN')}</p>
                        <p className="text-purple-100 text-sm">= ₹{Math.floor(rewardPoints / 10)} cashback value</p>
                    </div>
                </div>
            </motion.div>

            {/* Referral Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-fresh-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-fresh-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Refer & Earn</h2>
                                <p className="text-sm text-muted-foreground">Share with friends, earn rewards</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground mt-4 max-w-md">
                            Invite friends to Pureingo! You'll earn <span className="font-bold text-fresh-600">₹100</span> for each friend who signs up and places their first order.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="bg-gradient-to-r from-fresh-50 to-emerald-50 rounded-2xl p-4 border-2 border-dashed border-fresh-300">
                            <p className="text-3xl font-bold text-fresh-600 font-mono tracking-wider">{referralCode}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2" onClick={handleCopyCode}>
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy Code'}
                            </Button>
                            <Button className="gap-2" onClick={handleShare}>
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Total Referrals</p>
                        <p className="text-2xl font-bold text-foreground">{totalReferrals}</p>
                    </div>
                    <div className="bg-fresh-50 rounded-2xl p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Referral Earnings</p>
                        <p className="text-2xl font-bold text-fresh-600">₹{referralEarnings.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </motion.div>

            {/* Cashback History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Cashback History</h2>
                        <p className="text-sm text-muted-foreground">Your rewards and earnings</p>
                    </div>
                </div>

                {cashbackHistory.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Gift className="w-14 h-14 mx-auto mb-4 text-gray-300" />
                        <p className="font-semibold text-foreground mb-1">No cashback yet</p>
                        <p className="text-sm text-muted-foreground">Complete orders to earn cashback rewards</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cashbackHistory.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-2xl transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{item.description}</p>
                                        <p className="text-sm text-muted-foreground">{item.date}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-green-600">+₹{item.amount}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}
