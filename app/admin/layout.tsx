"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard, Package, Users, Truck, Settings, LogOut,
    Menu, X, Bell, Search, ChevronRight, Leaf, BarChart3, CreditCard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { toast } from "sonner"

interface AdminLayoutProps {
    children: React.ReactNode
}

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: Package, label: "Orders" },
    { href: "/admin/customers", icon: Users, label: "Customers" },
    { href: "/admin/delivery", icon: Truck, label: "Delivery Partners" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/admin/payments", icon: CreditCard, label: "Payments" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
]

function AdminLayoutContent({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, role')
                    .eq('id', user.id)
                    .single()

                // Check if user is admin
                if (profile?.role !== 'admin') {
                    toast.error("Access denied. Admin privileges required.")
                    router.push('/')
                    return
                }

                setUser({
                    name: profile?.full_name || user.email,
                    email: user.email,
                    role: profile?.role || 'user',
                    initials: (profile?.full_name || user.email || 'A').slice(0, 2).toUpperCase()
                })
            } else {
                router.push('/login')
            }
        }
        getUser()
    }, [supabase, router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        toast.success('Logged out successfully')
        router.push('/')
    }

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href
        return pathname?.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-lg flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-fresh-600">Admin</span>
                    </div>
                    <button className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
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
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 z-50 shadow-2xl flex flex-col"
                        >
                            <SidebarContent
                                navItems={navItems}
                                isActive={isActive}
                                user={user}
                                onLogout={handleLogout}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 overflow-hidden">
                    <SidebarContent
                        navItems={navItems}
                        isActive={isActive}
                        user={user}
                        onLogout={handleLogout}
                    />
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ml-64 min-h-screen">
                    {/* Desktop Header */}
                    <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-30">
                        <div className="flex items-center gap-4 flex-1 max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search orders, customers..."
                                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 text-sm focus:ring-2 focus:ring-fresh-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
                            </button>
                            {user && (
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {user.initials}
                                    </div>
                                </div>
                            )}
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

interface SidebarContentProps {
    navItems: typeof navItems
    isActive: (href: string, exact?: boolean) => boolean
    user: any
    onLogout: () => void
}

function SidebarContent({ navItems, isActive, user, onLogout }: SidebarContentProps) {
    return (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-lg font-bold">
                            <span className="text-fresh-600">Pureingo</span>
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href, item.exact)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                                ? "bg-fresh-50 dark:bg-fresh-900/30 text-fresh-600"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                            {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </Link>
                    )
                })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                {user && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                )}
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2 text-gray-600 dark:text-gray-400"
                    onClick={onLogout}
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </>
    )
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900" />}>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </Suspense>
    )
}
