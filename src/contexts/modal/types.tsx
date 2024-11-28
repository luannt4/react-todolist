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
  data?: Product | null | undefined;
  message?: string;
}
export type Action =
    | { type: "OPEN_MODAL"; view?: ModalView;  payload?: Product| null  }
    | { type: "OPEN_ALERT"; view?: ModalView;  payload?: string  }
    | { type: "CLOSE_MODAL" };

export type ModalView  =
  | 'SIGN_UP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGET_PASSWORD'
  | 'PAYMENT'
  | 'ADDRESS_VIEW_AND_EDIT'
  | 'ALERT_VIEW'
  | 'MESSAGE_VIEW'
  | 'PRODUCT_VIEW'
  | 'CATEGORY_VIEW';

export interface ModalContextType {
  modalView?: ModalView | null;
  data?: Product| null| undefined;
  message?: string| null,
  openModal: (view: ModalView, data?: Product) => void;
  openAlert: (view: ModalView, message?: string ) => void;
  closeModal: () => void;
}