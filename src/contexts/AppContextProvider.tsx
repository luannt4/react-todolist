import { ModalProvider } from  './modal/modalProvider';
import { ProductProvider } from "./store/storeProvider";
import { CompareProvider } from "./compare/compareProvider";
import { WishlistProvider } from './wishlist/wishlistProvider';
import { AuthProvider } from './auth/AuthProvider';
import { CartProvider } from './cart/CartProvider';


export function AppProvider({ children }: React.PropsWithChildren) {
    return (
        <ProductProvider>
            <CartProvider>
            <CompareProvider>
            <WishlistProvider>
            <ModalProvider>
                <AuthProvider>
                {children}
                </AuthProvider>
            </ModalProvider>
            </WishlistProvider>
            </CompareProvider>
            </CartProvider>
        </ProductProvider>
      
    );
  }
  