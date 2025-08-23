export default function DashboardHome() {
    const stats = [
        { label: "Total Projects", value: "12", icon: "🚀", color: "from-blue-500 to-cyan-500" },
        { label: "Active Tasks", value: "24", icon: "📋", color: "from-green-500 to-emerald-500" },
        { label: "Completed", value: "156", icon: "✅", color: "from-purple-500 to-pink-500" },
        { label: "Team Members", value: "8", icon: "👥", color: "from-orange-500 to-red-500" }
    ];

    const recentActivity = [
        { action: "Created new project", time: "2 hours ago", icon: "🆕" },
        { action: "Completed task review", time: "4 hours ago", icon: "✅" },
        { action: "Updated project settings", time: "1 day ago", icon: "⚙️" },
        { action: "Added team member", time: "2 days ago", icon: "👤" }
    ];

    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    หน้านี้ใช้ DashboardLayout (มี Sidebar) - Welcome to your personalized dashboard
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`text-2xl p-3 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-10`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <span>📈</span>
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="text-xl">{activity.icon}</div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {activity.action}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <span>⚡</span>
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full p-3 text-left rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">➕</span>
                                <span className="font-medium">New Project</span>
                            </div>
                        </button>
                        <button className="w-full p-3 text-left rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📝</span>
                                <span className="font-medium">Add Task</span>
                            </div>
                        </button>
                        <button className="w-full p-3 text-left rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">👥</span>
                                <span className="font-medium">Invite Team</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}