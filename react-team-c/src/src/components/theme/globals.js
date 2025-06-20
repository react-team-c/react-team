import { createGlobalStyle } from 'styled-components';
import {
    colors,
    spacing,
    fontSize,
    fontFamily,
    fontWeight,
    borderRadius,
    createCSSVariables,
} from './tokens';

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
        
        /* Font Weight */
        --font-weight-thin: ${fontWeight.thin};
        --font-weight-light: ${fontWeight.light};
        --font-weight-regular: ${fontWeight.regular};
        --font-weight-medium: ${fontWeight.medium};
        --font-weight-bold: ${fontWeight.bold};
        --font-weight-black: ${fontWeight.black};
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
        font-family: ${fontFamily.default};
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--color-background);
        color: var(--color-text);
        transition: background-color 0.3s ease, color 0.3s ease;
        container: todo / inline-size;
    }
`;

export default GlobalStyle;
