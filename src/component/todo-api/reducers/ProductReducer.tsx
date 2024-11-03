// src/TodoReducer.ts
import { Product  } from "../../../type/Todo";

export type ProductAction  =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_EDITING_PRODUCT"; payload: Product | null };

export type ProductState = {
  products: Product[];
  editingProduct: Product | null;
};

const productReducer  = (state: ProductState, action: ProductAction ): ProductState => {
   switch (action.type) {
    case "ADD_PRODUCT":
       return {
        ...state,
        products: [...state.products, action.payload],
        editingProduct: null,
      };
    case "DELETE_PRODUCT":
      return { 
        ...state, 
        products: state.products.filter(product => product.id !== action.payload) 
    };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        editingProduct: null,
      };
    case "SET_PRODUCTS":
       return {
        ...state,
        products: action.payload,
      };
    case "SET_EDITING_PRODUCT":
      return {
        ...state,
        editingProduct: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
