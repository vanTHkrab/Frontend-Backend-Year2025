// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/apiError';

// Middleware สำหรับจัดการข้อผิดพลาดส่วนกลาง
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors: any[] = [];

    // ถ้า error เป็น instance ของ ApiError ที่เราสร้างขึ้น
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    } else {
        // สำหรับ error ที่ไม่ใช่ ApiError
        console.error('Unhandled Error:', err); // Log error ที่ไม่ได้ถูกจัดการ
        message = process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message;
        errors.push({ msg: err.message });
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // แสดง stack trace เฉพาะตอน dev
    });
};