import React, { useReducer, useState, useEffect } from 'react';
import { Todo } from "../../type/Todo";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

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
    const [currentText, setCurrentText] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    
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
    const addOrUpdateTodo  = ()=> {
        if (currentText.trim()) {
            if (editingId !== null) {
                dispatch({ type: "UPDATE_TODO", payload:{ id: editingId; text: currentText } })
                setEditingId(null);
            } else {
               dispatch({ type: "ADD_TODO", payload:editingId })
            }
            setCurrentText("");
        }
    
   }
    
     // Bắt đầu chỉnh sửa To-Do
    const startEditing = (id: number, text: string) => {
        setEditingId(id);
        setCurrentText(text);
    };


    return (
      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
  
        {/* Input form for adding new todos */}
        
        <TodoInput 
            currentText={currentText}
            setCurrentText={setCurrentText}
            onAddOrUpdateTodo={addOrUpdateTodo}
           isEditing={editingId !== null}
        />

        {/* List of todos */}
        <TodoList
            todos={todos}
            onToggleComplete={(id)=> dispatch({ type: "TOGGLE_COMPLETE", payload:id }) }
            onEditTodo={startEditing}
            onDeleteTodo={(id)=> dispatch({type: "DELETE_TODO", payload:id})}
        />
        
      </div>
    );
  }
  
  export default TodoApp;