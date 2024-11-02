// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

 interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC=()=>{
    const [todos, setTodos] = useState([]);
    const [current]
}
export default TodoApp;