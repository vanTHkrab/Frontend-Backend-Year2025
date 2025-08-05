import {pool} from '../db';
import {UserActivity, UserStats, ActivityQuery} from '../types';
import {AppError} from '../middleware/error-handler';
import {RowDataPacket, ResultSetHeader} from 'mysql2';

export class UserService {
    static async getAllUsers(): Promise<UserActivity[]> {
        const [users] = await pool.execute<RowDataPacket[]>(
            'SELECT user_id, user_name, user_email FROM user_activities GROUP BY user_id, user_name, user_email'
        );

        return users as UserActivity[];
    }

    static async registerUser(userData: Partial<UserActivity>): Promise<UserActivity> {
        const {user_id, user_name, user_email} = userData;

        // Check if user already exists
        const [existingUsers] = await pool.execute<RowDataPacket[]>(
            'SELECT user_id, user_email FROM user_activities WHERE user_id = ? OR user_email = ? LIMIT 1',
            [user_id, user_email]
        );

        if (existingUsers.length > 0) {
            throw new AppError('User ID or email already exists', 409, 'USER_ALREADY_EXISTS');
        }

        // Create a dummy activity record to represent user registration
        const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO user_activities
             (user_id, user_name, user_email, activity_name, activity_time, activity_date, is_goal_achieved)
             VALUES (?, ?, ?, 'สมัครสมาชิก', '00:00:00', CURDATE(), TRUE)`,
            [user_id, user_name, user_email]
        );

        return {
            user_id: user_id!,
            user_name: user_name!,
            user_email: user_email!,
            activity_name: 'สมัครสมาชิก',
            activity_time: '00:00:00',
            activity_date: new Date().toISOString().split('T')[0],
            is_goal_achieved: true
        };
    }

    static async getUserInfo(userId: string): Promise<any> {
        const [users] = await pool.execute<RowDataPacket[]>(
            `SELECT user_id,
                    user_name,
                    user_email,
                    COUNT(*)                                                 as total_activities,
                    SUM(CASE WHEN is_goal_achieved = TRUE THEN 1 ELSE 0 END) as goals_achieved
             FROM user_activities
             WHERE user_id = ?
             GROUP BY user_id, user_name, user_email`,
            [userId]
        );

        if (users.length === 0) {
            throw new AppError('User not found', 404, 'USER_NOT_FOUND');
        }

        return users[0];
    }

    static async createActivity(userId: string, activityData: Partial<UserActivity>): Promise<UserActivity> {
        // Get user info first
        const userInfo = await this.getUserInfo(userId);

        const {
            activity_name,
            activity_description,
            activity_time,
            activity_date,
            goal_description,
            is_goal_achieved
        } = activityData;

        const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO user_activities
             (user_id, user_name, user_email, activity_name, activity_description,
              activity_time, activity_date, goal_description, is_goal_achieved)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                userInfo.user_name,
                userInfo.user_email,
                activity_name,
                activity_description || null,
                activity_time,
                activity_date,
                goal_description || null,
                is_goal_achieved
            ]
        );

        // Get the created activity
        const [createdActivity] = await pool.execute<RowDataPacket[]>(
            'SELECT * FROM user_activities WHERE id = ?',
            [result.insertId]
        );

        return createdActivity[0] as UserActivity;
    }

    static async getUserActivities(userId: string, query: ActivityQuery): Promise<{
        activities: UserActivity[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            has_more: boolean;
        };
    }> {
        const {limit, offset, date} = query;

        // Build WHERE clause and parameters
        let whereClause = 'WHERE user_id = ?';
        let countParams: any[] = [userId];
        let selectParams: any[] = [userId];

        if (date) {
            whereClause += ' AND activity_date = ?';
            countParams.push(date);
            selectParams.push(date);
        }

        // Add limit and offset to select params
        selectParams.push(limit, offset);

        try {
            // Get total count
            const [countResult] = await pool.execute<RowDataPacket[]>(
                `SELECT COUNT(*) as total
                 FROM user_activities ${whereClause}`,
                countParams
            );

            const total = countResult[0].total;

            // Get activities with pagination
            const [activities] = await pool.execute<RowDataPacket[]>(
                `SELECT *
                 FROM user_activities ${whereClause}
                 ORDER BY activity_date DESC, activity_time DESC LIMIT ?
                 OFFSET ?`,
                selectParams
            );

            return {
                activities: activities as UserActivity[],
                pagination: {
                    total,
                    limit,
                    offset,
                    has_more: offset + limit < total
                }
            };
        } catch (error) {
            console.error('Error in getUserActivities:', error);
            console.error('whereClause:', whereClause);
            console.error('countParams:', countParams);
            console.error('selectParams:', selectParams);
            throw error;
        }
    }

    static async getActivityById(userId: string, activityId: number): Promise<UserActivity> {
        const [activities] = await pool.execute<RowDataPacket[]>(
            'SELECT * FROM user_activities WHERE id = ? AND user_id = ?',
            [activityId, userId]
        );

        if (activities.length === 0) {
            throw new AppError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
        }

        return activities[0] as UserActivity;
    }

    static async updateActivity(
        userId: string,
        activityId: number,
        updateData: Partial<UserActivity>
    ): Promise<UserActivity> {
        // Check if activity exists
        await this.getActivityById(userId, activityId);

        const updateFields: string[] = [];
        const updateValues: any[] = [];

        Object.entries(updateData).forEach(([key, value]) => {
            if (value !== undefined && key !== 'id' && key !== 'user_id') {
                updateFields.push(`${key} = ?`);
                updateValues.push(value);
            }
        });

        if (updateFields.length === 0) {
            throw new AppError('No valid fields to update', 400, 'NO_UPDATE_FIELDS');
        }

        updateValues.push(activityId, userId);

        await pool.execute(
            `UPDATE user_activities
             SET ${updateFields.join(', ')}
             WHERE id = ?
               AND user_id = ?`,
            updateValues
        );

        return this.getActivityById(userId, activityId);
    }

    static async deleteActivity(userId: string, activityId: number): Promise<void> {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM user_activities WHERE id = ? AND user_id = ?',
            [activityId, userId]
        );

        if (result.affectedRows === 0) {
            throw new AppError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
        }
    }

    static async getTodayGoals(userId: string): Promise<any> {
        const today = new Date().toISOString().split('T')[0];

        const [goals] = await pool.execute<RowDataPacket[]>(
            `SELECT goal_description,
                    is_goal_achieved,
                    GROUP_CONCAT(
                            JSON_OBJECT(
                                    'id', id,
                                    'activity_name', activity_name,
                                    'activity_time', activity_time
                            )
                    ) as activities
             FROM user_activities
             WHERE user_id = ?
               AND activity_date = ?
               AND goal_description IS NOT NULL
             GROUP BY goal_description, is_goal_achieved`,
            [userId, today]
        );

        const totalGoals = goals.length;
        const achievedGoals = goals.filter(g => g.is_goal_achieved).length;

        return {
            date: today,
            goals: goals.map(g => ({
                goal_description: g.goal_description,
                is_achieved: g.is_goal_achieved,
                activities: g.activities ? JSON.parse(`[${g.activities}]`) : []
            })),
            summary: {
                total_goals: totalGoals,
                achieved_goals: achievedGoals,
                achievement_rate: totalGoals > 0 ? (achievedGoals / totalGoals * 100) : 0
            }
        };
    }

    static async getUserStatistics(userId: string, period: string = 'monthly'): Promise<{
        total_activities: any;
        total_goals: any;
        goals_achieved: any;
        achievement_rate: number;
        most_active_time: string | null
    }> {
        let dateCondition = '';

        switch (period) {
            case 'daily':
                dateCondition = 'AND activity_date = CURDATE()';
                break;
            case 'weekly':
                dateCondition = 'AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)';
                break;
            case 'monthly':
            default:
                dateCondition = 'AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)';
                break;
        }

        // First query: Get basic statistics
        const [stats] = await pool.execute<RowDataPacket[]>(
            `SELECT COUNT(*)                                                                         as total_activities,
                    COUNT(DISTINCT CASE WHEN goal_description IS NOT NULL THEN goal_description END) as total_goals,
                    SUM(CASE WHEN is_goal_achieved = TRUE THEN 1 ELSE 0 END)                         as goals_achieved
             FROM user_activities
             WHERE user_id = ? ${dateCondition}`,
            [userId]
        );

        // Second query: Get most active hour
        const [hourStats] = await pool.execute<RowDataPacket[]>(
            `SELECT
                 HOUR (activity_time) as hour, COUNT (*) as activity_count
             FROM user_activities
             WHERE user_id = ? ${dateCondition}
             GROUP BY HOUR (activity_time)
             ORDER BY activity_count DESC
                 LIMIT 1`,
            [userId]
        );

        const result = stats[0];
        const mostActiveHour = hourStats.length > 0 ? hourStats[0].hour : null;

        const achievementRate = result.total_goals > 0
            ? (result.goals_achieved / result.total_goals * 100)
            : 0;

        return {
            total_activities: result.total_activities,
            total_goals: result.total_goals,
            goals_achieved: result.goals_achieved,
            achievement_rate: Math.round(achievementRate * 100) / 100,
            most_active_time: mostActiveHour !== null ? `${mostActiveHour}:00` : null,
        };
    }
}