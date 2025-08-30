const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const pool = require('../db');

function generateAccessToken(userId) {
    return jwt.sign(
        { sub: userId, type: 'access' },
        config.jwt.accessSecret,
        { expiresIn: config.jwt.accessTtl }
    );
}

async function generateAndStoreRefreshToken(userId) {
    const jti = uuidv4();
    const refreshToken = jwt.sign(
        { sub: userId, type: 'refresh', jti },
        config.jwt.refreshSecret,
        { expiresIn: config.jwt.refreshTtl }
    );
// Calculate expiry date (from now + REFRESH_TOKEN_TTL)
    const now = Date.now();
    const msInDay = 24 * 60 * 60 * 1000; // naive parse: default 7d; if you change REFRESH_TOKEN_TTL, adjust this parser
    const ttlDays = String(config.jwt.refreshTtl).endsWith('d')
        ? parseInt(String(config.jwt.refreshTtl), 10)
        : 7; // Default to 7 days if refreshTtl is not 'Xd' format
    const expiresAt = new Date(now + ttlDays * msInDay);
    await pool.execute(
        `INSERT INTO refresh_tokens (user_id, jti, expires_at) VALUES (:user_id, :jti, :expires_at)`,
        { user_id: userId, jti, expires_at: expiresAt }
    );
    return { refreshToken, jti };
}

async function revokeRefreshToken(jti, replacedByJti = null) {
    await pool.execute(
        `UPDATE refresh_tokens SET revoked = 1, replaced_by_jti = :replaced WHERE jti = :jti`,
        { replaced: replacedByJti, jti }
    );
}

async function isRefreshTokenValid(userId, jti) {
    const [rows] = await pool.execute(
        `SELECT revoked, expires_at FROM refresh_tokens WHERE user_id = :uid AND jti = :jti LIMIT 1`,
        { uid: userId, jti }
    );
    if (!rows.length) return false;
    const row = rows[0];
    if (row.revoked) return false;
    if (new Date(row.expires_at).getTime() < Date.now()) return false;
    return true;
}

module.exports = {
    generateAccessToken,
    generateAndStoreRefreshToken,
    revokeRefreshToken,
    isRefreshTokenValid,
};