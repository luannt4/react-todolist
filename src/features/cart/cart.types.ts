
export interface Product {
    id: number;
    title: string;
    price: number;
    total: number;
    discountPercentage?: number;
    discountedPrice?: number;
    thumbnail?: string;
    stock?: number;
}
export interface CartProduct {
    id: number;
    quantity: number;
}

export interface CartItem extends Product {
    quantity: number;
    total: number;
}

export interface Cart {
    id: number;
    products: CartItem[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartState {
    cartStore:  Cart | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    totalItems: number;
    error: string | null;
    isEmpty: boolean;
}

