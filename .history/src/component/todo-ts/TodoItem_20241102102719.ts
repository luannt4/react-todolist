// src/TodoItem.tsx
import React from "react";
import { Todo } from "../../type/Todo";

interface TodoItemProps {
    todo : Todo;
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}


interface TodoProps {
    
}
 
interface TodoState {
    
}
 
class Todo extends React.Component<TodoProps, TodoState> {
    constructor(props: TodoProps) {
        super(props);
        this.state = { :  };
    }
    render() { 
        return (  );
    }
}
 
export default Todo;
 
export default TodoItem;