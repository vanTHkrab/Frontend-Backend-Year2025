import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Tag, Shield, Truck, Heart, Share2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { FadeInUp } from '@/components/motion/MotionWrappers';

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Product | null>(null);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        (async () => {
            if (!id) return;
            try {
                const res = await fetch(`${API}/products/${id}`);
                if (!res.ok) throw new Error('Product not found');
                const product: Product = await res.json();
                setItem(product);
            } catch (e: any) {
                setError(e.message);
            }
        })();
    }, [id]);

    if (error) {
        return (
            <FadeInUp>
                <div className="flex flex-col items-center justify-center py-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 max-w-md text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Package className="mx-auto h-16 w-16 text-destructive mb-4" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-destructive mb-3">Product Not Found</h2>
                        <p className="text-destructive/80 mb-6">{error}</p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild variant="outline" size="lg" className="rounded-full">
                                <Link to="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Store
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </FadeInUp>
        );
    }

    if (!item) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"
                    />
                    <p className="text-muted-foreground text-lg">Loading product details...</p>
                </div>
            </div>
        );
    }

    const mockImages = [
        item.imageUrl || `https://placehold.co/800x600?text=${encodeURIComponent(item.name)}`,
        // `https://placehold.co/800x600?text=${encodeURIComponent(item.name)}+View+2`,
        // `https://placehold.co/800x600?text=${encodeURIComponent(item.name)}+View+3`
    ];

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <FadeInUp>
                <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Button asChild variant="ghost" size="sm" className="rounded-full">
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Store
                        </Link>
                    </Button>
                </motion.div>
            </FadeInUp>

            {/* Product Details */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Product Images */}
                <FadeInUp delay={0.2}>
                    <div className="space-y-4">
                        <motion.div
                            className="aspect-square overflow-hidden rounded-2xl border border-border/50 bg-card"
                            layoutId={`product-image-${item.id}`}
                        >
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                src={mockImages[selectedImage]}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "https://placehold.co/800x600?text=Tech+Product";
                                }}
                            />
                        </motion.div>

                        {/* Image Thumbnails */}
                        <div className="flex gap-3">
                            {mockImages.map((img, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all ${
                                        selectedImage === index 
                                            ? 'border-primary shadow-lg' 
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${item.name} view ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    {selectedImage === index && (
                                        <motion.div
                                            layoutId="selectedImageBorder"
                                            className="absolute inset-0 bg-primary/10"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </FadeInUp>

                {/* Product Information */}
                <FadeInUp delay={0.4}>
                    <div className="space-y-6">
                        {/* Product Header */}
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-4xl font-bold tracking-tight mb-2"
                            >
                                {item.name}
                            </motion.h1>

                            {/*<div className="flex items-center gap-4 mb-4">*/}
                            {/*    <div className="flex items-center gap-1">*/}
                            {/*        {[...Array(5)].map((_, i) => (*/}
                            {/*            <Star*/}
                            {/*                key={i}*/}
                            {/*                className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}*/}
                            {/*            />*/}
                            {/*        ))}*/}
                            {/*        <span className="text-sm text-muted-foreground ml-2">(4.8/5) • 127 reviews</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-baseline gap-4 mb-6"
                            >
                                <span className="text-5xl font-bold text-primary">
                                    ${new Intl.NumberFormat("en-US").format(item.price)}
                                </span>
                            </motion.div>
                        </div>

                        {/* Category & Features */}
                        <div className="space-y-4">
                            {item.category && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex items-center gap-2"
                                >
                                    <Tag className="h-5 w-5 text-muted-foreground" />
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                        {item.category}
                                    </span>
                                </motion.div>
                            )}

                            {/* Tech Features */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="grid grid-cols-3 gap-4 p-4 bg-secondary/20 rounded-xl"
                            >
                                <div className="text-center">
                                    <Shield className="w-6 h-6 mx-auto mb-2 text-green-500" />
                                    <p className="text-sm font-medium">2 Year Warranty</p>
                                </div>
                                <div className="text-center">
                                    <Truck className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                    <p className="text-sm font-medium">Free Shipping</p>
                                </div>
                                <div className="text-center">
                                    <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                                    <p className="text-sm font-medium">Fast Delivery</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Description */}
                        {item.description && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="space-y-3"
                            >
                                <h3 className="text-xl font-semibold">Product Description</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        )}

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="space-y-4"
                        >
                            <div className="flex gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1"
                                >
                                    <Button size="lg" className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                                        Add to Cart - ${item.price}
                                    </Button>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button size="lg" variant="outline" className="rounded-full p-3">
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button size="lg" variant="outline" className="rounded-full p-3">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </motion.div>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button variant="secondary" size="lg" className="w-full rounded-full">
                                    Buy Now - Express Checkout
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Product ID */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="pt-6 border-t border-border"
                        >
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Product ID:</span>
                                <code className="bg-muted px-3 py-1 rounded-md font-mono">
                                    {item.id}
                                </code>
                            </div>
                        </motion.div>
                    </div>
                </FadeInUp>
            </div>
        </div>
    );
}