import TodoList from "../components/todo/TodoList";
import { ADD_TODO, DELETE_TODO, SAVE_TODO } from "./actionTypes";

type TodoList = {
    id: number;
    task: string;
    completed: boolean;
  }

type State = {
  todo: TodoList[],
}
  
type Action = {
  type: string;
  payload?: unknown;
}

const todoReducer = (state : State, action: Action) => {
  const {type, payload} = action;

  if (type === ADD_TODO) {
    console.log('add todo took flight');
    const { todo } = state;
    const data = todo.concat(payload as TodoList);
    localStorage.setItem('todos', JSON.stringify(data));
    return {...state, todo: data};
  }

  if (type === SAVE_TODO) {
    console.log('save todo took flight');
    localStorage.setItem('todos', JSON.stringify(payload));
    return {...state, todo: payload as TodoList[]};
  }

  if (type === DELETE_TODO) {
    console.log('save todo took flight');
    const { todo }  = state;
    const filteredTodo = todo.filter((item) => item.id !== (payload as {id: number}).id);
    localStorage.setItem('todos', JSON.stringify(filteredTodo));
    return {...state, todo: filteredTodo};
  }

  return state
}

export default todoReducer;