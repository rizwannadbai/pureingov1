"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, User, Leaf, ShoppingCart, LogOut, LayoutDashboard, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartSheet } from "@/components/cart"
import { useCartStore } from "@/store"
import { useWishlistStore } from "@/store/wishlist-store"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-provider"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/contact", label: "Contact" },
]

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [user, setUser] = React.useState<any>(null)
    const [userName, setUserName] = React.useState<string>("")
    const [mounted, setMounted] = React.useState(false)
    const { getItemCount } = useCartStore()
    const { items: wishlistItems } = useWishlistStore()
    const cartCount = mounted ? getItemCount() : 0
    const wishlistCount = mounted ? wishlistItems.length : 0
    const supabase = createClient()
    const router = useRouter()

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)

        // Check auth status
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user) {
                // Fetch profile name
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('name')
                    .eq('id', user.id)
                    .single()
                setUserName(profile?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User')
            }
        }
        checkUser()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            subscription.unsubscribe()
        }
    }, [supabase.auth])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/")
    }

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-fresh-100 dark:border-gray-800"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex h-16 md:h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-fresh-300 rounded-full animate-pulse" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold">
                            <span className="text-fresh-600">Pure</span>
                            <span className="text-fresh-800">ingo</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-fresh-600 rounded-lg hover:bg-fresh-50 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Wishlist Button */}
                        <Link href="/dashboard/wishlist" className="relative p-2 rounded-lg hover:bg-fresh-50 dark:hover:bg-gray-800 transition-colors">
                            <Heart className="w-5 h-5 text-foreground/70 hover:text-red-500 transition-colors" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart Sheet with Badge */}
                        <div className="relative">
                            <CartSheet />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-fresh-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm pointer-events-none">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {/* Auth Buttons - Desktop */}
                        <div className="hidden md:flex items-center gap-2">
                            {user ? (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/dashboard" className="gap-2">
                                            <LayoutDashboard className="w-4 h-4" />
                                            {userName || 'Dashboard'}
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-red-500 gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/login">
                                            <User className="w-4 h-4 mr-1" />
                                            Login
                                        </Link>
                                    </Button>
                                    <Button size="sm" asChild>
                                        <Link href="/signup">Get Started</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" aria-label="Menu">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px]">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <Leaf className="w-5 h-5 text-fresh-600" />
                                        <span className="text-fresh-600">Pure</span>
                                        <span className="text-fresh-800 -ml-1">ingo</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-2 mt-8">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-fresh-600 rounded-lg hover:bg-fresh-50 transition-all duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <div className="border-t border-fresh-100 my-4" />

                                    <Button variant="outline" className="w-full mb-3 gap-2" asChild>
                                        <Link href="/cart">
                                            <ShoppingCart className="w-4 h-4" />
                                            Cart ({cartCount})
                                        </Link>
                                    </Button>

                                    {user ? (
                                        <>
                                            <Button variant="outline" className="w-full mb-3 gap-2" asChild>
                                                <Link href="/dashboard">
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    {userName || 'Dashboard'}
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" className="w-full text-red-500 gap-2" onClick={handleLogout}>
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="outline" className="w-full mb-3" asChild>
                                                <Link href="/login">Login</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href="/signup">Get Started</Link>
                                            </Button>
                                        </>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}
