// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../errors/apiError';
import User, { IUser } from '../models/user.model'; // Import User model for type checking and finding user

// ขยาย Request interface เพื่อเพิ่ม user property
declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Optional user property
        }
    }
}

interface JwtPayload {
    id: string;
    role: string;
}

export const authenticate = (roles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let token: string | undefined;

        // ตรวจสอบว่ามี Authorization header และเป็น Bearer token หรือไม่
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new ApiError(401, 'No token, authorization denied.'));
        }

        try {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error('JWT_SECRET is not defined.');
            }

            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

            // ค้นหา User จาก ID ใน Token (ไม่ดึง password กลับมา)
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return next(new ApiError(401, 'User not found or token invalid.'));
            }

            // ตรวจสอบสิทธิ์ (Role-Based Access Control)
            if (roles.length > 0 && !roles.includes(user.role)) {
                return next(new ApiError(403, 'Forbidden: You do not have permission to access this resource.'));
            }

            // เพิ่มข้อมูล user ไปใน Request object เพื่อให้ Controller หรือ Middleware ถัดไปใช้งานได้
            req.user = user;
            next();

        } catch (error: any) {
            if (error instanceof jwt.JsonWebTokenError) {
                return next(new ApiError(401, 'Token is not valid.'));
            }
            next(new ApiError(500, 'Server error during authentication.'));
        }
    };
};