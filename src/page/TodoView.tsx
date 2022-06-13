import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface TodoList {
    id: number;
    task: string;
    completed: boolean;
  }

const TodoView = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<TodoList>()

  const getLocalStorageTodos = () => {
    const todos = JSON.parse(localStorage?.getItem("todos") || "[]") as TodoList[];
    return todos;
  };

  const todoItem = () => {
      const todos = getLocalStorageTodos();
      const filteredId = todos.find(items => items.id === Number(id));
      if(filteredId) {
          setItem(filteredId);
      }
  }

  useEffect(() => {
      todoItem();
  }, [])

  return (
    <div className="todo-item">
      <p> {item?.task} </p>
      <p>Completed: {item?.completed ? "Yes" : "No"}</p>
    </div>
  );
};

export default TodoView;
