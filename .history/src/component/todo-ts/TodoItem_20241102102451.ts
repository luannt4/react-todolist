// src/TodoItem.tsx
import React from "react";
import { Todo } from "../../type/Todo";

interface TodoItemProps {
    todo : Todo;
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}

interface TodoItemPropsProps {
    
}
 
interface TodoItemPropsState {
    
}
 
class TodoItemProps extends React.Component<TodoItemPropsProps, TodoItemPropsState> {
    state = { :  }
    render() { 
        return (  );
    }
}
 
export default TodoItemProps;