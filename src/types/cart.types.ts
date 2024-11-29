import { Product } from './Product';

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isEmpty: boolean;
}

export interface Cart {
    id: number;
    products: Product[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}