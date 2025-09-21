const joi = require('joi');

const createNotificationSchema = joi.object({
    title: joi.string().required(),
    message: joi.string().required(),
    priority: joi.string().required(),
    tags: joi.array().required(),
});

module.exports = createNotificationSchema;