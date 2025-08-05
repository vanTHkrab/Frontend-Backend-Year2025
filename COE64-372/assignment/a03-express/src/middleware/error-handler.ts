import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export class AppError extends Error {
    public statusCode: number;
    public errorCode: string;
    public details?: any;

    constructor(message: string, statusCode: number, errorCode: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.name = this.constructor.name;
    }
}

export const errorHandler = (
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error);

    if (error instanceof AppError) {
        const response: ApiResponse = {
            success: false,
            message: error.message,
            error_code: error.errorCode,
            details: error.details,
            timestamp: new Date().toISOString()
        };

        return res.status(error.statusCode).json(response);
    }

    // Database errors
    if (error.message.includes('ER_DUP_ENTRY')) {
        const response: ApiResponse = {
            success: false,
            message: 'Duplicate entry found',
            error_code: 'DUPLICATE_ENTRY',
            timestamp: new Date().toISOString()
        };

        return res.status(409).json(response);
    }

    // Default error
    const response: ApiResponse = {
        success: false,
        message: 'Internal server error',
        error_code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
};