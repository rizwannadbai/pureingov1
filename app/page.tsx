import { Header, Footer } from "@/components/layout"
import { Hero } from "@/components/landing/hero"
import { Categories } from "@/components/landing/categories"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { CoconutPromo } from "@/components/landing/coconut-promo"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <CoconutPromo />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}


