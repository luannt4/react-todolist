import { Product } from './Product';

export interface Item  {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  stock: number;
  [key: string]: any;
}  
export interface CartItem extends Item {
    quantity: number;
}
  
export interface CartState {
  items: CartItem[];
  total: number;
  isEmpty: boolean;
  totalItems: number;
  isInStock: boolean;
  isInCart:  boolean;
}
  