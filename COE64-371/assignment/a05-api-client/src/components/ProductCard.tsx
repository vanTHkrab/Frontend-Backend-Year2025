import {StaggerItem, TechCard} from "@/components/motion/MotionWrappers.tsx";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {ShoppingCart} from "lucide-react";
import type {Product} from "@/types";

const ProductCard = ({item}: { item: Product }) => {
    return (
        <StaggerItem key={item.id}>
            <TechCard className="group">
                <Link to={`/detail/${item.id}`}>
                    <div
                        className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300">
                        {/* Product Image */}
                        <div
                            className="aspect-square bg-gradient-to-br from-muted/50 to-muted/20 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{scale: 1.1, rotate: 5}}
                                    transition={{type: "spring", stiffness: 300}}
                                >
                                    <img src={item.imageUrl} alt={item.name}/>
                                </motion.div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                    {item.name}
                                </h3>
                                <motion.div
                                    whileHover={{scale: 1.2}}
                                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                >
                                    <ShoppingCart className="w-4 h-4"/>
                                </motion.div>
                            </div>

                            <div className="flex items-center justify-between">
                                <motion.span
                                    className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                                    whileHover={{scale: 1.05}}
                                >
                                    ${item.price?.toLocaleString() || "N/A"}
                                </motion.span>
                                <span
                                    className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-full">
                                                    {item.category}
                                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </TechCard>
        </StaggerItem>
    );
}

export default ProductCard;