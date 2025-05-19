import { useState, useEffect } from "react";

export function useTodos() {
  // 로컬스토리지에서 할 일 불러오기
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  // 할 일 목록이 변경될 때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 할 일 추가
  const addTodo = (text) => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // 할 일 제거
  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // 할 일 완료 상태 토글
  const toggleTodo = (id) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return { todos, addTodo, removeTodo, toggleTodo };
}
