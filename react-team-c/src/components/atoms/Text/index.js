import styled from 'styled-components';
import { fontFamily } from '../../theme/tokens';

const Text = styled.p`
    font-family: ${fontFamily.default};
    font-weight: ${({ $weight }) =>
        $weight ? `var(--font-weight-${$weight})` : 'var(--font-weight-regular)'};
    font-size: ${({ $size }) => ($size ? `var(--font-size-${$size})` : 'var(--font-size-medium)')};
    color: ${({ $color }) => ($color ? `var(--color-${$color})` : 'var(--color-text)')};
    margin-bottom: ${({ $marginBottom }) => $marginBottom || 0};
    margin-left: ${({ $marginLeft }) => $marginLeft || 0};
    margin-right: ${({ $marginRight }) => $marginRight || 0};
    margin-top: ${({ $marginTop }) => $marginTop || 0};
    text-align: ${({ $align }) => $align || 'left'};
`;

export default Text;
