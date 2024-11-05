import React, { useReducer, useState, useEffect } from 'react';
import ProductList from "./TodoList";
import ProductForm from "./TodoInput";

const TodoApp: React.FC = () => {
    
    return (
      <div className="max-w-screen-2xl mx-auto p-4 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Product Management  </h1>
  
        {/* Input form for adding new todos */}
        <ProductForm/>

        {/* List of todos */}
        <ProductList/>
      </div>
    );
  }
  
  export default TodoApp;