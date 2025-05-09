import React from "react";

function TodoStats({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <p className="todo-stats">
      <span>전체: {totalTodos} / </span>
      <span>완료: {completedTodos} / </span>
      <span>미완료: {activeTodos}</span>
    </p>
  );
}

export default TodoStats;
