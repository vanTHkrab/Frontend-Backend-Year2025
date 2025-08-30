const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const createProductRouter = require('./router/product.route');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const db = knex(knexConfig);

app.use('/api/products', createProductRouter(db));

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await db('products')
            .distinct('category')
            .whereNot('category', '')
            .orderBy('category');

        res.json(categories.map(item => item.category));
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        await db.raw('SELECT 1');
        res.json({ status: 'OK', database: 'connected' });
    } catch (error) {
        res.status(503).json({ status: 'ERROR', database: 'disconnected' });
    }
});

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
    console.log('  GET    /api/categories');
    console.log('  GET    /api/health');
});