// src/TodoItem.tsx
import React from "react";
import { Todo } from "../../type/Todo";

interface TodoItemProps {
    todo : Todo;
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}


interface Props {
    
}
 
interface State {
    
}
 
class  extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { :  };
    }
    render() { 
        return (  );
    }
}
 
export default ;
 
export default TodoItem;