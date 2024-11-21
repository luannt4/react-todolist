// /redux/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage } from '../../../utils/localStorageUtil';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: loadFromLocalStorage('todos') || [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text: action.payload,
            completed: false,
        };
        state.todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
            todo.text = action.payload.text;
            localStorage.setItem('todos', JSON.stringify(state.todos));
        }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    toggleEdit: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleEdit } = todoSlice.actions;
export default todoSlice.reducer;