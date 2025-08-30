import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Package, Settings, Plus } from 'lucide-react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { FadeInUp } from './components/motion/MotionWrappers';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ListPage from './pages/ListPage.tsx';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ManagePage from './pages/ManagePage';

export default function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <BrowserRouter>
                <div className="min-h-screen container mx-auto bg-gradient-to-br from-background via-background to-secondary/20">
                    {/* Modern Tech Navigation Bar */}
                    <motion.nav
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
                    >
                        <div className="container flex h-16 max-w-screen-2xl items-center px-4">
                            {/* Desktop Logo */}
                            <motion.div
                                className="mr-6 hidden md:flex"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Link to="/" className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 blur-sm rounded-lg"></div>
                                        <div className="relative bg-primary text-primary-foreground p-2 rounded-lg">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="hidden font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent sm:inline-block">
                                        TechStore Pro
                                    </span>
                                </Link>
                            </motion.div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                                    <Link
                                        to="/"
                                        className="relative transition-colors hover:text-primary text-muted-foreground group"
                                    >
                                        Products
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                                    <Link
                                        to="/manage"
                                        className="relative transition-colors hover:text-primary text-muted-foreground group"
                                    >
                                        Manage
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                                    <Link
                                        to="/add"
                                        className="relative transition-colors hover:text-primary text-muted-foreground group"
                                    >
                                        Add Product
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                    </Link>
                                </motion.div>
                            </nav>

                            {/* Mobile & Desktop Right Side */}
                            <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                                {/* Mobile Logo */}
                                <div className="flex md:hidden items-center space-x-2">
                                    <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                                        </svg>
                                    </div>
                                    <span className="font-bold text-lg">TechStore</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {/* Theme Toggle */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ModeToggle />
                                    </motion.div>

                                    {/* Mobile Menu */}
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="ghost" size="sm" className="md:hidden">
                                                <Menu className="h-5 w-5" />
                                                <span className="sr-only">Toggle navigation menu</span>
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                            <SheetHeader>
                                                <SheetTitle className="flex items-center space-x-2">
                                                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                                                        </svg>
                                                    </div>
                                                    <span>TechStore Pro</span>
                                                </SheetTitle>
                                            </SheetHeader>
                                            <nav className="flex flex-col space-y-4 mt-8">
                                                <Link
                                                    to="/"
                                                    className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg hover:bg-accent transition-colors"
                                                >
                                                    <Package className="h-5 w-5" />
                                                    <span>Products</span>
                                                </Link>
                                                <Link
                                                    to="/manage"
                                                    className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg hover:bg-accent transition-colors"
                                                >
                                                    <Settings className="h-5 w-5" />
                                                    <span>Manage</span>
                                                </Link>
                                                <Link
                                                    to="/add"
                                                    className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg hover:bg-accent transition-colors"
                                                >
                                                    <Plus className="h-5 w-5" />
                                                    <span>Add Product</span>
                                                </Link>
                                            </nav>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>
                        </div>
                    </motion.nav>

                    {/* Main Content with Animation */}
                    <main className="flex-1">
                        <FadeInUp delay={0.2}>
                            <div className="container max-w-screen-2xl py-4 md:py-8 px-4">
                                <Routes>
                                    <Route path="/" element={<ListPage />} />
                                    <Route path="/product/:id" element={<DetailPage />} />
                                    <Route path="/add" element={<AddPage />} />
                                    <Route path="/manage" element={<ManagePage />} />
                                </Routes>
                            </div>
                        </FadeInUp>
                    </main>

                    {/* Animated Background Elements */}
                    <div className="fixed inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.div
                            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                rotate: [360, 180, 0],
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>

                    {/* Sonner Toaster */}
                    <Toaster
                        theme="system"
                        position="top-right"
                        richColors
                        closeButton
                    />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}