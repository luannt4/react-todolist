import React from "react";
import { Todo } from "../../types/Todo";
import TodoItem from "./TodoItem";


interface TodoListProps  {
    todos : Todo[];
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onEditTodo,
  onDeleteTodo,
}) => {
  return (
    <ul className="mt-4 space-y-2">
    {todos.map((todo) => (
        <TodoItem
        key = {todo.id}
        todo = {todo}
        onToggleComplete={onToggleComplete}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
        />
    ))}
    </ul>
  )
};
export default TodoList;
