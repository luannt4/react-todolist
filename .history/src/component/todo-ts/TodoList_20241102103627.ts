import React from "react";
import { Todo } from "../../type/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps  {
    todo : Todo;
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
    <ul>
    </
  )
};
export default TodoList;
