export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
}
export interface State {
  modalView?: ModalView | null;
  selectedProduct?: Product | null | undefined;
}

export type ModalView  =
  | 'SIGN_UP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGET_PASSWORD'
  | 'PAYMENT'
  | 'ADDRESS_VIEW_AND_EDIT'
  | 'PHONE_NUMBER'
  | 'DELIVERY_VIEW'
  | 'PRODUCT_VIEW'
  | 'CATEGORY_VIEW';

export interface ModalContextType {
  modalView?: ModalView | null;
  selectedProduct: Product| null| undefined;
  setModalView: (view: ModalView, product: Product) => void;
  closeModal: () => void;
}