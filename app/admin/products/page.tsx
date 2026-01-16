"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { Loader2, Plus, Edit, Trash2, Search, Package } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { ProductDialog } from "@/components/admin/product-dialog"

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [showProductDialog, setShowProductDialog] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('name')

        if (!error && data) {
            setProducts(data)
        }
        setLoading(false)
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setShowProductDialog(true)
    }

    const handleAddNew = () => {
        setEditingProduct(null)
        setShowProductDialog(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        setDeletingId(id)
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (error) throw error
            toast.success('Product deleted successfully')
            fetchProducts()
        } catch (error: any) {
            console.error('Error deleting product:', error)
            toast.error(error.message || 'Failed to delete product')
        } finally {
            setDeletingId(null)
        }
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">Products</h1>
                    <p className="text-muted-foreground">Manage your product catalog</p>
                </div>
                <Button className="gap-2" onClick={handleAddNew}>
                    <Plus className="w-4 h-4" />
                    Add Product
                </Button>
            </div>

            {/* Search */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-fresh-600" />
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-gray-50 dark:bg-gray-900">
                                    <th className="text-left p-4 font-medium">Product</th>
                                    <th className="text-left p-4 font-medium">Category</th>
                                    <th className="text-left p-4 font-medium">Price</th>
                                    <th className="text-left p-4 font-medium">Type</th>
                                    <th className="text-left p-4 font-medium">Stock</th>
                                    <th className="text-right p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-fresh-100 dark:bg-fresh-900 rounded flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-fresh-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-sm text-muted-foreground">{product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline">{product.category}</Badge>
                                        </td>
                                        <td className="p-4 font-medium">₹{product.price}/{product.unit}</td>
                                        <td className="p-4">
                                            <Badge>{product.type || 'N/A'}</Badge>
                                        </td>
                                        <td className="p-4">
                                            {product.in_stock ? (
                                                <Badge className="bg-green-100 text-green-700">In Stock</Badge>
                                            ) : (
                                                <Badge variant="destructive">Out of Stock</Badge>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive"
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deletingId === product.id}
                                                >
                                                    {deletingId === product.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && !loading && (
                        <div className="text-center py-12 text-muted-foreground">
                            No products found
                        </div>
                    )}
                </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
            </div>

            <ProductDialog
                open={showProductDialog}
                onOpenChange={setShowProductDialog}
                product={editingProduct}
                onSuccess={fetchProducts}
            />
        </div>
    )
}
