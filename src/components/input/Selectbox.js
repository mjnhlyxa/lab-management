import React, { useState, memo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Box } from 'rebass';
import { Select } from 'antd';
import { space, color, layout, borderRadius } from 'styled-system';
import get from 'lodash/get';

const { Option } = Select;

export const Selectbox = memo(({ options, defaultValue, onChange, ...rest }) => {
    const [value, setValue] = useState(defaultValue);
    const change = useCallback((idx, { value: val }) => {
        setValue(val);
        onChange(val);
    }, []);

    return (
        <Select value={value} onChange={change} {...rest}>
            {options.map(({ id, value }, idx) => (
                <Option key={id} value={id}>
                    {value}
                </Option>
            ))}
        </Select>
    );
});

export default Selectbox;
