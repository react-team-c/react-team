import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { GlobalStyle } from './styles/theme';
import TodoAppContent from './App.jsx';

const ThemeToggle = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    background-color: ${({ theme, isDarkMode }) =>
        isDarkMode ? theme.colors.primary.light : theme.colors.secondary.light};
    color: ${({ theme }) => theme.colors.background};
    font-size: 14px;
    transition: all 0.3s ease;
    cursor: pointer;
    opacity: 0.8;
    z-index: 1000;

    &:hover {
        opacity: 1;
        transform: scale(1.05);
    }
`;

function AppLayout() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <>
            {/* <ThemeToggle onClick={toggleTheme} isDarkMode={isDarkMode}>
                {isDarkMode ? '☀️' : '🌙'}
            </ThemeToggle> */}
            <TodoAppContent />
        </>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ThemeProvider>
            <GlobalStyle />
            <AppLayout />
        </ThemeProvider>
    </StrictMode>
);
