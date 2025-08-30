require('dotenv').config();
const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'production',
    mysql: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'auth_example',
    },
};
module.exports = config;