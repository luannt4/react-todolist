import { ModalProvider } from  './modal.context';
import { ProductProvider } from "./product.context";
import { CompareProvider } from "./compare.context";

export function ManagedUIContext({ children }: React.PropsWithChildren<{}>) {
    return (
      <ProductProvider>
        <CompareProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </CompareProvider>
      </ProductProvider>
    );
  }
  