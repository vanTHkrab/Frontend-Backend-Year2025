require('dotenv').config();
const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'production',
    mysql: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'auth_example',
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'default-access-secret-for-testing',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-for-testing',
        accessTtl: process.env.ACCESS_TOKEN_TTL || '15m',
        refreshTtl: process.env.REFRESH_TOKEN_TTL || '7d',
    },
};

if (!config.jwt.accessSecret || !config.jwt.refreshSecret) {
    console.error('Missing JWT secrets in .env');
    process.exit(1);
}
module.exports = config;