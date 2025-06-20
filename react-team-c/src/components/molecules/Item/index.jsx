import React, { useState } from 'react';
import styled from 'styled-components';
import { theme, Button, Text as ThemedText } from '../../index';
import { PRIORITY } from '../../shared/hooks/todoReducer';

const ItemContainer = styled.li`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.small};
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.line};
    border-left: 6px solid
        ${(props) => {
            switch (props.$priority) {
                case PRIORITY.HIGH:
                    return theme.colors.priority.high;
                case PRIORITY.MEDIUM:
                    return theme.colors.priority.medium;
                case PRIORITY.LOW:
                    return theme.colors.priority.low;
                default:
                    return theme.colors.priority.default;
            }
        }};

    @container todo (width < 350px) {
        width: 100%;
        flex-wrap: wrap;
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

const EditInput = styled.input`
    flex: 1;
    padding: 5px;
    border: 1px solid ${theme.colors.line};
    border-radius: 4px;
    font-size: ${theme.fontSize.medium};
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: ${theme.spacing.small};
`;

const PriorityTag = styled.span`
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: ${theme.fontSize.xsmall};
    font-weight: bold;
    color: ${theme.colors.white};
    background-color: ${(props) => {
        switch (props.$priority) {
            case PRIORITY.HIGH:
                return theme.colors.error;
            case PRIORITY.MEDIUM:
                return theme.colors.warning;
            case PRIORITY.LOW:
                return theme.colors.success;
            default:
                return theme.colors.gray;
        }
    }};
`;

const PrioritySelect = styled.select`
    padding: 3px;
    border: 1px solid ${theme.colors.line};
    border-radius: 4px;
    font-size: ${theme.fontSize.small};
`;

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editPriority, setEditPriority] = useState(todo.priority || PRIORITY.MEDIUM);

    const formatDate = (dateString) => {
        return dateString.split('T')[0];
    };

    const getPriorityLabel = (priority) => {
        switch (priority) {
            case PRIORITY.HIGH:
                return '높음';
            case PRIORITY.MEDIUM:
                return '중간';
            case PRIORITY.LOW:
                return '낮음';
            default:
                return '중간';
        }
    };

    const handleEdit = () => {
        if (isEditing) {
            onEdit(todo.id, editText, editPriority);
        }
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setEditPriority(todo.priority || PRIORITY.MEDIUM);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <ItemContainer $priority={todo.priority || PRIORITY.MEDIUM}>
            <Checkbox
                type="checkbox"
                name="todo checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />

            {isEditing ? (
                <EditInput
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <StyledText
                    as="span"
                    $completed={todo.completed}
                    $color={todo.completed ? 'gray' : 'text'}
                    $weight={todo.completed ? 'regular' : 'medium'}
                >
                    {todo.text}
                </StyledText>
            )}

            <Date>{formatDate(todo.createdAt)}</Date>

            {/* {isEditing ? (
                <PrioritySelect
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                >
                    <option value={PRIORITY.HIGH}>높음</option>
                    <option value={PRIORITY.MEDIUM}>중간</option>
                    <option value={PRIORITY.LOW}>낮음</option>
                </PrioritySelect>
            ) : (
                <PriorityTag $priority={todo.priority || PRIORITY.MEDIUM}>
                    {getPriorityLabel(todo.priority)}
                </PriorityTag>
            )} */}

            <ButtonGroup>
                {isEditing ? (
                    <>
                        <Button $variant="primary" onClick={handleEdit}>
                            저장
                        </Button>
                        <Button $variant="gray" onClick={handleCancel}>
                            취소
                        </Button>
                    </>
                ) : (
                    <>
                        <Button $variant="primary" onClick={handleEdit}>
                            수정
                        </Button>
                        <Button $variant="gray" onClick={() => onDelete(todo.id)}>
                            삭제
                        </Button>
                    </>
                )}
            </ButtonGroup>
        </ItemContainer>
    );
}

export default TodoItem;
