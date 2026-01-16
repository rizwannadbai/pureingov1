"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Copy, Share2, Users, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ReferralStats {
    totalReferrals: number
    pendingRewards: number
    earnedRewards: number
    referralCode: string
}

export function ReferralCard() {
    const [copied, setCopied] = useState(false)

    // Sample data - in production, fetch from API
    const stats: ReferralStats = {
        totalReferrals: 3,
        pendingRewards: 1,
        earnedRewards: 450,
        referralCode: "FRESH100",
    }

    const referralLink = `https://pureingo.com/ref/${stats.referralCode}`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralLink)
            setCopied(true)
            toast.success("Referral link copied!")
            setTimeout(() => setCopied(false), 2000)
        } catch (e) {
            toast.error("Failed to copy")
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Join Pureingo!",
                    text: "Get fresh fruits delivered daily. Use my referral code for ₹100 off!",
                    url: referralLink,
                })
            } catch (e) {
                // User cancelled or error
            }
        } else {
            handleCopy()
        }
    }

    return (
        <div className="bg-gradient-to-br from-fresh-500 to-emerald-600 rounded-2xl p-6 text-white overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Gift className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Refer & Earn</h3>
                        <p className="text-fresh-100 text-sm">Get ₹100 for each friend</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                        <p className="text-fresh-100 text-xs">Friends Joined</p>
                    </div>
                    <div className="text-center border-x border-white/20">
                        <p className="text-2xl font-bold">{stats.pendingRewards}</p>
                        <p className="text-fresh-100 text-xs">Pending</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">₹{stats.earnedRewards}</p>
                        <p className="text-fresh-100 text-xs">Earned</p>
                    </div>
                </div>

                {/* Referral Code */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <p className="text-fresh-100 text-xs mb-2">Your Referral Code</p>
                    <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xl tracking-wider">
                            {stats.referralCode}
                        </span>
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        onClick={handleShare}
                        className="flex-1 bg-white text-fresh-600 hover:bg-white/90"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Link
                    </Button>
                    <Button
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                    >
                        <Users className="w-4 h-4 mr-2" />
                        View All
                    </Button>
                </div>
            </div>
        </div>
    )
}
