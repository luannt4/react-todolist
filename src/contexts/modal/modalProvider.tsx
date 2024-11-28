import React, {  useReducer } from "react";
import { Product, ModalView, State } from "./types";
import { ModalContext } from "./modalContext";
import { modalReducer } from "./modalReducer";


const initialState: State = {
  modalView: null,
  data: undefined,
  message: undefined,
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  	const [state, dispatch] = useReducer(modalReducer, initialState);

  	const openModal = (modalView?: ModalView, data?: Product) => {
    	dispatch({ type: "OPEN_MODAL", view: modalView, payload: data });
  	};

    const openAlert = (modalView?: ModalView, message?: string) => {
        dispatch({ type: 'OPEN_ALERT', view: modalView, payload: message });
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
            message: state.message,
            openAlert
        }}
        >
        {children}
        </ModalContext.Provider>
    );
};