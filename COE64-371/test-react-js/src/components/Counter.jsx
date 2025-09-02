import { useState, useEffect } from "react";

function Counter() {
    const [count, setCount] = useState(0); // useState example
    const [message, setMessage] = useState("");

    // useEffect example - runs after every render
    useEffect(() => {
        console.log("Component rendered or count changed");
        document.title = `Count: ${count}`;
    }, [count]); // dependency array - only runs when count changes

    // useEffect example - runs only once (on mount)
    useEffect(() => {
        console.log("Component mounted");
        setMessage("Counter component loaded!");

        // Cleanup function (runs on unmount)
        return () => {
            console.log("Component will unmount");
            document.title = "React App"; // Reset title
        };
    }, []); // empty dependency array = runs only once

    return (
        <div className="p-4 border rounded">
            <h3 className="text-lg font-bold mb-2">useState & useEffect Example</h3>
            <p className="text-green-600 mb-2">{message}</p>
            <p className="mb-2">Count: <span className="font-bold text-blue-600">{count}</span></p>
            <div className="space-x-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setCount(count + 1)}
                >
                    เพิ่ม (+1)
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => setCount(count - 1)}
                >
                    ลด (-1)
                </button>
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setCount(0)}
                >
                    รีเซต
                </button>
            </div>
        </div>
    );
}

export default Counter;