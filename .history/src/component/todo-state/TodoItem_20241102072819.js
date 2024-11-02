// src/TodoItem.js
import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const handleUpdate = () => {
        editTodo(todo.id, text);
        setIsEditing(false);
    };
    
  return (
    <li className="flex gap-2 items-center p-2 border rounded">
     {isEditing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
         <span
        onClick={()=> toggleComplete(todo.id)}
        className={`w-full cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
      >
        {todo.text}
      </span>
      <button
        onClick={()=> editTodo(todo.id,todo.text)}
        className=" px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
      >
        Edit
      </button>
        </>
      )}

      

      <button
        onClick={()=> deleteTodo(todo.id)}
        className="px-2 py-0.5 bg-gray-500 text-white rounded  hover:bg-blue-500"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;