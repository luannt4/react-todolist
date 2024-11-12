import { State, DRAWER_VIEWS } from "./types";

type Action =
  | { type: 'SET_DRAWER_VIEW'; view: DRAWER_VIEWS;}
  | { type: "OPEN_DRAWER";  data: null; }
  | { type: "CLOSE_DRAWER" };


export const drawerReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_DRAWER_VIEW': 
            return { ...state, drawerView: action.view};

        case 'OPEN_DRAWER': 
            return {...state,displayDrawer: true,data: action.data, };

        case 'CLOSE_DRAWER': 
            return {...state,displayDrawer: false, };
        
        default:
            return state;
    }
};