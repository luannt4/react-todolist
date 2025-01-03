// src/TodoItem.tsx
import React from "react";
import { Todo } from "../../type/Todo";
import StarIcon from "./star-icon";
interface TodoItemProps {
    todo : Todo;
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEditTodo,
  onDeleteTodo,
}) => {
   return (
    <li className="flex gap-2 items-center p-2 border rounded">
         <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      <StarIcon />
      <span
        onClick={()=> onToggleComplete(todo.id)}
        className={`w-full cursor-pointer `}
      >
        {todo.text}
      </span>
      <button
        onClick={()=> onEditTodo(todo.id,todo.text)}
        className=" px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
      >
        Edit
      </button>
      <button
        onClick={()=> onDeleteTodo(todo.id)}
        className="px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
      >
        Delete
      </button>
    </li>
  );
}
 
export default TodoItem;