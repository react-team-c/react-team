import { useTodos } from "./hooks/useTodos";
import { useFilter } from "./hooks/useFilter";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoStats from "./components/TodoStats";

function App() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos();
  const { filter, setFilter, filterTodos } = useFilter();

  const filteredTodos = filterTodos(todos);

  return (
    <div className="todo-app">
      <TodoHeader />
      <TodoInput onTodoAdd={addTodo} />
      <TodoStats todos={todos} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onRemove={removeTodo} />
    </div>
  );
}

export default App;
