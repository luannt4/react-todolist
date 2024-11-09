import React, {  useReducer,useEffect } from "react";
import { Product, ModalView, State } from "./types";
import { ModalContext } from "./modalContext";
import { modalReducer } from "./modalReducer";


const initialState: State = {
  modalView: null,
  selectedProduct: undefined,
};

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