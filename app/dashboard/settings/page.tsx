"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Bell, Shield, Camera, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState<any>(null)
    const [emailPrefs, setEmailPrefs] = useState({
        orderUpdates: true,
        promotions: false,
        newsletter: true
    })

    const supabase = createClient()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                setProfile(data || { full_name: '', phone: '' })
            }
        } catch (error) {
            console.error('Error loading profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    ...profile,
                    updated_at: new Date().toISOString(),
                })

            if (error) throw error
            toast.success("Settings saved successfully")
        } catch (error) {
            toast.error("Failed to save settings")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-fresh-600" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your profile and preferences</p>
            </div>

            {/* Profile Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {(profile?.full_name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-gray-700 rounded-full border border-gray-100 dark:border-gray-600 shadow-sm hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 dark:text-white">Profile Picture</h2>
                        <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={profile?.full_name || ''}
                                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-fresh-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Status</label>
                        <div className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center text-gray-500 cursor-not-allowed">
                            {profile?.phone || 'No phone linked'}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Bell className="w-5 h-5 text-fresh-600" />
                    <h2 className="font-semibold text-gray-900 dark:text-white">Email Notifications</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Order Updates</p>
                            <p className="text-sm text-gray-500">Get notified about your order status</p>
                        </div>
                        <Switch
                            checked={emailPrefs.orderUpdates}
                            onCheckedChange={(checked) => setEmailPrefs(prev => ({ ...prev, orderUpdates: checked }))}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Promotions</p>
                            <p className="text-sm text-gray-500">Receive offers and discounts</p>
                        </div>
                        <Switch
                            checked={emailPrefs.promotions}
                            onCheckedChange={(checked) => setEmailPrefs(prev => ({ ...prev, promotions: checked }))}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Newsletter</p>
                            <p className="text-sm text-gray-500">Weekly digest of fresh arrivals</p>
                        </div>
                        <Switch
                            checked={emailPrefs.newsletter}
                            onCheckedChange={(checked) => setEmailPrefs(prev => ({ ...prev, newsletter: checked }))}
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-end"
            >
                <Button onClick={handleSave} disabled={saving} className="min-w-[120px] gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </Button>
            </motion.div>
        </div>
    )
}
