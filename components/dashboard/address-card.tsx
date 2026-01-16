"use client"

import { motion } from "framer-motion"
import { MapPin, Pencil, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Address } from "@/types"

interface AddressCardProps {
    address: Address
    onEdit?: (address: Address) => void
    onDelete?: (id: string) => void
    onSetDefault?: (id: string) => void
}

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-5 border border-fresh-100 hover:border-fresh-200 transition-all"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-fresh-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-fresh-600" />
                    </div>
                    {address.is_default && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-fresh-100 text-fresh-700">
                            <Star className="w-3 h-3 fill-current" />
                            Default
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {onEdit && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => onEdit(address)}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => onDelete(address.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="space-y-1 mb-4">
                <p className="text-foreground font-medium">{address.full_address}</p>
                {address.landmark && (
                    <p className="text-sm text-muted-foreground">Landmark: {address.landmark}</p>
                )}
                <p className="text-sm text-muted-foreground">
                    {address.city} - {address.pincode}
                </p>
            </div>

            {!address.is_default && onSetDefault && (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onSetDefault(address.id)}
                >
                    Set as Default
                </Button>
            )}
        </motion.div>
    )
}
