const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const pool = require('./db');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const app = express();
// Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
// Throttle auth endpoints to reduce brute force
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/auth', authLimiter);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
// Health
app.get('/health', (_req, res) => res.json({ ok: true }));
// Start server after verifying DB connectivity
(async () => {
    try {
        await pool.query('SELECT 1');
        app.listen(config.port, () => {
            console.log(`API listening on http://localhost:${config.port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MySQL:', err);
        process.exit(1);
    }
})();