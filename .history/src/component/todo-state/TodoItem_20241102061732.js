// src/TodoItem.js
import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <span
        onClick={()=> toggleComplete(todo.id)}
        className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
      >
        {todo.text}
      </span>
      <button
        onClick={()=> deleteTodo(todo.id)}
        className="px-2 py-0.5 bg-gray text-white rounded  hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;