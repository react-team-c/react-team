// 초기 상태
export const initialState = {
    todos: [],
    filter: 'all', // 'all', 'active', 'completed'
    priorityFilter: 'all', // 'all', 'high', 'medium', 'low'
    searchTerm: '',
    sortBy: 'createdAt', // 'createdAt', 'priority'
    sortOrder: 'desc', // 'asc', 'desc'
};

// 우선순위 상수
export const PRIORITY = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
};

// 리듀서 함수
export function todoReducer(state, action) {
    switch (action.type) {
        case 'LOAD_TODOS':
            return {
                ...state,
                todos: action.todos,
            };
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: Date.now().toString(),
                        text: action.text,
                        completed: false,
                        createdAt: new Date().toISOString(),
                        priority: action.priority || PRIORITY.MEDIUM,
                    },
                ],
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id),
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
                ),
            };
        case 'EDIT_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.id
                        ? {
                              ...todo,
                              text: action.text,
                              priority:
                                  action.priority !== undefined ? action.priority : todo.priority,
                          }
                        : todo
                ),
            };
        case 'SET_PRIORITY':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.id ? { ...todo, priority: action.priority } : todo
                ),
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter,
            };
        case 'SET_PRIORITY_FILTER':
            return {
                ...state,
                priorityFilter: action.priorityFilter,
            };
        case 'SET_SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.searchTerm,
            };
        case 'SET_SORT':
            return {
                ...state,
                sortBy: action.sortBy,
                sortOrder: action.sortOrder || state.sortOrder,
            };
        case 'TOGGLE_SORT_ORDER':
            return {
                ...state,
                sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
            };
        default:
            throw new Error(`지원하지 않는 액션 타입: ${action.type}`);
    }
}
