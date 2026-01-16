"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    ProfileHeader,
    PersonalInfo,
    SecuritySettings,
    SubscriptionDetails,
    OrderHistory,
    PaymentMethods,
    Preferences,
    SupportSection,
    WalletSection
} from "@/components/profile"

function ProfileContent() {
    const searchParams = useSearchParams()
    const activeSection = searchParams.get('section') || 'profile'
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<any>(null)
    const [orders, setOrders] = useState<any[]>([])
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const loadUserData = async () => {
            setIsLoading(true)
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/login')
                return
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            const { data: ordersData } = await supabase
                .from('orders')
                .select('*, order_items(*)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10)

            setUserData({
                id: user.id,
                name: profile?.name || user.user_metadata?.full_name || '',
                email: user.email || '',
                phone: profile?.phone || '',
                username: profile?.username || user.id.slice(0, 8),
                avatarUrl: profile?.avatar_url || null,
                isVerified: user.email_confirmed_at != null,
                isPremium: false,
                status: 'active',
                joinedAt: user.created_at,
            })

            setOrders(ordersData?.map(o => ({
                id: `ORD-${o.id.slice(0, 6).toUpperCase()}`,
                date: new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                total: o.total_amount,
                status: o.status || 'processing',
                items: o.order_items?.map((item: any) => ({ name: item.product_name, quantity: item.quantity })) || [],
            })) || [])

            setIsLoading(false)
        }

        loadUserData()
    }, [supabase, router])

    const handleSavePersonalInfo = async (data: any) => {
        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: userData.id,
                name: data.fullName,
                phone: data.phone,
                email: userData.email,
            })

        if (error) {
            throw new Error('Failed to save profile')
        }
        setUserData((prev: any) => ({ ...prev, name: data.fullName, phone: data.phone }))
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <PersonalInfo
                        data={{
                            fullName: userData?.name || '',
                            email: userData?.email || '',
                            phone: userData?.phone || '',
                            dateOfBirth: '',
                            gender: '',
                            address: '',
                            language: 'English',
                        }}
                        isLoading={isLoading}
                        isEmailVerified={userData?.isVerified}
                        isPhoneVerified={false}
                        onSave={handleSavePersonalInfo}
                    />
                )
            case 'security':
                return (
                    <SecuritySettings
                        lastLogin={{ date: "Today, 2:30 PM", device: "Chrome on Windows", location: "India" }}
                        is2FAEnabled={false}
                        activeSessions={[{ id: '1', device: 'Chrome on Windows', location: 'India', lastActive: 'Now', current: true }]}
                        isLoading={isLoading}
                    />
                )
            case 'subscription':
                return <SubscriptionDetails isLoading={isLoading} />
            case 'orders':
                return <OrderHistory orders={orders} isLoading={isLoading} />
            case 'payments':
                return <PaymentMethods isLoading={isLoading} />
            case 'preferences':
                return <Preferences isLoading={isLoading} />
            case 'support':
                return <SupportSection isLoading={isLoading} />
            case 'wallet':
                return (
                    <WalletSection
                        balance={150}
                        rewardPoints={1250}
                        referralCode="FRESH100"
                        referralEarnings={500}
                        totalReferrals={5}
                        isLoading={isLoading}
                    />
                )
            default:
                return (
                    <PersonalInfo
                        data={{
                            fullName: userData?.name || '',
                            email: userData?.email || '',
                            phone: userData?.phone || '',
                        }}
                        isLoading={isLoading}
                        isEmailVerified={userData?.isVerified}
                        onSave={handleSavePersonalInfo}
                    />
                )
        }
    }

    const sectionTitles: Record<string, string> = {
        profile: 'Personal Information',
        security: 'Security & Privacy',
        subscription: 'Subscription & Plans',
        orders: 'Order History',
        payments: 'Payment Methods',
        preferences: 'Preferences & Settings',
        support: 'Help & Support',
        wallet: 'Wallet & Rewards',
    }

    return (
        <div className="min-h-[80vh]">
            {/* Header */}
            <ProfileHeader
                user={userData}
                isLoading={isLoading}
                onEditProfile={() => router.push('/dashboard/profile?section=profile')}
            />

            {/* Section Title */}
            <div className="mt-8 mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                    {sectionTitles[activeSection] || 'Profile'}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage your {activeSection} settings
                </p>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="animate-pulse bg-gray-100 h-96 rounded-3xl" />}>
            <ProfileContent />
        </Suspense>
    )
}
