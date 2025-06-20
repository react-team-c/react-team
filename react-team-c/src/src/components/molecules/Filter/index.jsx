import React from 'react';
import styled from 'styled-components';
import { theme, Button } from '../../index';
import { useTodoState, useTodoDispatch } from '../../shared/contexts';

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

function TodoFilter() {
    const { todos, filter } = useTodoState();
    const dispatch = useTodoDispatch();

    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const activeTodos = totalTodos - completedTodos;

    const FILTER_TYPE = [
        { id: 1, name: '전체', state: 'all', amount: totalTodos },
        { id: 2, name: '미완료', state: 'active', amount: activeTodos },
        { id: 3, name: '완료', state: 'completed', amount: completedTodos },
    ];

    const handleFilterChange = (filterState) => {
        dispatch({ type: 'SET_FILTER', filter: filterState });
    };

    return (
        <FilterContainer>
            <ButtonGroup>
                {FILTER_TYPE.map(({ id, name, state, amount }) => (
                    <FilterBtn
                        key={id}
                        $variant="secondary"
                        $isActive={filter === state}
                        onClick={() => handleFilterChange(state)}
                    >
                        {name}: {amount}
                    </FilterBtn>
                ))}
            </ButtonGroup>
        </FilterContainer>
    );
}

export default TodoFilter;
