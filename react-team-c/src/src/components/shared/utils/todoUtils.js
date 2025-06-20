// 필터링된 할 일 목록을 반환하는 유틸리티 함수
export function getFilteredTodos(todos, filter) {
    switch (filter) {
        case 'active':
            return todos.filter((todo) => !todo.completed);
        case 'completed':
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
}
