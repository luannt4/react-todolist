import ClockCountDown from './component/Clock';
import TodoCourse from './component/course';
import TodoApp from './component/todo-api';
import FormSearch from './component/formSearch';
import { ProductProvider } from "./component/todo-api/context/ProductContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Listingtabs from './component/listingtabs';
const queryClient = new QueryClient();

function App() {
  return (
     <QueryClientProvider client={queryClient}>
        <ProductProvider>
            <FormSearch />
            <Listingtabs />
            
        </ProductProvider>
     
    </QueryClientProvider>
  );
}

export default App;
