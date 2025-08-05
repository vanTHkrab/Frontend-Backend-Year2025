import { Request, Response } from 'express';
import { pool } from '../config/database';
import { CreateActivityRequest, ActivityRecord, UserSummary } from '../types';
import { validationResult } from 'express-validator';
import mysql from "mysql2/promise";

export const createActivity = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            user_name,
            user_email,
            user_id,
            goal_title,
            activity_name,
            activity_description,
            completed_at
        }: CreateActivityRequest = req.body;

        const completedAtDate = completed_at ? new Date(completed_at) : new Date();

        const [result] = await pool.execute(
            `INSERT INTO daily_activities 
       (user_name, user_email, user_id, goal_title, activity_name, activity_description, completed_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_name, user_email, user_id, goal_title, activity_name, activity_description || null, completedAtDate]
        );

        const insertResult = result as mysql.ResultSetHeader;

        res.status(201).json({
            success: true,
            message: 'Activity recorded successfully',
            data: {
                id: insertResult.insertId,
                user_name,
                user_email,
                user_id,
                goal_title,
                activity_name,
                activity_description,
                completed_at: completedAtDate
            }
        });
    } catch (error) {
        console.error('Create activity error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getActivities = async (req: Request, res: Response) => {
    try {
        const { user_id, user_email, date} = req.query;

        let query = 'SELECT * FROM daily_activities';
        const queryParams: any[] = [];
        const conditions: string[] = [];

        if (user_id) {
            conditions.push('user_id = ?');
            queryParams.push(user_id);
        }

        if (user_email) {
            conditions.push('user_email = ?');
            queryParams.push(user_email);
        }

        if (date) {
            conditions.push('DATE(completed_at) = ?');
            queryParams.push(date);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await pool.execute(query, queryParams);

        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Get activities error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getActivityById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute(
            'SELECT * FROM daily_activities WHERE id = ?',
            [id]
        );

        const activities = rows as ActivityRecord[];

        if (activities.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }

        res.json({
            success: true,
            data: activities[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getUsersList = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute(
            `SELECT 
        user_id,
        user_name,
        user_email,
        COUNT(*) as total_activities,
        MAX(completed_at) as last_activity
      FROM daily_activities 
      GROUP BY user_id, user_name, user_email
      ORDER BY last_activity DESC`
        );

        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getUserSummary = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const [rows] = await pool.execute(
            `SELECT 
        user_id,
        user_name,
        user_email,
        COUNT(*) as total_activities,
        COUNT(DISTINCT DATE(completed_at)) as active_days,
        DATE(MIN(completed_at)) as first_activity,
        DATE(MAX(completed_at)) as last_activity
      FROM daily_activities 
      WHERE user_id = ?
      GROUP BY user_id, user_name, user_email`,
            [user_id]
        );

        const summary = rows as UserSummary[];

        if (summary.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: summary[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getDailyGoalProgress = async (req: Request, res: Response) => {
    try {
        const { user_id, date } = req.params;

        const [rows] = await pool.execute(
            `SELECT 
        goal_title,
        COUNT(*) as activities_count,
        GROUP_CONCAT(activity_name SEPARATOR ', ') as activities_done
      FROM daily_activities 
      WHERE user_id = ? AND DATE(completed_at) = ?
      GROUP BY goal_title
      ORDER BY activities_count DESC`,
            [user_id, date]
        );

        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getActivityStats = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        // สถิติกิจกรรมต่างๆ
        const [activityStats] = await pool.execute(
            `SELECT 
        activity_name,
        COUNT(*) as frequency,
        DATE(MAX(completed_at)) as last_done
      FROM daily_activities 
      WHERE user_id = ?
      GROUP BY activity_name
      ORDER BY frequency DESC
      LIMIT 10`,
            [user_id]
        );

        // สถิติเป้าหมาย
        const [goalStats] = await pool.execute(
            `SELECT 
        goal_title,
        COUNT(*) as total_activities,
        COUNT(DISTINCT DATE(completed_at)) as days_worked
      FROM daily_activities 
      WHERE user_id = ?
      GROUP BY goal_title
      ORDER BY total_activities DESC
      LIMIT 10`,
            [user_id]
        );

        res.json({
            success: true,
            data: {
                top_activities: activityStats,
                goal_progress: goalStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
