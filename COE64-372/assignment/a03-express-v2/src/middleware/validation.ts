import { body } from 'express-validator';

export const validateCreateActivity = [
    body('user_name')
        .notEmpty()
        .withMessage('User name is required')
        .isLength({ min: 2, max: 255 })
        .withMessage('User name must be between 2-255 characters'),
    body('user_email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
    body('user_id')
        .notEmpty()
        .withMessage('User ID is required')
        .isLength({ min: 1, max: 100 })
        .withMessage('User ID must be between 1-100 characters'),
    body('goal_title')
        .notEmpty()
        .withMessage('Goal title is required')
        .isLength({ max: 500 })
        .withMessage('Goal title must not exceed 500 characters'),
    body('activity_name')
        .notEmpty()
        .withMessage('Activity name is required')
        .isLength({ max: 500 })
        .withMessage('Activity name must not exceed 500 characters'),
    body('activity_description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Activity description must not exceed 1000 characters'),
    body('completed_at')
        .optional()
        .isISO8601()
        .withMessage('completed_at must be a valid ISO 8601 date')
];