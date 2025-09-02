import {motion} from "framer-motion";
import {Zap} from "lucide-react";

const AppFooter = () => {
    return (
        <motion.footer
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.8, duration: 0.6}}
            className="relative z-10 border-t border-border/20 bg-background/80 backdrop-blur-sm mt-auto mb-0"
        >
            <div className="container max-w-screen-2xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <motion.div
                            animate={{rotate: 360}}
                            transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                        >
                            <Zap className="w-4 h-4 text-primary"/>
                        </motion.div>
                        <span>© 2025 TechStore Pro. vanTHkrab</span>
                    </div>
                </div>
            </div>
        </motion.footer>

    );
}

export default AppFooter;