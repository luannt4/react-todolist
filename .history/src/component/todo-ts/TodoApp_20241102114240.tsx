// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { Todo } from "../../type/Todo";
import TodoInput from "../todo-state/TodoInput";

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    
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
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <TodoInput 
        currentText={currentText} 
        setCurrentText={setCurrentText} 
        isEditing={isEditing}
        >
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