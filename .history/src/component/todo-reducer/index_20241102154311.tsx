import React, { useReducer, useState } from 'react';

// Define initial state for the todos
const initialState : any = [];

// Define actions for the reducer
const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo',
  };

// Reducer function to handle actions
function todoReducer(todos, action) {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, newTodo(action.payload.name)];
      case ACTIONS.TOGGLE_TODO:
        return todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : todo
        );
      case ACTIONS.DELETE_TODO:
        return todos.filter(todo => todo.id !== action.payload.id);
      default:
        return todos;
    }
}  

 // Helper function to create a new todo item
function newTodo(name) {
    return { id: Date.now(), name, complete: false };
}

function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, initialState); // Set up reducer
    const [name, setName] = useState(''); // State for new todo input
  
    // Handler for adding a new todo
    function handleAddTodo(e) {
      e.preventDefault();
      if (name.trim() === '') return;
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
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
        <ul className="list-disc list-inside space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center">
              <span
                onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}
                className={`cursor-pointer ${todo.complete ? 'line-through text-gray-500' : ''}`}
              >
                {todo.name}
              </span>
              <button
                onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}
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