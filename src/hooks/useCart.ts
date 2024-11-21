import { useEffect, useRef } from 'react';
import { RootState } from '../store';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { LOAD_CART } from '../features/cart/cartSlice';

const useCart = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    const isInitialized = useRef(true);

    // Initialize cart from localStorage on mount
    useEffect(() => {
        // Initialize the cart state from localStorage when the app starts
        const storedCart = localStorage.getItem('shopy-cart');
        
        if (storedCart) {
            const cartState = JSON.parse(storedCart);
            dispatch(LOAD_CART(cartState));
        }
    }, [dispatch]);

    // Update localStorage whenever cart changes, but skip the initial render
    useEffect(() => {
        if (isInitialized.current) {
            isInitialized.current = false; // Skip first render
            return;
        }
        localStorage.setItem('shopy-cart', JSON.stringify(cart));
    }, [cart]);
};
export default useCart;