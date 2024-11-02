// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";


const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState([]);
    const [currentText, setcurrentText] = useState("");
    const [editingId,seteditingId] = useState(null);
    
    // Load To-Do từ localStorage khi ứng dụng khởi động
    /*useEffect(() => {
        const saveTodos = localStorage.getItem('todos');
        if (saveTodos) {
            setTodos(JSON.parse(saveTodos));
        }
    }, []);*/

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
            <div className="mt-4 text-center text-gray-600">
                Tổng số việc: {todos.length} | 
                Đã hoàn thành: {todos.filter((todo)=> todo.completed).length}</div>
            </div>
        </div>
   );
}
export default TodoApp;