import "./App.css";
import Router from "./router";
import TodoWrapper from "./state/todoContext";

function App() {
  return (
    <TodoWrapper>
      <Router />
    </TodoWrapper>
  );
}

export default App;
