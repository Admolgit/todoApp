import React, { useEffect } from 'react';
import '../../App.css';

type TodoItemProps = {
    completed: boolean;
    ind: number;
    id: number;
    task: string;
    onClick(id: number): void
    onDelete(id: number): void;
    onEdit(id: number): void;

}

const TodoItem = (props: TodoItemProps) => {
    const { completed, ind, id, onClick, onDelete, onEdit, task } = props;

    useEffect(() => {
        console.log('render', ind)
    }, [id])

  return (
    <div className="todo-item" key={id}>
        <p> {ind + 1}. {task} </p>
        <p>Completed: {completed ? "Yes" : "No"}</p>
        <div className="todo-actions">
              <button className="todo-delete" onClick={() => { onDelete(id) }}  >
                delete
              </button>
              <button className="todo-edit" onClick={() => { onEdit(id) } } >
                edit ✍🏾
              </button>
              <button className="todo-view" onClick={() => { onClick(id) } } >
                View 👀
              </button>
         </div>
    </div>
  )
}

export default TodoItem