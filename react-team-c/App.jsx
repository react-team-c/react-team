import React from 'react';
import styled from 'styled-components';
import { useTodos } from './hooks/useTodos';
import { useFilter } from './hooks/useFilter';
import TodoHeader from './components/TodoHeader';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

const TodoApp = styled.section`
    width: 600px;
    min-height: 100vh;
    padding: var(--spacing-small);
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-large);
    margin-top: var(--spacing-large);
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    transition: all 0.3s ease;

    @container todo (width < 650px) {
        width: 100%;
    }
`;

function TodoAppContent() {
    const { todos, addTodo, removeTodo, toggleTodo } = useTodos();
    const { filter, setFilter, filterTodos } = useFilter();
    const filteredTodos = filterTodos(todos);

    return (
        <TodoApp>
            <TodoHeader />
            <TodoForm onTodoAdd={addTodo} />
            <TodoFilter filter={filter} onFilterChange={setFilter} todos={todos} />
            <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={removeTodo} />
        </TodoApp>
    );
}

export default TodoAppContent;
