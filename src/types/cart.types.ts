export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
    stock: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: Cart[];
    totalItems: number;
    totalPrice: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isEmpty: boolean;
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

export interface CartResponse {
    id: number;
    products: Array<{
        id: number;
        title: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}