// ProductContext.tsx
import React, { createContext, useContext, useReducer,useEffect } from "react";
import { Product } from "../type/Product";
import { wishlistReducer } from "../reducer/wishlistReducer";

interface WishlistContextType {
    wishlistList: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const initialState: Product[] = JSON.parse(localStorage.getItem("wishlists") || "[]");

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistList, dispatch] = useReducer(wishlistReducer, initialState);
  
    const addToWishlist = (product: Product) => dispatch({ type: "ADD_TO_WISHLIST", product });
    const removeFromWishlist = (productId: number) => dispatch({ type: "REMOVE_WISHLIST", productId });
    const clearWishlist = () => dispatch({ type: "CLEAR_WISHLIST" });
    
  
    useEffect(() => {
      localStorage.setItem("wishlists", JSON.stringify(wishlistList));
    }, [wishlistList]);

    return (
      <WishlistContext.Provider
        value={{ wishlistList, addToWishlist, removeFromWishlist, clearWishlist }}
      >
        {children}
      </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useCompare must be used within a ProductProvider");
    return context;
};