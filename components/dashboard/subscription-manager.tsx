"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Play, Pause, Calendar, Clock, Truck, ChevronRight, ChevronDown,
    CheckCircle, AlertCircle, Leaf, Sparkles, X, RefreshCw,
    SkipForward, Edit3, Trash2, CalendarX, CalendarCheck, AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Subscription {
    id: string
    name: string
    plan: string
    price: string
    nextDelivery: string
    frequency: string
    isPaused: boolean
    deliveriesCompleted: number
    totalDeliveries: number
}

// Sample subscriptions - in production, fetch from Supabase
const initialSubscriptions: Subscription[] = [
    {
        id: "sub-1",
        name: "Daily Fresh Fruit Box",
        plan: "Monthly",
        price: "₹2,899",
        nextDelivery: "Tomorrow, 6:00 AM",
        frequency: "Daily",
        isPaused: false,
        deliveriesCompleted: 15,
        totalDeliveries: 30,
    },
    {
        id: "sub-2",
        name: "Fresh Orange Juice Pack",
        plan: "Weekly",
        price: "₹599",
        nextDelivery: "Mon, Wed, Fri",
        frequency: "3x per week",
        isPaused: false,
        deliveriesCompleted: 8,
        totalDeliveries: 12,
    },
]

export function SubscriptionManager() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions)
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const [selectedSubForCancel, setSelectedSubForCancel] = useState<Subscription | null>(null)
    const [skipDialogOpen, setSkipDialogOpen] = useState(false)
    const [selectedSubForSkip, setSelectedSubForSkip] = useState<Subscription | null>(null)

    const handleTogglePause = async (subId: string) => {
        setLoadingId(subId)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))

        setSubscriptions(prev => prev.map(sub => {
            if (sub.id === subId) {
                const newIsPaused = !sub.isPaused
                toast.success(newIsPaused ? "Subscription paused" : "Subscription resumed")
                return { ...sub, isPaused: newIsPaused }
            }
            return sub
        }))

        setLoadingId(null)
    }

    const handleSkipNextDelivery = async () => {
        if (!selectedSubForSkip) return

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        toast.success(`Next delivery for "${selectedSubForSkip.name}" has been skipped`)
        setSkipDialogOpen(false)
        setSelectedSubForSkip(null)
    }

    const handleCancelSubscription = async () => {
        if (!selectedSubForCancel) return

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        setSubscriptions(prev => prev.filter(sub => sub.id !== selectedSubForCancel.id))
        toast.success(`"${selectedSubForCancel.name}" subscription has been cancelled`)
        setCancelDialogOpen(false)
        setSelectedSubForCancel(null)
    }

    const handleChangeFrequency = (sub: Subscription) => {
        toast.info(`Contact support to change frequency for "${sub.name}"`)
    }

    const handleReschedule = (sub: Subscription) => {
        toast.info(`Reschedule feature coming soon for "${sub.name}"`)
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Subscriptions</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your active delivery subscriptions</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        View Schedule
                    </Button>
                </div>

                <div className="grid gap-4">
                    <AnimatePresence mode="popLayout">
                        {subscriptions.map((sub) => (
                            <motion.div
                                key={sub.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`relative overflow-hidden rounded-2xl border-2 transition-all ${sub.isPaused
                                    ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                    : "bg-white dark:bg-gray-800 border-fresh-200 dark:border-fresh-700 shadow-lg shadow-fresh-100/50 dark:shadow-none"
                                    }`}
                            >
                                {/* Status Banner */}
                                <div className={`px-4 py-2 text-xs font-semibold flex items-center gap-2 ${sub.isPaused
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-fresh-100 text-fresh-700"
                                    }`}>
                                    {sub.isPaused ? (
                                        <>
                                            <Pause className="w-3.5 h-3.5" />
                                            Subscription Paused - Deliveries on hold
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Active Subscription - Deliveries running smoothly
                                        </>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="flex flex-col lg:flex-row gap-5">
                                        {/* Illustration */}
                                        <div className={`relative w-full lg:w-48 h-32 rounded-xl flex items-center justify-center overflow-hidden ${sub.isPaused
                                            ? "bg-gradient-to-br from-gray-100 to-gray-200"
                                            : "bg-gradient-to-br from-fresh-100 to-emerald-100"
                                            }`}>
                                            {sub.isPaused ? (
                                                // Paused Illustration
                                                <div className="text-center">
                                                    <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full flex items-center justify-center mb-2 relative">
                                                        <Truck className="w-8 h-8 text-gray-500" />
                                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                                            <Pause className="w-3 h-3 text-white" />
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 font-medium">On Hold</p>
                                                </div>
                                            ) : (
                                                // Active Illustration
                                                <div className="text-center relative">
                                                    <motion.div
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                        className="w-16 h-16 mx-auto bg-fresh-500 rounded-full flex items-center justify-center mb-2 shadow-lg"
                                                    >
                                                        <Truck className="w-8 h-8 text-white" />
                                                    </motion.div>
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                        className="absolute top-0 right-4"
                                                    >
                                                        <Sparkles className="w-5 h-5 text-yellow-500" />
                                                    </motion.div>
                                                    <p className="text-xs text-fresh-700 font-medium">Active Delivery</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Subscription Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className={`text-lg font-bold ${sub.isPaused ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}>
                                                        {sub.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {sub.plan} • {sub.frequency}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-lg font-bold ${sub.isPaused ? "text-gray-400" : "text-fresh-600"}`}>
                                                        {sub.price}
                                                    </p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">per month</p>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Deliveries this month</span>
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        {sub.deliveriesCompleted}/{sub.totalDeliveries}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(sub.deliveriesCompleted / sub.totalDeliveries) * 100}%` }}
                                                        transition={{ duration: 0.5 }}
                                                        className={`h-full rounded-full ${sub.isPaused ? "bg-gray-300" : "bg-fresh-500"
                                                            }`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Next Delivery & Actions */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                                <div className={`flex items-center gap-2 text-sm ${sub.isPaused ? "text-gray-400" : "text-gray-600"
                                                    }`}>
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {sub.isPaused ? "Paused - No upcoming delivery" : `Next: ${sub.nextDelivery}`}
                                                    </span>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant={sub.isPaused ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => handleTogglePause(sub.id)}
                                                        disabled={loadingId === sub.id}
                                                        className={`gap-2 ${sub.isPaused
                                                            ? "bg-fresh-500 hover:bg-fresh-600"
                                                            : "border-orange-300 text-orange-600 hover:bg-orange-50"
                                                            }`}
                                                    >
                                                        {loadingId === sub.id ? (
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                                            />
                                                        ) : sub.isPaused ? (
                                                            <>
                                                                <Play className="w-4 h-4" />
                                                                Resume
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Pause className="w-4 h-4" />
                                                                Pause
                                                            </>
                                                        )}
                                                    </Button>

                                                    {/* Manage Dropdown */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="gap-1">
                                                                Manage
                                                                <ChevronDown className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-56">
                                                            <DropdownMenuLabel>Subscription Options</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />

                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedSubForSkip(sub)
                                                                    setSkipDialogOpen(true)
                                                                }}
                                                                className="gap-2 cursor-pointer"
                                                            >
                                                                <SkipForward className="w-4 h-4 text-blue-500" />
                                                                <div>
                                                                    <p className="font-medium">Skip Next Delivery</p>
                                                                    <p className="text-xs text-gray-500">Skip one upcoming delivery</p>
                                                                </div>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuItem
                                                                onClick={() => handleReschedule(sub)}
                                                                className="gap-2 cursor-pointer"
                                                            >
                                                                <CalendarCheck className="w-4 h-4 text-green-500" />
                                                                <div>
                                                                    <p className="font-medium">Reschedule Delivery</p>
                                                                    <p className="text-xs text-gray-500">Change delivery date/time</p>
                                                                </div>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuItem
                                                                onClick={() => handleChangeFrequency(sub)}
                                                                className="gap-2 cursor-pointer"
                                                            >
                                                                <RefreshCw className="w-4 h-4 text-purple-500" />
                                                                <div>
                                                                    <p className="font-medium">Change Frequency</p>
                                                                    <p className="text-xs text-gray-500">Daily, weekly, or custom</p>
                                                                </div>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuItem
                                                                onClick={() => toast.info("Edit subscription details")}
                                                                className="gap-2 cursor-pointer"
                                                            >
                                                                <Edit3 className="w-4 h-4 text-gray-500" />
                                                                <div>
                                                                    <p className="font-medium">Edit Subscription</p>
                                                                    <p className="text-xs text-gray-500">Modify items or quantity</p>
                                                                </div>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuSeparator />

                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedSubForCancel(sub)
                                                                    setCancelDialogOpen(true)
                                                                }}
                                                                className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                <div>
                                                                    <p className="font-medium">Cancel Subscription</p>
                                                                    <p className="text-xs text-red-400">Stop all future deliveries</p>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Paused Overlay Effect */}
                                {sub.isPaused && (
                                    <div className="absolute inset-0 bg-white/30 pointer-events-none" />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {subscriptions.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Leaf className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Subscriptions</h3>
                        <p className="text-gray-500 mb-4">Start a subscription to get fresh produce delivered daily!</p>
                        <Button>Browse Subscriptions</Button>
                    </div>
                )}
            </div>

            {/* Skip Delivery Dialog */}
            <Dialog open={skipDialogOpen} onOpenChange={setSkipDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                            <SkipForward className="w-6 h-6 text-blue-600" />
                        </div>
                        <DialogTitle className="text-center">Skip Next Delivery?</DialogTitle>
                        <DialogDescription className="text-center">
                            Your next delivery for <span className="font-semibold">{selectedSubForSkip?.name}</span> will be skipped.
                            You won&apos;t be charged for this delivery.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-blue-700">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Scheduled: {selectedSubForSkip?.nextDelivery}
                        </p>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setSkipDialogOpen(false)}>
                            Keep Delivery
                        </Button>
                        <Button onClick={handleSkipNextDelivery} className="bg-blue-600 hover:bg-blue-700">
                            Skip This Delivery
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Cancel Subscription Dialog */}
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <DialogTitle className="text-center">Cancel Subscription?</DialogTitle>
                        <DialogDescription className="text-center">
                            Are you sure you want to cancel <span className="font-semibold">{selectedSubForCancel?.name}</span>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-red-50 rounded-xl p-4">
                        <h4 className="font-semibold text-red-800 mb-2">You will lose:</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                            <li>• All future scheduled deliveries</li>
                            <li>• Your current subscription price (may increase later)</li>
                            <li>• Accumulated subscription benefits</li>
                        </ul>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                        Consider pausing instead if you need a temporary break.
                    </p>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                            Keep Subscription
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleCancelSubscription}
                        >
                            Yes, Cancel Subscription
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
