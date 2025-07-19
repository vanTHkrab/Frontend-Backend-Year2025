import {Request, Response, Router} from 'express';
const router: Router = Router();
import pool from "../db";
import {User} from "../models/user.model";


router.get('/', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query<User[]>('SELECT * FROM users');
        res.status(200).json({
            message: "Success",
            data: rows
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({error: 'Invalid user ID'});
    }

    try {
        const [rows] = await pool.query<User[]>('SELECT * FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json({
            message: "Success",
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router;