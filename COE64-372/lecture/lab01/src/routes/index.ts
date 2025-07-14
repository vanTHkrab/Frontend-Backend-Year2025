import { Router } from 'express';
import userRoutes from './user.route';

const router = Router();

// Define base paths for each resource
router.use('/users', userRoutes);


export default router;