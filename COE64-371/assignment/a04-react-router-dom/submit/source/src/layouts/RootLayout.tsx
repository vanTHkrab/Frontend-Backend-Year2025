import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="container-page py-8 min-h-[calc(100vh-8rem)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}