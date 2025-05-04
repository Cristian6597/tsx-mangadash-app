export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  trending: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
