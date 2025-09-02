const Joi = require('joi');

const createProductSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required().min(1).max(255),
    description: Joi.string().optional().max(1000),
    price: Joi.number().required().positive(),
    category: Joi.string().required().min(1).max(100),
    imageUrl: Joi.string().uri().optional()
});

module.exports = createProductSchema;
