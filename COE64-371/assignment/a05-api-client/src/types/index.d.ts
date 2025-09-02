import type {LucideIcon} from "lucide-react";

export interface NavItem {
    label: string;
    href: string;
    icon?: LucideIcon;
}


export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    category: string;
    imageUrl?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ProductResponse {
    data: Product[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}