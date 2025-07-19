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

type PasswordStrength = 'weak' | 'medium' | 'strong';

function App() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [openPassword, setOpenPassword] = useState<boolean>(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const isNameValid = useCallback((name: string) => {
        return name.trim() !== '';
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = useCallback((email: string) => {
        return emailRegex.test(email);
    }, []);

    const passwordStrength = useCallback((password: string): PasswordStrength => {
        if (password.length < 8) {
            return 'weak';
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = (password.match(/\d/g) || []).length >= 2; // At least 2 numbers
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);

        if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
            return 'strong';
        }

        const criteriaCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
        if (criteriaCount >= 2) {
            return 'medium';
        }

        return 'weak';
    }, []);

    const getPasswordRequirements = useCallback((password: string) => {
        const requirements = [];

        if (password.length < 8) {
            requirements.push('รวมกันไม่ต่ำกว่า 8 ตัว');
        }
        if (!/[A-Z]/.test(password)) {
            requirements.push('ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว');
        }
        if (!/[a-z]/.test(password)) {
            requirements.push('ตัวพิมพ์เล็กอย่างน้อย 1 ตัว');
        }
        if ((password.match(/\d/g) || []).length < 2) {
            requirements.push('ตัวเลขอย่างน้อย 2 ตัว');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
            requirements.push('ตัวอักษรพิเศษอย่างน้อย 1 ตัว');
        }

        return requirements;
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError('');
        setNameError('');
        setEmailError('');

        let hasErrors = false;

        if (!isNameValid(formData.name)) {
            setNameError('Name is required.');
            hasErrors = true;
        }

        if (!isEmailValid(formData.email)) {
            setEmailError('Please enter a valid email address.');
            hasErrors = true;
        }

        if (!formData.password) {
            setPasswordError('Password is required.');
            hasErrors = true;
        } else {
            const strength = passwordStrength(formData.password);
            const missingRequirements = getPasswordRequirements(formData.password);

            if (strength === 'weak') {
                setPasswordError(`Password is too weak. Missing: ${missingRequirements.join(', ')}`);
                hasErrors = true;
            } else if (strength === 'medium') {
                setPasswordError(`Password is medium strength. Missing: ${missingRequirements.join(', ')}`);
                hasErrors = true;
            }
        }

        if (!hasErrors) {
            setIsSubmitted(true);
            console.log('Form submitted successfully:', formData);
        }
    }, [formData, isNameValid, isEmailValid, passwordStrength, getPasswordRequirements]);

    const currentPasswordStrength = formData.password ? passwordStrength(formData.password) : null;

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
                    type={openPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />

                {formData.password && (
                    <div className="mb-2">
                        <div className="text-sm text-gray-600 mb-1">Password Strength:</div>
                        <div className={`text-sm font-medium ${
                            currentPasswordStrength === 'strong' ? 'text-green-600' :
                                currentPasswordStrength === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                            {currentPasswordStrength === 'strong' ? '🟢 Strong' :
                                currentPasswordStrength === 'medium' ? '🟡 Medium' : '🔴 Weak'}
                        </div>
                    </div>
                )}

                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="showPassword"
                        className="mr-2"
                        checked={openPassword}
                        onChange={() => setOpenPassword(!openPassword)}
                    />
                    <label htmlFor="showPassword" className="text-sm text-gray-700">
                        Show Password
                    </label>
                </div>

                {passwordError && (
                    <div className="text-red-500 text-sm mb-4">
                        {passwordError}
                    </div>
                )}

                <div className="text-xs text-gray-600 mb-4">
                    <div className="font-medium mb-1">Password Requirements:</div>
                    <ul className="list-disc list-inside space-y-1">
                        <li>รวมกันไม่ต่ำกว่า 8 ตัว</li>
                        <li>ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
                        <li>ตัวพิมพ์เล็กอย่างน้อย 1 ตัว</li>
                        <li>ตัวเลขอย่างน้อย 2 ตัว</li>
                        <li>ตัวอักษรพิเศษอย่างน้อย 1 ตัว (!@#$%^&* etc.)</li>
                    </ul>
                </div>

                <ButtonSubmit
                    className="w-full"
                    label="Submit"
                    type="submit"
                />
            </form>

            {isSubmitted && (
                <div className="mt-4 text-green-500 text-center">
                    Form submitted successfully!
                </div>
            )}
        </div>
    )
}

export default App