// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";


const TodoApp: React.FC = () = ({
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

    return <h1>React</h1>;
)};
export default TodoApp;