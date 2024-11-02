// src/useTodoReducer.ts
import { useReducer, useEffect } from "react";
import { Todo } from "../../type/Todo";

// Define actions for the reducer
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_COMPLETE"; payload: number }
  | { type: "UPDATE_TODO"; payload: { id: number; text: string } }
  | { type: "SET_TODOS"; payload: Todo[] };

  
