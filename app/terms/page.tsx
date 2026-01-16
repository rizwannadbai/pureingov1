import { Header, Footer } from "@/components/layout"
import { FileText, Mail } from "lucide-react"

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-fresh-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
                        <p className="text-muted-foreground">Last updated: January 15, 2026</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="prose prose-lg max-w-none">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using Pureingo's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>

                            <h2>2. Services Description</h2>
                            <p>
                                Pureingo provides an online platform for ordering fresh fruits, vegetables, and related products for home delivery. We source products from trusted farms and suppliers to ensure quality and freshness.
                            </p>

                            <h2>3. Account Registration</h2>
                            <p>To use our services, you must:</p>
                            <ul>
                                <li>Be at least 18 years of age</li>
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Notify us immediately of any unauthorized access</li>
                            </ul>

                            <h2>4. Orders and Payments</h2>
                            <ul>
                                <li>All prices are listed in Indian Rupees (INR) and include applicable taxes</li>
                                <li>We reserve the right to modify prices without prior notice</li>
                                <li>Orders are subject to product availability</li>
                                <li>Payment must be made at the time of order or upon delivery (COD)</li>
                                <li>We accept major credit/debit cards, UPI, and net banking</li>
                            </ul>

                            <h2>5. Delivery</h2>
                            <ul>
                                <li>Delivery is available in select cities and pin codes</li>
                                <li>Delivery times are estimates and may vary</li>
                                <li>We are not liable for delays due to unforeseen circumstances</li>
                                <li>You must ensure someone is available to receive the delivery</li>
                            </ul>

                            <h2>6. Returns and Refunds</h2>
                            <p>
                                We want you to be completely satisfied with your purchase. Our return policy allows:
                            </p>
                            <ul>
                                <li>Returns within 24 hours of delivery for quality issues</li>
                                <li>Full refund or replacement for damaged/wrong items</li>
                                <li>Refunds processed within 5-7 business days</li>
                            </ul>

                            <h2>7. Product Quality</h2>
                            <p>
                                We guarantee the freshness and quality of our products at the time of delivery. However, fresh produce is perishable and must be stored properly after delivery. We are not responsible for quality deterioration due to improper storage.
                            </p>

                            <h2>8. User Conduct</h2>
                            <p>You agree not to:</p>
                            <ul>
                                <li>Use the service for any unlawful purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Interfere with or disrupt the service</li>
                                <li>Submit false or misleading information</li>
                                <li>Violate any applicable laws or regulations</li>
                            </ul>

                            <h2>9. Intellectual Property</h2>
                            <p>
                                All content on our website, including logos, images, and text, is the property of Pureingo and protected by intellectual property laws. You may not use, reproduce, or distribute any content without our written permission.
                            </p>

                            <h2>10. Limitation of Liability</h2>
                            <p>
                                Pureingo shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific order in question.
                            </p>

                            <h2>11. Modifications</h2>
                            <p>
                                We reserve the right to modify these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
                            </p>

                            <h2>12. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai.
                            </p>

                            <h2>13. Contact</h2>
                            <p>For questions about these Terms, contact us:</p>
                            <div className="bg-fresh-50 p-6 rounded-xl not-prose flex items-center gap-4">
                                <Mail className="w-6 h-6 text-fresh-600" />
                                <div>
                                    <p className="font-semibold text-foreground">legal@pureingo.com</p>
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
