import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Edit3, Trash2, Package, Plus, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { Product, ProductResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { StaggerContainer, StaggerItem, ScaleIn, FadeInUp } from "@/components/motion/MotionWrappers";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

interface EditProduct extends Product {
    isEditing?: boolean;
}

export default function ManagePage() {
    const [items, setItems] = useState<EditProduct[]>([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<EditProduct | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const doFetch = useCallback(async (query = "") => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `${API}/products?q=${encodeURIComponent(query)}&limit=50`
            );
            if (!res.ok) throw new Error("Failed to load products");
            const json: ProductResponse = await res.json();
            setItems(json.data || []);
        } catch (e: any) {
            setError(e.message);
            toast.error("Failed to load products", {
                description: e.message,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        doFetch();
    }, [doFetch]);

    const handleDelete = async (id: string) => {
        setDeleteLoading(true);
        try {
            const res = await fetch(`${API}/products/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to delete product");
            }

            setItems(prev => prev.filter(item => item.id !== id));
            toast.success("Product deleted successfully!", {
                description: "The product has been removed from your store.",
            });
        } catch (e: any) {
            setError(e.message);
            toast.error("Failed to delete product", {
                description: e.message,
            });
        } finally {
            setDeleteLoading(false);
            setDeleteConfirm(null);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct({ ...product });
    };

    const handleUpdate = async () => {
        if (!editingProduct) return;

        // Basic validation
        if (!editingProduct.name?.trim()) {
            toast.error("Product name is required");
            return;
        }

        if (!editingProduct.id?.trim()) {
            toast.error("Product ID is required");
            return;
        }

        if (editingProduct.price <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        setUpdateLoading(true);
        try {
            const updateData = {
                id: editingProduct.id.trim(),
                name: editingProduct.name.trim(),
                price: Number(editingProduct.price),
                category: editingProduct.category?.trim() || '',
                description: editingProduct.description?.trim() || '',
                imageUrl: editingProduct.imageUrl?.trim() || ''
            };

            const res = await fetch(`${API}/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to update product");
            }

            const updatedProduct = await res.json();

            setItems(prev => prev.map(item =>
                item.id === editingProduct.id ? updatedProduct : item
            ));
            setEditingProduct(null);
            toast.success("Product updated successfully!", {
                description: `${updatedProduct.name} has been updated.`,
            });
        } catch (e: any) {
            setError(e.message);
            toast.error("Failed to update product", {
                description: e.message,
            });
        } finally {
            setUpdateLoading(false);
        }
    };

    const filteredItems = q ? items.filter(item =>
        item.name.toLowerCase().includes(q.toLowerCase()) ||
        item.category?.toLowerCase().includes(q.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(q.toLowerCase())
    ) : items;

    const productToDelete = items.find(item => item.id === deleteConfirm);

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <FadeInUp>
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                        className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center"
                    >
                        <Package className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Manage Products
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Edit, delete, and organize your tech product inventory
                    </p>
                </div>
            </FadeInUp>

            {/* Controls */}
            <FadeInUp delay={0.2}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                        <Input
                            className="pl-10 md:pl-12 h-10 md:h-12 bg-background/50 backdrop-blur-sm"
                            placeholder="Search products..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button asChild size="default" className="w-full md:w-auto rounded-full bg-gradient-to-r from-primary to-primary/80">
                            <Link to="/add">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </FadeInUp>

            {/* Progress Bar for Loading */}
            {loading && (
                <FadeInUp>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Loading products...</span>
                        </div>
                        <Progress value={100} className="h-2" />
                    </div>
                </FadeInUp>
            )}

            {/* Error State */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 md:p-6"
                >
                    <p className="text-destructive font-medium text-center">{error}</p>
                </motion.div>
            )}

            {/* Mobile Card View */}
            <div className="block md:hidden">
                {!loading && !error && (
                    <StaggerContainer className="space-y-4">
                        {filteredItems.map((item, index) => (
                            <StaggerItem key={item.id}>
                                <ScaleIn delay={index * 0.05}>
                                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={item.imageUrl || `https://placehold.co/80x80?text=${encodeURIComponent(item.name)}`}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://placehold.co/80x80?text=Product";
                                                    }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {item.description || "No description"}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="space-y-1">
                                                            {item.category && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    {item.category}
                                                                </Badge>
                                                            )}
                                                            <p className="font-bold text-sm">
                                                                ฿{new Intl.NumberFormat("th-TH").format(item.price)}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleEdit(item)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Edit3 className="w-3 h-3" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => setDeleteConfirm(item.id)}
                                                                className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </ScaleIn>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                )}
            </div>

            {/* Desktop Table View */}
            {!loading && !error && (
                <ScaleIn delay={0.3} className="hidden md:block">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/30">
                                <tr>
                                    <th className="text-left p-4 font-semibold">Product</th>
                                    <th className="text-left p-4 font-semibold">Category</th>
                                    <th className="text-left p-4 font-semibold">Price</th>
                                    <th className="text-left p-4 font-semibold">ID</th>
                                    <th className="text-center p-4 font-semibold">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <AnimatePresence>
                                    {filteredItems.map((item, index) => (
                                        <motion.tr
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.imageUrl || `https://placehold.co/80x80?text=${encodeURIComponent(item.name)}`}
                                                        alt={item.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "https://placehold.co/80x80?text=Product";
                                                        }}
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold">{item.name}</h3>
                                                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                                                            {item.description || "No description"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {item.category && (
                                                    <Badge variant="secondary">
                                                        {item.category}
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                    <span className="font-bold text-lg">
                                                        ฿{new Intl.NumberFormat("th-TH").format(item.price)}
                                                    </span>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline" className="font-mono">
                                                    {item.id}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleEdit(item)}
                                                            className="rounded-full p-2"
                                                            disabled={updateLoading}
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </Button>
                                                    </motion.div>
                                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => setDeleteConfirm(item.id)}
                                                            className="rounded-full p-2 hover:bg-destructive hover:text-white"
                                                            disabled={deleteLoading}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </motion.div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {filteredItems.length === 0 && !loading && (
                            <div className="text-center py-12">
                                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-muted-foreground mb-4">
                                    {q ? `No products match "${q}"` : "No products available to manage"}
                                </p>
                                <Button asChild>
                                    <Link to="/add">Add First Product</Link>
                                </Button>
                            </div>
                        )}
                    </Card>
                </ScaleIn>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteConfirm} onOpenChange={() => !deleteLoading && setDeleteConfirm(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-left">
                            Are you sure you want to delete
                            <span className="font-semibold text-foreground">
                                {productToDelete ? ` "${productToDelete.name}"` : ' this product'}
                            </span>?
                            <br />
                            <span className="text-sm text-muted-foreground">
                                This action cannot be undone.
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteLoading}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                            className="bg-destructive text-white hover:bg-destructive/90"
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Product Dialog */}
            <Dialog open={!!editingProduct} onOpenChange={() => !updateLoading && setEditingProduct(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Edit Product</DialogTitle>
                    </DialogHeader>

                    {editingProduct && (
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-id">Product ID *</Label>
                                    <Input
                                        id="edit-id"
                                        value={editingProduct.id || ''}
                                        onChange={(e) => setEditingProduct(prev => prev ? {...prev, id: e.target.value} : null)}
                                        disabled={updateLoading}
                                        placeholder="e.g., p1001"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Product Name *</Label>
                                    <Input
                                        id="edit-name"
                                        value={editingProduct.name || ''}
                                        onChange={(e) => setEditingProduct(prev => prev ? {...prev, name: e.target.value} : null)}
                                        disabled={updateLoading}
                                        placeholder="Enter product name"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-price">Price (฿) *</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={editingProduct.price || 0}
                                        onChange={(e) => setEditingProduct(prev => prev ? {...prev, price: Number(e.target.value) || 0} : null)}
                                        disabled={updateLoading}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Input
                                        id="edit-category"
                                        value={editingProduct.category || ''}
                                        onChange={(e) => setEditingProduct(prev => prev ? {...prev, category: e.target.value} : null)}
                                        placeholder="e.g., accessories, peripheral"
                                        disabled={updateLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-imageUrl">Image URL</Label>
                                <Input
                                    id="edit-imageUrl"
                                    type="url"
                                    value={editingProduct.imageUrl || ''}
                                    onChange={(e) => setEditingProduct(prev => prev ? {...prev, imageUrl: e.target.value} : null)}
                                    placeholder="https://example.com/image.jpg"
                                    disabled={updateLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    rows={4}
                                    value={editingProduct.description || ''}
                                    onChange={(e) => setEditingProduct(prev => prev ? {...prev, description: e.target.value} : null)}
                                    placeholder="Product description..."
                                    disabled={updateLoading}
                                    className="resize-none"
                                />
                            </div>

                            {/* Image Preview */}
                            {editingProduct.imageUrl && (
                                <div className="space-y-2">
                                    <Label>Preview</Label>
                                    <div className="flex justify-center">
                                        <img
                                            src={editingProduct.imageUrl}
                                            alt="Preview"
                                            className="w-32 h-32 rounded-lg object-cover border"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter className="gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setEditingProduct(null)}
                            disabled={updateLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={updateLoading || !editingProduct?.name?.trim() || !editingProduct?.id?.trim() || (editingProduct?.price || 0) <= 0}
                        >
                            {updateLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Product'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}