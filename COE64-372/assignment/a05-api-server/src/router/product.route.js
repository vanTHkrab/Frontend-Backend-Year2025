const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Function to create router with db dependency
const createProductRouter = (db) => {
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

    // GET /?q=&category=&page=&limit=
    router.get('/', async (req, res) => {
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

    // GET /:id
    router.get('/:id', async (req, res) => {
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

    // POST /
    router.post('/', async (req, res) => {
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

    // PUT /:id
    router.put('/:id', async (req, res) => {
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

    // DELETE /:id
    router.delete('/:id', async (req, res) => {
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

    return router;
};

module.exports = createProductRouter;