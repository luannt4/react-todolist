import { createContext } from "react";
import { State } from "./types";

export const DrawerContext = createContext<State | any>(undefined);
