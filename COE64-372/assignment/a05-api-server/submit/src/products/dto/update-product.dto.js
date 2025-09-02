const Joi = require('joi');

const updateProductSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional().min(1).max(255),
    description: Joi.string().optional().max(1000),
    price: Joi.number().optional().positive(),
    category: Joi.string().optional().min(1).max(100),
    imageUrl: Joi.string().uri().optional()
});

module.exports = updateProductSchema;
