import express from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse, ActivityQuery } from '../types';
import {
    validateSchema,
    userRegistrationSchema,
    activitySchema,
    updateActivitySchema
} from '../middleware/validation';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();

        const response: ApiResponse = {
            success: true,
            data: users
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// POST /api/users/register
router.post('/register', validateSchema(userRegistrationSchema), async (req, res, next) => {
    try {
        const userData = await UserService.registerUser(req.body);

        const response: ApiResponse = {
            success: true,
            message: 'User registered successfully',
            data: userData
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
    try {
        const userInfo = await UserService.getUserInfo(req.params.userId);

        const response: ApiResponse = {
            success: true,
            data: userInfo
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// POST /api/users/:userId/activities
router.post('/:userId/activities', validateSchema(activitySchema), async (req, res, next) => {
    try {
        const activity = await UserService.createActivity(req.params.userId, req.body);

        const response: ApiResponse = {
            success: true,
            message: 'Activity recorded successfully',
            data: activity
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

// GET /api/users/:userId/activities
router.get('/:userId/activities', async (req, res, next) => {
    try {
        // Parse and validate query parameters
        let limit = parseInt(req.query.limit as string);
        let offset = parseInt(req.query.offset as string);

        // Set defaults and validate ranges
        if (isNaN(limit) || limit <= 0) limit = 10;
        if (isNaN(offset) || offset < 0) offset = 0;
        if (limit > 100) limit = 100; // Max limit for safety

        const query: ActivityQuery = {
            limit,
            offset,
            date: req.query.date as string || undefined
        };

        console.log('Query params:', query); // Debug log

        const result = await UserService.getUserActivities(req.params.userId, query);

        const response: ApiResponse = {
            success: true,
            data: result
        };

        res.json(response);
    } catch (error) {
        console.error('Route error:', error); // Debug log
        next(error);
    }
});


// GET /api/users/:userId/activities/:activityId
router.get('/:userId/activities/:activityId', async (req, res, next) => {
    try {
        const activity = await UserService.getActivityById(
            req.params.userId,
            parseInt(req.params.activityId)
        );

        const response: ApiResponse = {
            success: true,
            data: activity
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// PUT /api/users/:userId/activities/:activityId
router.put('/:userId/activities/:activityId', validateSchema(updateActivitySchema), async (req, res, next) => {
    try {
        const activity = await UserService.updateActivity(
            req.params.userId,
            parseInt(req.params.activityId),
            req.body
        );

        const response: ApiResponse = {
            success: true,
            message: 'Activity updated successfully',
            data: activity
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/users/:userId/activities/:activityId
router.delete('/:userId/activities/:activityId', async (req, res, next) => {
    try {
        await UserService.deleteActivity(
            req.params.userId,
            parseInt(req.params.activityId)
        );

        const response: ApiResponse = {
            success: true,
            message: 'Activity deleted successfully'
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /api/users/:userId   /goals/today
router.get('/:userId/goals/today', async (req, res, next) => {
    try {
        const goals = await UserService.getTodayGoals(req.params.userId);

        const response: ApiResponse = {
            success: true,
            data: goals
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /api/users/:userId/statistics
router.get('/:userId/statistics', async (req, res, next) => {
    try {
        const period = req.query.period as string || 'monthly';
        const stats = await UserService.getUserStatistics(req.params.userId, period);

        const response: ApiResponse = {
            success: true,
            data: {
                period,
                ...stats
            }
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

export default router;