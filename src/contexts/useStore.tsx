import { useContext } from "react";
import { ProductContext } from "./store/storeContext";

export const useProductContext  = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};