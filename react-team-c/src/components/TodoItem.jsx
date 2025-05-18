import React from 'react';
import styled from 'styled-components';
import { theme, Button } from '../styles/theme';

const ItemContainer = styled.li`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.small};
    padding: ${theme.spacing.small};

    @container todo (width < 350px) {
        width: 100%;
        flex-wrap: wrap;
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${theme.colors.line};
    }
`;

const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;
    align-self: flex-start;
    margin-top: 5px;
`;

const Text = styled.span`
    flex: 1;
    text-decoration: ${(props) => (props.completed ? 'line-through' : null)};
    color: ${(props) => (props.completed ? theme.colors.gray : theme.colors.text)};
    font-size: ${theme.fontSize.medium};
    font-weight: ${(props) => (props.completed ? 400 : 600)};
`;

const Date = styled.span`
    font-size: ${theme.fontSize.small};
    color: ${theme.colors.gray};
`;

function TodoItem({ todo, onToggle, onDelete }) {
    const formatDate = (dateString) => {
        return dateString.split('T')[0];
    };

    return (
        <ItemContainer>
            <Checkbox type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
            <Text completed={todo.completed}>{todo.text}</Text>
            <Date>{formatDate(todo.createdAt)}</Date>
            <Button variant="gray" onClick={() => onDelete(todo.id)}>
                삭제
            </Button>
        </ItemContainer>
    );
}

export default TodoItem;
