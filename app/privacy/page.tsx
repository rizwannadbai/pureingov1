import { Header, Footer } from "@/components/layout"
import { Shield, Mail } from "lucide-react"

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-fresh-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground">Last updated: January 15, 2026</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="prose prose-lg max-w-none">
                            <h2>1. Introduction</h2>
                            <p>
                                At Pureingo, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                            </p>

                            <h2>2. Information We Collect</h2>
                            <h3>Personal Information</h3>
                            <p>We may collect personal information that you voluntarily provide, including:</p>
                            <ul>
                                <li>Name and contact information (email, phone number)</li>
                                <li>Delivery address</li>
                                <li>Payment information</li>
                                <li>Account credentials</li>
                                <li>Order history and preferences</li>
                            </ul>

                            <h3>Automatically Collected Information</h3>
                            <p>When you visit our website, we may automatically collect:</p>
                            <ul>
                                <li>Device information (browser type, operating system)</li>
                                <li>IP address and location data</li>
                                <li>Usage data and browsing patterns</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>

                            <h2>3. How We Use Your Information</h2>
                            <p>We use the collected information to:</p>
                            <ul>
                                <li>Process and deliver your orders</li>
                                <li>Send order confirmations and updates</li>
                                <li>Provide customer support</li>
                                <li>Improve our products and services</li>
                                <li>Send promotional communications (with your consent)</li>
                                <li>Prevent fraud and ensure security</li>
                            </ul>

                            <h2>4. Information Sharing</h2>
                            <p>We may share your information with:</p>
                            <ul>
                                <li>Delivery partners (to fulfill orders)</li>
                                <li>Payment processors (to process transactions)</li>
                                <li>Analytics providers (to improve our services)</li>
                                <li>Legal authorities (when required by law)</li>
                            </ul>
                            <p>We never sell your personal information to third parties.</p>

                            <h2>5. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
                            </p>

                            <h2>6. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access your personal data</li>
                                <li>Correct inaccurate information</li>
                                <li>Delete your account and data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Export your data</li>
                            </ul>

                            <h2>7. Cookies</h2>
                            <p>
                                We use cookies to enhance your browsing experience, analyze traffic, and personalize content. You can manage cookie preferences through your browser settings.
                            </p>

                            <h2>8. Children's Privacy</h2>
                            <p>
                                Our services are not intended for children under 13. We do not knowingly collect information from children.
                            </p>

                            <h2>9. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or website notification.
                            </p>

                            <h2>10. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="bg-fresh-50 p-6 rounded-xl not-prose flex items-center gap-4">
                                <Mail className="w-6 h-6 text-fresh-600" />
                                <div>
                                    <p className="font-semibold text-foreground">privacy@pureingo.com</p>
                                    <p className="text-sm text-muted-foreground">We'll respond within 48 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
