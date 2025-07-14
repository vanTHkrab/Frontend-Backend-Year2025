// src/services/user.service.ts
import User, { IUser } from '../models/user.model';
import { ApiError } from '../errors/apiError';

export class UserService {
    /**
     * Creates a new user.
     * @param userData - The user data to create.
     * @returns The created user object.
     */
    public static async createUser(userData: Partial<IUser>): Promise<IUser> {
        const { username, email, password, role } = userData;

        if (!username || !email || !password) {
            throw new ApiError(400, 'Username, email, and password are required.');
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new ApiError(409, 'Username or email already exists.');
        }

        const newUser = await User.create({ username, email, password, role });
        return newUser;
    }

    /**
     * Finds a user by ID.
     * @param userId - The ID of the user.
     * @returns The user object or null if not found.
     */
    public static async getUserById(userId: string): Promise<IUser | null> {
        const user = await User.findById(userId).select('-password'); // ไม่ดึง password กลับมา
        if (!user) {
            throw new ApiError(404, 'User not found.');
        }
        return user;
    }

    /**
     * Finds a user by email.
     * @param email - The email of the user.
     * @returns The user object including password for authentication.
     */
    public static async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email }).select('+password'); // ดึง password กลับมาเพื่อเปรียบเทียบ
        return user;
    }

    /**
     * Updates a user.
     * @param userId - The ID of the user to update.
     * @param updateData - The data to update.
     * @returns The updated user object.
     */
    public static async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        // We need to handle password update carefully if it's included
        if (updateData.password) {
            // Password hashing will be handled by the pre-save hook in the model
            // But ensure it's not directly assigned if not meant to be updated
            delete updateData.password; // For simplicity, assume password update is handled by separate method
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true, // Return the modified document rather than the original
            runValidators: true, // Run Mongoose validators on update
        }).select('-password');

        if (!updatedUser) {
            throw new ApiError(404, 'User not found for update.');
        }
        return updatedUser;
    }

    /**
     * Deletes a user.
     * @param userId - The ID of the user to delete.
     * @returns True if deleted, false otherwise.
     */
    public static async deleteUser(userId: string): Promise<boolean> {
        const result = await User.findByIdAndDelete(userId);
        if (!result) {
            throw new ApiError(404, 'User not found for deletion.');
        }
        return true;
    }

    /**
     * Gets all users.
     * @returns An array of all user objects.
     */
    public static async getAllUsers(): Promise<IUser[]> {
        const users = await User.find().select('-password');
        return users;
    }
}