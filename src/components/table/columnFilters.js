import React, { useState, memo, useEffect, useCallback, useMemo, useRef } from 'react';
import { Text, Box, Flex } from 'rebass';
import get from 'lodash/get';

import { FIELD_TYPE, FILTER_ID } from 'utils/constants';
import Selectbox from 'components/input/Selectbox';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

export const TextFilter = ({ name, onSubmit, type }) => {
    const ref = useRef({ filterType: FILTER_ID.CONTAIN, value: '' });

    const options = useMemo(
        () => [
            {
                id: FILTER_ID.START_BY,
                value: 'Start by:',
            },
            {
                id: FILTER_ID.END_BY,
                value: 'End by:',
            },
            {
                id: FILTER_ID.CONTAIN,
                value: 'Contain:',
            },
            {
                id: FILTER_ID.MATCH,
                value: 'Match:',
            },
        ],
        [],
    );

    const onSelectChange = useCallback((value) => {
        ref.current.filterType = value;
    }, []);

    const onInputChange = useCallback((e) => {
        const val = get(e, 'target.value');
        ref.current.value = val;
    }, []);

    const submit = useCallback(() => {
        const { filterType, value } = ref.current;
        onSubmit({ name, filterType, value, type });
    }, []);

    return (
        <Flex flexDirection="row">
            <Selectbox
                borderRadius={4}
                options={options}
                defaultValue={ref.current.filterType}
                onChange={onSelectChange}
            />
            <Input onChange={onInputChange} />
            <Button onClick={submit}>Submit</Button>
        </Flex>
    );
};

export const NumberFilter = ({ name, onSubmit, type }) => {
    const ref = useRef({ filterType: FILTER_ID.CONTAIN, value: undefined });

    const [filterType, setFilterType] = useState(FILTER_ID.CONTAIN);

    const options = useCallback(
        [
            {
                id: FILTER_ID.LESS_THAN,
                value: 'Less than:',
            },
            {
                id: FILTER_ID.MORE_THAN,
                value: 'More than:',
            },
            {
                id: FILTER_ID.MATCH,
                value: 'Equal:',
            },
            {
                id: FILTER_ID.BETWEEN,
                value: 'Between:',
            },
        ],
        [],
    );

    const onSelectChange = useCallback((value) => {
        ref.current.filterType = value;
        if (value === FILTER_ID.BETWEEN) {
            ref.current.value = {
                from: undefined,
                to: undefined,
            };
        }
        setFilterType(value);
    }, []);

    const onInputChange = useCallback((e) => {
        const val = get(e, 'target.value');
        ref.current.value = val;
    }, []);

    const submit = useCallback(() => {
        const { filterType, value } = ref.current;
        onSubmit({ name, filterType, value, type });
    }, []);

    return (
        <Flex flexDirection="row">
            <Selectbox
                borderRadius={4}
                options={options}
                defaultValue={ref.current.filterType}
                onChange={onSelectChange}
            />
            {filterType === FILTER_ID.BETWEEN && (
                <>
                    from
                    <Input width="4rem" type="number" onChange={onInputChange} />
                    to
                    <Input width="4rem" type="number" onChange={onInputChange} />
                </>
            )}
            {filterType}
            <Input width="4rem" type="number" onChange={onInputChange} />
            <Button onClick={submit}>Submit</Button>
        </Flex>
    );
};
