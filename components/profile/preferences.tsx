"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Mail, MessageSquare, Smartphone, Moon, Sun, Monitor, Lock, Eye, EyeOff, Save, Loader2, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

interface PreferencesProps {
    preferences?: {
        emailNotifications: boolean
        smsNotifications: boolean
        whatsappNotifications: boolean
        pushNotifications: boolean
        marketingEmails: boolean
        theme: 'light' | 'dark' | 'system'
        profileVisibility: 'public' | 'private'
    }
    isLoading?: boolean
    onSave?: (prefs: PreferencesProps['preferences']) => Promise<void>
}

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${enabled ? 'bg-fresh-500' : 'bg-gray-200'}`}
    >
        <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md ${enabled ? 'left-7' : 'left-1'}`}
        />
    </button>
)

export function Preferences({ preferences, isLoading, onSave }: PreferencesProps) {
    const [prefs, setPrefs] = useState(preferences || {
        emailNotifications: true,
        smsNotifications: false,
        whatsappNotifications: false,
        pushNotifications: true,
        marketingEmails: false,
        theme: 'system' as const,
        profileVisibility: 'private' as const,
    })
    const [isSaving, setIsSaving] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    const handleToggle = (key: keyof typeof prefs) => {
        if (typeof prefs[key] === 'boolean') {
            setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
            setHasChanges(true)
        }
    }

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        setPrefs(prev => ({ ...prev, theme }))
        setHasChanges(true)
    }

    const handleSave = async () => {
        setIsSaving(true)
        await onSave?.(prefs)
        toast.success("Preferences saved!")
        setIsSaving(false)
        setHasChanges(false)
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-3xl border border-fresh-100 p-6">
                        <Skeleton className="h-6 w-40 mb-4" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ))}
            </div>
        )
    }

    const notificationOptions = [
        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Order updates and reminders', icon: Mail, color: 'bg-blue-100 text-blue-600' },
        { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Delivery alerts via SMS', icon: Smartphone, color: 'bg-green-100 text-green-600' },
        { key: 'whatsappNotifications', label: 'WhatsApp Updates', desc: 'Real-time updates on WhatsApp', icon: MessageSquare, color: 'bg-emerald-100 text-emerald-600' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and app notifications', icon: Bell, color: 'bg-purple-100 text-purple-600' },
        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotions and offers', icon: Volume2, color: 'bg-orange-100 text-orange-600' },
    ]

    const themeOptions = [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor },
    ]

    return (
        <div className="space-y-6">
            {/* Notifications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Bell className="w-6 h-6 text-fresh-600" />
                        Notification Preferences
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Choose how you want to be notified</p>
                </div>
                <div className="space-y-4">
                    {notificationOptions.map(opt => {
                        const Icon = opt.icon
                        return (
                            <div key={opt.key} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${opt.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{opt.label}</p>
                                        <p className="text-sm text-muted-foreground">{opt.desc}</p>
                                    </div>
                                </div>
                                <Toggle
                                    enabled={prefs[opt.key as keyof typeof prefs] as boolean}
                                    onChange={() => handleToggle(opt.key as keyof typeof prefs)}
                                />
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            {/* Theme */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground">Theme Mode</h2>
                    <p className="text-sm text-muted-foreground mt-1">Choose your preferred appearance</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {themeOptions.map(theme => {
                        const Icon = theme.icon
                        const isActive = prefs.theme === theme.value
                        return (
                            <motion.button
                                key={theme.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleThemeChange(theme.value as 'light' | 'dark' | 'system')}
                                className={`p-6 rounded-2xl border-2 transition-all ${isActive
                                    ? 'border-fresh-500 bg-fresh-50'
                                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className={`w-8 h-8 mx-auto mb-3 ${isActive ? 'text-fresh-600' : 'text-muted-foreground'}`} />
                                <p className={`font-semibold ${isActive ? 'text-fresh-600' : 'text-muted-foreground'}`}>
                                    {theme.label}
                                </p>
                            </motion.button>
                        )
                    })}
                </div>
            </motion.div>

            {/* Privacy */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
            >
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Lock className="w-6 h-6 text-fresh-600" />
                        Privacy Settings
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Control your privacy preferences</p>
                </div>
                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${prefs.profileVisibility === 'public' ? 'bg-green-100' : 'bg-gray-200'}`}>
                            {prefs.profileVisibility === 'public' ? <Eye className="w-6 h-6 text-green-600" /> : <EyeOff className="w-6 h-6 text-gray-500" />}
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Profile Visibility</p>
                            <p className="text-sm text-muted-foreground">
                                {prefs.profileVisibility === 'public' ? 'Your profile is visible to others' : 'Your profile is hidden'}
                            </p>
                        </div>
                    </div>
                    <Toggle
                        enabled={prefs.profileVisibility === 'public'}
                        onChange={() => {
                            setPrefs(prev => ({ ...prev, profileVisibility: prev.profileVisibility === 'public' ? 'private' : 'public' }))
                            setHasChanges(true)
                        }}
                    />
                </div>
            </motion.div>

            {/* Save Button */}
            {hasChanges && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky bottom-4 bg-white rounded-2xl shadow-xl border border-fresh-200 p-4"
                >
                    <Button onClick={handleSave} className="w-full gap-2" size="lg" disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Preferences
                    </Button>
                </motion.div>
            )}
        </div>
    )
}
