import React from 'react';
import styled from 'styled-components';
import PropsHandling from './components/PropsHandling';
import UStateEffect from './components/UStateEffect';

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
            <h1>Todo List</h1>

            <PropsHandling />
            <UStateEffect />
        </TodoApp>
    );
}

export default TodoAppContent;
