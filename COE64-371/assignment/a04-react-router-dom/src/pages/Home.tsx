export default function Home() {
    return (
        <section className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                    Welcome Home
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    นี่คือหน้า public ใช้ RootLayout (Navbar + Footer)
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl mb-4">🏠</div>
                    <h3 className="text-lg font-semibold mb-2">Public Access</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        This page is accessible to everyone without authentication.
                    </p>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl mb-4">🎨</div>
                    <h3 className="text-lg font-semibold mb-2">Modern Design</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Built with Tailwind CSS 4 for beautiful, responsive design.
                    </p>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl mb-4">⚡</div>
                    <h3 className="text-lg font-semibold mb-2">Fast Performance</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Optimized with React Router DOM for smooth navigation.
                    </p>
                </div>
            </div>
        </section>
    );
}