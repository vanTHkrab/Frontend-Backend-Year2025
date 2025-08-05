import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {testConnection} from './db';
const PORT = process.env.PORT || 10000;
const app = express();
import router from "./router/user.route";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to the User Management API",
        version: "1.0.0"
    });
});

app.use('/api/users', router);

app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "UP",
        message: "Application is running smoothly"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    testConnection().finally()
});