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

const FILTERDATA = [
  { id:1,state: 'all', name:'전체',amount:totalTodos },
  { id:2,state: 'active', name:'진행중', amount:activeTodos },
  { id:3,state: 'completed', name:'완료', amount:completedTodos },
];

function TodoFilter({ filter, onFilterChange, todos }) {
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const activeTodos = totalTodos - completedTodos;



    return (
        <FilterContainer>
            <ButtonGroup>
                {FILTERDATA.map((filterdata) => (
                    <FilterBtn key={filterdata.id} isActive={filter===filterdata.state} onClick={()=>onFilterChange(filterdata.state)} variant="secondary">{filterdata.name}: {filterdata.amount}</FilterBtn>
                ))}
            </ButtonGroup>
        </FilterContainer>
    );
}

export default TodoFilter;
