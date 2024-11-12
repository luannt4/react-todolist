import React, {  useReducer,useEffect } from "react";
import { Product, ModalView, State } from "./types";
import { ModalContext } from "./modalContext";
import { modalReducer } from "./modalReducer";


const initialState: State = {
  modalView: null,
  data: undefined,
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  	const [state, dispatch] = useReducer(modalReducer, initialState);

  	const openModal = (modalView?: ModalView, data?: Product) => {
    	dispatch({ type: "OPEN_MODAL", view: modalView, payload: data });
  	};

  	const closeModal = () => {
    	dispatch({ type: "CLOSE_MODAL" });
  	};
    
    return (
        <ModalContext.Provider
        value={{
            modalView: state.modalView,
            data: state.data,
            openModal,
            closeModal,
        }}
        >
        {children}
        </ModalContext.Provider>
    );
};