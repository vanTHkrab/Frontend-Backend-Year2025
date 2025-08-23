import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 text-gray-900 dark:text-gray-100 flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* Header บน Dashboard */}
                <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 p-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Welcome back! Here's what's happening.
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 hover:scale-105 shadow-sm"
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </header>
                {/* Main Content */}
                <main className="p-6 flex-1 overflow-auto">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}