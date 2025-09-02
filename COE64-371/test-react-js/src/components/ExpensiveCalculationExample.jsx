import { useState, useMemo } from "react";

function ExpensiveCalculationExample() {
    const [count, setCount] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [rerenderTrigger, setRerenderTrigger] = useState(0);

    // useMemo example - expensive calculation that only runs when dependencies change
    const expensiveValue = useMemo(() => {
        console.log("🔄 คำนวณใหม่... (expensive calculation running)");
        // Simulate expensive calculation
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += count * multiplier;
        }
        return result;
    }, [count, multiplier]); // Only recalculates when count or multiplier changes

    // Another useMemo example for array processing
    const processedData = useMemo(() => {
        console.log("📊 Processing array data...");
        return Array.from({ length: count + 1 }, (_, i) => ({
            id: i,
            value: i * multiplier,
            isEven: i % 2 === 0
        }));
    }, [count, multiplier]);

    return (
        <div className="p-4 border rounded">
            <h3 className="text-lg font-bold mb-2">useMemo Example</h3>
            <p className="text-sm text-gray-600 mb-4">
                Check console to see when expensive calculations run
            </p>

            <div className="space-y-2 mb-4">
                <div>
                    <label className="block text-sm font-medium">Count: {count}</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Multiplier: {multiplier}</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-3">
                <p className="text-sm">
                    <strong>Expensive Result:</strong> {expensiveValue.toLocaleString()}
                </p>
                <p className="text-sm">
                    <strong>Array Length:</strong> {processedData.length}
                </p>
                <p className="text-sm">
                    <strong>Even Numbers:</strong> {processedData.filter(item => item.isEven).length}
                </p>
            </div>

            <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                onClick={() => setRerenderTrigger(prev => prev + 1)}
            >
                Force Re-render (won't recalculate) - {rerenderTrigger}
            </button>
        </div>
    );
}

export default ExpensiveCalculationExample;