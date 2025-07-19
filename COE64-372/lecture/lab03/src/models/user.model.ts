import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}