import { Router } from 'express';
import {
    createActivity,
    getActivities,
    getActivityById,
    getUsersList,
    getUserSummary,
    getDailyGoalProgress,
    getActivityStats
} from '../controllers/activityController';
import { validateCreateActivity } from '../middleware/validation';

const router = Router();

// activities
router.post('/activities', validateCreateActivity, createActivity);
router.get('/activities', getActivities);
router.get('/activities/:id', getActivityById);

// users
router.get('/users', getUsersList);
router.get('/users/:user_id/summary', getUserSummary);
router.get('/users/:user_id/stats', getActivityStats);

// daily goal progress
router.get('/users/:user_id/progress/:date', getDailyGoalProgress);

export default router;