import React, { useState, memo, useEffect, useCallback, useMemo, useRef } from 'react';
import { Text, Box, Flex } from 'rebass';
import get from 'lodash/get';

import { FIELD_TYPE, FILTER_ID } from 'utils/constants';
import Selectbox from 'components/input/Selectbox';
import ListSelect from 'components/input/ListSelect';
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
                stringOnly: true,
            },
            {
                id: FILTER_ID.END_WITH,
                value: 'End with',
                stringOnly: true,
            },
            {
                id: FILTER_ID.CONTAIN,
                value: 'Contain',
                stringOnly: true,
            },
            {
                id: FILTER_ID.EQUAL,
                value: 'Equal',
                numberOnly: true,
                stringOnly: true,
            },
            {
                id: FILTER_ID.NOT_EQUAL,
                value: 'Not equal',
                numberOnly: true,
                stringOnly: true,
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
                numberOnly: true,
            },
            {
                id: FILTER_ID.NOT_BETWEEN,
                value: 'Not between',
                numberOnly: true,
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

    const getOptions = () =>
        isNumberType() ? options.filter((el) => el.numberOnly) : options.filter((el) => el.stringOnly);
    const isBetweenFilter = () => filterType === FILTER_ID.BETWEEN || filterType === FILTER_ID.NOT_BETWEEN;

    return (
        <Flex flexDirection="row">
            <Selectbox borderRadius={4} options={getOptions()} defaultValue={filterType} onChange={onSelectChange} />
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
export const ListFilter = memo(({ name, list, onSubmit, type }) => {
    const [filterType, setFilterType] = useState(FILTER_ID.IN);
    const [value, setValue] = useState('');

    const options = useMemo(
        () => [
            // {
            //     id: FILTER_ID.EQUAL,
            //     value: 'Equal',
            // },
            // {
            //     id: FILTER_ID.NOT_EQUAL,
            //     value: 'Not equal',
            // },
            {
                id: FILTER_ID.IN,
                value: 'In',
            },
        ],
        [],
    );

    const onFilterTypeChange = useCallback((value) => {
        setFilterType(Number(value));
    }, []);

    const onSelecting = useCallback((selectedList) => {
        setValue(selectedList);
    }, []);

    const submit = useCallback(() => {
        onSubmit(makeFilterData());
    }, [value, filterType]);

    const makeFilterData = () => {
        return {
            [name]: {
                name: name,
                type: filterType,
                values: value,
                value1: null,
                value2: null,
            },
        };
    };

    return (
        <Flex flexDirection="row">
            <Selectbox borderRadius={4} options={options} defaultValue={filterType} onChange={onFilterTypeChange} />
            <ListSelect items={list} onChange={onSelecting} />
            <Button onClick={submit}>Search</Button>
        </Flex>
    );
});
