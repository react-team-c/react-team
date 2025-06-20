import React from 'react';
import styled from 'styled-components';
import { TodoProvider } from './design-system/shared/contexts';
import { TodoHeader, TodoForm, TodoFilter, TodoList } from './design-system';

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
    return (
        <TodoApp>
            <TodoHeader />
            <TodoForm />
            <TodoFilter />
            <TodoList />
        </TodoApp>
    );
}

function App() {
    return (
        <TodoProvider>
            <TodoAppContent />
        </TodoProvider>
    );
}

export default App;
