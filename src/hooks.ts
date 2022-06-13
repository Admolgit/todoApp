import { useState } from "react";

interface TodoList {
    id: number;
    task: string;
    completed: boolean;
}  

export function useCustomState(){
    const [inputText, setInputText] = useState("");
    const [todo, setTodo] = useState<TodoList[]>([]);
  
    return {inputText, setInputText, todo, setTodo}
  }