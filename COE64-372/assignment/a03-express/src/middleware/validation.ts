import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const userRegistrationSchema = Joi.object({
    user_id: Joi.string().alphanum().min(3).max(50).required(),
    user_name: Joi.string().min(1).max(100).required(),
    user_email: Joi.string().email().max(255).required()
});

export const activitySchema = Joi.object({
    activity_name: Joi.string().min(1).max(200).required(),
    activity_description: Joi.string().max(1000).optional().allow(''),
    activity_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    activity_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    goal_description: Joi.string().max(1000).optional().allow(''),
    is_goal_achieved: Joi.boolean().required()
});

export const updateActivitySchema = Joi.object({
    activity_name: Joi.string().min(1).max(200).optional(),
    activity_description: Joi.string().max(1000).optional().allow(''),
    activity_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    goal_description: Joi.string().max(1000).optional().allow(''),
    is_goal_achieved: Joi.boolean().optional()
});

export const validateSchema = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const response: ApiResponse = {
                success: false,
                message: 'Validation error',
                error_code: 'VALIDATION_ERROR',
                details: error.details.reduce((acc, detail) => {
                    acc[detail.path.join('.')] = detail.message;
                    return acc;
                }, {} as any),
                timestamp: new Date().toISOString()
            };

            return res.status(400).json(response);
        }

        next();
    };
};
