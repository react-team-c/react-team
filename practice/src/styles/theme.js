import styled, { createGlobalStyle } from 'styled-components';

// 색상 정의
const colors = {
    light: {
        default: 'rgb(51, 51, 51)',
        white: 'rgb(255, 255, 255)',
        line: 'rgb(201, 201, 201)',
        gray: {
            light: 'rgb(130, 130, 130)',
            dark: 'rgb(90, 90, 90)',
        },
        primary: {
            light: 'rgb(76, 175, 80)',
            dark: 'rgb(56, 142, 60)',
        },
        secondary: {
            light: 'rgb(33, 150, 243)',
            dark: 'rgb(25, 118, 210)',
        },
        danger: {
            light: 'rgb(244, 67, 54)',
            dark: 'rgb(211, 47, 47)',
        },
        background: 'rgb(255, 255, 255)',
        text: 'rgb(51, 51, 51)',
    },
    dark: {
        default: 'rgb(255, 255, 255)',
        white: 'rgb(18, 18, 18)',
        line: 'rgb(56, 56, 56)',
        gray: {
            light: 'rgb(180, 180, 180)',
            dark: 'rgb(220, 220, 220)',
        },
        primary: {
            light: 'rgb(252, 255, 55)',
            dark: 'rgb(208, 211, 10)',
        },
        secondary: {
            light: 'rgb(33, 243, 243)',
            dark: 'rgb(12, 196, 196)',
        },
        danger: {
            light: 'rgb(206, 54, 244)',
            dark: 'rgb(177, 21, 216)',
        },
        background: 'rgb(18, 18, 18)',
        text: 'rgb(255, 255, 255)',
    },
};

// 간격 정의
const spacing = {
    small: '0.5em',
    medium: '1em',
    large: '1.5em',
};

// 폰트 크기 정의
const fontSize = {
    small: '0.875em',
    medium: '1em',
    large: '1.25em',
};

// 테두리 정의
const borderRadius = '0.25em';

// CSS 변수 생성 함수
const createCSSVariables = (themeColors) => `
    --color-default: ${themeColors.default};
    --color-white: ${themeColors.white};
    --color-line: ${themeColors.line};
    --color-gray-light: ${themeColors.gray.light};
    --color-gray-dark: ${themeColors.gray.dark};
    --color-primary-light: ${themeColors.primary.light};
    --color-primary-dark: ${themeColors.primary.dark};
    --color-secondary-light: ${themeColors.secondary.light};
    --color-secondary-dark: ${themeColors.secondary.dark};
    --color-danger-light: ${themeColors.danger.light};
    --color-danger-dark: ${themeColors.danger.dark};
    --color-background: ${themeColors.background};
    --color-text: ${themeColors.text};
`;

// 전역 스타일
export const GlobalStyle = createGlobalStyle`
    :root {
        ${createCSSVariables(colors.light)}
        
        /* Spacing */
        --spacing-small: ${spacing.small};
        --spacing-medium: ${spacing.medium};
        --spacing-large: ${spacing.large};

        /* Border */
        --border-radius: ${borderRadius};

        /* Font */
        --font-size-small: ${fontSize.small};
        --font-size-medium: ${fontSize.medium};
        --font-size-large: ${fontSize.large};
    }

    [data-theme='dark'] {
        ${createCSSVariables(colors.dark)}
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    li {
        list-style: none;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--color-background);
        color: var(--color-text);
        transition: background-color 0.3s ease, color 0.3s ease;
        container: todo / inline-size;
    }
`;

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
    },
    spacing,
    borderRadius,
    fontSize,
};

// 버튼 스타일
const getVariantColor = (variant, isActive = false) => {
    const colors = {
        primary: isActive ? 'var(--color-primary-dark)' : 'var(--color-primary-light)',
        secondary: isActive ? 'var(--color-secondary-dark)' : 'var(--color-secondary-light)',
        danger: isActive ? 'var(--color-danger-dark)' : 'var(--color-danger-light)',
        gray: isActive ? 'var(--color-gray-dark)' : 'var(--color-gray-light)',
    };
    return colors[variant] || theme.colors[variant] || theme.colors.primary;
};

export const Button = styled.button`
    background-color: ${({ variant, isActive }) => getVariantColor(variant, isActive)};
    color: ${theme.colors.white};
    padding: ${theme.spacing.small} ${theme.spacing.large};
    border: none;
    border-radius: ${theme.borderRadius};
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
    text-decoration:${({isActive}) => (isActive ? 'underline':null)};

    &:hover {
        background-color: ${({ variant }) => getVariantColor(variant, true)};
    }
`;
