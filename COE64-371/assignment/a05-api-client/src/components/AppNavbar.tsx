import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {type LucideIcon, Menu} from "lucide-react";
import GlitchText from "@/components/motion/GlitchText.tsx";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {NavItem} from "@/types";

export interface AppNavbarProps {
    isActivePath: (path: string) => boolean;
    navigationItems: NavItem[];
}

const AppNavbar = ({isActivePath, navigationItems = []}: AppNavbarProps) => {

    return (
        <motion.nav
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
            }}
            className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        >
            {/* Animated border gradient */}
            <motion.div
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
                initial={{scaleX: 0}}
                animate={{scaleX: 1}}
                transition={{duration: 1.2, delay: 0.5}}
            />

            <div className="container flex h-16 max-w-screen-2xl items-center px-4 mx-auto">
                {/* Enhanced Desktop Logo */}
                <motion.div
                    className="mr-6 hidden md:flex"
                    whileHover={{scale: 1.05}}
                    transition={{type: "spring", stiffness: 400, damping: 10}}
                >
                    <Link to="/" className="flex items-center space-x-3">
                        <motion.div
                            className="relative"
                            whileHover={{
                                rotateY: 180,
                                transition: {duration: 0.6}
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 blur-sm rounded-lg"
                                animate={{
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <div className="relative bg-primary text-primary-foreground p-2 rounded-lg">
                                <motion.svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    whileHover={{rotate: 360}}
                                    transition={{duration: 0.6}}
                                >
                                    <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                                </motion.svg>
                            </div>
                        </motion.div>
                        <div className="flex flex-col leading-tight overflow-hidden relative">
                            <div className="overflow-hidden">
                                <GlitchText
                                    speed={1}
                                    enableShadows={false}
                                    enableOnHover={true}
                                    className="hidden sm:block text-xl font-bold whitespace-nowrap"
                                >
                                    TechStore Pro
                                </GlitchText>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Enhanced Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navigationItems.map((item) => {
                        const Icon = item?.icon as LucideIcon;
                        const isActive = isActivePath(item.href);

                        return (
                            <motion.div
                                key={item.href}
                                whileHover={{y: -2}}
                                transition={{type: "spring", stiffness: 400}}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                className="transition-all duration-300"
                            >
                                <Link
                                    to={item.href}
                                    className={`relative transition-colors group flex items-center gap-2 ${
                                        isActive
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-primary'
                                    }`}
                                >
                                    <motion.div
                                        animate={isActive ? {rotate: 360} : {}}
                                        transition={{duration: 0.6}}
                                    >
                                        <Icon className="w-4 h-4"/>
                                    </motion.div>
                                    <span>{item.label}</span>
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/60"
                                        initial={{width: 0}}
                                        animate={{width: isActive ? "100%" : 0}}
                                        whileHover={{width: "100%"}}
                                        transition={{duration: 0.3}}
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Mobile & Desktop Right Side */}
                <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                    {/* Enhanced Mobile Logo */}
                    <motion.div
                        className="flex md:hidden items-center space-x-2"
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.3}}
                    >
                        <motion.div
                            className="bg-primary text-primary-foreground p-1.5 rounded-md"
                            whileHover={{rotate: 360}}
                            transition={{duration: 0.6}}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                            </svg>
                        </motion.div>
                        <span className="font-bold text-lg">TechStore</span>
                    </motion.div>

                    <div className="flex items-center space-x-2">
                        {/* Enhanced Theme Toggle */}
                        {/*<motion.div*/}
                        {/*    whileHover={{scale: 1.05, rotate: 180}}*/}
                        {/*    whileTap={{scale: 0.95}}*/}
                        {/*    initial={{opacity: 0, scale: 0.8}}*/}
                        {/*    animate={{opacity: 1, scale: 1}}*/}
                        {/*    transition={{delay: 0.4}}*/}
                        {/*>*/}
                        {/*    <ModeToggle/>*/}
                        {/*</motion.div>*/}

                        {/* Enhanced Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    <Button variant="ghost" size="sm"
                                            className="md:hidden relative overflow-hidden">
                                        <motion.div
                                            animate={{rotate: [0, 180, 0]}}
                                            transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                                        >
                                            <Menu className="h-5 w-5"/>
                                        </motion.div>
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </motion.div>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center space-x-2">
                                        <motion.div
                                            className="bg-primary text-primary-foreground p-2 rounded-lg"
                                            whileHover={{rotate: 360}}
                                            transition={{duration: 0.6}}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                                            </svg>
                                        </motion.div>
                                        <span>TechStore Pro</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <motion.nav
                                    className="flex flex-col space-y-4 mt-8"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.1
                                            }
                                        }
                                    }}
                                >
                                    {navigationItems.map((item) => {
                                        const Icon = item.icon as LucideIcon;
                                        const isActive = isActivePath(item.href);

                                        return (
                                            <motion.div
                                                key={item.href}
                                                variants={{
                                                    hidden: {opacity: 0, x: -20},
                                                    visible: {opacity: 1, x: 0}
                                                }}
                                            >
                                                <Link
                                                    to={item.href}
                                                    className={`flex items-center space-x-3 text-lg font-medium p-3 rounded-lg hover:bg-accent transition-colors group ${
                                                        isActive ? 'bg-primary/10 text-primary' : ''
                                                    }`}
                                                >
                                                    <motion.div
                                                        whileHover={{scale: 1.2, rotate: 360}}
                                                        transition={{duration: 0.3}}
                                                        animate={isActive ? {scale: 1.1} : {}}
                                                    >
                                                        <Icon className="h-5 w-5"/>
                                                    </motion.div>
                                                    <span>{item.label}</span>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{scale: 0}}
                                                            animate={{scale: 1}}
                                                            className="ml-auto w-2 h-2 bg-primary rounded-full"
                                                        />
                                                    )}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </motion.nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default AppNavbar;