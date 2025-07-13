import { useState } from "react";
import { InputField } from "./components/InputField";
import { Button } from "./components/Button";
import { DisplayMessage } from "./components/DisplayMessage.tsx";
import "./App.css"; // Assuming you have a CSS file for global styles

type Name = string;
type Score = number;
type Result = string;
type Style = string;

function App() {
    const [name, setName] = useState<Name>('');
    const [score, setScore] = useState<Score>(0);
    const [result, setResult] = useState<Result>('');
    const [style, setStyle] = useState<Style>('text-black');

    const checkGrade = (score: Score) => {
        if (score < 0 || score > 100) {
            setResult("Please enter a valid score between 0 and 100.");
            setStyle("text-red-500");
        } else if (score >= 90) {
            setResult(`${name}, you got an A!`);
            setStyle("text-green-500");
        } else if (score >= 80) {
            setResult(`${name}, you got a B!`);
            setStyle("text-blue-500");
        } else if (score >= 70) {
            setResult(`${name}, you got a C.`);
            setStyle("text-yellow-500");
        } else if (score >= 60) {
            setResult(`${name}, you got a D.`);
            setStyle("text-orange-500");
        } else {
            setResult(`${name}, you got an F. Better luck next time!`);
            setStyle("text-red-500");
        }
    };

    const handleSubmit = () => {
        if (name.trim() === '') {
            setResult('Please enter your name.');
            setStyle('text-red-500');
            return;
        }
        if (score < 0 || score > 100) {
            setResult('Score must be between 0 and 100.');
            setStyle('text-red-500');
            return;
        }
        checkGrade(score);
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Score Tracker</h1>

                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <InputField
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <InputField
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            type="number"
                            placeholder="Enter Score"
                            value={score.toString()}
                            onChange={(e) =>  setScore(Number(e.target.value))}
                        />

                        <Button
                            onClick={handleSubmit}
                            className="w-full"
                        >
                            Check Grade
                        </Button>
                        <DisplayMessage message={result} style={style} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;