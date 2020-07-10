import React, { useState, memo, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { Text, Box, Flex } from 'rebass';
import { FaPencilAlt, FaBan, FaTrash, FaCheck, FaFilter } from 'react-icons/fa';
import { Popover, OverlayTrigger, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import Button from 'components/Button';
import Input from 'components/Input';
import { FIELD_TYPE, FILTER_ID } from 'utils/constants';
import { TextFilter, NumberFilter } from 'components/table/columnFilters';

const IconWrapper = styled(Box).attrs(() => ({
    p: 2,
}))`
    cursor: pointer;
`;

const Field = memo(({ type, value: initValue, onChange }) => {
    const [val, setVal] = useState(initValue);
    const change = (e) => {
        const value = get(e, 'target.value', e);
        setVal(value);
        onChange(value);
    };

    switch (type) {
        case FIELD_TYPE.STRING:
            return <Input type="text" value={val} onChange={change} />;
        case FIELD_TYPE.FLOAT:
            return <Input type="number" value={val} onChange={change} />;
        case FIELD_TYPE.INT:
            return <Input type="number" value={val} onChange={change} />;
        case FIELD_TYPE.TEXT:
            return <Input type="text" value={val} onChange={change} />;
        case FIELD_TYPE.BOOLEAN:
            return <Input type="checkbox" checked={val} onChange={change} />;
        case FIELD_TYPE.DATE:
            return <DatePicker selected={new Date(val)} onChange={change} />;
        case FIELD_TYPE.TIME:
            return <DatePicker selected={new Date(val)} onChange={change} />;
        case FIELD_TYPE.DATETIME:
            return <DatePicker selected={new Date(val)} onChange={change} />;
        case FIELD_TYPE.FILE:
            return <Input type="text" value={val} onChange={change} />;
        case FIELD_TYPE.PASSWORD:
            return <Input type="password" value={val} onChange={change} />;
    }
});

const FilterWrapper = styled(Box).attrs(() => ({
    p: 1,
    display: 'inline',
}))`
    cursor: pointer;
`;

const FilterIcon = styled(FaFilter)`
    visibility: hidden;
`;

const ColumnNameWrapper = styled(Box)`
    &:hover ${FilterIcon} {
        visibility: visible;
    }
`;

const ColmnName = memo(({ name, value, type, onSubmit }) => {
    return (
        <ColumnNameWrapper>
            <Text as="span">{value}</Text>
            <FilterWrapper>
                <OverlayTrigger
                    trigger="click"
                    placement="auto"
                    overlay={getFilterPopover(name, type, onSubmit)}
                    rootClose>
                    <FilterIcon />
                </OverlayTrigger>
            </FilterWrapper>
        </ColumnNameWrapper>
    );
});

const StyledPopover = styled(Popover)`
    min-width: 24.5rem;
    padding: 1rem;
`;

const getFilterPopover = (name, type, onSubmit) => {
    let Content;

    switch (type) {
        case FIELD_TYPE.STRING:
            Content = TextFilter;
            break;
        case FIELD_TYPE.INT:
        case FIELD_TYPE.FLOAT:
            Content = NumberFilter;
            break;
        default:
            Content = TextFilter;
            break;
    }

    return (
        <StyledPopover>
            <Popover.Content>
                <Content name={name} onSubmit={onSubmit} type={type} />
            </Popover.Content>
        </StyledPopover>
    );
};

const EditRowBtn = memo(({ editing, onEdit, onCancel, onSubmit }) => {
    return editing ? (
        <>
            <IconWrapper onClick={onSubmit}>
                <FaCheck />
            </IconWrapper>
            <IconWrapper onClick={onCancel}>
                <FaBan />
            </IconWrapper>
        </>
    ) : (
        <IconWrapper onClick={onEdit}>
            <FaPencilAlt />
        </IconWrapper>
    );
});

export const Table = ({ structure, data = {}, onRowSelect = () => {} }) => {
    const [editingRow, setEditRow] = useState(-1);
    const [columns, setColumns] = useState([]);
    const [rowData, setRowData] = useState({});

    useEffect(() => {
        if (structure) {
            initColumns();
        }
    }, [structure, editingRow]);

    const initColumns = () => {
        const cols = [...getSelectionColumn(), ...getActionColumn(), ...getColumns()];

        setColumns(cols);
    };

    const getSelectionColumn = () => {
        const { selection } = structure;
        const cols = [];
        // if support row selection
        if (selection) {
            cols.push({
                name: 'Selection',
                sortable: false,
                cell: (row) => {
                    return <Input type="checkbox" onChange={() => onRowSelect(row)} />;
                },
            });
        }
        return cols;
    };

    const getActionColumn = () => {
        return [
            {
                name: 'Action',
                sortable: false,
                cell: ({ id }) => {
                    return (
                        <>
                            <EditRowBtn
                                editing={editingRow === id}
                                onEdit={() => {
                                    setEditRow(id);
                                }}
                                onSubmit={onSubmitEditedRow}
                                onCancel={onCancelEditing}
                            />
                            <IconWrapper onClick={() => deleteRow(id)}>
                                <FaTrash />
                            </IconWrapper>
                        </>
                    );
                },
            },
        ];
    };

    const getColumns = () => {
        const { fields = [] } = structure;
        return fields.map(({ type, name, caption, sortable }) => {
            return {
                name: <ColmnName value={caption} type={type} name={name} onSubmit={onSubmitFilter} />,
                sortable: false,
                selector: name,
                cell: (row) => {
                    const value = row[name];
                    const { id } = row;
                    const isEditing = id === editingRow;
                    if (isEditing) {
                        return <Field type={type} value={value} onChange={(e) => onRowValueChange(e, name)} />;
                    }

                    return id === editingRow ? <Input type="text" value={value} /> : <Text>{value}</Text>;
                },
            };
        });
    };

    const onSubmitEditedRow = useCallback(() => {
        setRowData((prev) => {
            console.log('submit row:', prev);
            return prev;
        });
    }, []);

    const onCancelEditing = useCallback(() => {
        setEditRow(-1);
    }, []);

    const deleteRow = (id) => {
        console.log(`delete row with id ${id}`);
    };

    const onRowValueChange = (e, fieldName) => {
        const value = get(e, 'target.value', e);
        console.log(`set field ${fieldName} with value ${value}`);
        setRowData((prev) => {
            return {
                ...prev,
                [fieldName]: value,
            };
        });
    };

    const onSubmitFilter = ({ name, filterType, value, type }) => {
        console.log(`filter column: ${name}, with filterType=${filterType} and value = ${value}`);
    };

    const onSort = (column, sortDirection, event) => {
        console.log(event);
    };

    return <DataTable columns={columns} data={data} sortServer onSort={onSort} />;
};

export default memo(Table);
