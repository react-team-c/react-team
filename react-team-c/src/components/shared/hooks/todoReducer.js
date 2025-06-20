// 초기 상태
export const initialState = {
    todos: [],
    filter: 'all', // 'all', 'active', 'completed'
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
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter,
            };
        default:
            throw new Error(`지원하지 않는 액션 타입: ${action.type}`);
    }
}
