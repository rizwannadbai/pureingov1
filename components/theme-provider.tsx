"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    resolvedTheme: "light" | "dark"
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<Theme>("light")
    const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const stored = localStorage.getItem("theme") as Theme | null
        if (stored) {
            setTheme(stored)
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("system")
        }
    }, [])

    React.useEffect(() => {
        if (!mounted) return

        const root = document.documentElement
        let resolved: "light" | "dark" = "light"

        if (theme === "system") {
            resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        } else {
            resolved = theme
        }

        root.classList.remove("light", "dark")
        root.classList.add(resolved)
        setResolvedTheme(resolved)
        localStorage.setItem("theme", theme)
    }, [theme, mounted])

    // Listen for system theme changes
    React.useEffect(() => {
        if (theme !== "system") return

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = (e: MediaQueryListEvent) => {
            setResolvedTheme(e.matches ? "dark" : "light")
            document.documentElement.classList.remove("light", "dark")
            document.documentElement.classList.add(e.matches ? "dark" : "light")
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme])

    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = React.useContext(ThemeContext)
    // Return default values if not within ThemeProvider (during SSR or initial render)
    if (context === undefined) {
        return {
            theme: "light" as Theme,
            setTheme: () => { },
            resolvedTheme: "light" as "light" | "dark"
        }
    }
    return context
}

export function ThemeToggle({ className }: { className?: string }) {
    const [mounted, setMounted] = React.useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    // Avoid hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div className={`p-2 w-9 h-9 ${className}`} />
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        >
            <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute top-2 left-2 w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
        </button>
    )
}
