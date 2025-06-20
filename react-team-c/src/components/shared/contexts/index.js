import { getFilteredTodos } from '../utils/todoUtils';
import TodoProvider, { TodoStateContext, TodoDispatchContext } from './TodoContext';
import ThemeProvider, { ThemeContext } from './ThemeContext';
import { useTodoState, useTodoDispatch } from '../hooks/useTodoContext';
import { useTheme } from '../hooks/useTheme';

export {
    TodoProvider,
    TodoStateContext,
    TodoDispatchContext,
    ThemeProvider,
    ThemeContext,
    useTodoState,
    useTodoDispatch,
    useTheme,
    getFilteredTodos,
};
