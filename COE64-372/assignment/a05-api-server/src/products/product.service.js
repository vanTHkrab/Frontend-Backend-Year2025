class ProductService {
    constructor(db) {
        this.db = db;
    }

    async getProducts({ query = '', category = '', page = 1, limit = 10 }) {
        const p = parseInt(page, 10) || 1;
        const l = Math.min(parseInt(limit, 10) || 10, 100);

        let dbQuery = this.db('products');

        if (query) {
            dbQuery = dbQuery.where('name', 'like', `%${query}%`);
        }

        if (category) {
            dbQuery = dbQuery.where('category', category);
        }

        const totalResult = await dbQuery.clone().clearSelect().count('* as count').first();
        const total = parseInt(totalResult.count, 10);

        const offset = (p - 1) * l;
        const products = await dbQuery
            .clone()
            .select('*')
            .orderBy('created_at', 'desc')
            .limit(l)
            .offset(offset);

        return {
            data: products,
            page: p,
            limit: l,
            total,
            totalPages: Math.ceil(total / l)
        };
    }

    async getProductById(id) {
        return this.db('products').where('id', id).first();
    }

    async createProduct(productData) {
        const [insertId] = await this.db('products').insert({
            ...productData,
            created_at: new Date(),
            updated_at: new Date()
        });

        return this.db('products').where('id', insertId).first();
    }

    async updateProduct(id, updateData) {
        const existingProduct = await this.db('products').where('id', id).first();
        if (!existingProduct) {
            return null;
        }

        await this.db('products').where('id', id).update({
            ...updateData,
            updated_at: new Date()
        });

        return this.db('products').where('id', id).first();
    }

    async deleteProduct(id) {
        const existingProduct = await this.db('products').where('id', id).first();
        if (!existingProduct) {
            return false;
        }

        await this.db('products').where('id', id).del();
        return true;
    }

    async getCategories() {
        const categories = await this.db('products')
            .distinct('category')
            .whereNot('category', '')
            .orderBy('category');
        return categories.map(item => item.category);
    }
}

module.exports = ProductService;
