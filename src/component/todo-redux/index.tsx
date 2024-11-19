// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const TodoRedux: React.FC = () => {
    const [editingTodo, setEditingTodo] = useState<{ id: string; text: string } | undefined>(undefined);

    const handleEdit = (id: string, text: string) => {
        setEditingTodo({ id, text });
    };

    const handleSave = () => {
        setEditingTodo(undefined); // Sử dụng undefined thay vì null
    };
    return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List - Redux Toolkit</h1>
        <TodoForm editingTodo={editingTodo} onSave={handleSave}/>
        <TodoList onEdit={handleEdit}/>
    </div>
  );
}
export default TodoRedux;