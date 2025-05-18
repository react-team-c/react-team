import React from 'react';
import styled from 'styled-components';
import { theme, Button } from '../styles/theme';

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: ${theme.spacing.small};
`;

const FilterBtn = styled(Button)`
    font-size: ${theme.fontSize.small};
`;

function TodoFilter({ filter, onFilterChange, todos }) {
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const activeTodos = totalTodos - completedTodos;

    return (
        <FilterContainer>
            <ButtonGroup>
                <FilterBtn
                    isActive={filter === 'all'}
                    variant="secondary"
                    onClick={() => onFilterChange('all')}
                >
                    전체: {totalTodos}
                </FilterBtn>
                <FilterBtn
                    isActive={filter === 'active'}
                    variant="secondary"
                    onClick={() => onFilterChange('active')}
                >
                    미완료: {activeTodos}
                </FilterBtn>
                <FilterBtn
                    isActive={filter === 'completed'}
                    variant="secondary"
                    onClick={() => onFilterChange('completed')}
                >
                    완료: {completedTodos}
                </FilterBtn>
            </ButtonGroup>
        </FilterContainer>
    );
}

export default TodoFilter;
