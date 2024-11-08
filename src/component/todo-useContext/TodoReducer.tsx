// src/TodoReducer.ts
import { Todo } from "../../types/Todo";

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_COMPLETE"; payload: number }
  | { type: "UPDATE_TODO"; payload: { id: number; text: string } }
  | { type: "SET_TODOS"; payload: Todo[] };

export const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case "SET_TODOS":
      return action.payload;
    default:
      return state;
  }
};