import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { ApiError } from '../errors/apiError';

export class UserController {
    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newUser = await UserService.createUser(req.body);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                },
            });
        } catch (error) {
            next(error); // ส่ง error ไปให้ Global Error Handler
        }
    }

    public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }

    public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedUser = await UserService.updateUser(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await UserService.deleteUser(req.params.id);
            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}