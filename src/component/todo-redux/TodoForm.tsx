// /components/TodoForm.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../todo-redux/redux/todoSlice';

interface TodoFormProps {
    editingTodo?: { id: string; text: string };
  onSave: () => void;
}
const TodoForm: React.FC<TodoFormProps> = ({editingTodo,onSave}) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingTodo) {
            setText(editingTodo.text);
        }
    }, [editingTodo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTodo) {
            dispatch(editTodo({ id: editingTodo.id, text }));
        } else {
            dispatch(addTodo(text));
        }
        setText('');
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {editingTodo ? "Update" : "Add"}
            </button>
        </form>
    );
}
export default TodoForm;
