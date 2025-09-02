const ProductService = require('./product.service');
const createProductSchema = require('./dto/create-product.dto');
const updateProductSchema = require('./dto/update-product.dto');

class ProductController {
    constructor(db) {
        this.productService = new ProductService(db);
    }

    async getProducts(req, res) {
        try {
            const { q = '', category = '', page = '1', limit = '10' } = req.query;

            const result = await this.productService.getProducts({
                query: q,
                category,
                page,
                limit
            });

            res.json(result);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createProduct(req, res) {
        try {
            const { error, value } = createProductSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const newProduct = await this.productService.createProduct(value);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { error, value } = updateProductSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const updatedProduct = await this.productService.updateProduct(id, value);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const deleted = await this.productService.deleteProduct(id);

            if (!deleted) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await this.productService.getCategories();
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = ProductController;
