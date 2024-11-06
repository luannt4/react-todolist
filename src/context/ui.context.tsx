import { ModalProvider } from  './modal.context';
import { ProductProvider } from "./product.context";
import { CompareProvider } from "./compare.context";
import { WishlistProvider } from './wishlist.context';

export function ManagedUIContext({ children }: React.PropsWithChildren<{}>) {
    return (
      <ProductProvider>
        <CompareProvider><WishlistProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
          </WishlistProvider></CompareProvider>
      </ProductProvider>
    );
  }
  