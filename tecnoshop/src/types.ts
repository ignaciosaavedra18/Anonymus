export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'cliente' | 'administrador' | 'soporte';
  region: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  unitPrice: number;
  qty: number;
}

export type OrderStatus =
  | 'pendiente'
  | 'confirmado'
  | 'en_preparacion'
  | 'enviado'
  | 'entregado'
  | 'cancelado';

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

export interface CartLine {
  productId: string;
  qty: number;
}
