import React from "react";

interface TodoInputProps {
  currentText: string;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  onAddOrUpdateTodo: () => void;
  isEditing: boolean;
}

const TodoInput : React:FC<TodoInputProps> = ()
