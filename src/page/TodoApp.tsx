import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import TodoLister from "../components/todo/TodoList";
import TodoWrapper, { TodoContext } from "../state/todoContext";
import { useCustomState } from "../hooks";
import { ADD_TODO, DELETE_TODO, SAVE_TODO } from "../state/actionTypes";

interface TodoList {
  id: number;
  task: string;
  completed: boolean;
}

const Todo = () => {
  const { inputText, setInputText } = useCustomState();
  const {
    state: { todo },
    dispatch,
  } = useContext(TodoContext);
  const [userInteraction, setUserInteraction] = useState<"Edit" | "Add">("Add");
  let [editId, setEditid] = useState<number>();

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputText(value);
    },
    [setInputText]
  );

  const onAddHandler = useCallback(() => {
    const id = Date.now();
    const completed = false;
    const task = inputText.trim();

    if (!task) return;
    dispatch({ type: ADD_TODO, payload: { id, task, completed } });
    setInputText("");
  }, [setInputText, inputText, todo]);

  const onSaveHandler = useCallback(() => {
    const task = inputText.trim();
    const updatedTodo = todo.map((item) => {
      if (item.id === editId) {
        item.task = task;
      }
      return item;
    });

    if (!task) return;
    dispatch({ type: SAVE_TODO, payload: updatedTodo });
    setUserInteraction("Add");
    setInputText("");
  }, [dispatch, setUserInteraction, setInputText, editId, todo, inputText]);

  const onDelete = useCallback(
    (id: number) => {
      if (!todo.length) return;
      dispatch({ type: DELETE_TODO, payload: { id } });
    },
    [todo, dispatch]
  );

  const onEdit = useCallback(
    (id: number) => {
      // get the todo that we want tot edit
      const { task } = todo.find((item) => item.id === id) as TodoList;
      // populate that todo on the todo input
      setInputText(task);
      setUserInteraction("Edit");
      setEditid(id);
      // onclicking add todo rather make it save todo
      // onclicking save todo make it edit the todo
    },
    [todo, setInputText, setUserInteraction, setEditid]
  );

  // const todoData = useMemo(() => {
  //     return todo
  // }, [todo])
  useEffect(() => {}, [todo]);

  return (
    <TodoWrapper>
      <div className="todo">
        <div className="todo-input">
          <input
            placeholder="enter new todo"
            onChange={onChangeHandler}
            value={inputText}
          />
          {userInteraction === "Add" ? (
            <button onClick={onAddHandler}>Add Todo</button>
          ) : (
            <button onClick={onSaveHandler}>Save Todo</button>
          )}
        </div>
        <TodoLister todo={todo} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </TodoWrapper>
  );
};

export default Todo;
