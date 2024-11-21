// src/TodoItem.tsx
import React from "react";
import {  useDispatch } from 'react-redux';
import { deleteTodo ,toggleEdit,Todo } from '../todo-redux/redux/todoSlice';


interface TodoItemProps {
    todo : Todo;
    onEdit: (id: string, text: string) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({todo, onEdit }) => {

  const dispatch = useDispatch();

   return (

    <li className="flex gap-2 items-center p-2 border rounded">
         <input
        type="checkbox"
        checked={todo.completed}
        onClick={() => dispatch(toggleEdit(todo.id))}
      />
      <span
         onClick={() => dispatch(toggleEdit(todo.id))}
        className={`w-full cursor-pointer `}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onEdit(todo.id, todo.text)}
        className=" px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
      >
        Edit
      </button>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
      >
        Delete
      </button>
    </li>
  );
}
 
export default TodoItem;