import React, { useEffect, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";

interface TodoList {
  id: number;
  task: string;
  completed: boolean;
}

type TodoListProp = {
  todo: TodoList[];
  onDelete(id: number): void;
  onEdit(id: number): void;
};

const TodoList = (props: TodoListProp) => {
  const { todo, onDelete, onEdit } = props;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("todo list render");
  }, []);

  const onClick = (id: number) => {
    //navigate to /todoview/1
    navigate(`view/${id}`);
  }

  return (
    <div className="todo-list">
      {todo.map(({ id, task, completed }, ind) => (
        <TodoItem
          completed={completed}
          id={id}
          ind={ind}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          key={id}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default memo(TodoList);
