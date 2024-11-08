// src/TodoItem.tsx
import React from "react";
import { useProductContext } from "./context/ProductContext";

import { Product } from "../../types/Todo";
import StarIcon from "./star-icon";

interface TodoItemProps {
    product : Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({ product, onEdit, onDelete }) => {
    const {id, title, description, price } = product;

   
    
   return (
    <li className=" gap-2 p-2 border rounded bg-white">
        <p className={`w-full cursor-pointer font-medium `}>
            {title}
        </p>
        <p className="text-gray-500 text-lg">
            ${price}
        </p>
        <p className="text-gray-500 mb-5 line-clamp-2">
            {description}
        </p>
        <div className="flex gap-3">
                <button
                onClick={() => onEdit(product)}
                className=" px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
            >
                Edit
            </button>

            <button  className="px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
                 onClick={() => onDelete(id)}>
                Delete
            </button>
        </div>
      
    </li>
  );
}
 
export default TodoItem;