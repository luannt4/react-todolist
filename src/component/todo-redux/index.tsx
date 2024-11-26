// src/TodoApp.tsx
import React, { useState } from "react";
import UserList from "./TodoList";

const TodoRedux: React.FC = () => {
   
    return (
    <div className="p-4 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List - Redux Toolkit</h1>
        <UserList/>
    </div>
  );
}
export default TodoRedux;