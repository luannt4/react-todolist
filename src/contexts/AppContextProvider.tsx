import { ModalProvider } from  './modal/modalProvider';
import { AuthProvider } from './auth/AuthProvider';
import { CartProvider } from './cart/CartProvider';
import { DrawerProvider } from './drawer/drawerProvider';

//React-redux
import { Provider } from 'react-redux';
import store from '../store';


export function AppProvider({ children }: React.PropsWithChildren) {
    return (
        <Provider store={store}>
            <CartProvider>
                <DrawerProvider>
                <ModalProvider>
                <AuthProvider>
                {children}
                </AuthProvider>
                </ModalProvider>
                </DrawerProvider>
            </CartProvider>
        </Provider>
      
    );
  }
  