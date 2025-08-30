const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
// GET /api/profile/me
router.get('/me', requireAuth, async (req, res) => {
    const userId = req.userId;
    const [rows] = await pool.execute(
        `SELECT id, email, name, created_at, updated_at FROM users WHERE id = :id LIMIT 1`,
        { id: userId }
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    return res.json(rows[0]);
});
// PUT /api/profile/me (update name as example)
router.put('/me', requireAuth, async (req, res) => {
    const userId = req.userId;
    const name = String(req.body?.name || '').trim();
    if (!name) return res.status(400).json({ error: 'Name is required' });
    await pool.execute(`UPDATE users SET name = :name WHERE id = :id`, { name, id: userId });
    const [rows] = await pool.execute(
        `SELECT id, email, name, created_at, updated_at FROM users WHERE id = :id LIMIT 1`,
        { id: userId }
    );
    return res.json(rows[0]);
});
module.exports = router;