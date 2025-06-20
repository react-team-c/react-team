import React, { useState } from 'react';
import styled from 'styled-components';
import { theme, Button } from '../../index';
import { useTodoDispatch } from '../../shared/contexts';
import { PRIORITY } from '../../shared/hooks/todoReducer';

const FormContainer = styled.form`
    max-width: 400px;
    margin: auto;
    display: flex;
    gap: ${theme.spacing.small};
    margin-bottom: ${theme.spacing.medium};
    align-items: center;
`;

const Input = styled.input`
    flex: 1;
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.gray};
    font-size: ${theme.fontSize.medium};
    border-radius: ${theme.borderRadius};

    &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
    }
`;

const PrioritySelect = styled.select`
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.gray};
    font-size: ${theme.fontSize.small};
    border-radius: ${theme.borderRadius};
    width: 80px;
`;

function TodoForm() {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState(PRIORITY.MEDIUM);
    const dispatch = useTodoDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        dispatch({
            type: 'ADD_TODO',
            text,
            priority,
        });
        setText('');
        setPriority(PRIORITY.MEDIUM);
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <PrioritySelect value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value={PRIORITY.HIGH}>높음</option>
                <option value={PRIORITY.MEDIUM}>중간</option>
                <option value={PRIORITY.LOW}>낮음</option>
            </PrioritySelect>
            <Button type="submit" $variant="primary">
                추가
            </Button>
        </FormContainer>
    );
}

export default TodoForm;
