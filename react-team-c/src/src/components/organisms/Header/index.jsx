import React from 'react';
import styled from 'styled-components';
import { theme, Text } from '../../index';

const HeaderContainer = styled.header`
    text-align: center;
    margin-bottom: ${theme.spacing.large};
`;

function TodoHeader() {
    return (
        <HeaderContainer>
            <Text
                as="h1"
                $size="large"
                $weight="bold"
                $color="default"
                $marginTop={theme.spacing.large}
                $marginBottom={theme.spacing.small}
                $align="center"
            >
                할 일 관리
            </Text>
        </HeaderContainer>
    );
}

export default TodoHeader;
