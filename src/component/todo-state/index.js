import React, { useState } from 'react';
import TodoInput from '../todo-state/TodoInput';
import TodoItem from '../todo-state/TodoItem';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    
    //addTodo
    const addTodo = (task)=> {
        setTodos([...todos,{id:Date.now(), task, completed:false}])
    }

    //toggleComplete
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) => (
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            )
        );
    };
      
    //DeleteTodo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo)=> todo.id != id))
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
          <TodoInput addTodo={addTodo}/>
          <ul className="mt-4 space-y-2">
            {todos.map((todo)=> (
                <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          
        </div>
      );
}
export default TodoApp;