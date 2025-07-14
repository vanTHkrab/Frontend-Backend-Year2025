import { ApiError } from '../errors/apiError';

export class Validator {
    public static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public static isStrongPassword(password: string): boolean {
        // อย่างน้อย 8 ตัวอักษร, มีตัวอักษรพิมพ์ใหญ่, พิมพ์เล็ก, ตัวเลข, และสัญลักษณ์
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        return strongRegex.test(password);
    }

    public static validateUserCreation(username: string, email: string, password: string): void {
        if (!username || username.trim() === '') {
            throw new ApiError(400, 'Username cannot be empty.');
        }
        if (!email || !this.isValidEmail(email)) {
            throw new ApiError(400, 'Invalid email format.');
        }
        if (!password || password.length < 6) {
            throw new ApiError(400, 'Password must be at least 6 characters long.');
        }
        // if (!this.isStrongPassword(password)) {
        //     throw new ApiError(400, 'Password is not strong enough.');
        // }
    }
}