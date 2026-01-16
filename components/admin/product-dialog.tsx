"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { Product } from "@/lib/products"

interface ProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product?: Product | null
    onSuccess: () => void
}

export function ProductDialog({ open, onOpenChange, product, onSuccess }: ProductDialogProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<Product>>(product || {
        name: '',
        category: 'fresh-juices',
        type: 'single',
        description: '',
        price: 0,
        unit: 'glass',
        image: '',
        in_stock: true,
    })

    const supabase = createClient()

    const handleSave = async () => {
        setLoading(true)

        try {
            // Generate ID if creating new product
            const id = product?.id || formData.name?.toLowerCase().replace(/\s+/g, '-') || ''

            const productData = {
                id,
                name: formData.name,
                category: formData.category,
                type: formData.type,
                description: formData.description,
                price: Number(formData.price),
                unit: formData.unit,
                image: formData.image,
                in_stock: formData.in_stock ?? true,
            }

            if (product) {
                // Update existing
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', product.id)

                if (error) throw error
                toast.success('Product updated successfully!')
            } else {
                // Insert new
                const { error } = await supabase
                    .from('products')
                    .insert(productData)

                if (error) throw error
                toast.success('Product added successfully!')
            }

            onSuccess()
            onOpenChange(false)
        } catch (error: any) {
            console.error('Error saving product:', error)
            toast.error(error.message || 'Failed to save product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        {product ? 'Update product information' : 'Create a new product in the catalog'}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Apple Juice"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fresh-juices">Fresh Juices</SelectItem>
                                    <SelectItem value="juice-packages">Juice Packages</SelectItem>
                                    <SelectItem value="fresh-fruit-boxes">Fresh Fruit Boxes</SelectItem>
                                    <SelectItem value="sprouts">Sprouts</SelectItem>
                                    <SelectItem value="sprout-packages">Sprout Packages</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="combo">Combo</SelectItem>
                                    <SelectItem value="wellness">Wellness</SelectItem>
                                    <SelectItem value="subscription">Subscription</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Short description..."
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (₹) *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                placeholder="99"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="unit">Unit *</Label>
                            <Input
                                id="unit"
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                placeholder="glass, kg, box"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="/products/product-name.png"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="in_stock"
                            checked={formData.in_stock ?? true}
                            onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <Label htmlFor="in_stock" className="cursor-pointer">In Stock</Label>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {product ? 'Update' : 'Create'} Product
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
