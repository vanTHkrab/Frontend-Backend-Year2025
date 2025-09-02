import './App.css'
import Counter from './components/Counter'
import ExpensiveCalculationExample from "./components/ExpensiveCalculationExample.jsx";
import Parent from "./components/CallbackTest.jsx";
import AllHooksExample from "./components/AllHooksExample.jsx";

function App() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">React Hooks Examples</h1>
            </div>

            {/* Comprehensive example showing all hooks together */}
            <div className="mb-8">
                <AllHooksExample />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">useState & useEffect</h2>
                    <Counter />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">useMemo</h2>
                    <ExpensiveCalculationExample />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">useCallback</h2>
                    <Parent />
                </div>
            </div>
        </div>
    )
}

export default App
