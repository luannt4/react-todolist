import React, { useReducer, useState, useEffect } from 'react';
import { Todo } from "../../type/Todo";
import {TodoList} from "./TodoList";
import {TodoList} from ".TodoList";
// Define initial state for the todos
const initialState : any = [];

// Define actions for the reducer
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_COMPLETE"; payload: number }
  | { type: "UPDATE_TODO"; payload: { id: number; text: string } }
  | { type: "SET_TODOS"; payload: Todo[] };

// Reducer function to handle actions
const todoReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case "SET_TODOS":
      return action.payload;
    default:
      return state;
  }
}  

 // Helper function to create a new todo item
function newTodo(name:string) {
    return { id: Date.now(), text:name, completed: false };
}

const TodoApp: React.FC = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState); // Set up reducer
    const [name, setName] = useState(''); // State for new todo input
    
    // Load To-Do từ localStorage khi ứng dụng khởi động
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            dispatch({ type: "SET_TODOS", payload: JSON.parse(savedTodos) });
        }
    }, []);

    // Lưu danh sách công việc vào localStorage mỗi khi `todos` thay đổi
  	useEffect(() => {
        if (todos.length) {
    	    localStorage.setItem("todos", JSON.stringify(todos));
        }
	}, [todos]);
    

    // Handler for adding a new todo
    function handleAddTodo(e: React.SyntheticEvent) {
      e.preventDefault();
      if (name.trim() === '') return;
      dispatch({ type: "ADD_TODO", payload: name });
      setName('');
    }
    
    return (
      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
  
        {/* Input form for adding new todos */}
        <form onSubmit={handleAddTodo} className="flex mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded-l"
            placeholder="Enter a new todo"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
            Add Todo
          </button>
        </form>
  
        {/* List of todos */}
        <TodoList/>
        <ul className="list-disc list-inside space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center">
              <span
                onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload:todo.id })}
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => dispatch({ type: "DELETE_TODO", payload:todo.id })}
                className="text-red-500 ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    );
  }
  
  export default TodoApp;