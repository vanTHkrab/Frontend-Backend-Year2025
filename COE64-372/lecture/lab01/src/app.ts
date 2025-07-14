import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/db.config';
import apiRoutes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { ApiError } from './errors/apiError';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

connectDB();

app.use('/api', apiRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(404, 'Not Found'));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`⚡️ Server is running on port ${PORT}`);
    console.log(`🚀 API Docs: http://localhost:${PORT}/api-docs (ถ้ามี Swagger)`);
});

export default app;