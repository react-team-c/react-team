import React from 'react';
import styled from 'styled-components';
import { theme, Button, Text as ThemedText } from '../../index';

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

const StyledText = styled(ThemedText)`
    flex: 1;
    text-decoration: ${(props) => (props.$completed ? 'line-through' : null)};
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
            <Checkbox
                type="checkbox"
                name="todo checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <StyledText
                as="span"
                $completed={todo.completed}
                $color={todo.completed ? 'gray' : 'text'}
                $weight={todo.completed ? 'regular' : 'medium'}
            >
                {todo.text}
            </StyledText>
            <Date>{formatDate(todo.createdAt)}</Date>
            <Button $variant="gray" onClick={() => onDelete(todo.id)}>
                삭제
            </Button>
        </ItemContainer>
    );
}

export default TodoItem;
