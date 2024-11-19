// /components/TodoList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../todo-redux/redux/store';
import TodoItem from "./TodoItem";


const TodoList: React.FC<{ onEdit: (id: string, text: string) => void }> = ({ onEdit }) => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <ul className="mt-4 space-y-2">
    {todos.map((todo) => (
        <TodoItem key = {todo.id} todo = {todo} onEdit={onEdit}/>
    ))}
    </ul>
  )
};
export default TodoList;
