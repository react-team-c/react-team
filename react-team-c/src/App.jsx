import { useState } from 'react';

// 조회 기능 만들기
function fetchTodos() {
  const result = [];

  for (let i = 0; i < localStorage.length; i++) {
    const value = localStorage.key(i);
    result.push(value);
  }

  return result;
}

function App() {
  const [inputText, setInputText] = useState('');
  // const todos = fetchTodos();
  const [todos, setTodos] = useState(fetchTodos());

  const handleInput = (e) => {
    const value = e.target.value;
    setInputText(value);
  };

  const handleClick = () => {
    localStorage.setItem(inputText, inputText);
    // setInputText('');
    setTodos((currentTodos) => {
      return [...currentTodos, inputText];
    });
  };

  const handleRemove = (todo, index) => {
    const result = todos.filter((todoItem) => {
      if (todoItem !== todo) {
        return true;
      }
    });
    setTodos(result);
    localStorage.removeItem(todo);
  };

  return (
    <>
      <h1>ToDo App</h1>
      <div>
        <input type="text" value={inputText} onChange={handleInput} />
        <button onClick={handleClick}>add</button>
      </div>

      <div>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <span>{todo}</span>
                <button onClick={() => handleRemove(todo, index)}>
                  remove
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
