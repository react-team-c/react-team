import styled from 'styled-components';
import { theme, getVariantColor } from '../../theme/index';

const Button = styled.button`
    background-color: ${({ $variant, $isActive }) => getVariantColor($variant, $isActive)};
    color: ${theme.colors.white};
    padding: ${theme.spacing.small} ${theme.spacing.large};
    border: none;
    border-radius: ${theme.borderRadius};
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
    text-decoration: ${({ $isActive }) => ($isActive ? 'underline' : null)};

    &:hover {
        background-color: ${({ $variant }) => getVariantColor($variant, true)};
    }
`;

export default Button;
