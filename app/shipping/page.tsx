import { Header, Footer } from "@/components/layout"
import { Truck, Clock, MapPin, Package, CheckCircle, AlertCircle } from "lucide-react"

const deliveryZones = [
    { city: "Mumbai", time: "6 AM - 9 AM", fee: "Free above ₹499" },
    { city: "Pune", time: "6 AM - 9 AM", fee: "Free above ₹499" },
    { city: "Bangalore", time: "7 AM - 10 AM", fee: "Free above ₹599" },
    { city: "Delhi NCR", time: "7 AM - 10 AM", fee: "Free above ₹599" },
    { city: "Hyderabad", time: "7 AM - 10 AM", fee: "Free above ₹599" },
]

const features = [
    { icon: Clock, title: "Early Morning Delivery", description: "All orders delivered between 6-9 AM so you start your day fresh" },
    { icon: Package, title: "Eco-Friendly Packaging", description: "All products packed in sustainable, recyclable materials" },
    { icon: MapPin, title: "Real-Time Tracking", description: "Track your delivery in real-time from our app" },
    { icon: CheckCircle, title: "Contactless Delivery", description: "Safe, hygienic delivery at your doorstep" },
]

export default function ShippingPage() {
    return (
        <>
            <Header />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-fresh-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Truck className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Shipping & Delivery</h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            We deliver fresh produce to your doorstep every morning. Here's everything you need to know about our delivery process.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature) => (
                                <div key={feature.title} className="p-6 bg-fresh-50 rounded-2xl text-center">
                                    <div className="w-12 h-12 bg-fresh-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Delivery Zones */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center mb-10">Delivery Zones & Timings</h2>
                        <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden border border-gray-100">
                            <table className="w-full">
                                <thead className="bg-fresh-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-foreground">City</th>
                                        <th className="text-left p-4 font-semibold text-foreground">Delivery Time</th>
                                        <th className="text-left p-4 font-semibold text-foreground">Delivery Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveryZones.map((zone) => (
                                        <tr key={zone.city} className="border-t border-gray-100">
                                            <td className="p-4 font-medium">{zone.city}</td>
                                            <td className="p-4 text-muted-foreground">{zone.time}</td>
                                            <td className="p-4 text-fresh-600">{zone.fee}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            * For orders below the free delivery threshold, a flat ₹29 delivery fee applies
                        </p>
                    </div>
                </section>

                {/* Important Notes */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-2xl font-bold text-center mb-10">Important Information</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-5 bg-fresh-50 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-fresh-600 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Order Cutoff Time</h3>
                                    <p className="text-sm text-muted-foreground">Orders placed before 8 PM are delivered the next morning. Orders after 8 PM are delivered the following day.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-5 bg-fresh-50 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-fresh-600 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Safe Drop Option</h3>
                                    <p className="text-sm text-muted-foreground">If you're not available, you can add delivery instructions for safe drop at a preferred location.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-5 bg-yellow-50 rounded-xl">
                                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Weather Delays</h3>
                                    <p className="text-sm text-muted-foreground">During heavy rain or extreme weather, deliveries may be delayed. We'll notify you in advance.</p>
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
