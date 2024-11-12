import { ModalProvider } from  './modal/modalProvider';
import { ProductProvider } from "./store/storeProvider";
import { CompareProvider } from "./compare/compareProvider";
import { WishlistProvider } from './wishlist/wishlistProvider';
import { AuthProvider } from './auth/AuthProvider';
import { CartProvider } from './cart/CartProvider';
import { DrawerProvider } from './drawer/drawerProvider';


export function AppProvider({ children }: React.PropsWithChildren) {
    return (
        <ProductProvider>
            <CartProvider>
            <CompareProvider>
            <WishlistProvider>
                <DrawerProvider>
                <ModalProvider>
                <AuthProvider>
                {children}
                </AuthProvider>
                </ModalProvider>
                </DrawerProvider>
            </WishlistProvider>
            </CompareProvider>
            </CartProvider>
        </ProductProvider>
      
    );
  }
  