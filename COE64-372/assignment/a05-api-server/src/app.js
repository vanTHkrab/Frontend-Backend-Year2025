const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const createProductRouter = require('./products/product.route');
const helmet = require('helmet');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
));
app.use(express.json({ limit: '10mb' }));

const db = knex(knexConfig);

app.use('/api/products', createProductRouter(db));

app.get('/health', (_req, res) => res.json({ ok: true }));

// Graceful shutdown
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

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET    /api/products');
    console.log('  GET    /api/products/:id');
    console.log('  POST   /api/products');
    console.log('  PUT    /api/products/:id');
    console.log('  DELETE /api/products/:id');
    console.log('  GET    /api/products/categories/list');
    console.log('  GET    /api/health');
});