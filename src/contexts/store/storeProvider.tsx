import React, {  useReducer,ReactNode } from "react";
import {  ProductState } from "./types";
import { ProductContext } from "./storeContext";
import { productReducer } from "./storeReducer";


const initialState: ProductState = {
  products: [],
  editingProduct: null,
   isLoading: false,
   error: null
};
// Provider component quản lý trạng thái của Todo và lưu trữ vào localStorage
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
        {children}
        </ProductContext.Provider>
    );
};
