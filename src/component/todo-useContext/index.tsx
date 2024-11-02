import React, { useReducer, useState, useEffect } from 'react';
import { useTodos  } from "./TodoContext";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

const TodoApp: React.FC = () => {
     const { todos, dispatch } = useTodos(); // Set up reducer
    const [currentText, setCurrentText] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    

    // Handler for adding a new todo
    const addOrUpdateTodo  = ()=> {
        if (currentText.trim()) {
            if (editingId !== null) {
                dispatch({ type: "UPDATE_TODO", payload:{ id: editingId, text: currentText } })
                setEditingId(null);
            } else {
               dispatch({ type: "ADD_TODO", payload: currentText })
            }
            setCurrentText("");
        }
    
   }

    // Bắt đầu chỉnh sửa To-Do
    const startEditing = (id: number, text: string) => {
        setEditingId(id);
        setCurrentText(text);
    };

    return (
      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
  
        {/* Input form for adding new todos */}
        <TodoInput 
            currentText={currentText}
            setCurrentText={setCurrentText}
            onAddOrUpdateTodo={addOrUpdateTodo}
           isEditing={editingId !== null}
        />

        {/* List of todos */}
        <TodoList
            todos={todos}
            onToggleComplete={(id)=> dispatch({ type: "TOGGLE_COMPLETE", payload:id }) }
            onEditTodo={startEditing}
            onDeleteTodo={(id)=> dispatch({type: "DELETE_TODO", payload:id})}
        />
      </div>
    );
  }
  
  export default TodoApp;