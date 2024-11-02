// src/TodoApp.tsx
import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

 interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC=()=>{
    const [todos, setTodos] = useState([]);
    const [currentText, setcurrentText] = useState("");
    const [editingId,seteditingId] = useState(null);
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
}
export default TodoApp;