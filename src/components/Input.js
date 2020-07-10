import React, { useState, memo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Box } from 'rebass';
import get from 'lodash/get';
import { space, color, layout, borderRadius } from 'styled-system';

const Input = styled.input`
    height: 1.6rem;
    border-radius: 0.25rem;
    margin: 0 0.25rem;
    padding: 0.1rem 0.5rem;
`;

export default styled(Input)(space, color, layout, borderRadius);;
