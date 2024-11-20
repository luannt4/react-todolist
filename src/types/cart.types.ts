//import { Product } from '../types/Product';

export interface Product {
  id: number ;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
  stock: number;
  availabilityStatus?: string;
  rating?:number;
  //reviews?:Review[];
}

export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  stock?: number;
  [key: string]: any;
}  
export interface CartItem extends Product {
    quantity: number;
}
  
export interface CartState {
    items: CartItem[];
    total: number;
    isEmpty: boolean;
    loading: boolean;
    error: string | null;
}
  