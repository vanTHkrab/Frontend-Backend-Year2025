export interface UserActivity {
    id?: number;
    user_id: string;
    user_name: string;
    user_email: string;
    activity_name: string;
    activity_description?: string;
    activity_time: string;
    activity_date: string;
    goal_description?: string;
    is_goal_achieved: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error_code?: string;
    details?: any;
    timestamp?: string;
}

export interface PaginationParams {
    limit: number;
    offset: number;
}

export interface ActivityQuery extends PaginationParams {
    date?: string;
}

export interface UserStats {
    total_activities: number;
    total_goals: number;
    goals_achieved: number;
    achievement_rate: number;
    most_active_time?: string;
    favorite_activities?: Array<{
        activity_type: string;
        count: number;
    }>;
}