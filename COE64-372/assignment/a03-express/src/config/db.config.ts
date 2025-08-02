import dotenv from 'dotenv';
import { DatabaseConfig } from '../types/database.types';

dotenv.config();

const dbConfig: DatabaseConfig = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DATABASE: process.env.DB_NAME || 'database_name',
    PORT: parseInt(process.env.DB_PORT || '3306', 10),
    TIMEZONE: process.env.DB_TIMEZONE || 'Z',
};

export default dbConfig;