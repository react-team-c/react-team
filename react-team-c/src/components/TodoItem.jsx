function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <span>{todo.text} - </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
