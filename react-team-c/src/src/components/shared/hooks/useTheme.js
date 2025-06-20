import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

// Theme 관련 커스텀 훅
export const useTheme = () => {
    // React의 Context API를 사용
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
