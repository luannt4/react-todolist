//import TodoApp from './component/todo-ts';
import ClockCountDown from './component/Clock';
import TodoCourse from './component/course';
import TodoApp from './component/todo-useContext';
import { TodoProvider } from "./component/todo-useContext/TodoContext";

function App() {
  return (
    <div className="App">
        <TodoProvider>
            <TodoApp />
        </TodoProvider>
     
    </div>
  );
}

export default App;
