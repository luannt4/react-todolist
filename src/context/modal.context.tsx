'use client';
import { Product } from "../types/Product";
 import React, { createContext, useContext, useReducer } from "react";

type ModalView  =
  | 'SIGN_UP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGET_PASSWORD'
  | 'PAYMENT'
  | 'ADDRESS_VIEW_AND_EDIT'
  | 'PHONE_NUMBER'
  | 'DELIVERY_VIEW'
  | 'PRODUCT_VIEW'
  | 'CATEGORY_VIEW';

interface State {
  modalView?: ModalView | null;
  selectedProduct?: Product | null | undefined;
}

type Action =
  | { type: "SET_MODAL_VIEW"; payload: ModalView  }
  | { type: "SET_SELECTED_PRODUCT"; payload: Product| null }
  | { type: "CLOSE_MODAL" };

const initialState: State = {
  modalView: null,
  selectedProduct: undefined,
};

function modalReducer(state: State, action: Action): State {
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
}

interface ModalContextType {
  modalView?: ModalView | null;
  selectedProduct: Product| null| undefined;
  setModalView: (view: ModalView, product: Product) => void;
  closeModal: () => void;
}
const ModalContext =  createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  	const [state, dispatch] = useReducer(modalReducer, initialState);

  	const setModalView = (view: ModalView, product: Product) => {
    	dispatch({ type: "SET_MODAL_VIEW", payload: view });
    	dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
  	};

  	const closeModal = () => {
    	dispatch({ type: "CLOSE_MODAL" });
  	};

  return (
    <ModalContext.Provider
      value={{
        modalView: state.modalView,
        selectedProduct: state.selectedProduct,
        setModalView,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
