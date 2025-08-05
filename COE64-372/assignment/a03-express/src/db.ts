import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import dbConfig from './config/db.config';

/**
 * Database connection pool configuration.
 * This configuration is used to create a connection pool for the MySQL database.
 * It includes options such as host, user, password, database name, port, and other settings.
 */
const poolOptions: PoolOptions = {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    port: dbConfig.PORT,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10),
    timezone: dbConfig.TIMEZONE,
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: false
};

export const pool: Pool = mysql.createPool(poolOptions);

export const testConnection = async (): Promise<void> => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};