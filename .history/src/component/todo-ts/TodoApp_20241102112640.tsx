// src/TodoApp.tsx
import React, { useState, useEffect } from "react";


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
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>To-Do List</h1>
      <TodoInput
        currentText={currentText}
        setCurrentText={setCurrentText}
        onAddOrUpdateTodo={addOrUpdateTodo}
        isEditing={editingId !== null}
      />
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