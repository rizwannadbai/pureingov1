import { Header, Footer } from "@/components/layout"
import { Briefcase, MapPin, Clock, Users, Leaf, ArrowRight, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const jobs = [
    {
        title: "Delivery Partner",
        location: "Mumbai, Pune, Bangalore",
        type: "Full-time",
        department: "Operations",
        description: "Join our delivery team and help bring fresh produce to thousands of happy customers every day.",
    },
    {
        title: "Full Stack Developer",
        location: "Remote / Mumbai",
        type: "Full-time",
        department: "Engineering",
        description: "Build the technology that powers our platform and helps us scale to new heights.",
    },
    {
        title: "Quality Control Specialist",
        location: "Mumbai",
        type: "Full-time",
        department: "Operations",
        description: "Ensure every fruit and vegetable meets our strict quality standards before delivery.",
    },
    {
        title: "Customer Support Executive",
        location: "Remote",
        type: "Full-time",
        department: "Support",
        description: "Help our customers with their queries and ensure they have the best experience.",
    },
]

const values = [
    { icon: Leaf, title: "Freshness First", description: "We never compromise on quality" },
    { icon: Heart, title: "Customer Love", description: "Our customers are our priority" },
    { icon: Users, title: "Team Spirit", description: "We grow together as a family" },
    { icon: Sparkles, title: "Innovation", description: "We constantly improve and evolve" },
]

export default function CareersPage() {
    return (
        <>
            <Header />
            <main className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-br from-fresh-50 to-emerald-50 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <span className="inline-block px-4 py-1.5 bg-fresh-100 text-fresh-700 rounded-full text-sm font-medium mb-4">
                            Join Our Team
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Grow Your Career at{" "}
                            <span className="text-fresh-600">Pureingo</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Be part of a mission to deliver fresh, healthy produce to millions of households across India.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {values.map((value) => (
                                <div key={value.title} className="text-center p-6 bg-fresh-50 rounded-2xl">
                                    <div className="w-14 h-14 bg-fresh-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center mb-10">Open Positions</h2>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {jobs.map((job) => (
                                <div key={job.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">{job.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                                            <div className="flex flex-wrap gap-3 text-sm">
                                                <span className="flex items-center gap-1 text-muted-foreground">
                                                    <MapPin className="w-4 h-4" /> {job.location}
                                                </span>
                                                <span className="flex items-center gap-1 text-muted-foreground">
                                                    <Clock className="w-4 h-4" /> {job.type}
                                                </span>
                                                <span className="flex items-center gap-1 text-muted-foreground">
                                                    <Briefcase className="w-4 h-4" /> {job.department}
                                                </span>
                                            </div>
                                        </div>
                                        <Button className="gap-2 whitespace-nowrap">
                                            Apply Now <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-fresh-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">Don't see a role for you?</h2>
                        <p className="text-fresh-100 mb-6">Send us your resume and we'll keep you in mind for future opportunities.</p>
                        <Button variant="secondary" size="lg" asChild>
                            <Link href="mailto:careers@pureingo.com">Send Resume</Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
