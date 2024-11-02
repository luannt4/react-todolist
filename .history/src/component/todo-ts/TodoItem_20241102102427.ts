// src/TodoItem.tsx
import React from "react";
import { Todo } from "../../type/Todo";
import { constants } from "fs/promises";

interface TodoItemProps {
    todo : Todo;
    onToggleComplete: (id: number) => void;
    onEditTodo: (id: number, text: string) => void;
    onDeleteTodo: (id: number) => void;
}

constants