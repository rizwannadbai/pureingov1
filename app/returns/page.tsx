import { Header, Footer } from "@/components/layout"
import { RotateCcw, CheckCircle, Clock, Package, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
    { step: 1, title: "Contact Us", description: "Reach out within 24 hours of delivery with your order details and photos if applicable" },
    { step: 2, title: "Quick Review", description: "Our team reviews your request within 2 hours during business hours" },
    { step: 3, title: "Resolution", description: "Get a full refund or replacement, whichever you prefer" },
]

const eligibleItems = [
    "Damaged or spoiled products",
    "Wrong items delivered",
    "Missing items from order",
    "Quality not as expected",
    "Quantity discrepancy",
]

const nonEligibleItems = [
    "Products not stored properly after delivery",
    "Returns requested after 24 hours",
    "Partially consumed products",
    "Products without proof of purchase",
]

export default function ReturnsPage() {
    return (
        <>
            <Header />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-fresh-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <RotateCcw className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Returns & Refunds</h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            We stand behind the quality of our products. If something's not right, we'll make it right.
                        </p>
                    </div>
                </section>

                {/* Return Process */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center mb-10">How Returns Work</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {steps.map((step, index) => (
                                <div key={step.step} className="text-center relative">
                                    <div className="w-14 h-14 bg-fresh-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                                        {step.step}
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                    {index < steps.length - 1 && (
                                        <ArrowRight className="hidden md:block absolute top-6 -right-4 w-8 h-8 text-gray-300" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Eligibility */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <h3 className="text-lg font-semibold text-foreground">Eligible for Returns</h3>
                                </div>
                                <ul className="space-y-3">
                                    {eligibleItems.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                                    <h3 className="text-lg font-semibold text-foreground">Not Eligible</h3>
                                </div>
                                <ul className="space-y-3">
                                    {nonEligibleItems.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Refund Timeline */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-2xl font-bold text-center mb-10">Refund Timeline</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-5 bg-fresh-50 rounded-xl">
                                <Clock className="w-6 h-6 text-fresh-600 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">UPI / Wallet Payments</h3>
                                    <p className="text-sm text-muted-foreground">Refunded within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-5 bg-fresh-50 rounded-xl">
                                <Clock className="w-6 h-6 text-fresh-600 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Credit / Debit Cards</h3>
                                    <p className="text-sm text-muted-foreground">Refunded within 5-7 business days</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-5 bg-fresh-50 rounded-xl">
                                <Package className="w-6 h-6 text-fresh-600 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Cash on Delivery</h3>
                                    <p className="text-sm text-muted-foreground">Credited to Pureingo Wallet instantly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-fresh-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Need to return something?</h2>
                        <p className="text-fresh-100 mb-6">Contact our support team and we'll help you right away</p>
                        <Button variant="secondary" size="lg" asChild>
                            <Link href="/contact">Contact Support</Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
