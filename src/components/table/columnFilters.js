import React, { useState, memo, useEffect, useCallback, useMemo, useRef } from 'react';
import { Text, Box, Flex } from 'rebass';
import get from 'lodash/get';

import { FIELD_TYPE, FILTER_ID } from 'utils/constants';
import Selectbox from 'components/input/Selectbox';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

export const TextFilter = memo(({ name, onSubmit, type }) => {
    const [filterType, setFilterType] = useState(FILTER_ID.EQUAL);
    const [value, setValue] = useState('');
    const [nextValue, setNextValue] = useState('');

    const options = useMemo(
        () => [
            {
                id: FILTER_ID.START_WITH,
                value: 'Start with',
            },
            {
                id: FILTER_ID.END_WITH,
                value: 'End with',
            },
            {
                id: FILTER_ID.CONTAIN,
                value: 'Contain',
            },
            {
                id: FILTER_ID.EQUAL,
                value: 'Equal',
            },
            {
                id: FILTER_ID.NOT_EQUAL,
                value: 'Not equal',
            },
            {
                id: FILTER_ID.IN,
                value: 'In',
            },
            {
                id: FILTER_ID.NOT_IN,
                value: 'Not in',
            },
            {
                id: FILTER_ID.BETWEEN,
                value: 'Between',
            },
            {
                id: FILTER_ID.NOT_BETWEEN,
                value: 'Not between',
            },
        ],
        [],
    );

    const onSelectChange = useCallback((value) => {
        setFilterType(Number(value));
    }, []);

    const onInputChange = useCallback((e) => {
        const val = get(e, 'target.value');
        setValue(val);
    }, []);

    const onNextInputChange = useCallback((e) => {
        const val = get(e, 'target.value');
        setNextValue(val);
    }, []);

    const submit = useCallback(() => {
        onSubmit(makeFilterData());
    }, [value, nextValue, filterType]);

    const makeFilterData = () => {
        let filterData = {};
        switch (filterType) {
            case FILTER_ID.EQUAL:
            case FILTER_ID.NOT_EQUAL:
            case FILTER_ID.CONTAIN:
            case FILTER_ID.START_WITH:
            case FILTER_ID.END_WITH:
                filterData = {
                    value1: value,
                    type: filterType,
                };
                break;
            case FILTER_ID.IN:
            case FILTER_ID.NOT_IN:
                filterData = {
                    values: value.split(',').map((el) => el.trim()),
                    type: filterType,
                };
                break;
            case FILTER_ID.BETWEEN:
            case FILTER_ID.NOT_BETWEEN:
                filterData = {
                    value1: value,
                    value2: nextValue,
                    type: filterType === FILTER_ID.BETWEEN ? FILTER_ID.IN : FILTER_ID.NOT_IN,
                    values: null,
                };
            default:
                break;
        }
        return {
            [name]: {
                name: name,
                ...filterData,
            },
        };
    };

    const isNumberType = () => {
        return type === FIELD_TYPE.FLOAT || type === FIELD_TYPE.INT;
    };

    const isBetweenFilter = () => filterType === FILTER_ID.BETWEEN || filterType === FILTER_ID.NOT_BETWEEN;

    return (
        <Flex flexDirection="row">
            <Selectbox borderRadius={4} options={options} defaultValue={filterType} onChange={onSelectChange} />
            <Input type={isNumberType() ? 'number' : 'text'} onChange={onInputChange} />
            {isBetweenFilter() && (
                <>
                    <Box>{'>'}</Box>
                    <Input type={isNumberType() ? 'number' : 'text'} onChange={onNextInputChange} />
                </>
            )}

            <Button onClick={submit}>Search</Button>
        </Flex>
    );
});

export const ListFilter = ({ name, list, onSubmit, type }) => {
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
