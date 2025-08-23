import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Login from "./pages/Login.tsx";
import DashboardHome from "./pages/DashboardHome.tsx";
import Projects from "./pages/Projects.tsx";
import Settings from "./pages/Settings.tsx";
const isAuthed: boolean = !!localStorage.getItem("demo_user");
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoute isAuthed={isAuthed} />}>
                    <Route path="dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
                <Route
                    path="*"
                    element={
                        <div className="container-page py-20 text-center">
                            <div className="max-w-md mx-auto">
                                <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
                                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    The page you're looking for doesn't exist.
                                </p>
                                <a
                                    href="/COE64-371/assignment/a04-react-router-dom/submit/source/public"
                                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Go Home
                                </a>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}