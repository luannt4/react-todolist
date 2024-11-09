export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
}
export type ProductAction  =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_EDITING_PRODUCT"; payload: Product | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };


export type ProductState = {
  products: Product[];
  editingProduct: Product | null;
  isLoading: boolean;
  error:  string | null;
};

export interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}