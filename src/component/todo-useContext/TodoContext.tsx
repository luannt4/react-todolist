// src/TodoContext.tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Todo } from "../../types/Todo";
import { todoReducer } from "./TodoReducer";


interface TodoContextType {
  todos: Todo[];
  dispatch: React.Dispatch<any>;
}

// Khởi tạo TodoContext
const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};

// Provider component quản lý trạng thái của Todo và lưu trữ vào localStorage
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch({ type: "SET_TODOS", payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
    	localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};