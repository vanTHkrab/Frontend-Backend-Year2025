import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = () => {
        login("demo");
        navigate(from, { replace: true });
    };

    return (
        <section className="max-w-md mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-4">🔐</div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to access your dashboard
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-3">
                            <div className="text-blue-500 text-lg">ℹ️</div>
                            <div>
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Demo Mode</p>
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    Click the button below to sign in as a demo user
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <span>🚀</span>
                        Sign in as Demo User
                    </button>
                </div>
            </div>
        </section>
    );
}