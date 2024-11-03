// src/TodoContext.tsx
import React, { createContext, useContext, useReducer,  ReactNode } from "react";
import productReducer,{ProductAction, ProductState } from "../reducers/ProductReducer";


interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}

const initialState: ProductState = {
  products: [],
  editingProduct: null,
   isLoading: false,
   error: null
};

// Khởi tạo TodoContext
const ProductContext = createContext<ProductContextType | undefined>(undefined);


// Provider component quản lý trạng thái của Todo và lưu trữ vào localStorage
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
        {children}
        </ProductContext.Provider>
    );
};

export const useProductContext  = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};