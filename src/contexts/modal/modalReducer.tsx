import { Product, ModalView } from "./types";

type Action =
  | { type: "OPEN_MODAL"; view?: ModalView;  payload?: Product| null  }
  | { type: "CLOSE_MODAL" };

interface State {
  modalView?: ModalView | null;
  data?: Product | null | undefined;
}

export const modalReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {...state,modalView: action.view, data: action.payload};
       
        case 'CLOSE_MODAL':
            return { ...state,modalView: null , data: null};
        default:
            return state;
    }
};