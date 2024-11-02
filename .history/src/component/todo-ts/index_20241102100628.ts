// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC=()=>{

}
export default TodoApp;