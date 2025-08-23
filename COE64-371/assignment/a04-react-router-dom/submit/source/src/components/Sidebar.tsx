import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const item =
        "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 group";
    const active = "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-sm";

    return (
        <aside className="w-72 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white/30 backdrop-blur-sm dark:bg-gray-800/30 p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Navigation</h2>
                <div className="h-px bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            <nav className="space-y-2">
                <NavLink
                    to="/dashboard"
                    end
                    className={({isActive}) => `${item} ${isActive ? active : ""}`}
                >
                    <span className="text-xl">📊</span>
                    <span className="font-medium">Overview</span>
                </NavLink>

                <NavLink
                    to="/dashboard/projects"
                    className={({isActive}) => `${item} ${isActive ? active : ""}`}
                >
                    <span className="text-xl">🚀</span>
                    <span className="font-medium">Projects</span>
                </NavLink>

                <NavLink
                    to="/dashboard/settings"
                    className={({isActive}) => `${item} ${isActive ? active : ""}`}
                >
                    <span className="text-xl">⚙️</span>
                    <span className="font-medium">Settings</span>
                </NavLink>
            </nav>
        </aside>
    );
}