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
    displayDrawer: boolean;
    drawerView: string | null;
    data?: any;
}

export type DRAWER_VIEWS = 'CART_SIDEBAR' | 'MOBILE_MENU' | 'ORDER_DETAILS';

export const initialState: State = {
    displayDrawer: false,
    drawerView: null,
    data: null,
};