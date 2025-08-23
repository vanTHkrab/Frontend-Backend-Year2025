export default function About() {
    return (
        <section className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    About This Project
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    A modern React application showcasing React Router DOM with beautiful Tailwind CSS 4 styling
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-6">🎯</div>
                    <h2 className="text-2xl font-bold mb-4">Features</h2>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="text-green-500">✓</span>
                            React Router DOM for navigation
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-500">✓</span>
                            Protected routes with authentication
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-500">✓</span>
                            Dark/Light theme toggle
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-500">✓</span>
                            Responsive design
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-500">✓</span>
                            Modern Tailwind CSS 4 styling
                        </li>
                    </ul>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-6">🛠️</div>
                    <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">React 19</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="font-medium">TypeScript</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">React Router DOM</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                            <span className="font-medium">Tailwind CSS 4</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="font-medium">Vite</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800 text-center">
                <h3 className="text-xl font-semibold mb-3">Ready to explore?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Check out the dashboard to see protected routes in action!
                </p>
                <a
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                    <span>🚀</span>
                    Visit Dashboard
                </a>
            </div>
        </section>
    );
}