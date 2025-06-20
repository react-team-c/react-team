// 필터링된 할 일 목록을 반환하는 유틸리티 함수
export function getFilteredTodos(todos, filter, searchTerm = '', priorityFilter = 'all') {
    // 상태 필터링 적용
    let filteredTodos;
    switch (filter) {
        case 'active':
            filteredTodos = todos.filter((todo) => !todo.completed);
            break;
        case 'completed':
            filteredTodos = todos.filter((todo) => todo.completed);
            break;
        default:
            filteredTodos = todos;
    }

    // 우선순위 필터링 적용
    if (priorityFilter !== 'all') {
        filteredTodos = filteredTodos.filter((todo) => todo.priority === priorityFilter);
    }

    // 검색어가 있으면 검색 적용
    if (searchTerm.trim()) {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        return filteredTodos.filter((todo) => todo.text.toLowerCase().includes(lowerSearchTerm));
    }

    return filteredTodos;
}
