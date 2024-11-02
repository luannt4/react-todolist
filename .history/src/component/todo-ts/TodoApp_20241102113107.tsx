// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { Todo } from ".../types";

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentText, setcurrentText] = useState("");
    const [editingId,seteditingId] = useState(null);
    
    // Load To-Do từ localStorage khi ứng dụng khởi động
    useEffect(() => {
        const saveTodos = localStorage.getItem('todos');
        if (saveTodos) {
            setTodos(JSON.parse(saveTodos));
        }
    }, []);

    //toggleComplete
    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) => (
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            )
        );
    };

    //DeleteTodo
    const deleteTodo = (id:number) => {
        setTodos(todos.filter((todo)=> todo.id != id))
    };

    // Bắt đầu chỉnh sửa To-Do
    const startEditing = (id: number, text: string) => {
        setEditingId(id);
        setCurrentText(text);
    };

    return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>To-Do List</h1>
     
      <TodoList
        todos={todos}
        onToggleComplete={toggleComplete}
        onEditTodo={startEditing}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}
export default TodoApp;