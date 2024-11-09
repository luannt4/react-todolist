import React, {  useReducer,useEffect } from "react";
import { Product } from "./types";
import { CompareContext } from "./compareContext";
import { compareReducer } from "./compareReducer";


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