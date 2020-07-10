import React, { useState, memo } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    height: 1.6rem;
    border-radius: 0.25rem;
    margin: 0 0.25rem;
    padding: 0.1rem 0.5rem;
`;

export default memo(Button);
