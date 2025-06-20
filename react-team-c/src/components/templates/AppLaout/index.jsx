import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../shared/contexts';
import App from '../../../App';

const ThemeToggle = styled.button`
    position: fixed;
    top: 20px;
    right: 50%;
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    background-color: ${({ theme, $isDarkMode }) =>
        $isDarkMode ? theme.colors.primary : theme.colors.default};
    color: ${({ theme }) => theme.colors.white};
    transform: translateX(50%) scale(1);
    transition: all 0.3s ease;
    cursor: pointer;
    opacity: 0.8;
    z-index: 1000;

    &:hover {
        opacity: 1;
        transform: translateX(50%) scale(1.2);
    }
`;

function AppLayout() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <>
            <ThemeToggle onClick={toggleTheme} $isDarkMode={isDarkMode}>
                {isDarkMode ? '☀️' : '🌙'}
            </ThemeToggle>
            <App />
        </>
    );
}

export default AppLayout;
