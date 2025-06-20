import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme, Button } from '../../index';
import { useTodoState, useTodoDispatch } from '../../shared/contexts';
import { PRIORITY } from '../../shared/hooks/todoReducer';

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.medium};
    margin-bottom: ${theme.spacing.medium};
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: ${theme.spacing.small};
    flex-wrap: wrap;
    justify-content: center;
`;

const FilterBtn = styled(Button)`
    font-size: ${theme.fontSize.small};
`;

const FilterSection = styled.div`
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    gap: ${theme.spacing.small};
    width: 100%;
`;

const FilterTitle = styled.h3`
    font-size: ${theme.fontSize.small};
    color: ${theme.colors.gray};
    margin-bottom: 0;
`;

const SearchContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 500px;
    gap: ${theme.spacing.small};
`;

const SearchInput = styled.input`
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

function TodoFilter() {
    const { todos, filter, priorityFilter } = useTodoState();
    const dispatch = useTodoDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const activeTodos = totalTodos - completedTodos;

    // 우선순위별 할일 개수 계산
    const highPriorityTodos = todos.filter((todo) => todo.priority === PRIORITY.HIGH).length;
    const mediumPriorityTodos = todos.filter((todo) => todo.priority === PRIORITY.MEDIUM).length;
    const lowPriorityTodos = todos.filter((todo) => todo.priority === PRIORITY.LOW).length;

    const STATUS_FILTER_TYPE = [
        { id: 1, name: '전체', state: 'all', amount: totalTodos },
        { id: 2, name: '미완료', state: 'active', amount: activeTodos },
        { id: 3, name: '완료', state: 'completed', amount: completedTodos },
    ];

    const PRIORITY_FILTER_TYPE = [
        { id: 1, name: '전체', state: 'all', amount: totalTodos },
        {
            id: 2,
            name: '높음',
            state: PRIORITY.HIGH,
            amount: highPriorityTodos,
            color: theme.colors.priority.high,
        },
        {
            id: 3,
            name: '중간',
            state: PRIORITY.MEDIUM,
            amount: mediumPriorityTodos,
            color: theme.colors.priority.medium,
        },
        {
            id: 4,
            name: '낮음',
            state: PRIORITY.LOW,
            amount: lowPriorityTodos,
            color: theme.colors.priority.low,
        },
    ];

    const handleStatusFilterChange = (filterState) => {
        dispatch({ type: 'SET_FILTER', filter: filterState });
    };

    const handlePriorityFilterChange = (filterState) => {
        dispatch({ type: 'SET_PRIORITY_FILTER', priorityFilter: filterState });
    };

    // 검색어가 변경될 때마다 검색 실행
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            dispatch({ type: 'SET_SEARCH_TERM', searchTerm });
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, dispatch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClear = () => {
        setSearchTerm('');
        dispatch({ type: 'SET_SEARCH_TERM', searchTerm: '' });
    };

    return (
        <FilterContainer>
            <FilterTitle>검색</FilterTitle>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="할 일 검색..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <Button $variant="gray" onClick={handleSearchClear}>
                        지우기
                    </Button>
                )}
            </SearchContainer>

            <FilterSection>
                <FilterTitle>상태별 필터</FilterTitle>
                <ButtonGroup>
                    {STATUS_FILTER_TYPE.map(({ id, name, state, amount }) => (
                        <FilterBtn
                            key={id}
                            $variant="secondary"
                            $isActive={filter === state}
                            onClick={() => handleStatusFilterChange(state)}
                        >
                            {name}: {amount}
                        </FilterBtn>
                    ))}
                </ButtonGroup>
            </FilterSection>

            <FilterSection>
                <FilterTitle>우선순위별 필터</FilterTitle>
                <ButtonGroup>
                    {PRIORITY_FILTER_TYPE.map(({ id, name, state, amount, color }) => (
                        <FilterBtn
                            key={id}
                            $variant={getPriorityButtonVariant(state)}
                            $isActive={priorityFilter === state}
                            onClick={() => handlePriorityFilterChange(state)}
                            style={
                                color ? { backgroundColor: color, color: theme.colors.white } : {}
                            }
                        >
                            {name}: {amount}
                        </FilterBtn>
                    ))}
                </ButtonGroup>
            </FilterSection>
        </FilterContainer>
    );
}

// 우선순위별 버튼 스타일 결정 함수
function getPriorityButtonVariant(priority) {
    switch (priority) {
        case PRIORITY.HIGH:
            return 'danger';
        case PRIORITY.MEDIUM:
            return 'secondary';
        case PRIORITY.LOW:
            return 'primary';
        default:
            return 'secondary';
    }
}

export default TodoFilter;
