// /components/TodoForm.tsx
import React, { useEffect, useState } from 'react';


interface TodoFormProps {
    editingTodo?: { id: string; text: string };
    onSave: () => void;
}
const TodoForm: React.FC<TodoFormProps> = ({editingTodo,onSave}) => {
   

    return (
        <form className="flex items-center space-x-2">
        TodoForm
        </form>
    );
}
export default TodoForm;
