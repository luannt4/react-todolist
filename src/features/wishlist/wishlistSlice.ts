// features/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlists') || '[]'),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
      addToWishlist(state, action: PayloadAction<Product>) {
        const exists = state.items.some(item => item.id === action.payload.id);
        if (!exists) {
          state.items.push(action.payload);
          localStorage.setItem('wishlists', JSON.stringify(state.items));
        }
      },
      removeFromWishlist(state, action: PayloadAction<number>) {
        state.items = state.items.filter(item => item.id !== action.payload);
        localStorage.setItem('wishlists', JSON.stringify(state.items));
      },
      clearWishlist(state) {
        state.items = [];
        localStorage.removeItem('wishlists');
      },
    },
  });
  
  export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
  export default wishlistSlice.reducer;