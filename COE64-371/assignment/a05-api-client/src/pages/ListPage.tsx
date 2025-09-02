import {useEffect, useState, useCallback} from "react";
import {Search, Zap, Cpu, Smartphone, Laptop, Star, TrendingUp} from "lucide-react";
import {motion} from "framer-motion";
import type {Product, ProductResponse} from "@/types";
import {Button} from "@/components/ui/button";
import {StaggerContainer, FadeInUp, TechSpinner} from "@/components/motion/MotionWrappers";
import GlitchText from "@/components/motion/GlitchText.tsx";
import ProductCard from "@/components/ProductCard.tsx";
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const techCategories = [
    {name: "All Products", icon: Zap, color: "from-blue-500 to-purple-600"},
    {name: "Laptops", icon: Laptop, color: "from-green-500 to-blue-500"},
    {name: "Smartphones", icon: Smartphone, color: "from-purple-500 to-pink-500"},
    {name: "Components", icon: Cpu, color: "from-orange-500 to-red-500"},
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
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to load data: ${errorText}`);
            }
            const json: ProductResponse = await res.json();
            setItems(json.data || []);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        doFetch().finally();
    }, [doFetch]);

    const filteredItems = items.filter((item) =>
        selectedCategory === "All Products" ? true : item.category === selectedCategory
    );

    return (
        <div className="space-y-8">
            {/* Enhanced Hero Section */}
            <FadeInUp>
                <div
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 p-8 md:p-12 border border-border/20">
                    <div className="relative z-10">
                        <GlitchText
                            speed={1}
                            enableShadows={true}
                            enableOnHover={true}
                            className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground/70 bg-clip-text text-transparent mb-4'
                        >
                            Tech Store Pro
                        </GlitchText>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.4}}
                            className="text-xl text-muted-foreground mb-6 max-w-2xl"
                        >
                            Discover cutting-edge technology and premium gadgets for the modern world
                        </motion.p>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.6}}
                            className="flex items-center gap-6 text-sm text-muted-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-500"/>
                                <span>Latest Tech</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500"/>
                                <span>Premium Quality</span>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="absolute top-4 right-4 opacity-10"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: {duration: 20, repeat: Infinity, ease: "linear"},
                            scale: {duration: 3, repeat: Infinity, ease: "easeInOut"}
                        }}
                    >
                        <Cpu className="w-32 h-32"/>
                    </motion.div>
                </div>
            </FadeInUp>

            {/* Enhanced Search Section */}
            <FadeInUp delay={0.2}>
                <div className="relative max-w-md mx-auto">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl rounded-lg"
                        animate={{
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{rotate: [0, 360]}}
                                transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                            >
                                <Search className="w-5 h-5 text-muted-foreground"/>
                            </motion.div>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                                onKeyDown={(e) => e.key === "Enter" && doFetch(q)}
                            />
                            <Button
                                onClick={() => doFetch(q)}
                                disabled={loading}
                                size="sm"
                                className="relative overflow-hidden"
                            >
                                {loading ? <TechSpinner className="w-4 h-4"/> : "Search"}
                            </Button>
                        </div>
                    </div>
                </div>
            </FadeInUp>

            {/* Enhanced Categories */}
            <FadeInUp delay={0.3}>
                <div className="flex flex-wrap gap-3 justify-center">
                    {techCategories.map((category, index) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.name;

                        return (
                            <motion.button
                                key={category.name}
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{delay: 0.1 * index}}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                }}
                                whileTap={{scale: 0.95}}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`relative overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all ${
                                    isSelected
                                        ? 'text-primary-foreground shadow-lg border-0'
                                        : 'text-muted-foreground hover:text-foreground border border-border hover:border-primary/50'
                                }`}
                            >
                                {isSelected && (
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r ${category.color}`}
                                        layoutId="selectedCategory"
                                        transition={{type: "spring", stiffness: 300, damping: 30}}
                                    />
                                )}
                                <div className="relative flex items-center gap-2">
                                    <motion.div
                                        animate={isSelected ? {rotate: 360} : {}}
                                        transition={{duration: 0.6}}
                                    >
                                        <Icon className="w-4 h-4"/>
                                    </motion.div>
                                    <span>{category.name}</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </FadeInUp>

            {/* Enhanced Results Section */}
            <FadeInUp delay={0.4}>
                <div className="flex items-center justify-between mb-6">
                    <motion.h2
                        className="text-2xl font-semibold"
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                    >
                        {selectedCategory === "All Products"
                            ? `All Products (${filteredItems.length})`
                            : `${selectedCategory} (${filteredItems.length})`
                        }
                    </motion.h2>

                    {filteredItems.length > 0 && (
                        <motion.div
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-2 h-2 bg-green-500 rounded-full"
                            />
                            <span>Live Results</span>
                        </motion.div>
                    )}
                </div>
            </FadeInUp>

            {/* Enhanced Error State */}
            {error && (
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    className="text-center py-12"
                >
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
                        <motion.div
                            animate={{rotate: [0, 10, -10, 0]}}
                            transition={{duration: 0.5}}
                            className="text-destructive text-4xl mb-4"
                        >
                            ⚠️
                        </motion.div>
                        <p className="text-destructive font-medium">Error loading products</p>
                        <p className="text-muted-foreground text-sm mt-2">{error}</p>
                        <Button
                            onClick={() => doFetch(q)}
                            variant="outline"
                            size="sm"
                            className="mt-4"
                        >
                            Try Again
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Enhanced Loading State */}
            {loading && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="text-center py-12"
                >
                    <TechSpinner className="w-8 h-8 mx-auto mb-4"/>
                    <p className="text-muted-foreground">Loading awesome products...</p>
                </motion.div>
            )}

            {/* Enhanced Products Grid */}
            {!loading && !error && (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <ProductCard item={item}/>
                    ))}
                </StaggerContainer>
            )}

            {/* Enhanced Empty State */}
            {!loading && !error && filteredItems.length === 0 && items.length > 0 && (
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    className="text-center py-12"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{duration: 2, repeat: Infinity}}
                        className="text-6xl mb-4"
                    >
                        🔍
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">No products found in {selectedCategory}</h3>
                    <p className="text-muted-foreground mb-4">Try selecting a different category or adjusting your
                        search</p>
                    <Button
                        onClick={() => setSelectedCategory("All Products")}
                        variant="outline"
                    >
                        View All Products
                    </Button>
                </motion.div>
            )}
        </div>
    );
}