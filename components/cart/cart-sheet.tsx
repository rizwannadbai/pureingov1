"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Sparkles, X, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { useCartStore } from "@/store"
import { toast } from "sonner"
import { allJuices, allSprouts, type Product } from "@/data/products"

// Duration options for add-ons
const durationOptions = [
    { id: 'trial', label: '1 Day Trial', days: 1, multiplier: 1, badge: 'Try First' },
    { id: '7days', label: '7 Days', days: 7, multiplier: 7, badge: null },
    { id: '15days', label: '15 Days', days: 15, multiplier: 15, badge: 'Popular' },
    { id: '1month', label: '1 Month', days: 30, multiplier: 30, badge: 'Best Value' },
]

// Suggested add-ons to show when fruit box is in cart
const suggestedAddons: Product[] = [
    allJuices[0],  // Apple Juice
    allJuices[1],  // Orange Juice
    allJuices[6],  // Beetroot Juice
    allSprouts[0], // Moong Sprouts
    allSprouts[4], // Classic Mixed Sprouts
].filter(Boolean)

export function CartSheet() {
    const { items, updateQuantity, removeItem, addItem, getTotal, getItemCount, clearCart, isOpen, openCart, closeCart, updateDuration } = useCartStore()
    const [mounted, setMounted] = useState(false)
    const [selectedAddon, setSelectedAddon] = useState<Product | null>(null)
    const [showDurationDialog, setShowDurationDialog] = useState(false)


    useEffect(() => {
        setMounted(true)
    }, [])

    const itemCount = getItemCount()
    const total = getTotal()

    // Check if cart has a fruit box (main product)
    const hasFruitBox = useMemo(() => {
        return items.some(item => item.id.startsWith('box-'))
    }, [items])

    // Filter out add-ons already in cart
    const availableAddons = useMemo(() => {
        const cartIds = items.map(i => i.id.split('-duration-')[0]) // Handle duration variants
        return suggestedAddons.filter(addon => !cartIds.includes(addon.id)).slice(0, 3)
    }, [items])

    if (!mounted) return null

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const handleSelectAddon = (addon: Product) => {
        setSelectedAddon(addon)
        setShowDurationDialog(true)
    }

    const handleAddWithDuration = (duration: typeof durationOptions[0]) => {
        if (!selectedAddon) return

        const totalPrice = selectedAddon.price * duration.multiplier

        addItem({
            id: `${selectedAddon.id}-duration-${duration.id}`,
            name: `${selectedAddon.name} (${duration.label})`,
            price: totalPrice,
            unit: duration.label,
            image: selectedAddon.image
        })

        toast.success(`${selectedAddon.name} for ${duration.label} added!`)
        setShowDurationDialog(false)
        setSelectedAddon(null)
    }

    const getItemEmoji = (name: string) => {
        if (name.includes('Daily') || name.includes('Fruit Box')) return '🍎'
        if (name.includes('Couple')) return '🍊'
        if (name.includes('Family')) return '🍇'
        if (name.includes('Apple')) return '🍎'
        if (name.includes('Orange')) return '🍊'
        if (name.includes('Pomegranate')) return '🍒'
        if (name.includes('Beetroot')) return '🥤'
        if (name.includes('Carrot')) return '🥕'
        if (name.includes('Sprout') || name.includes('Moong')) return '🌱'
        if (name.includes('Juice')) return '🧃'
        return '🥦'
    }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        aria-label="Shopping Cart"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-fresh-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {itemCount > 99 ? '99+' : itemCount}
                            </span>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-fresh-600" />
                            Your Cart
                            {itemCount > 0 && (
                                <span className="text-sm font-normal text-muted-foreground">
                                    ({itemCount} item{itemCount !== 1 ? 's' : ''})
                                </span>
                            )}
                        </SheetTitle>
                    </SheetHeader>

                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 rounded-full bg-fresh-100 flex items-center justify-center mb-4">
                                <ShoppingBag className="w-10 h-10 text-fresh-400" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Your cart is empty</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Add some fresh produce to get started!
                            </p>
                            <Button asChild>
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-3 rounded-xl bg-fresh-50/50 border border-fresh-100"
                                        >
                                            {/* Item Image Placeholder */}
                                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-fresh-100 to-fresh-200 flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">{getItemEmoji(item.name)}</span>
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-foreground text-sm truncate">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatPrice(item.price)} / {item.unit}
                                                </p>

                                                <div className="flex items-center justify-between mt-2">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-1 bg-white rounded-lg border border-fresh-200">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1.5 text-fresh-600 hover:bg-fresh-50 rounded-l-lg transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1.5 text-fresh-600 hover:bg-fresh-50 rounded-r-lg transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    {/* Item Total */}
                                                    <span className="text-sm font-semibold text-fresh-600">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </span>
                                                </div>

                                                {/* Duration Selector */}
                                                <div className="mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">Duration:</span>
                                                    </div>
                                                    <div className="flex gap-1 mt-1">
                                                        {[
                                                            { id: 'day', label: '1 Day', days: 1 },
                                                            { id: 'week', label: '1 Week', days: 7 },
                                                            { id: 'month', label: '1 Month', days: 30 },
                                                        ].map((opt) => (
                                                            <button
                                                                key={opt.id}
                                                                onClick={() => updateDuration(item.id, opt.id)}
                                                                className={`px-2 py-1 text-xs rounded-md transition-all ${item.duration === opt.id || (!item.duration && opt.id === 'day')
                                                                    ? 'bg-fresh-500 text-white font-medium'
                                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                                    }`}
                                                            >
                                                                {opt.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors self-start"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* ============================================ */}
                                {/* ADD-ON SUGGESTIONS (when fruit box in cart) */}
                                {/* ============================================ */}
                                {hasFruitBox && availableAddons.length > 0 && (
                                    <div className="mt-6 pt-4 border-t border-dashed border-fresh-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Gift className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm font-semibold text-foreground">
                                                Enhance Your Subscription
                                            </span>
                                            <Sparkles className="w-3 h-3 text-yellow-500" />
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            Add fresh juices or sprouts to your daily delivery
                                        </p>
                                        <div className="space-y-2">
                                            {availableAddons.map((addon) => (
                                                <div
                                                    key={addon.id}
                                                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg flex-shrink-0">
                                                        {getItemEmoji(addon.name)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-foreground truncate">
                                                            {addon.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            From {formatPrice(addon.price)}/day
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-7 px-2 text-xs border-purple-200 hover:bg-purple-100 hover:text-purple-700"
                                                        onClick={() => handleSelectAddon(addon)}
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        Add
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Link
                                            href="/products"
                                            className="block mt-3 text-xs text-center text-purple-600 hover:text-purple-700 font-medium"
                                        >
                                            View all add-ons →
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Cart Summary & Checkout */}
                            <SheetFooter className="flex-col gap-4 pt-4">
                                {/* Subtotal */}
                                <div className="w-full space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Delivery</span>
                                        <span className="font-medium text-fresh-600">
                                            {total >= 299 ? 'Free' : formatPrice(40)}
                                        </span>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Total</span>
                                        <span className="text-xl font-bold text-fresh-600">
                                            {formatPrice(total < 299 ? total + 40 : total)}
                                        </span>
                                    </div>
                                    {total < 299 && (
                                        <p className="text-xs text-muted-foreground text-center">
                                            Add {formatPrice(299 - total)} more for free delivery!
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="w-full flex flex-col gap-2">
                                    <Button className="w-full gap-2" size="lg" asChild>
                                        <Link href="/checkout">
                                            Checkout
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearCart}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            {/* ============================================ */}
            {/* DURATION SELECTION DIALOG */}
            {/* ============================================ */}
            <Dialog open={showDurationDialog} onOpenChange={setShowDurationDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-fresh-600" />
                            Choose Duration
                        </DialogTitle>
                        <DialogDescription>
                            How long would you like to add {selectedAddon?.name} to your subscription?
                        </DialogDescription>
                    </DialogHeader>

                    {selectedAddon && (
                        <div className="py-4">
                            {/* Selected Product */}
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-fresh-50 border border-fresh-100 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl">
                                    {getItemEmoji(selectedAddon.name)}
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{selectedAddon.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatPrice(selectedAddon.price)} per day
                                    </p>
                                </div>
                            </div>

                            {/* Duration Options */}
                            <div className="space-y-2">
                                {durationOptions.map((duration) => {
                                    const totalPrice = selectedAddon.price * duration.multiplier
                                    return (
                                        <button
                                            key={duration.id}
                                            onClick={() => handleAddWithDuration(duration)}
                                            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-fresh-400 hover:bg-fresh-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-fresh-100 flex items-center justify-center transition-colors">
                                                    <span className="text-sm font-bold text-gray-600 group-hover:text-fresh-600">
                                                        {duration.days}
                                                    </span>
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium text-foreground flex items-center gap-2">
                                                        {duration.label}
                                                        {duration.badge && (
                                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${duration.badge === 'Best Value'
                                                                ? 'bg-green-100 text-green-700'
                                                                : duration.badge === 'Popular'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : 'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                {duration.badge}
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {duration.days} day{duration.days > 1 ? 's' : ''} of fresh {selectedAddon.name.toLowerCase().includes('sprout') ? 'sprouts' : 'juice'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-fresh-600">{formatPrice(totalPrice)}</p>
                                                <p className="text-[10px] text-muted-foreground">
                                                    {formatPrice(selectedAddon.price)}/day
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
