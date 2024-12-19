import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from "./routes";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App: React.FC = () => {
    
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
