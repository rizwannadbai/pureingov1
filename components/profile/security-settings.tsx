"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Smartphone, Key, Trash2, LogOut, Monitor, AlertTriangle, Loader2, Clock, MapPin, ChevronRight, Lock, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

interface SecuritySettingsProps {
    lastLogin?: { date: string; device: string; location: string }
    is2FAEnabled?: boolean
    activeSessions?: { id: string; device: string; location: string; lastActive: string; current?: boolean }[]
    isLoading?: boolean
    onToggle2FA?: () => Promise<void>
    onChangePassword?: () => void
    onLogoutSession?: (sessionId: string) => Promise<void>
    onLogoutAll?: () => Promise<void>
    onDeleteAccount?: () => void
}

export function SecuritySettings({
    lastLogin,
    is2FAEnabled = false,
    activeSessions = [],
    isLoading,
    onToggle2FA,
    onChangePassword,
    onLogoutSession,
    onLogoutAll,
    onDeleteAccount
}: SecuritySettingsProps) {
    const [is2FALoading, setIs2FALoading] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState<string | null>(null)

    const handle2FAToggle = async () => {
        setIs2FALoading(true)
        await onToggle2FA?.()
        toast.success(is2FAEnabled ? "2FA disabled" : "2FA enabled successfully!")
        setIs2FALoading(false)
    }

    const handleLogoutSession = async (id: string) => {
        setLogoutLoading(id)
        await onLogoutSession?.(id)
        toast.success("Session logged out")
        setLogoutLoading(null)
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-3xl border border-fresh-100 p-6">
                        <Skeleton className="h-6 w-40 mb-4" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Last Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl"
            >
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" />
                    Last Login Activity
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                        <p className="text-slate-400 text-sm mb-1">Date & Time</p>
                        <p className="font-semibold">{lastLogin?.date || "Today, 2:30 PM"}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                        <p className="text-slate-400 text-sm mb-1">Device</p>
                        <p className="font-semibold flex items-center gap-2">
                            <Monitor className="w-4 h-4" />
                            {lastLogin?.device || "Chrome on Windows"}
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                        <p className="text-slate-400 text-sm mb-1">Location</p>
                        <p className="font-semibold flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {lastLogin?.location || "India"}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Security Options */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-fresh-100 shadow-lg overflow-hidden"
            >
                {/* Change Password */}
                <button
                    onClick={onChangePassword}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <Key className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-foreground">Change Password</p>
                            <p className="text-sm text-muted-foreground">Update your account password</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${is2FAEnabled ? 'bg-green-100' : 'bg-orange-100'}`}>
                            <Fingerprint className={`w-6 h-6 ${is2FAEnabled ? 'text-green-600' : 'text-orange-600'}`} />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">
                                {is2FAEnabled ? "✓ Enabled - Your account is secured" : "Add extra security to your account"}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant={is2FAEnabled ? "outline" : "default"}
                        size="sm"
                        onClick={handle2FAToggle}
                        disabled={is2FALoading}
                        className="min-w-[100px]"
                    >
                        {is2FALoading ? <Loader2 className="w-4 h-4 animate-spin" /> : is2FAEnabled ? "Disable" : "Enable"}
                    </Button>
                </div>
            </motion.div>

            {/* Active Sessions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 shadow-lg"
            >
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-fresh-600" />
                            Active Sessions
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">Manage devices logged into your account</p>
                    </div>
                    <Button variant="destructive" size="sm" className="gap-2" onClick={onLogoutAll}>
                        <LogOut className="w-4 h-4" />
                        Logout All
                    </Button>
                </div>
                <div className="space-y-3">
                    {activeSessions.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground bg-gray-50 rounded-2xl">
                            <Shield className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p>This is your only active session</p>
                        </div>
                    ) : (
                        activeSessions.map(session => (
                            <div key={session.id} className={`flex items-center justify-between p-4 rounded-2xl ${session.current ? 'bg-fresh-50 ring-2 ring-fresh-200' : 'bg-gray-50'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${session.current ? 'bg-fresh-500 text-white' : 'bg-white shadow'}`}>
                                        <Monitor className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground flex items-center gap-2">
                                            {session.device}
                                            {session.current && <span className="text-xs bg-fresh-500 text-white px-2 py-0.5 rounded-full">Current</span>}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                                    </div>
                                </div>
                                {!session.current && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleLogoutSession(session.id)}
                                        disabled={logoutLoading === session.id}
                                    >
                                        {logoutLoading === session.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                                    </Button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-dashed border-red-200 p-6"
            >
                <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                </h3>
                <p className="text-sm text-red-600/80 mb-5">
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive" onClick={onDeleteAccount} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete My Account
                </Button>
            </motion.div>
        </div>
    )
}
