import { useState, useCallback, memo } from "react";

// Memoized child component to demonstrate useCallback benefits
const Child = memo(({ onClick, onDelete, label }) => {
    console.log(`🔄 Child "${label}" re-rendered`);
    return (
        <div className="bg-blue-50 p-2 rounded mb-2">
            <p className="text-sm font-medium">{label}</p>
            <div className="space-x-2 mt-1">
                <button
                    className="bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600"
                    onClick={onClick}
                >
                    Click Me
                </button>
                <button
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
});

function Parent() {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" }
    ]);

    // useCallback example - function that doesn't change on every render
    const handleClick = useCallback((itemName) => {
        console.log(`🎯 Clicked on ${itemName}!`);
        alert(`You clicked on ${itemName}!`);
    }, []); // No dependencies, so function never changes

    // useCallback with dependencies
    const handleDelete = useCallback((itemId) => {
        console.log(`🗑️ Deleting item ${itemId}`);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }, [setItems]); // Depends on setItems (though setItems is stable)

    // This function is NOT memoized - will cause child re-renders
    const handleClickNotMemoized = (itemName) => {
        console.log(`🎯 Clicked on ${itemName}! (not memoized)`);
        alert(`You clicked on ${itemName}! (not memoized)`);
    };

    const addItem = () => {
        const newId = Math.max(...items.map(item => item.id), 0) + 1;
        setItems(prev => [...prev, { id: newId, name: `Item ${newId}` }]);
    };

    return (
        <div className="p-4 border rounded">
            <h3 className="text-lg font-bold mb-2">useCallback Example</h3>
            <p className="text-sm text-gray-600 mb-4">
                Check console to see which children re-render
            </p>

            <div className="mb-4">
                <p className="mb-2">Parent Count: <span className="font-bold text-purple-600">{count}</span></p>
                <div className="space-x-2 mb-4">
                    <button
                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                        onClick={() => setCount(count + 1)}
                    >
                        Increment Count (triggers re-render)
                    </button>
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={addItem}
                    >
                        Add Item
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-green-700 mb-2">With useCallback (optimized)</h4>
                    {items.map(item => (
                        <Child
                            key={`optimized-${item.id}`}
                            label={`${item.name} (Optimized)`}
                            onClick={() => handleClick(item.name)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </div>

                <div>
                    <h4 className="font-semibold text-red-700 mb-2">Without useCallback (not optimized)</h4>
                    {items.map(item => (
                        <Child
                            key={`not-optimized-${item.id}`}
                            label={`${item.name} (Not Optimized)`}
                            onClick={() => handleClickNotMemoized(item.name)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Parent;