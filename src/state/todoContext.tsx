import React, { createContext, useState, Dispatch, SetStateAction, useReducer, useEffect } from "react";
import { SAVE_TODO } from "./actionTypes";
import todoReducer from "./reducer";

interface TodoList {
  id: number;
  task: string;
  completed: boolean;
}

type Action = {
  type: string;
  payload?: any;
}

type TodoContextType= {
  state: { todo: TodoList[] };
  dispatch: Dispatch<Action>
};

type TodoContextProps = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextType>({ 
  state: { todo: [] }, 
  dispatch: (_arg: Action) => {} 
});

export default function TodoWrapper(props: TodoContextProps) {
  const { children } = props;
  // const [todo, setTodo] = useState();
  const [state, dispatch] = useReducer(todoReducer, {todo: []});

  const getLocalStorageTodos = () => {
    const todos = JSON.parse(localStorage?.getItem('todos') || '[]') as TodoList[];
    return todos;
  }

  useEffect(() => {
    const todos = getLocalStorageTodos();
    dispatch({type: SAVE_TODO, payload: todos})
  }, [])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
        {children}
    </TodoContext.Provider>
  );
}
