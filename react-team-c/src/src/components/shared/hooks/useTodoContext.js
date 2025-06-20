import { useContext } from 'react';
import { TodoStateContext, TodoDispatchContext } from '../contexts/TodoContext';

// Todo 관련 커스텀 훅
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (context === undefined) {
        throw new Error('useTodoState는 TodoProvider 내부에서만 사용할 수 있습니다');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (context === undefined) {
        throw new Error('useTodoDispatch는 TodoProvider 내부에서만 사용할 수 있습니다');
    }
    return context;
}
