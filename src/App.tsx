import ClockCountDown from './component/Clock';
import TodoCourse from './component/course';
import TodoApp from './component/todo-api';
import { ProductProvider } from "./component/todo-api/context/ProductContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

function App() {
  return (
     <QueryClientProvider client={queryClient}>
        <ProductProvider>
            <TodoApp />
        </ProductProvider>
     
    </QueryClientProvider>
  );
}

export default App;
