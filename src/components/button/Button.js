import React, { useState, memo } from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

export const Button = styled.button`
    height: 1.6rem;
    border-radius: 0.25rem;
    margin: 0 0.25rem;
    padding: 0.1rem 0.5rem;
`;

export const IconButton = styled(Box)`
    padding: 0 0.4rem;
    background-color: ${({ disabled }) => (disabled ? '#bfbfbf' : '#6e798e')};
    border-radius: 0.4rem;
    color: white;
    margin: 0 0.1rem;
    :hover {
        cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};
    }
`;

export default memo(Button);
