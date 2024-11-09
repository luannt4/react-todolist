import { ModalProvider } from  './modal/modalProvider';
import { ProductProvider } from "./store/storeProvider";
import { CompareProvider } from "./compare/compareProvider";
import { WishlistProvider } from './wishlist/wishlistProvider';

export function AppProvider({ children }: React.PropsWithChildren) {
    return (
        <>
        <ProductProvider>
            <CompareProvider>
            <WishlistProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
            </WishlistProvider>
            </CompareProvider>
      </ProductProvider>
        
        </>
      
    );
  }
  