// src/TodoItem.tsx
import React from "react";
import { Todo } from "../../type/Todo";

interface TodoItemProps {
    todo : Todo;
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}

interface TodoItemProps {
    
}
 
interface TodoItemState {
    
}
 
class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
    state = { :  }
    render() { 
        return (  );
    }
}
 
export default TodoItem;