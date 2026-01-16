import Link from "next/link"
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
    company: [
        { href: "/about", label: "About Us" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/contact", label: "Contact Us" },
        { href: "/careers", label: "Careers" },
    ],
    support: [
        { href: "/faq", label: "FAQ" },
        { href: "/shipping", label: "Shipping & Delivery" },
        { href: "/returns", label: "Returns & Refunds" },
        { href: "/track-order", label: "Track Order" },
    ],
    legal: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie Policy" },
    ],
}

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-fresh-50 to-fresh-100/50 dark:from-gray-900 dark:to-gray-800 border-t border-fresh-100 dark:border-gray-800">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center shadow-md">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="text-fresh-600">Pure</span>
                                <span className="text-fresh-800">ingo</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
                            Fresh fruits and vegetables delivered to your doorstep.
                            Experience farm-fresh produce with guaranteed quality and
                            freshness every time.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 text-fresh-600" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 text-fresh-600" />
                                <span>hello@pureingo.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-fresh-600" />
                                <span>Mumbai, Maharashtra, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-fresh-600 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    {'external' in link && link.external ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-fresh-600 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-fresh-600 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Links */}
                        <div className="mt-6">
                            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 border border-fresh-200 dark:border-gray-700 flex items-center justify-center text-muted-foreground hover:text-fresh-600 hover:border-fresh-400 transition-all"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 border border-fresh-200 dark:border-gray-700 flex items-center justify-center text-muted-foreground hover:text-fresh-600 hover:border-fresh-400 transition-all"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white border border-fresh-200 flex items-center justify-center text-muted-foreground hover:text-fresh-600 hover:border-fresh-400 transition-all"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-fresh-200/50" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© 2026 Pureingo. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <span className="text-red-500">♥</span> in India
                    </p>
                </div>
            </div>
        </footer>
    )
}
