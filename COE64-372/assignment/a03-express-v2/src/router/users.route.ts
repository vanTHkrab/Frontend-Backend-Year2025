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

// กิจกรรม
router.post('/activities', validateCreateActivity, createActivity);
router.get('/activities', getActivities);
router.get('/activities/:id', getActivityById);

// ผู้ใช้งาน
router.get('/users', getUsersList);
router.get('/users/:user_id/summary', getUserSummary);
router.get('/users/:user_id/stats', getActivityStats);

// รายงาน
router.get('/users/:user_id/progress/:date', getDailyGoalProgress);

export default router;