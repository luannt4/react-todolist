import React, { useState } from 'react';
function TodoInput({ addTodo, updateInput }) {
    const [task, setTask] = useState('');// State để lưu giá trị nhập vào ô input
    
    zsetTask(updateInput);zzzzzzz
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(task.trim()){
            addTodo(task);
            setTask('');
        }
       
      };
    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      );
}
export default TodoInput;