import { ProductState, ProductAction } from "./types";


  
export const productReducer  = (state: ProductState, action: ProductAction ): ProductState => {
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
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };  
    default:
      return state;
  }
};