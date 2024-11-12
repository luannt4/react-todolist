// /contexts/AuthContext.tsx
import { createContext} from 'react';
import {  Item, CartState } from './types';


interface CartProviderState extends CartState {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item['id']) => void;
  clearItemFromCart: (id: Item['id']) => void;
  getItemFromCart: (id: Item['id']) => any | undefined;
  isInCart: (id: Item['id']) => boolean;
  isInStock: (id: Item['id']) => boolean;
  resetCart: () => void;
}


export const CartContext = createContext<CartProviderState | undefined>(undefined,);
