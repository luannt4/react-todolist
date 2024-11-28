import {  State, Action } from "./types";

export const modalReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {...state,modalView: action.view, data: action.payload};
        case 'OPEN_ALERT':
            return {...state,modalView: action.view, message: action.payload};
       
        case 'CLOSE_MODAL':
            return { ...state,modalView: null , data: null};
        default:
            return state;
    }
};