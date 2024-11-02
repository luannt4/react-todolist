import React, { useState, useEffect } from 'react';


const TodoApp = () => {
  // State quản lý danh sách công việc
  const [todos, setTodos] = useState([]);
  
  // State quản lý nội dung input
  const [inputValue, setInputValue] = useState('');

  // Tải danh sách công việc từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Lưu danh sách công việc vào localStorage mỗi khi danh sách thay đổi
  useEffect(() => {
    if (localStorage.getItem('todos').length) {
      console.log(localStorage.getItem('todos'));
    //localStorage.setItem('todos', JSON.stringify(todos));
    }
    
  }, [todos]);

  // Hàm thêm công việc mới
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue(''); // Xóa nội dung input sau khi thêm
    }
  };

  // Hàm xóa công việc
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Hàm chuyển trạng thái công việc (hoàn thành/chưa hoàn thành)
  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh Sách Công Việc</h1>
      
      {/* Khung nhập công việc */}
      <div className="flex mb-4">
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Nhập công việc mới"
          className="w-full px-3 py-2 border rounded"
        />
        <button onClick={addTodo} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Thêm
        </button>
      </div>

      {/* Danh sách công việc */}
      <div>
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className={`flex items-center justify-between p-2 border-b ${todo.completed ? 'bg-gray-100 line-through' : ''}`}
          >
            <span 
              onClick={() => toggleTodo(todo.id)}
              className="flex-grow cursor-pointer"
            >
              {todo.text}
            </span>
            <div className="flex items-center">
              <button 
                variant="ghost" 
                size="icon" 
                onClick={() => toggleTodo(todo.id)}
                className="mr-2"
              >
               CheckCircle
              </button>
              <button 
                variant="ghost" 
                size="icon" 
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:bg-red-100"
              >
                Trash2
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Thống kê */}
      <div className="mt-4 text-center text-gray-600">
        Tổng số việc: {todos.length} | 
        Đã hoàn thành: {todos.filter(todo => todo.completed).length}
      </div>
    </div>
  );
};

export default TodoApp;