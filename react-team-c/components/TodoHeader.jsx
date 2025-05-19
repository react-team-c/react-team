import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const HeaderContainer = styled.header`
    text-align: center;
    margin-bottom: ${theme.spacing.large};
`;

const Title = styled.h1`
    color: ${theme.colors.default};
    font-size: ${theme.fontSize.large};
    margin-bottom: ${theme.spacing.small};
`;

function TodoHeader() {
    return (
        <HeaderContainer>
            <Title>할 일 관리</Title>
        </HeaderContainer>
    );
}

export default TodoHeader;
