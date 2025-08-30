const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const knex = require('knex');
const knexConfig = require('../knexfile');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Knex with configuration
const db = knex(knexConfig);

// Validation schema สำหรับการเพิ่มสินค้า
const productSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(2).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().allow('').default(''),
    description: Joi.string().allow('').default(''),
    imageUrl: Joi.string().uri().allow('').default('')
});

// Validation schema สำหรับการอัพเดทสินค้า
const updateProductSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(2),
    price: Joi.number().min(0),
    category: Joi.string().allow(''),
    description: Joi.string().allow(''),
    imageUrl: Joi.string().uri().allow('')
}).min(1); // อย่างน้อยต้องมี 1 field

// GET /api/products?q=&category=&page=&limit=
app.get('/api/products', async (req, res) => {
    try {
        const { q = '', category = '', page = '1', limit = '10' } = req.query;
        const p = parseInt(page, 10) || 1;
        const l = Math.min(parseInt(limit, 10) || 10, 100);

        let query = db('products');

        if (q) {
            query = query.where('name', 'like', `%${q}%`);
        }

        if (category) {
            query = query.where('category', category);
        }

        const totalResult = await query.clone().clearSelect().count('* as count').first();
        const total = parseInt(totalResult.count, 10);

        const offset = (p - 1) * l;
        const products = await query
            .clone()
            .select('*')
            .orderBy('created_at', 'desc')
            .limit(l)
            .offset(offset);

        res.json({
            data: products,
            page: p,
            limit: l,
            total,
            totalPages: Math.ceil(total / l)
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});


// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await db('products').where('id', id).first();

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/products
app.post('/api/products', async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Insert new product
        const [insertId] = await db('products').insert(value);

        // Fetch the created product
        const newProduct = await db('products').where('id', insertId).first();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Duplicate entry' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/products/:id
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = updateProductSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if product exists
        const existingProduct = await db('products').where('id', id).first();
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update product
        await db('products').where('id', id).update({
            ...value,
            updated_at: new Date()
        });

        // Fetch updated product
        const updatedProduct = await db('products').where('id', id).first();

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/products/:id
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const existingProduct = await db('products').where('id', id).first();
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete product
        await db('products').where('id', id).del();

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/categories - Get unique categories
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