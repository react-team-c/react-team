import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onRemove }) {
  if (todos.length === 0) {
    return <p>✨ 할 일 입력 바람</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default TodoList;
