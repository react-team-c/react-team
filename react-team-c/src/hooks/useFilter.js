import { useState } from "react";

export function useFilter() {
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  const filterTodos = (todos) => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  
  return { filter, setFilter, filterTodos };
}
