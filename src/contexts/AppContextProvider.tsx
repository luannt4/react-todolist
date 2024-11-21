import { ModalProvider } from  './modal/modalProvider';
import { DrawerProvider } from './drawer/drawerProvider';

//React-redux
import { Provider } from 'react-redux';
import store from '../store';

export function AppProvider({ children }: React.PropsWithChildren) {
   
    return (
        <Provider store={store}>
            <DrawerProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
            </DrawerProvider>
        </Provider>
    );
  }
  