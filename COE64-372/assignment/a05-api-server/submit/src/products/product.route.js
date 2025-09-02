const express = require('express');
const ProductController = require('./product.controller');

const router = express.Router();

const createProductRouter = (db) => {
    const productController = new ProductController(db);

    // GET /?q=&category=&page=&limit=
    router.get('/', (req, res) => productController.getProducts(req, res));

    // GET /:id
    router.get('/:id', (req, res) => productController.getProductById(req, res));

    // POST /
    router.post('/', (req, res) => productController.createProduct(req, res));

    // PUT /:id
    router.put('/:id', (req, res) => productController.updateProduct(req, res));

    // DELETE /:id
    router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

    // GET /list/categories
    router.get('/categories/list', (req, res) => productController.getCategories(req, res));

    return router;
};



module.exports = createProductRouter;