import ClockCountDown from './component/Clock';
import TodoCourse from './component/course';
import TodoApp from './component/todo-api';
import FormSearch from './component/formSearch';
import { ManagedUIContext } from "./context/ui.context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Listingtabs from './component/listingtabs';
import ManagedModal from './component/common/modal/managed-modal';
const queryClient = new QueryClient();

function App() {
  return (
     <QueryClientProvider client={queryClient}>
        <ManagedUIContext>
            <FormSearch />
            <Listingtabs />
            <ManagedModal />
        </ManagedUIContext>
     
    </QueryClientProvider>
  );
}

export default App;
