const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const {port} = require('./config');

const notificationRoutes = require('./notifications/notification.route');
const authRoutes = require('./auth/auth.route');

const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
app.use(express.json({limit: '10mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = knex(knexConfig);

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/auth', authLimiter);

app.use('/api/notifications', notificationRoutes(db));
app.use('/api/auth', authRoutes);

app.get('/health', (_req, res) => res.json({ok: true}));

process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await db.destroy();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await db.destroy();
    process.exit(0);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
})