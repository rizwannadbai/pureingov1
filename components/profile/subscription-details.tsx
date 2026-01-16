"use client"

import { motion } from "framer-motion"
import { Package, Calendar, CreditCard, ArrowRight, Crown, Check, Sparkles, Zap, Gift, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface SubscriptionDetailsProps {
    subscription?: {
        planName: string
        tier: 'free' | 'basic' | 'premium' | 'family'
        benefits: string[]
        billingCycle: string
        renewalDate: string
        paymentStatus: 'active' | 'pending' | 'failed' | 'cancelled'
        price: number
        nextBillingAmount?: number
    }
    isLoading?: boolean
    onUpgrade?: () => void
    onCancel?: () => void
    onChangePlan?: () => void
}

const planColors = {
    free: { bg: 'from-gray-500 to-gray-600', icon: Package },
    basic: { bg: 'from-blue-500 to-blue-600', icon: Zap },
    premium: { bg: 'from-purple-500 to-pink-500', icon: Crown },
    family: { bg: 'from-fresh-500 to-emerald-500', icon: Gift },
}

export function SubscriptionDetails({ subscription, isLoading, onUpgrade, onCancel, onChangePlan }: SubscriptionDetailsProps) {
    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-3xl" />
                <Skeleton className="h-32 w-full rounded-3xl" />
            </div>
        )
    }

    if (!subscription) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden"
            >
                {/* Free Plan Card */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 text-center relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Package className="w-10 h-10 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Free Plan</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        You're on the free plan. Upgrade to unlock delivery subscriptions and exclusive discounts.
                    </p>
                    <Button size="lg" className="gap-2 px-8" onClick={onUpgrade}>
                        <Sparkles className="w-5 h-5" />
                        Upgrade Now
                    </Button>
                </div>

                {/* Available Plans */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['basic', 'premium', 'family'].map((tier) => {
                        const config = planColors[tier as keyof typeof planColors]
                        const Icon = config.icon
                        const prices = { basic: 499, premium: 999, family: 1499 }
                        return (
                            <motion.div
                                key={tier}
                                whileHover={{ scale: 1.02 }}
                                className={`bg-gradient-to-br ${config.bg} rounded-2xl p-6 text-white cursor-pointer`}
                                onClick={onUpgrade}
                            >
                                <Icon className="w-8 h-8 mb-3 opacity-80" />
                                <h4 className="text-lg font-bold capitalize mb-1">{tier} Plan</h4>
                                <p className="text-2xl font-bold">₹{prices[tier as keyof typeof prices]}<span className="text-sm font-normal opacity-70">/month</span></p>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        )
    }

    const planConfig = planColors[subscription.tier]
    const PlanIcon = planConfig.icon

    const statusColors = {
        active: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        failed: 'bg-red-100 text-red-700',
        cancelled: 'bg-gray-100 text-gray-700',
    }

    return (
        <div className="space-y-6">
            {/* Current Plan Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${planConfig.bg} rounded-3xl p-8 text-white relative overflow-hidden shadow-xl`}
            >
                <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                <PlanIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{subscription.planName}</h2>
                                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[subscription.paymentStatus]}`}>
                                    {subscription.paymentStatus}
                                </span>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                            {subscription.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-4xl font-bold">₹{subscription.price.toLocaleString('en-IN')}</p>
                        <p className="text-white/70">per {subscription.billingCycle}</p>
                    </div>
                </div>
            </motion.div>

            {/* Billing Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 shadow-lg"
            >
                <h3 className="font-bold text-lg text-foreground mb-4">Billing Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                            <Calendar className="w-4 h-4" />
                            Billing Cycle
                        </div>
                        <p className="font-bold text-foreground capitalize">{subscription.billingCycle}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                            <Calendar className="w-4 h-4" />
                            Next Renewal
                        </div>
                        <p className="font-bold text-foreground">{subscription.renewalDate}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                            <CreditCard className="w-4 h-4" />
                            Next Charge
                        </div>
                        <p className="font-bold text-foreground">₹{(subscription.nextBillingAmount || subscription.price).toLocaleString('en-IN')}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-100">
                    <Button onClick={onChangePlan} className="flex-1 gap-2">
                        <Star className="w-4 h-4" />
                        Change Plan
                    </Button>
                    <Button variant="outline" onClick={onCancel} className="text-muted-foreground">
                        Cancel Subscription
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
