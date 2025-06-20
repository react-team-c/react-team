import React from 'react';
import styled from 'styled-components';
import { theme, Button } from '../../index';
import TodoItem from '../../molecules/Item';
import { useTodoState, useTodoDispatch, getFilteredTodos } from '../../shared/contexts';
import { PRIORITY } from '../../shared/hooks/todoReducer';

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

const SortContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.small};
    margin-bottom: ${theme.spacing.small};
`;

const SortButton = styled(Button)`
    font-size: ${theme.fontSize.small};
    padding: 4px 8px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const SortIcon = styled.span`
    font-size: ${theme.fontSize.small};
`;

const PriorityLegendContainer = styled.div`
    display: flex;
    gap: ${theme.spacing.medium};
    margin-bottom: ${theme.spacing.medium};
    padding: ${theme.spacing.small};
    border-radius: ${theme.borderRadius};
    background-color: ${theme.colors.background};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.small};
`;

const LegendColor = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.$color};
`;

const LegendText = styled.span`
    font-size: ${theme.fontSize.small};
    color: ${theme.colors.text};
`;

const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.small};
`;

const ActiveFilterInfo = styled.div`
    font-size: ${theme.fontSize.small};
    color: ${theme.colors.gray};
    margin-bottom: ${theme.spacing.small};
    text-align: center;
`;

const FilterTag = styled.span`
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: ${theme.fontSize.xsmall};
    font-weight: bold;
    color: ${theme.colors.white};
    background-color: ${(props) => {
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
    margin: 0 4px;
`;

function TodoList() {
    const { todos, filter, searchTerm, sortBy, sortOrder, priorityFilter } = useTodoState();
    const dispatch = useTodoDispatch();

    const filteredAndSearchedTodos = getFilteredTodos(todos, filter, searchTerm, priorityFilter);

    const sortedTodos = [...filteredAndSearchedTodos].sort((a, b) => {
        if (sortBy === 'createdAt') {
            return sortOrder === 'asc'
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const priorityA = priorityOrder[a.priority || 'medium'];
            const priorityB = priorityOrder[b.priority || 'medium'];

            return sortOrder === 'asc' ? priorityA - priorityB : priorityB - priorityA;
        }
        return 0;
    });

    const handleToggle = (id) => {
        dispatch({ type: 'TOGGLE_TODO', id });
    };

    const handleDelete = (id) => {
        dispatch({ type: 'REMOVE_TODO', id });
    };

    const handleEdit = (id, text, priority) => {
        dispatch({ type: 'EDIT_TODO', id, text, priority });
    };

    const handleSort = (newSortBy) => {
        if (sortBy === newSortBy) {
            dispatch({ type: 'TOGGLE_SORT_ORDER' });
        } else {
            dispatch({ type: 'SET_SORT', sortBy: newSortBy });
        }
    };

    const priorityCounts = filteredAndSearchedTodos.reduce((acc, todo) => {
        const priority = todo.priority || PRIORITY.MEDIUM;
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
    }, {});

    const getFilterInfoText = () => {
        let filterText = '';

        if (filter !== 'all') {
            filterText += filter === 'active' ? '미완료' : '완료';
        }

        if (priorityFilter !== 'all') {
            const priorityText =
                priorityFilter === PRIORITY.HIGH
                    ? '높음'
                    : priorityFilter === PRIORITY.MEDIUM
                      ? '중간'
                      : '낮음';

            filterText += filterText ? ' + ' : '';
            filterText += `우선순위: ${priorityText}`;
        }

        if (searchTerm) {
            filterText += filterText ? ' + ' : '';
            filterText += `검색: "${searchTerm}"`;
        }

        return filterText ? `필터: ${filterText}` : '';
    };

    const filterInfoText = getFilterInfoText();

    if (sortedTodos.length === 0) {
        return (
            <>
                {filterInfoText && <ActiveFilterInfo>{filterInfoText}</ActiveFilterInfo>}
                <EmptyMessage>✨ 해당 조건의 할 일이 없습니다</EmptyMessage>
            </>
        );
    }

    return (
        <>
            {filterInfoText && <ActiveFilterInfo>{filterInfoText}</ActiveFilterInfo>}
            <ListHeader>
                <PriorityLegendContainer>
                    <LegendItem>
                        <LegendColor $color={theme.colors.priority.high} />
                        <LegendText>높음 ({priorityCounts[PRIORITY.HIGH] || 0})</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <LegendColor $color={theme.colors.priority.medium} />
                        <LegendText>중간 ({priorityCounts[PRIORITY.MEDIUM] || 0})</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <LegendColor $color={theme.colors.priority.low} />
                        <LegendText>낮음 ({priorityCounts[PRIORITY.LOW] || 0})</LegendText>
                    </LegendItem>
                </PriorityLegendContainer>
                <SortContainer>
                    <SortButton
                        $variant={sortBy === 'createdAt' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('createdAt')}
                    >
                        생성일
                        {sortBy === 'createdAt' && (
                            <SortIcon>{sortOrder === 'asc' ? '↑' : '↓'}</SortIcon>
                        )}
                    </SortButton>
                    <SortButton
                        $variant={sortBy === 'priority' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('priority')}
                    >
                        우선순위
                        {sortBy === 'priority' && (
                            <SortIcon>{sortOrder === 'asc' ? '↑' : '↓'}</SortIcon>
                        )}
                    </SortButton>
                </SortContainer>
            </ListHeader>
            <ListContainer>
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </ListContainer>
        </>
    );
}

export default TodoList;
