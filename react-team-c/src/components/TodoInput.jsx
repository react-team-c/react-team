import { useState } from "react";

function TodoInput({ onTodoAdd }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onTodoAdd(inputText);
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="할 일을 입력하세요" />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoInput;
