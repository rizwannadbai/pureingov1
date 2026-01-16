"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Menu, X, ShoppingCart, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarNav } from "@/components/dashboard"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DashboardLayoutProps {
    children: React.ReactNode
}

function DashboardContent({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('name, avatar_url')
                    .eq('id', user.id)
                    .single()
                setUser({
                    name: profile?.name || user.user_metadata?.full_name || 'User',
                    email: user.email,
                    avatar: profile?.avatar_url,
                    initials: (profile?.name || user.email || 'U').slice(0, 2).toUpperCase()
                })
            }
        }
        getUser()
    }, [supabase])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        toast.success('Logged out successfully')
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fresh-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center shadow-lg shadow-fresh-500/20">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors relative">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        />
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col"
                        >
                            {/* Mobile Sidebar Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-11 h-11 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Leaf className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-xl font-bold">
                                            <span className="text-fresh-600">Pure</span>
                                            <span className="text-fresh-800">ingo</span>
                                        </span>
                                        <p className="text-xs text-muted-foreground">Fresh Produce Daily</p>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile User Info */}
                            {user && (
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-foreground truncate">{user.name}</p>
                                            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mobile Navigation */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                <SidebarNav onLogout={handleLogout} userName={user?.name} />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    {/* Sidebar Header */}
                    <div className="p-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center shadow-lg shadow-fresh-500/25">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-bold">
                                    <span className="text-fresh-600">Pure</span>
                                    <span className="text-fresh-800">ingo</span>
                                </span>
                                <p className="text-xs text-muted-foreground">Fresh Produce Daily</p>
                            </div>
                        </Link>
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className="px-4 pb-4">
                            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-fresh-50 to-emerald-50 rounded-2xl">
                                <div className="w-11 h-11 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                                    {user.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-foreground truncate text-sm">{user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex-1 px-3 overflow-y-auto">
                        <SidebarNav onLogout={handleLogout} userName={user?.name} />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ml-72 min-h-screen">
                    {/* Desktop Header */}
                    <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30">
                        <div className="flex items-center gap-4 flex-1 max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search products, orders..."
                                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100 border-0 text-sm focus:ring-2 focus:ring-fresh-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors relative">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                            </button>
                            <Button asChild>
                                <Link href="/cart" className="gap-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    Cart
                                </Link>
                            </Button>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="p-4 md:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <DashboardContent>{children}</DashboardContent>
        </Suspense>
    )
}
