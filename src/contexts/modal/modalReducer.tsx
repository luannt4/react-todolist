import { Product, ModalView } from "./types";

type Action =
  | { type: "SET_MODAL_VIEW"; payload: ModalView  }
  | { type: "SET_SELECTED_PRODUCT"; payload: Product| null }
  | { type: "CLOSE_MODAL" };

interface State {
  modalView?: ModalView | null;
  selectedProduct?: Product | null | undefined;
}

export const modalReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_MODAL_VIEW':
            return {...state,modalView: action.payload};
        case 'SET_SELECTED_PRODUCT':
            return {...state, selectedProduct: action.payload};  
        case 'CLOSE_MODAL':
            return { ...state,modalView: null , selectedProduct: null};
        default:
            return state;
    }
};