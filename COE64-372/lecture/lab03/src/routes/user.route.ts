import {Request, Response, Router} from 'express';
const router: Router = Router();
import pool from "../db";
import {User} from "../models/user.model";
import {ResultSetHeader} from "mysql2/promise";

router.get('/', async (req: Request, res: Response) => {
    try {
        const { name, email, limit } = req.query;
        const nameFilter = typeof name === 'string' ? `%${name}%` : null;
        const emailFilter = typeof email === 'string' ? `%${email}%` : null;
        const limitValue = typeof limit === 'string' ? parseInt(limit) : 10;
        if (isNaN(limitValue) || limitValue <= 0) {
            return res.status(400).json({error: 'Invalid limit value'});
        }
        const query = 'SELECT `id`, `name`, `email`, `created_at`, `updated_at` FROM users' +
            (nameFilter || emailFilter ? ' WHERE' : '') +
            (nameFilter ? ' name LIKE ?' : '') +
            (emailFilter ? (nameFilter ? ' AND' : '') + ' email LIKE ?' : '') +
            ' LIMIT ?';
        const params: (string | number)[] = [];
        if (nameFilter) params.push(nameFilter);
        if (emailFilter) params.push(emailFilter);
        params.push(limitValue);
        const [rows] = await pool.query<User[]>(query, params);
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
        const [rows] = await pool.query<User[]>('SELECT `id`, `name`, `email`, `created_at`, `updated_at` FROM users WHERE id = ?', [userId]);
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

router.post('/', async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({error: 'Name, email, and password are required'});
    }

    try {
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        res.status(201).json({
            message: "User created successfully",
            data: {id: result.insertId, name, email}
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const {name, email, password} = req.body;

    if (isNaN(userId) || !name || !email || !password) {
        return res.status(400).json({error: 'Invalid user ID or missing fields'});
    }

    try {
        const [result] = await pool.query<ResultSetHeader>('UPDATE users SET name = ?, email = ?, password = ?, updated_at = NOW() WHERE id = ?', [name, email, password, userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json({
            message: "User updated successfully",
            data: {id: userId, name, email, password}
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({error: 'Invalid user ID'});
    }

    try {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router;