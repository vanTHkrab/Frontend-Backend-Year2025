// 66133505 Audsadawut Nakthungtao

import React, { useState, useEffect } from 'react';

function Calculator() {
    const [display, setDisplay] = useState('0');
    const [prev, setPrev] = useState(null);
    const [op, setOp] = useState(null);
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        const handleKey = (e) => {
            const k = e.key;
            if (/[0-9]/.test(k)) inputNum(k);
            else if (['+', '-', '*', '/'].includes(k)) inputOp(k);
            else if (k === '=' || k === 'Enter') calc();
            else if (k === 'Escape' || k === 'c' || k === 'C') clear();
            else if (k === '.') inputDot();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [display, prev, op, waiting]);

    const inputNum = (n) => {
        setDisplay(waiting ? n : display === '0' ? n : display + n);
        setWaiting(false);
    };

    const inputOp = (nextOp) => {
        const val = parseFloat(display);
        if (prev !== null && op && !waiting) {
            const result = calculate(prev, val, op);
            setDisplay(String(result));
            setPrev(result);
        } else {
            setPrev(val);
        }
        setOp(nextOp);
        setWaiting(true);
    };

    const calculate = (a, b, operation) => {
        switch (operation) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : a;
            default: return b;
        }
    };

    const calc = () => {
        if (prev !== null && op) {
            const result = calculate(prev, parseFloat(display), op);
            setDisplay(String(result));
            setPrev(null);
            setOp(null);
            setWaiting(true);
        }
    };

    const clear = () => {
        setDisplay('0');
        setPrev(null);
        setOp(null);
        setWaiting(false);
    };

    const inputDot = () => {
        if (waiting) {
            setDisplay('0.');
            setWaiting(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const Btn = ({ children, onClick, className = '' }) => (
        <button
            onClick={onClick}
            className={`px-4 py-3 font-semibold rounded-lg transition-colors shadow-md ${className}`}
        >
            {children}
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
            <div className="max-w-sm mx-auto p-6 bg-gray-900 rounded-xl shadow-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Calculator</h1>

                <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                    <div className="text-right text-3xl font-mono text-white min-h-[3rem] flex items-center justify-end">
                        {display}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <Btn onClick={clear} className="col-span-2 bg-red-500 hover:bg-red-600 text-white">Clear</Btn>
                    <Btn onClick={() => inputOp('/')} className="bg-orange-500 hover:bg-orange-600 text-white">÷</Btn>
                    <Btn onClick={() => inputOp('*')} className="bg-orange-500 hover:bg-orange-600 text-white">×</Btn>

                    {[7, 8, 9].map(n => (
                        <Btn key={n} onClick={() => inputNum(String(n))} className="bg-gray-700 hover:bg-gray-600 text-white">{n}</Btn>
                    ))}
                    <Btn onClick={() => inputOp('-')} className="bg-orange-500 hover:bg-orange-600 text-white">−</Btn>

                    {[4, 5, 6].map(n => (
                        <Btn key={n} onClick={() => inputNum(String(n))} className="bg-gray-700 hover:bg-gray-600 text-white">{n}</Btn>
                    ))}
                    <Btn onClick={() => inputOp('+')} className="bg-orange-500 hover:bg-orange-600 text-white">+</Btn>

                    {[1, 2, 3].map(n => (
                        <Btn key={n} onClick={() => inputNum(String(n))} className="bg-gray-700 hover:bg-gray-600 text-white">{n}</Btn>
                    ))}
                    <Btn onClick={calc} className="row-span-2 bg-blue-600 hover:bg-blue-700 text-white">=</Btn>

                    <Btn onClick={() => inputNum('0')} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white">0</Btn>
                    <Btn onClick={inputDot} className="bg-gray-700 hover:bg-gray-600 text-white">.</Btn>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div>
            <Calculator />
        </div>
    );
}