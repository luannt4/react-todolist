// src/TodoItem.tsx
import React from "react";
import { Todo } from "../../type/Todo";

interface TodoItemProps {
    todo : Todo;
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEditTodo,
  onDeleteTodo,
}) => {
    return (  );
}
 
export default TodoItem;