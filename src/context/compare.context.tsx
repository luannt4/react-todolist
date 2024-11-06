// ProductContext.tsx
import React, { createContext, useContext, useReducer,useEffect } from "react";
import { Product } from "../type/Product";
import { compareReducer } from "../reducer/CompareReducer";

interface CompareContextType {
    compareList: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: number) => void;
    clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);
const initialState: Product[] = JSON.parse(localStorage.getItem("compares") || "[]");

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [compareList, dispatch] = useReducer(compareReducer, initialState);
  
    const addToCompare = (product: Product) => dispatch({ type: "ADD_TO_COMPARE", product });
    const removeFromCompare = (productId: number) => dispatch({ type: "REMOVE_COMPARE", productId });
    const clearCompare = () => dispatch({ type: "CLEAR_COMPARE" });
    
  
    useEffect(() => {
      localStorage.setItem("compares", JSON.stringify(compareList));
    }, [compareList]);

    return (
      <CompareContext.Provider
        value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
      >
        {children}
      </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) throw new Error("useCompare must be used within a ProductProvider");
    return context;
};