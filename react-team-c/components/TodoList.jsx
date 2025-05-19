import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import TodoItem from './TodoItem';

const ListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.small};
    margin-top: ${theme.spacing.medium};
`;

const EmptyMessage = styled.p`
    text-align: center;
    color: ${theme.colors.gray};
    padding: ${theme.spacing.medium};
`;

function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return <EmptyMessage>✨ 할 일 입력 바람</EmptyMessage>;
    }

    return (
        <ListContainer>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ListContainer>
    );
}

export default TodoList;
