import { useEffect } from 'react';
import { RootState } from '../store';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';

const useLocalStorageSync = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Initialize the cart state from localStorage when the app starts
        const cartState = localStorage.getItem('shopy-cart');
        if (cartState) {
            const parsedCartState = JSON.parse(cartState);
            dispatch({ type: 'LOAD_CART', payload: parsedCartState });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('shopy-cart', JSON.stringify(cart));
    }, [cart]);
};
export default useLocalStorageSync;