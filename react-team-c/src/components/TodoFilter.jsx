import React from "react";

function TodoFilter({ filter, onFilterChange }) {
  return (
    <div className="todo-filter">
      <button className={filter === "all" ? "active" : ""} onClick={() => onFilterChange("all")}>
        전체
      </button>
      <button className={filter === "active" ? "active" : ""} onClick={() => onFilterChange("active")}>
        활성
      </button>
      <button className={filter === "completed" ? "active" : ""} onClick={() => onFilterChange("completed")}>
        완료
      </button>
    </div>
  );
}

export default TodoFilter;
