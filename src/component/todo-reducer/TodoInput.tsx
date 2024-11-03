import React, { useRef } from "react";

interface TodoInputProps {
  currentText: string;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  onAddOrUpdateTodo: () => void;
  isEditing: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({
    currentText,
    setCurrentText,
    onAddOrUpdateTodo,
    isEditing,
}) => {
    const inputElement = useRef(null);
    const handleSubmit = (e:any) => {
        e.preventDefault();
        onAddOrUpdateTodo();
       
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Add a new task..."
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
             {isEditing ? "Save" : "Add"}
          </button>
        </form>
    );
}

  export default TodoInput;