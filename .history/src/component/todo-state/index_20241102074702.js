import React, { useEffect, useState } from 'react';
import TodoInput from '../todo-state/TodoInput';
import TodoItem from '../todo-state/TodoItem';

function TodoApp() {
    const [todos, setTodos] = useState([]); // State để lưu danh sách công việc
    const [currentText, setCurrentText] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);


    // Lấy dữ liệu từ localStorage khi ứng dụng khởi chạy
	useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

  	// Lưu danh sách công việc vào localStorage mỗi khi `todos` thay đổi
  	useEffect(() => {
        if (todos.length) {
    	    localStorage.setItem("todos", JSON.stringify(todos));
        }
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
      
    //Thêm hoặc cập nhật To-Do
    const addOrUpdateTodo  = ()=> {
        if (currentText.trim()) {
            if (editingId !== null) {
                setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === editingId ? { ...todo, text: currentText } : todo
                )
                );
                setEditingId(null);
            } else {
                const newTodo: Todo = {
                id: Date.now(),
                text: currentText,
                completed: false,
                };
                setTodos((prevTodos) => [...prevTodos, newTodo]);
            }
            setCurrentText("");
        }
    
   }

    //DeleteTodo
    const deleteTodo = (id:number) => {
        setTodos(todos.filter((todo)=> todo.id != id))
    };

    // Bắt đầu chỉnh sửa To-Do
    const startEditing = (id: number, text: string) => {
        setEditingId(id);
        setCurrentText(text);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
             <TodoInput  
                currentText={currentText}
                setCurrentText={setCurrentText}
                onAddOrUpdateTodo={addOrUpdateTodo}
                isEditing={editingId !== null} 
            />
            <ul className="mt-4 space-y-2">
                {todos.map((todo)=> (
                    <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={startEditing}
                />
                ))}
            </ul>
          <div className="mt-4 text-center text-gray-600">
            Tổng số việc: {todos.length} | 
            Đã hoàn thành: {todos.filter((todo)=> todo.completed).length}</div>
        </div>
      );
}
export default TodoApp;