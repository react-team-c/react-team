import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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

// 여러 컴포넌트 거치지 않고 직접 데이터 전달(전역 상태 관리)
export const useTheme = () => {
    // React의 Context API를 사용
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
