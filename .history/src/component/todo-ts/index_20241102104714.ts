// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

 interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState([]);
    const [currentText, setcurrentText] = useState("");
    const [editingId,seteditingId] = useState(null);
    
    // Load To-Do từ localStorage khi ứng dụng khởi động
    useEffect(() => {
        const saveTodos = localStorage.getItem('todos');
        if (saveTodos) {
            setTodos(JSON.parse(saveTodos));
        }
    }, []);

    return (
     <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
    
        </div>
    );
}
export default TodoApp;