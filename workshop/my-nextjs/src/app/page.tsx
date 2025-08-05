"use client";

import {ModeToggle} from "@/components/mode-toggle";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
            <div className="container max-w-xl mx-auto p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md border border-gray-200">
                <div className="flex justify-end mb-6">
                    <ModeToggle />
                </div>
                <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 drop-shadow-lg">Welcome to My Next.js App</h1>
                <p className="text-lg text-gray-700 text-center mb-4">
                    This is a simple Next.js application styled with <span className="font-semibold text-blue-600">Tailwind CSS</span>.
                </p>
                <p className="mt-2 text-sm text-gray-500 text-center">
                    Explore the code and customize it to your liking!
                    <br />
                    <span className="italic">Don&apos;t forget to check out the documentation for more information.</span>
                </p>
            </div>
        </div>
    );
}
