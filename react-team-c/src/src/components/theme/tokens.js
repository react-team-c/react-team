// 색상 정의
export const colors = {
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
export const spacing = {
    small: '0.5em',
    medium: '1em',
    large: '1.5em',
};

// 폰트 크기 정의
export const fontSize = {
    small: '0.875em',
    medium: '1em',
    large: '1.25em',
};

// 폰트 패밀리 정의
export const fontFamily = {
    default:
        '"Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    heading: '"Noto Sans KR", sans-serif',
};

// 폰트 웨이트 정의
export const fontWeight = {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
};

// 테두리 정의
export const borderRadius = '0.25em';

// CSS 변수 생성 함수
export const createCSSVariables = (themeColors) => `
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
