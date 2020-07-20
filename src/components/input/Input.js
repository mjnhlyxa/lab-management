import React, { useState, memo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Box } from 'rebass';
import get from 'lodash/get';
import { space, color, layout, borderRadius } from 'styled-system';

const Input = styled.input`
    height: ${({ height }) => (height ? height : '1.6rem')};
    border-radius: 0.3rem;
    margin: 0 0.25rem;
    padding: 0.1rem 0.5rem;
    width: 100%;
    border: 1px solid #d6d6d6;
    :focus {
        outline: none;
        border-color: #6e7a8e;
    }
    transition: border 500ms ease-out;
`;

export default styled(Input)(space, color, layout, borderRadius);
