import { useState, useEffect, useCallback, useMemo, memo } from "react";

// Memoized component for performance demonstration
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
    console.log(`🔄 TodoItem "${todo.text}" rendered`);
    
    return (
        <div className={`flex items-center justify-between p-2 rounded mb-1 ${
            todo.completed ? 'bg-green-100 line-through' : 'bg-gray-50'
        }`}>
            <span className="flex-1">{todo.text}</span>
            <div className="space-x-2">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`px-2 py-1 text-xs rounded ${
                        todo.completed 
                            ? 'bg-yellow-500 hover:bg-yellow-600' 
                            : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                >
                    {todo.completed ? 'Undo' : 'Done'}
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
});

function AllHooksExample() {
    // useState - Managing component state
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn useState", completed: true },
        { id: 2, text: "Learn useEffect", completed: true },
        { id: 3, text: "Learn useCallback", completed: false },
        { id: 4, text: "Learn useMemo", completed: false }
    ]);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState("all"); // all, completed, pending
    const [mounted, setMounted] = useState(false);

    // useEffect - Side effects and lifecycle
    useEffect(() => {
        console.log("🚀 AllHooksExample component mounted");
        setMounted(true);
        
        // Cleanup function
        return () => {
            console.log("🔚 AllHooksExample component will unmount");
        };
    }, []); // Run once on mount

    useEffect(() => {
        console.log("📝 Todos changed:", todos);
        // Save to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]); // Run when todos change

    useEffect(() => {
        console.log("🔍 Filter changed to:", filter);
        document.title = `Todo App - ${filter} (${todos.length} items)`;
    }, [filter, todos.length]); // Run when filter or todos count changes

    // useMemo - Expensive calculations that should be memoized
    const filteredTodos = useMemo(() => {
        console.log("🔄 Filtering todos...");
        switch (filter) {
            case "completed":
                return todos.filter(todo => todo.completed);
            case "pending":
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]); // Only recalculate when todos or filter changes

    const todoStats = useMemo(() => {
        console.log("📊 Calculating todo statistics...");
        const completed = todos.filter(todo => todo.completed).length;
        const pending = todos.length - completed;
        const completionRate = todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;
        
        return { completed, pending, total: todos.length, completionRate };
    }, [todos]); // Only recalculate when todos change

    // useCallback - Memoized event handlers to prevent unnecessary re-renders
    const handleToggleTodo = useCallback((id) => {
        console.log(`✅ Toggling todo ${id}`);
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []); // No dependencies needed since we use functional update

    const handleDeleteTodo = useCallback((id) => {
        console.log(`🗑️ Deleting todo ${id}`);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []); // No dependencies needed since we use functional update

    const handleAddTodo = useCallback(() => {
        if (newTodo.trim()) {
            const newId = Math.max(...todos.map(t => t.id), 0) + 1;
            setTodos(prevTodos => [
                ...prevTodos,
                { id: newId, text: newTodo.trim(), completed: false }
            ]);
            setNewTodo("");
        }
    }, [newTodo, todos]); // Depends on newTodo and todos for ID generation

    if (!mounted) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 border rounded max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-4">All Hooks Example - Todo App</h3>
            <p className="text-sm text-gray-600 mb-4">
                This component demonstrates useState, useEffect, useCallback, and useMemo
            </p>

            {/* Statistics (useMemo) */}
            <div className="bg-blue-50 p-3 rounded mb-4">
                <h4 className="font-semibold mb-2">Statistics (useMemo)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Total: {todoStats.total}</div>
                    <div>Completed: {todoStats.completed}</div>
                    <div>Pending: {todoStats.pending}</div>
                    <div>Progress: {todoStats.completionRate}%</div>
                </div>
            </div>

            {/* Add new todo (useState) */}
            <div className="mb-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                        placeholder="Add new todo..."
                        className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Filter buttons (useState + useEffect) */}
            <div className="mb-4">
                <div className="flex space-x-2">
                    {["all", "pending", "completed"].map(filterType => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-3 py-1 text-sm rounded capitalize ${
                                filter === filterType
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {filterType}
                        </button>
                    ))}
                </div>
            </div>

            {/* Todo list (useCallback + memo) */}
            <div className="space-y-1">
                {filteredTodos.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No todos found</p>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default AllHooksExample;
