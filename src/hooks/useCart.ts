// src/hooks/useCart.ts
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

export const useCart = () => {
  const cartState = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem('shopy-cart');
    if (savedCart) {
      // Initialize cart from localStorage
      const parsedCart = JSON.parse(savedCart);
      // Dispatch action to initialize cart
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopy-cart', JSON.stringify(cartState));
  }, [cartState]);

  return cartState;
};