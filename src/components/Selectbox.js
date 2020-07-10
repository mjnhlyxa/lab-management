import React, { useState, memo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Box } from 'rebass';
import { space, color, layout, borderRadius } from 'styled-system';
import get from 'lodash/get';

const Select = styled.select(space, color, layout, borderRadius);

const Options = styled.option``;

export const Selectbox = memo(({ options, defaultValue, onChange, ...rest }) => {
    const [value, setValue] = useState(defaultValue);

    const change = useCallback((e, x) => {
        const val = get(e, 'target.value');
        setValue(val);
        onChange(val);
    }, []);

    return (
        <Select value={value} onChange={change} {...rest}>
            {options.map(({ id, value }, idx) => (
                <Options key={id} value={id}>
                    {value}
                </Options>
            ))}
        </Select>
    );
});

export default Selectbox;
