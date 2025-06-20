// fast refresh 문제 해결
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../../theme';

// Context 생성
export const ThemeContext = createContext();

// ThemeProvider 컴포넌트
const ThemeProvider = ({ children }) => {
    // 다크 모드 상태 관리
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // 상태 변경에 따른 사이드 이펙트 처리
    useEffect(() => {
        // 로컬 스토리지에 테마 저장
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // HTML 요소에 테마 속성 설정
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]); // isDarkMode가 변경될 때만 실행

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
