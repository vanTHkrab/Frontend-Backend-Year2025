import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [dark, setDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );
    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);
    const linkBase =
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 relative group";
    const linkActive =
        "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-sm";

    return (
        <header className="border-b border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
            <nav className="container-page flex items-center justify-between h-16">
                {/* Logo with enhanced styling */}
                <Link
                    to="/"
                    className="group flex items-center gap-2"
                >
                    <div className="text-2xl transition-transform duration-200 group-hover:scale-110">
                        ⚛️
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 transition-all duration-200">
                        ReactLayouts
                    </span>
                </Link>

                {/* Navigation Links with enhanced styling */}
                <div className="flex items-center gap-1">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">🏠</span>
                            Home
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">ℹ️</span>
                            About
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">📊</span>
                            Dashboard
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                    </NavLink>
                </div>

                {/* Enhanced Theme Toggle Button */}
                <button
                    onClick={() => setDark(!dark)}
                    className="flex items-center gap-3 px-4 py-2 bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm shadow-sm group"
                >
                    <span className="text-lg transition-transform duration-200 group-hover:rotate-12">
                        {dark ? "☀️" : "🌙"}
                    </span>
                    <span className="text-sm font-medium">
                        {dark ? "Light" : "Dark"}
                    </span>
                </button>
            </nav>
        </header>
    );
}