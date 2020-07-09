import React, { useState, memo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { Text, Box } from 'rebass';
import { FaPencilAlt, FaBan, FaTrash, FaCheck } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import Button from 'components/Button';
import { FIELD_TYPE } from 'utils/constants';

const IconWrapper = styled(Box).attrs(() => ({
    p: 2,
}))`
    cursor: pointer;
`;

const Input = styled.input`
    max-width: 5rem;
`;

const EditBtn = styled(Button)``;

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

const ColmnName = ({ value }) => {
    return <div>{value}</div>;
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
                name: <ColmnName value={caption} />,
                sortable,
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
        setRowData(prev => {
            return {
                ...prev,
                [fieldName]: value,
            }
        });
    };

    return <DataTable columns={columns} data={data} />;
};

export default memo(Table);
