import { Header, Footer } from "@/components/layout"
import { Cookie, Settings, BarChart, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const cookieTypes = [
    {
        icon: Shield,
        title: "Essential Cookies",
        description: "Required for the website to function properly. These cannot be disabled.",
        examples: ["Session management", "Authentication", "Security features"],
        required: true,
    },
    {
        icon: BarChart,
        title: "Analytics Cookies",
        description: "Help us understand how visitors interact with our website.",
        examples: ["Page views", "Traffic sources", "User behavior"],
        required: false,
    },
    {
        icon: Settings,
        title: "Preference Cookies",
        description: "Remember your settings and preferences for a better experience.",
        examples: ["Language preference", "Theme settings", "Recently viewed items"],
        required: false,
    },
]

export default function CookiesPage() {
    return (
        <>
            <Header />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-fresh-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Cookie className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
                        <p className="text-muted-foreground">Last updated: January 15, 2026</p>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="prose prose-lg max-w-none mb-12">
                            <h2>What Are Cookies?</h2>
                            <p>
                                Cookies are small text files stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and understanding how you use our website.
                            </p>
                        </div>

                        {/* Cookie Types */}
                        <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>
                        <div className="space-y-6 mb-12">
                            {cookieTypes.map((type) => (
                                <div key={type.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-fresh-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <type.icon className="w-6 h-6 text-fresh-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-foreground">{type.title}</h3>
                                                {type.required && (
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Required</span>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground mb-3">{type.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {type.examples.map((example) => (
                                                    <span key={example} className="text-xs bg-fresh-50 text-fresh-700 px-2 py-1 rounded-full">
                                                        {example}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <h2>Managing Cookies</h2>
                            <p>
                                You can control cookies through your browser settings. Most browsers allow you to:
                            </p>
                            <ul>
                                <li>View and delete cookies</li>
                                <li>Block third-party cookies</li>
                                <li>Block all cookies</li>
                                <li>Clear cookies when you close your browser</li>
                            </ul>
                            <p>
                                Please note that blocking essential cookies may prevent our website from functioning properly.
                            </p>

                            <h2>Third-Party Cookies</h2>
                            <p>
                                We may use third-party services that set their own cookies, including:
                            </p>
                            <ul>
                                <li>Google Analytics (for analytics)</li>
                                <li>Payment processors (for secure transactions)</li>
                                <li>Social media platforms (for sharing features)</li>
                            </ul>

                            <h2>Updates to This Policy</h2>
                            <p>
                                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                            </p>

                            <h2>Contact Us</h2>
                            <p>
                                If you have questions about our use of cookies, please contact us:
                            </p>
                        </div>

                        <div className="bg-fresh-50 p-6 rounded-xl flex items-center gap-4 mt-6">
                            <Mail className="w-6 h-6 text-fresh-600" />
                            <div>
                                <p className="font-semibold text-foreground">privacy@pureingo.com</p>
                                <p className="text-sm text-muted-foreground">We'll respond within 48 hours</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
