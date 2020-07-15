import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { Text, Box, Flex } from 'rebass';
import { FaPencilAlt, FaBan, FaTrash, FaCheck, FaFilter, FaTimes, FaPlus } from 'react-icons/fa';
import { Popover, OverlayTrigger, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import {
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    searchInTable,
    addTableRow,
    showModal,
} from 'actions/actions';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import ListSelect from 'components/input/ListSelect';
import CreateTableRowModal from 'components/table/CreateTableRowModal';
import { FIELD_TYPE, MODAL_ID, RESPONSE_STATE } from 'utils/constants';
import { TextFilter, ListFilter } from 'components/table/columnFilters';

const StyledDataTable = styled(DataTable)`
    .rdt_TableBody::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
    }

    .rdt_TableBody::-webkit-scrollbar {
        width: 6px;
        background-color: #f5f5f5;
    }

    .rdt_TableBody::-webkit-scrollbar-thumb {
        background-color: #6e7a8e;
    }
`;

const IconWrapper = styled(Box).attrs(() => ({
    p: 2,
}))`
    cursor: pointer;
`;

export const Field = memo(({ type, value: initValue, onChange, list, multichoices }) => {
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
            return <DatePicker selected={val ? new Date(val) : new Date()} onChange={change} />;
        case FIELD_TYPE.TIME:
            return <DatePicker selected={val ? new Date(val) : new Date()} onChange={change} />;
        case FIELD_TYPE.DATETIME:
            return <DatePicker selected={val ? new Date(val) : new Date()} onChange={change} />;
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
    font-size: 0.8rem;
    font-weight: bold;
    &:hover ${FilterIcon} {
        visibility: visible;
    }
`;

const ColmnName = memo(({ name, value, list, type, onSubmit, multichoices }) => {
    return (
        <ColumnNameWrapper>
            <Text as="span" color="white">
                {value}
            </Text>
            <FilterWrapper>
                <OverlayTrigger
                    trigger="click"
                    placement="auto"
                    overlay={getFilterPopover({ name, type, onSubmit, list, multichoices })}
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

const getFilterPopover = ({ name, type, onSubmit, list, multichoices }) => {
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

    if (multichoices) {
        Content = ListFilter;
    }

    return (
        <StyledPopover>
            <Popover.Content>
                <Content name={name} onSubmit={onSubmit} type={type} list={list} />
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

const customStyles = {
    header: {
        style: {
            minHeight: '3.5rem',
            // backgroundColor: '#636f83',
        },
    },
    headRow: {
        style: {
            borderTop: '1px solid #c5c5c5',
            borderBottom: '1px solid #c5c5c5',
            backgroundColor: '#6e7a8e',
            color: 'white',
        },
    },
    headCells: {
        style: {
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            '&:not(:last-of-type)': {
                borderRight: '1px solid #c5c5c5',
            },
        },
    },
    cells: {
        style: {
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            borderBottom: '1px solid #c5c5c5',
            color: '#474747',
            '&:not(:last-of-type)': {
                borderRight: '1px solid #c5c5c5',
            },
        },
    },
};

const estimateColumnWidth = (type, isMultichoices) => {
    if (isMultichoices) {
        return 3;
    }
    switch (type) {
        case FIELD_TYPE.STRING:
        case FIELD_TYPE.PASSWORD:
        case FIELD_TYPE.TEXT:
            return 2;
        case FIELD_TYPE.FLOAT:
        case FIELD_TYPE.INT:
        case FIELD_TYPE.BOOLEAN:
            return 1;
        case FIELD_TYPE.DATE:
        case FIELD_TYPE.TIME:
        case FIELD_TYPE.DATETIME:
        case FIELD_TYPE.FILE:
            return 3;
    }
};

const PAGE_SIZE = 5;
const PAGE_SIZE_SETTING = [5, 10, 20];

export const Table = ({
    api,
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    loading,
    structure,
    data: dataFromProps,
    fetchDefinitionState,
    fetchDataState,
    updateDataState,
    addDataState,
    searchState,
    searchInTable,
    showModal,
}) => {
    const [data, setData] = useState(dataFromProps);
    const [editingRow, setEditRow] = useState(-1);
    const [columns, setColumns] = useState([]);
    const [rowData, setRowData] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [filterColumn, setFilterColumn] = useState('qweqw');

    useEffect(() => {
        fetchTableDefinition(api);
    }, []);

    useEffect(() => {
        if (fetchDefinitionState === RESPONSE_STATE.SUCCESSS) {
            refreshData();
        }
    }, [fetchDefinitionState]);

    useEffect(() => {
        if (fetchDataState === RESPONSE_STATE.SUCCESSS || searchState === RESPONSE_STATE.SUCCESSS) {
            setData(dataFromProps);
        }
    }, [fetchDataState, searchState]);

    useEffect(() => {
        if (structure && data) {
            initColumns();
        }
    }, [structure, data, editingRow]);

    useEffect(() => {
        if (updateDataState === RESPONSE_STATE.SUCCESSS || addDataState === RESPONSE_STATE.SUCCESSS) {
            refreshData();
        }
    }, [updateDataState, addDataState]);

    const initColumns = () => {
        const cols = [...getSelectionColumn(), ...getColumns(), ...getActionColumn()];
        setColumns(cols);
    };

    const getSelectionColumn = () => {
        const { selection } = structure;
        const cols = [];
        // if support row selection
        if (selection) {
            cols.push({
                id: 'selection',
                name: '',
                sortable: false,
                width: '3rem',
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
                id: 'action',
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
                                    setRowData({});
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
            const isMultichoices = Boolean(listName && choices);
            const list = get(data, 'list', {})[listName];
            return {
                id: name,
                name: (
                    <ColmnName
                        value={caption}
                        type={type}
                        name={name}
                        onSubmit={onSubmitFilter}
                        list={list}
                        multichoices={isMultichoices}
                    />
                ),
                grow: estimateColumnWidth(type, isMultichoices),
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
                                onChange={(e) => onRowValueChange(e, row, name)}
                                list={data.list[listName]}
                                multichoices={isMultichoices}
                            />
                        );
                    }
                    if (isMultichoices) {
                        return (
                            <Flex flexDirection="column" p={2}>
                                {value.map((el) => {
                                    const { text, item } = searchIdInList(list, el);
                                    return (
                                        <Text as="p" key={text}>
                                            - {text}
                                        </Text>
                                    );
                                })}
                            </Flex>
                        );
                    }
                    return <Text>{value}</Text>;
                },
            };
        });
    };

    console.log('render table');

    const refreshData = () => {
        fetchTableData({ api, pageSize, pageIndex });
    };

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

    const onRowValueChange = (e, row, fieldName) => {
        const value = get(e, 'target.value', e);
        console.log(`set field ${fieldName} with value ${value}`);
        setRowData((prev) => {
            return {
                ...row,
                ...prev,
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
        setFilterColumn(Object.keys(filter)[0]);
        searchInTable({ api, data: payload });
    };

    const onDiscardFilter = useCallback(() => {
        refreshData();
        setFilterColumn('');
    }, []);

    const onSort = (column, sortDirection) => {
        console.log();
    };

    const onChangeRowsPerPage = (pageSize, currentPage) => {
        console.log(pageSize);
        console.log(currentPage);
        setPageSize(pageSize);
        fetchTableData({ api, pageSize, pageIndex });
    };

    const onChangePage = (pageIndex, totalRows) => {
        console.log(pageIndex);
        console.log(totalRows);
        setPageIndex(pageIndex);
        fetchTableData({ api, pageSize, pageIndex });
    };

    return structure && data ? (
        <>
            <StyledDataTable
                title="ádsdadas"
                striped
                actions={
                    <TableActions
                        api={api}
                        fields={structure.fields}
                        list={data.list}
                        filterColumn={filterColumn}
                        onDiscardFilter={onDiscardFilter}
                    />
                }
                // highlightOnHover
                columns={columns}
                data={data.data}
                pagination
                paginationServer
                paginationPerPage={pageSize}
                paginationRowsPerPageOptions={PAGE_SIZE_SETTING}
                paginationTotalRows={data.total}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="26rem"
            />
        </>
    ) : null;
};

const Filtered = memo(({ filterColumn, onDiscard }) => {
    return (
        <>
            <Flex flexDirection="row" fontSize="0.8rem" p="0.3rem 0.5rem" backgroundColor="#dadada">
                <Text>Filtered by:</Text>
                <Text>{filterColumn}</Text>
                <FaTimes onClick={onDiscard} />
            </Flex>
        </>
    );
});

const TableActions = connect(null, { showModal, addTableRow })(
    memo(({ api, fields, list, filterColumn, onDiscardFilter, showModal, addTableRow }) => {
        const onCreateData = () => {
            showModal({
                id: MODAL_ID.CREATE_TABLE_DATA_MODAL,
                render: CreateTableRowModal,
                data: {
                    api,
                    fields,
                    list,
                    addTableRow,
                },
            });
        };
        return (
            <Flex flexDirection="row">
                <FaPlus onClick={onCreateData} />
                {filterColumn && <Filtered filterColumn={filterColumn} onDiscard={onDiscardFilter} />}
            </Flex>
        );
    }),
);

const mapStateToProps = ({
    table: {
        loading,
        structure,
        data,
        fetchDefinitionState,
        fetchDataState,
        updateDataState,
        addDataState,
        searchState,
    },
}) => ({
    loading,
    structure,
    data,
    fetchDefinitionState,
    fetchDataState,
    updateDataState,
    addDataState,
    searchState,
});

const mapDispatchToProps = {
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    searchInTable,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Table));
