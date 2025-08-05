export interface ActivityRecord {
    id: number;
    user_name: string;
    user_email: string;
    user_id: string; // รหัสผู้ใช้งานที่กำหนดเอง
    goal_title: string;
    activity_name: string;
    activity_description?: string;
    completed_at: Date;
    created_at: Date;
}

export interface CreateActivityRequest {
    user_name: string;
    user_email: string;
    user_id: string;
    goal_title: string;
    activity_name: string;
    activity_description?: string;
    completed_at?: string; // ISO string format
}

export interface UserSummary {
    user_id: string;
    user_name: string;
    user_email: string;
    total_activities: number;
    active_days: number;
    first_activity: string;
    last_activity: string;
}