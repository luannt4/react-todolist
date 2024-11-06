import React from "react";
import { ManagedUIContext } from "./context/ui.context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ManagedModal from './component/common/modal/managed-modal';
import { AppRouter } from "./router";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
     <QueryClientProvider client={queryClient}>
        <ManagedUIContext>
            <AppRouter/>
            <ManagedModal />
        </ManagedUIContext>
     
    </QueryClientProvider>
  );
}

export default App;
