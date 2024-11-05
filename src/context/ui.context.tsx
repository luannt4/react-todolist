import { ModalProvider } from  './modal/modal.context';
import { ProductProvider } from "./product/product.context";

export function ManagedUIContext({ children }: React.PropsWithChildren<{}>) {
    return (
      <ProductProvider>
          <ModalProvider>{children}</ModalProvider>
      </ProductProvider>
    );
  }
  