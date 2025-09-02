import {Outlet} from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import {Home, Plus, Settings} from "lucide-react";
import {useLocation} from "react-router-dom";
import AppBackground from "@/components/AppBackground.tsx";
import type {NavItem} from "@/types";

// Enhanced Star background component with better animations
const StarBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Small twinkling stars */}
            {Array.from({length: 30}).map((_, i) => (
                <div
                    key={`small-${i}`}
                    className="absolute bg-white rounded-full star-small"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        animationDelay: `${Math.random() * 3}s`,
                    }}
                />
            ))}

            {/* Medium floating stars */}
            {Array.from({length: 15}).map((_, i) => (
                <div
                    key={`medium-${i}`}
                    className="absolute bg-primary/60 rounded-full star-medium"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 2}px`,
                        height: `${Math.random() * 3 + 2}px`,
                        animationDelay: `${Math.random() * 4}s`,
                    }}
                />
            ))}

            {/* Large accent stars */}
            {Array.from({length: 8}).map((_, i) => (
                <div
                    key={`large-${i}`}
                    className="absolute bg-accent/40 rounded-full star-large"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 3}px`,
                        height: `${Math.random() * 4 + 3}px`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"/>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90"/>
        </div>
    );
};

// Navigation items configuration
const navigationItems: NavItem[] = [
    {
        href: "/",
        label: "Home",
        icon: Home,
    },
    {
        href: "/add",
        label: "Add",
        icon: Plus,
    },
    {
        href: "/manage",
        label: "Manage",
        icon: Settings,
    },
];

const Layout = () => {
    const location = useLocation();

    // Function to check if current path is active
    const isActivePath = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            <StarBackground/>
            <AppBackground/>

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="overflow-fix">
                    <AppNavbar
                        isActivePath={isActivePath}
                        navigationItems={navigationItems}
                    />
                </div>

                <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
                    <Outlet/>
                </main>

                <AppFooter/>
            </div>
        </div>
    );
};

export default Layout;
