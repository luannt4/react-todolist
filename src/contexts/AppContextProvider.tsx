import { ModalProvider } from  './modal/modalProvider';
import { DrawerProvider } from './drawer/drawerProvider';

//React-redux
import { Provider } from 'react-redux';
import store from '../store';
import useLocalStorageSync from 'src/hooks/useLocalStorage';

export function AppProvider({ children }: React.PropsWithChildren) {
    useLocalStorageSync();
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
  