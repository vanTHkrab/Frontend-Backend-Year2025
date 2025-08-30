const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const config = require('../config');
const {
    generateAccessToken,
    generateAndStoreRefreshToken,
    revokeRefreshToken,
    isRefreshTokenValid,
} = require('../utils/tokens');
const router = express.Router();
// simple validators
const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body || {};
        if (!validEmail(email) || !nonEmpty(password) || !nonEmpty(name)) {
            return res.status(400).json({ error: 'Invalid input' });
        }
        const [exists] = await pool.execute(`SELECT id FROM users WHERE email = :email LIMIT 1`, { email });
        if (exists.length) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const [result] = await pool.execute(
            `INSERT INTO users (email, password_hash, name) VALUES (:email, :hash, :name)`,
            { email, hash: passwordHash, name }
        );
        return res.status(201).json({ id: result.insertId, email, name });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!validEmail(email) || !nonEmpty(password)) {
            return res.status(400).json({ error: 'Invalid input' });
        }
        const [rows] = await pool.execute(
            `SELECT id, password_hash, name FROM users WHERE email = :email LIMIT 1`,
            { email }
        );
        if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });
        const user = rows[0];
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
        const accessToken = generateAccessToken(user.id);
        const { refreshToken } = await generateAndStoreRefreshToken(user.id);
        return res.json({
            user: { id: user.id, email, name: user.name },
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: config.jwt.accessTtl,
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body || {};
        if (!refreshToken) return res.status(400).json({ error: 'Missing refreshToken' });
        let payload;
        try {
            payload = jwt.verify(refreshToken, config.jwt.refreshSecret);
        } catch (e) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
        if (payload.type !== 'refresh') {
            return res.status(401).json({ error: 'Invalid token type' });
        }
        const userId = payload.sub;
        const jti = payload.jti;
        const valid = await isRefreshTokenValid(userId, jti);
        if (!valid) return res.status(401).json({ error: 'Refresh token revoked or expired' });
// rotate token (revoke current, issue new)
        const { refreshToken: newRefreshToken, jti: newJti } = await generateAndStoreRefreshToken(userId);
        await revokeRefreshToken(jti, newJti);
        const newAccess = generateAccessToken(userId);
        return res.json({
            accessToken: newAccess,
            refreshToken: newRefreshToken,
            tokenType: 'Bearer',
            expiresIn: config.jwt.accessTtl,
        });
    } catch (err) {
        console.error('Refresh error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/auth/logout (revokes the provided refresh token)
router.post('/logout', async (req, res) => {
    try {
        const { refreshToken } = req.body || {};
        if (!refreshToken) return res.status(400).json({ error: 'Missing refreshToken' });
        try {
            const payload = jwt.verify(refreshToken, config.jwt.refreshSecret);
            if (payload.type !== 'refresh') {
                return res.status(400).json({ error: 'Invalid token type' });
            }
            await revokeRefreshToken(payload.jti);
        } catch (e) {
// invalid token still returns ok (no leakage)
        }
        return res.json({ ok: true });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;