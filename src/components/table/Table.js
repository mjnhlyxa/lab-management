import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { Text, Box, Flex } from 'rebass';
import { FaPencilAlt, FaBan, FaTrash, FaCheck, FaFilter } from 'react-icons/fa';
import { Popover, OverlayTrigger, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import { fetchTableDefinition, fetchTableData, updateTableRow, deleteTableRow, searchInTable } from 'actions/actions';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import ListSelect from 'components/input/ListSelect';
import { FIELD_TYPE, FILTER_ID, RESPONSE_STATE } from 'utils/constants';
import { TextFilter, NumberFilter } from 'components/table/columnFilters';

const IconWrapper = styled(Box).attrs(() => ({
    p: 2,
}))`
    cursor: pointer;
`;

const Field = memo(({ type, value: initValue, onChange, list, multichoices }) => {
    const [val, setVal] = useState(initValue);
    const change = (e) => {
        const value = get(e, 'target.value', e);
        setVal(value);
        onChange(value);
    };

    if (multichoices) {
        return <ListSelect items={list} selected={initValue} onChange={onChange} />;
        // const mappingFields = list[listName];
    }

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
            Content = TextFilter;
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

const searchIdInList = (list, id) => {
    const item = list.find((item) => item[0] === id) || [];
    const [, text] = item;
    return {
        text,
        item,
    };
};

export const Table = ({
    api,
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    loading,
    structure,
    data,
    fetchDefinitionState,
    fetchDataState,
    updateDataState,
    searchInTable,
}) => {
    const [editingRow, setEditRow] = useState(-1);
    const [columns, setColumns] = useState([]);
    const [rowData, setRowData] = useState({});

    useEffect(() => {
        fetchTableDefinition(api);
    }, []);

    useEffect(() => {
        if (fetchDefinitionState === RESPONSE_STATE.SUCCESSS) {
            fetchTableData(api);
        }
    }, [fetchDefinitionState]);

    useEffect(() => {
        if (fetchDataState === RESPONSE_STATE.SUCCESSS) {
            console.log('fetch data success');
        }
    }, [fetchDataState]);

    useEffect(() => {
        if (structure && data) {
            initColumns();
        }
    }, [structure, data, editingRow]);

    useEffect(() => {
        if (updateDataState === RESPONSE_STATE.SUCCESSS) {
            fetchTableData(api);
        }
    }, [updateDataState]);

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
                    return <Input type="checkbox" onChange={() => {}} />;
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
                cell: (row) => {
                    const { id } = row;
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
                            <IconWrapper onClick={() => deleteRow(row)}>
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
        return fields.map(({ type, name, caption, sortable, choices, listName, editable }) => {
            return {
                name: <ColmnName value={caption} type={type} name={name} onSubmit={onSubmitFilter} />,
                sortable: false,
                selector: name,
                cell: (row) => {
                    const value = row[name];
                    const { id, login_id } = row;
                    const isEditing = id === editingRow;
                    if (isEditing && editable) {
                        return (
                            <Field
                                type={type}
                                value={value}
                                onChange={(e) => onRowValueChange(e, id, name, login_id)}
                                list={data.list[listName]}
                                multichoices={Boolean(listName && choices)}
                            />
                        );
                    }
                    if (choices && listName) {
                        const list = get(data, 'list', {})[listName];
                        return (
                            <ul>
                                {value.map((el) => {
                                    const { text, item } = searchIdInList(list, el);
                                    return <li key={text}>{text}</li>;
                                })}
                            </ul>
                        );
                    }
                    return <Text>{value}</Text>;
                },
            };
        });
    };

    console.log('render table');

    const onSubmitEditedRow = useCallback(() => {
        setRowData((data) => {
            updateTableRow({ api, data });
            return data;
        });
        setEditRow(-1);
    }, [rowData]);

    const onCancelEditing = useCallback(() => {
        setEditRow(-1);
    }, []);

    const deleteRow = (data) => {
        deleteTableRow({ api, data });
    };

    const onRowValueChange = (e, id, fieldName, login_id) => {
        const value = get(e, 'target.value', e);
        console.log(`set field ${fieldName} with value ${value}`);
        setRowData((prev) => {
            return {
                ...prev,
                id: prev.id || id,
                login_id: prev.login_id || login_id,
                [fieldName]: value,
            };
        });
    };

    const onSubmitFilter = (filter) => {
        const payload = {
            pageSize: 4,
            pageIndex: 1,
            searchInfo: filter,
        };
        console.log(payload);
        searchInTable({ api, data: payload });
    };

    const onSort = (column, sortDirection, event) => {
        console.log(event);
    };

    return structure && data ? (
        <DataTable
            columns={columns}
            data={data.data}
            sortServer
            onSort={onSort}
            pagination
            paginationServer
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10]}
            paginationTotalRows={20}
        />
    ) : null;
};

const mapStateToProps = ({
    table: { loading, structure, data, fetchDefinitionState, fetchDataState, updateDataState },
}) => ({
    loading,
    structure,
    data,
    fetchDefinitionState,
    fetchDataState,
    updateDataState,
});

const mapDispatchToProps = {
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    searchInTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
