import React, { useEffect, useState } from 'react';
import TodoInput from '../todo-state/TodoInput';
import TodoItem from '../todo-state/TodoItem';

function TodoApp() {
    const [todos, setTodos] = useState([]); // State để lưu danh sách công việc


    // Lấy dữ liệu từ localStorage khi ứng dụng khởi chạy
	useEffect(() => {
		try {
		  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
		  setTodos(storedTodos);
		} catch (error) {
		  console.error("Error reading from localStorage", error);
		}
	  }, []);

  	// Lưu danh sách công việc vào localStorage mỗi khi `todos` thay đổi
  	useEffect(() => {
		console.log('todolist',todos);
    	localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);


    //toggleComplete
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) => (
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            )
        );
    };
      
    //addTodo
    const addTodo = (task)=> {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,
      };
      setTodos([...todos,newTodo])
  }

    //DeleteTodo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo)=> todo.id != id))
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
          <TodoInput addTodo={addTodo} />
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