"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MapPin, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddressCard } from "@/components/dashboard"
import { useAddressStore } from "@/store/address-store"
import type { Address } from "@/types"
import { toast } from "sonner"

export default function AddressesPage() {
    // Use Zustand store directly - this will auto-update when store changes
    const addresses = useAddressStore((state) => state.addresses)
    const addAddress = useAddressStore((state) => state.addAddress)
    const updateAddress = useAddressStore((state) => state.updateAddress)
    const removeAddress = useAddressStore((state) => state.removeAddress)
    const setDefaultAddress = useAddressStore((state) => state.setDefaultAddress)

    const [showForm, setShowForm] = useState(false)
    const [editingAddress, setEditingAddress] = useState<Address | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        full_address: "",
        city: "",
        pincode: "",
        landmark: "",
    })

    const resetForm = () => {
        setFormData({
            full_address: "",
            city: "",
            pincode: "",
            landmark: "",
        })
        setEditingAddress(null)
        setShowForm(false)
    }

    const handleEdit = (address: Address) => {
        setEditingAddress(address)
        setFormData({
            full_address: address.full_address,
            city: address.city,
            pincode: address.pincode,
            landmark: address.landmark || "",
        })
        setShowForm(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (editingAddress) {
            updateAddress(editingAddress.id, formData)
            toast.success("Address updated!")
        } else {
            addAddress({
                user_id: 'local-user',
                ...formData,
                is_default: addresses.length === 0,
            })
            toast.success("Address added!")
        }

        resetForm()
        setIsLoading(false)
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this address?")) {
            removeAddress(id)
            toast.success("Address deleted")
        }
    }

    const handleSetDefault = (id: string) => {
        setDefaultAddress(id)
        toast.success("Default address updated")
    }

    return (
        <div className="max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between mb-8"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Saved Addresses
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your delivery addresses for faster checkout.
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                        💾 Addresses saved to your browser
                    </p>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add New
                    </Button>
                )}
            </motion.div>

            {/* Add/Edit Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 overflow-hidden"
                    >
                        <div className="bg-white rounded-2xl border border-fresh-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-fresh-100 rounded-xl flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-fresh-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-foreground">
                                        {editingAddress ? "Edit Address" : "Add New Address"}
                                    </h2>
                                </div>
                                <button
                                    onClick={resetForm}
                                    className="p-2 hover:bg-fresh-50 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Full Address *
                                    </label>
                                    <Input
                                        value={formData.full_address}
                                        onChange={(e) => setFormData({ ...formData, full_address: e.target.value })}
                                        placeholder="House/Flat No., Building, Street"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            City *
                                        </label>
                                        <Input
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Pincode *
                                        </label>
                                        <Input
                                            value={formData.pincode}
                                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                                            placeholder="6-digit pincode"
                                            required
                                            maxLength={6}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Landmark (Optional)
                                    </label>
                                    <Input
                                        value={formData.landmark}
                                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                        placeholder="Near metro station, opposite mall, etc."
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <Button type="submit" className="gap-2" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editingAddress ? "Update Address" : "Save Address"
                                        )}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Address List */}
            {addresses.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-fresh-100 p-12 text-center"
                >
                    <div className="w-16 h-16 bg-fresh-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-fresh-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No addresses saved</h3>
                    <p className="text-muted-foreground mb-6">
                        Add your first delivery address to get started.
                    </p>
                    <Button onClick={() => setShowForm(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Address
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetDefault={handleSetDefault}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    )
}
