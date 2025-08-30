import {type Product} from '../types';

const API = import.meta.env.VITE_API_URL as string;


export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(`${API}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
}