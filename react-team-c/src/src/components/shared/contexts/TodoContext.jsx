// fast refresh 문제 해결
/* eslint-disable react-refresh/only-export-components */
import React, { useReducer, useEffect, createContext } from 'react';
import { todoReducer, initialState } from '../hooks/todoReducer';

// Context 생성
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

// TodoProvider 컴포넌트
function TodoProvider({ children }) {
    // 로컬스토리지에서 할 일 불러오기
    const [state, dispatch] = useReducer(todoReducer, initialState, () => {
        const savedTodos = localStorage.getItem('todos');
        return {
            ...initialState,
            todos: savedTodos ? JSON.parse(savedTodos) : [],
        };
    });

    // 할 일 목록이 변경될 때 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state.todos));
    }, [state.todos]);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export default TodoProvider;
