import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Zap, Cpu, Smartphone, Laptop, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product, ProductResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, ScaleIn, FadeInUp } from "@/components/motion/MotionWrappers";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const techCategories = [
    { name: "All Products", icon: Zap, color: "from-blue-500 to-purple-600" },
    { name: "Laptops", icon: Laptop, color: "from-green-500 to-blue-500" },
    { name: "Smartphones", icon: Smartphone, color: "from-purple-500 to-pink-500" },
    { name: "Components", icon: Cpu, color: "from-orange-500 to-red-500" },
];

export default function ListPage() {
    const [items, setItems] = useState<Product[]>([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Products");

    const doFetch = useCallback(async (query = "") => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `${API}/products?q=${encodeURIComponent(query)}&limit=20`
            );
            if (!res.ok) throw new Error("Failed to load data");
            const json: ProductResponse = await res.json();
            setItems(json.data || []);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        doFetch();
    }, [doFetch]);

    const filteredItems = selectedCategory === "All Products"
        ? items
        : items.filter(item => item.category?.toLowerCase().includes(selectedCategory.toLowerCase()));

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <FadeInUp>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
                    <div className="relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-4"
                        >
                            Tech Store Pro
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-muted-foreground mb-6 max-w-2xl"
                        >
                            Discover cutting-edge technology and premium gadgets for the modern world
                        </motion.p>
                    </div>
                    <motion.div
                        className="absolute top-4 right-4 opacity-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Cpu className="w-32 h-32" />
                    </motion.div>
                </div>
            </FadeInUp>

            {/* Categories */}
            <FadeInUp delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-6">
                    {techCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.button
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`relative overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all ${
                                    selectedCategory === category.name
                                        ? 'text-primary-foreground shadow-lg'
                                        : 'text-muted-foreground hover:text-foreground border border-border hover:border-primary/50'
                                }`}
                            >
                                {selectedCategory === category.name && (
                                    <motion.div
                                        layoutId="categoryBackground"
                                        className={`absolute inset-0 bg-gradient-to-r ${category.color}`}
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <div className="relative flex items-center space-x-2">
                                    <Icon className="w-4 h-4" />
                                    <span>{category.name}</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </FadeInUp>

            {/* Search Section */}
            <FadeInUp delay={0.4}>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            className="flex h-12 w-full rounded-xl border border-border bg-background/50 backdrop-blur-sm px-12 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                            placeholder="Search for laptops, phones, components..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") doFetch(q);
                            }}
                        />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            onClick={() => doFetch(q)}
                            disabled={loading}
                            size="lg"
                            className="h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                                />
                            ) : (
                                "Search"
                            )}
                        </Button>
                    </motion.div>
                </div>
            </FadeInUp>

            {/* Loading State */}
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center py-12"
                >
                    <div className="text-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-muted-foreground">Loading amazing tech products...</p>
                    </div>
                </motion.div>
            )}

            {/* Error State */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border border-destructive/20 bg-destructive/5 p-6"
                >
                    <p className="text-destructive font-medium text-center">{error}</p>
                </motion.div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
                <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map((item, index) => (
                        <StaggerItem key={item.id}>
                            <ScaleIn delay={index * 0.1}>
                                <motion.div
                                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300"
                                    whileHover={{ y: -8 }}
                                >
                                    {/* Product Image */}
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <motion.img
                                            src={
                                                item.imageUrl && item.imageUrl.trim()
                                                    ? item.imageUrl
                                                    : `https://placehold.co/600x400?text=${encodeURIComponent(
                                                        item.name || "Tech Product"
                                                    )}`
                                            }
                                            alt={item.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "https://placehold.co/600x400?text=Tech+Product";
                                            }}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            whileHover={{ scale: 1.1 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Floating Action Button */}
                                        <motion.div
                                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                                            initial={{ scale: 0 }}
                                            whileHover={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground p-2 rounded-full">
                                                <ShoppingCart className="w-4 h-4" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>

                                        {item.category && (
                                            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
                                                {item.category}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-3xl font-bold text-primary">
                                                    ${new Intl.NumberFormat("en-US").format(item.price)}
                                                </p>
                                            </div>
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Button asChild size="sm" className="rounded-full">
                                                    <Link to={`/product/${item.id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </ScaleIn>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            )}

            {/* Empty State */}
            {!loading && !error && filteredItems.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mx-auto h-32 w-32 text-muted-foreground mb-6"
                    >
                        <Zap className="w-full h-full" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">No products found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        {q ? `No tech products match "${q}"` : `No products in ${selectedCategory}`}
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild size="lg" className="rounded-full">
                            <Link to="/add">Add First Product</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}