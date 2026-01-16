"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { useWishlistStore, WishlistItem } from "@/store/wishlist-store"
import { toast } from "sonner"
import { useState, useEffect } from "react"

interface WishlistButtonProps {
    product: WishlistItem
    className?: string
    size?: 'sm' | 'md' | 'lg'
}

export function WishlistButton({ product, className = "", size = "md" }: WishlistButtonProps) {
    const { addItem, removeItem, isInWishlist } = useWishlistStore()
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setIsWishlisted(isInWishlist(product.id))
    }, [isInWishlist, product.id])

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isWishlisted) {
            removeItem(product.id)
            setIsWishlisted(false)
            toast.success("Removed from wishlist")
        } else {
            addItem(product)
            setIsWishlisted(true)
            toast.success("Added to wishlist! ❤️")
        }
    }

    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
    }

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    }

    if (!mounted) {
        return (
            <div className={`${sizeClasses[size]} rounded-full bg-white/90 backdrop-blur-sm shadow-lg ${className}`} />
        )
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all shadow-lg ${isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-500"
                } ${className}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isWishlisted ? "filled" : "empty"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <Heart
                        className={iconSizes[size]}
                        fill={isWishlisted ? "currentColor" : "none"}
                    />
                </motion.div>
            </AnimatePresence>
        </motion.button>
    )
}
