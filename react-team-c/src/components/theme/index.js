import { spacing, fontSize, fontFamily, fontWeight, borderRadius, staticColors } from './tokens';
export { default as GlobalStyle } from './globals';

// 테마 객체
export const theme = {
    colors: {
        default: 'var(--color-default)',
        white: 'var(--color-white)',
        line: 'var(--color-line)',
        gray: 'var(--color-gray-light)',
        grayDark: 'var(--color-gray-dark)',
        primary: 'var(--color-primary-light)',
        primaryDark: 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary-light)',
        secondaryDark: 'var(--color-secondary-dark)',
        danger: 'var(--color-danger-light)',
        dangerDark: 'var(--color-danger-dark)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        // 우선순위 색상
        error: '#f44336',
        warning: '#ff9800',
        success: '#4caf50',
        // 테마에 상관없이 불변하는 색상
        ...staticColors,
    },
    spacing,
    borderRadius,
    fontSize: {
        ...fontSize,
        xsmall: '0.75em',
    },
    fontFamily,
    fontWeight,
};

// 버튼 색상 판별 함수
export const getVariantColor = (variant, isActive = false) => {
    const colors = {
        primary: isActive ? 'var(--color-primary-dark)' : 'var(--color-primary-light)',
        secondary: isActive ? 'var(--color-secondary-dark)' : 'var(--color-secondary-light)',
        danger: isActive ? 'var(--color-danger-dark)' : 'var(--color-danger-light)',
        gray: isActive ? 'var(--color-gray-dark)' : 'var(--color-gray-light)',
        error: staticColors.error,
        warning: staticColors.warning,
        success: staticColors.success,
        info: staticColors.info,
    };
    return colors[variant] || theme.colors[variant] || theme.colors.primary;
};

export default theme;
