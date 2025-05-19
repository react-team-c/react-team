import React, { useState } from 'react';
import styled from 'styled-components';
import { theme, Button } from '../styles/theme';

const FormContainer = styled.form`
    max-width: 300px;
    margin: auto;
    display: flex;
    gap: ${theme.spacing.small};
    margin-bottom: ${theme.spacing.medium};
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

function TodoForm({ onTodoAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onTodoAdd(text);
        setText('');
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <Button type="submit" variant="primary">
                추가
            </Button>
        </FormContainer>
    );
}

export default TodoForm;
