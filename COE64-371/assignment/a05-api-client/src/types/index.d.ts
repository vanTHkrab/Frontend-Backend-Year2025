export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  imageUrl?: string;
}

export interface ProductResponse {
  data: Product[];
  total?: number;
}

export interface ApiError {
  error: string;
  message?: string;
}
