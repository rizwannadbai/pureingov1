"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, ArrowRight, Leaf, Loader2, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase"
import { toast } from "sonner"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [step, setStep] = useState<"email" | "verify">("email")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const supabase = createClient()
    const router = useRouter()

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email) {
            setError("Please enter your email")
            return
        }

        setIsLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
            }
        })

        if (error) {
            setError(error.message === "Signups not allowed for otp" ? "Account not found. Please sign up first." : error.message)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        setStep("verify")
        toast.success("OTP sent to your email")
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (otp.length !== 6) {
            setError("Please enter the 6-digit code")
            return
        }

        setIsLoading(true)
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email'
        })

        if (error) {
            setError(error.message)
            setIsLoading(false)
            return
        }

        toast.success("Logged in successfully")
        router.refresh()
        router.push('/') // Redirect to home or dashboard
    }

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            }
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-fresh-50 via-white to-fresh-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            {/* Background Decorations */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-fresh-200/30 dark:bg-fresh-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-fresh-300/20 dark:bg-fresh-500/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Leaf className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold">
                        <span className="text-fresh-600">Pure</span>
                        <span className="text-fresh-800 dark:text-fresh-300">ingo</span>
                    </span>
                </Link>

                {/* Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-fresh-100 dark:border-gray-700 p-8">
                    {step === "verify" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-fresh-100 flex items-center justify-center mx-auto mb-6">
                                <MailCheck className="w-8 h-8 text-fresh-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h1>
                            <p className="text-muted-foreground mb-6">
                                Enter the 6-digit code sent to<br />
                                <span className="font-medium text-foreground">{email}</span>
                            </p>

                            <form onSubmit={handleVerifyOtp} className="space-y-6">
                                <div className="flex justify-center">
                                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>

                                {error && <p className="text-sm text-destructive">{error}</p>}

                                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            Verifying...
                                        </>
                                    ) : (
                                        "Verify & Login"
                                    )}
                                </Button>
                            </form>

                            <button
                                onClick={() => setStep("email")}
                                className="text-sm text-muted-foreground hover:text-fresh-600 transition-colors mt-6"
                            >
                                ← Use a different email
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-foreground mb-2">
                                    Welcome Back!
                                </h1>
                                <p className="text-muted-foreground">
                                    Sign in or Sign up with OTP
                                </p>
                            </div>

                            <form onSubmit={handleSendOtp} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-11"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-sm text-destructive">{error}</p>
                                )}

                                <Button type="submit" className="w-full gap-2" size="lg" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending OTP...
                                        </>
                                    ) : (
                                        <>
                                            Send Code
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="relative my-6">
                                <Separator />
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 text-sm text-muted-foreground">
                                    or continue with
                                </span>
                            </div>

                            {/* Google Login */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full gap-3 h-11"
                                size="lg"
                                onClick={handleGoogleLogin}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </Button>

                            <p className="text-center text-sm text-muted-foreground mt-6">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="text-fresh-600 hover:text-fresh-700 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-fresh-600">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-fresh-600">
                        Privacy Policy
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
