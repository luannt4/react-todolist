// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC=()=>{
    const [todos, setTodos] = useState<Todo[]>([]);
}
export default TodoApp;