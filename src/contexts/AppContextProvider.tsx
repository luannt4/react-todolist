import { ModalProvider } from  './modal/modalProvider';
import { ProductProvider } from "./store/storeProvider";
import { CompareProvider } from "./compare/compareProvider";
import { WishlistProvider } from './wishlist/wishlistProvider';
import { AuthProvider } from './auth/AuthProvider';

export function AppProvider({ children }: React.PropsWithChildren) {
    return (
        <ProductProvider>
            <CompareProvider>
            <WishlistProvider>
            <ModalProvider>
                <AuthProvider>
                {children}
                </AuthProvider>
            </ModalProvider>
            </WishlistProvider>
            </CompareProvider>
        </ProductProvider>
      
    );
  }
  