import * as React from 'react'
import {useCallback, useState} from 'react'
import {InputField} from './components/Input'
import {ButtonSubmit} from "./components/ButtonSubmit.tsx";
import './App.css'

type FormData = {
    name: string;
    email: string;
    password: string;
}

function App() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });

    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = useCallback((email: string) => {
        return emailRegex.test(email);
    }, []);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isPasswordValid = useCallback((password: string) => {
        return passwordRegex.test(password);
    }, []);

    const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError('');
        setNameError('');
        setEmailError('');
        if (!formData.name) {
            setNameError('Name is required.');
            return;
        }
        if (!isEmailValid(formData.email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        if (!isPasswordValid(formData.password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }
        console.log('Form submitted:', formData);

    });

    return (
        <div className="container mx-auto p-4">
            <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <InputField
                    label="Your Name"
                    className="border border-gray-300 rounded-lg p-2 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />
                {nameError && (
                    <div className="text-red-500 text-sm mb-4">
                        {nameError}
                    </div>
                )}
                <InputField
                    label="Email Address"
                    className="border border-gray-300 rounded-lg p-2 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
                {emailError && (
                    <div className="text-red-500 text-sm mb-4">
                        {emailError}
                    </div>
                )}
                <InputField
                    label="Password"
                    className="border border-gray-300 rounded-lg p-2 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
                {passwordError && (
                    <div className="text-red-500 text-sm mb-4">
                        {passwordError}
                    </div>
                )}
                <ButtonSubmit
                    className="w-full"
                    label="Submit"
                    type="submit"
                />
            </form>
        </div>
    )
}

export default App
