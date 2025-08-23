export default function Projects() {
    const projects = [
        {
            id: 1,
            name: "E-commerce Platform",
            description: "Modern shopping platform with React and Node.js",
            status: "In Progress",
            progress: 75,
            team: ["👨‍💻", "👩‍💻", "👨‍🎨"],
            dueDate: "Dec 2024",
            priority: "High",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            name: "Mobile App Redesign",
            description: "Complete UI/UX overhaul for mobile application",
            status: "Review",
            progress: 90,
            team: ["👩‍🎨", "👨‍💻"],
            dueDate: "Nov 2024",
            priority: "Medium",
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 3,
            name: "Analytics Dashboard",
            description: "Real-time data visualization dashboard",
            status: "Planning",
            progress: 25,
            team: ["👨‍💻", "👩‍💻", "👨‍🔬"],
            dueDate: "Jan 2025",
            priority: "Low",
            color: "from-purple-500 to-pink-500"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
            case "Review": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
            case "Planning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
            case "Medium": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
            case "Low": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
        }
    };

    return (
        <section className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Projects
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage and track your project portfolio
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg">
                    <span>➕</span>
                    New Project
                </button>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">📊</div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">⚡</div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">✅</div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">63%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {project.name}
                                    </h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                        {project.priority}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Progress Bar */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                    <span className="font-medium">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`bg-gradient-to-r ${project.color} h-2 rounded-full transition-all duration-300`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Team:</span>
                                        <div className="flex -space-x-1">
                                            {project.team.map((member, index) => (
                                                <div key={index} className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                                                    {member}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Due:</span>
                                        <span className="text-sm font-medium">{project.dueDate}</span>
                                    </div>
                                </div>
                                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}