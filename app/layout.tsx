import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { FloatingCartBar } from "@/components/cart/floating-cart-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { MobileNav } from "@/components/layout/mobile-nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pureingo - Fresh Fruits & Vegetables Delivered Daily",
  description: "Get farm-fresh fruits and vegetables delivered to your doorstep. 100% organic, same-day delivery, and quality guaranteed. Order now and taste the freshness!",
  keywords: ["fresh fruits", "vegetables", "organic", "delivery", "grocery", "farm fresh", "Mumbai"],
  authors: [{ name: "Pureingo" }],
  manifest: "/manifest.json",
  themeColor: "#22c55e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pureingo",
  },
  openGraph: {
    title: "Pureingo - Fresh Fruits & Vegetables Delivered Daily",
    description: "Get farm-fresh fruits and vegetables delivered to your doorstep. 100% organic, same-day delivery, and quality guaranteed.",
    type: "website",
    locale: "en_IN",
    siteName: "Pureingo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pureingo - Fresh Fruits & Vegetables",
    description: "Farm-fresh produce delivered to your doorstep. Order now!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50 dark:bg-gray-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-fresh-600 text-white px-4 py-2 rounded-lg z-50">
            Skip to main content
          </a>

          <main id="main-content" className="relative min-h-screen pb-16 lg:pb-0">
            {children}
            <FloatingCartBar />
            <ScrollToTop />
            <MobileNav />
          </main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
