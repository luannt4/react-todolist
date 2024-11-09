import React, {  useReducer,useEffect } from "react";
import { Product } from "./types";
import { wishlistContext } from "./wishlistContext";
import { wishlistReducer } from "./wishlistReducer";


const initialState: Product[] = JSON.parse(localStorage.getItem("compares") || "[]");

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistList, dispatch] = useReducer(wishlistReducer, initialState);
  
    const addToWishlist = (product: Product) => dispatch({ type: "ADD_TO_WISHLIST", product });
    const removeFromWishlist = (productId: number) => dispatch({ type: "REMOVE_WISHLIST", productId });
    const clearWishlist = () => dispatch({ type: "CLEAR_WISHLIST" });
    
  
    useEffect(() => {
        localStorage.setItem("wishlists", JSON.stringify(wishlistList));
        if (!wishlistList) {
            throw new Error('Hook must be used within Provider');
        }
    }, [wishlistList]);

    return (
      <wishlistContext.Provider
        value={{ wishlistList, addToWishlist, removeFromWishlist, clearWishlist }}
      >
        {children}
      </wishlistContext.Provider>
    );
};