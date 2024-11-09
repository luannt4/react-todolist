import React from "react";
import { AppProvider } from "./contexts/AppContextProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ManagedModal from './component/common/modal/managed-modal';
import { AppRouter } from "./routes/AppRouter";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
     <QueryClientProvider client={queryClient}>
        <AppProvider>
            <AppRouter/>
            <ManagedModal />
        </AppProvider>
     
    </QueryClientProvider>
  );
}

export default App;
