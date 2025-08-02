"use client";

import {ModeToggle} from "@/components/mode-toggle";

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <ModeToggle />
            <h1 className="text-4xl font-bold mb-4">Welcome to My Next.js App</h1>
            <p className="text-lg text-gray-700">
                This is a simple Next.js application styled with Tailwind CSS.
            </p>
            <p className="mt-2 text-sm text-gray-500">
                Explore the code and customize it to your liking!
            </p>
        </div>
    );
}
