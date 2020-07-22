import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { Text, Box, Flex } from 'rebass';
import { notification, Tag, Button, Popover } from 'antd';
import { FaSort, FaPencilAlt, FaBan, FaTrashAlt, FaCheck, FaFilter, FaTimes, FaPlus, FaCog } from 'react-icons/fa';
import { IoIosRefresh } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';
import omit from 'lodash/omit';

import {
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    searchInTable,
    addTableRow,
    showModal,
    sortByColumn,
} from 'actions/actions';
import Input from 'components/input/Input';
import { IconButton } from 'components/button/Button';
import ListSelect from 'components/input/ListSelect';
import TableActions from 'components/table/TableActions';
import TalbeLoadingSkeleton from 'components/table/TalbeLoadingSkeleton';
import { FIELD_TYPE, MODAL_ID, RESPONSE_STATE, SORT_TYPE } from 'utils/constants';
import { TextFilter, ListFilter } from 'components/table/columnFilters';
import { useTranslation } from 'react-i18next';

const StyledDataTable = styled(DataTable)`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    border-radius: 0.5rem;
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

const Title = styled(Text)`
    width: fit-content;
`;

export const Field = memo(({ type, value: initValue, onChange, list, multichoices, height = '1.6rem' }) => {
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
            return <Input type="text" value={val} onChange={change} height={height} />;
        case FIELD_TYPE.FLOAT:
            return <Input type="number" value={val} onChange={change} height={height} />;
        case FIELD_TYPE.INT:
            return <Input type="number" value={val} onChange={change} height={height} />;
        case FIELD_TYPE.TEXT:
            return <Input type="text" value={val} onChange={change} height={height} />;
        case FIELD_TYPE.BOOLEAN:
            return <Input type="checkbox" checked={val} onChange={change} height={height} />;
        case FIELD_TYPE.DATE:
            return <DatePicker selected={val ? new Date(val) : new Date()} onChange={change} />;
        case FIELD_TYPE.TIME:
            return <DatePicker selected={val ? new Date(val) : new Date()} onChange={change} />;
        case FIELD_TYPE.DATETIME:
            return <DatePicker selected={val ? new Date(val) : new Date()} onChange={change} />;
        case FIELD_TYPE.FILE:
            return <Input type="text" value={val} onChange={change} height={height} />;
        case FIELD_TYPE.PASSWORD:
            return <Input type="password" value={val} onChange={change} height={height} />;
    }
});

const FilterWrapper = styled(Box).attrs(() => ({
    p: 0,
}))`
    cursor: pointer;
`;

const FilterIcon = styled(FaFilter)`
    width: 0.7rem;
`;

const ColumnNameWrapper = styled(Flex)`
    font-size: 0.8rem;
    font-weight: bold;
    color: #1990ff;
    &:hover {
        color: #469ff2;
    }
`;

const ColmnName = memo(({ name, value, list, type, onSubmit, multichoices, sortable, onSort }) => {
    const [showPopover, setShowPopover] = useState(false);

    const { t } = useTranslation();
    const handlePopoverVisibleChange = (visible) => {
        setShowPopover(visible);
    };

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
        <ColumnNameWrapper flexDirection="row" alignItems="center">
            <Text as="span" color="black" mr={1}>
                {value}
            </Text>
            {sortable && <FaSort color="#b5b5b5" onClick={() => onSort(name)} />}
            <FilterWrapper>
                <Popover
                    title={
                        <Text as="p">
                            {t('components.table.label.filterBy')} <Text as="strong">{name}</Text>
                        </Text>
                    }
                    content={<Content name={name} onSubmit={onSubmit} type={type} list={list} />}
                    trigger="click"
                    visible={showPopover}
                    onVisibleChange={handlePopoverVisibleChange}>
                    <Box width="0.7rem">
                        <FaFilter />
                    </Box>
                </Popover>
            </FilterWrapper>
        </ColumnNameWrapper>
    );
});

const StyledPopover = styled(Popover)`
    min-width: 24.5rem;
    padding: 1rem;
`;

const EditRowBtn = memo(({ editing, onEdit, onCancel, onSubmit }) => {
    return editing ? (
        <>
            <IconWrapper onClick={onSubmit} color="#62c707">
                <FaCheck />
            </IconWrapper>
            <IconWrapper onClick={onCancel} color="#ff8300">
                <FaBan />
            </IconWrapper>
        </>
    ) : (
        <IconWrapper onClick={onEdit} color="#1990ff">
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
    contextMenu: {
        style: {
            backgroundColor: 'white',
        },
    },
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
            // marginBottom: '0.5rem',
            // borderRadius: '0.3rem',
            // boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.2)',
            backgroundColor: '#fafafa',
        },
    },
    headCells: {
        style: {
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            // border: '1px solid #cccccc',
            // margin: '0.5rem 0',
            // borderRadius: '0.5rem',
            '&:not(:last-of-type)': {
                // borderRight: '1px solid #c5c5c5',
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
                // borderLeft: '1px solid #c5c5c5',
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
    id,
    api,
    title,
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    loading,
    structure: structureFromProps,
    data: dataFromProps,
    fetchDefinitionState,
    fetchDataState,
    updateDataState,
    addDataState,
    searchState,
    searchInTable,
    deleteDataState,
    showModal,
    sortByColumn,
}) => {
    const [structure, setStructure] = useState(structureFromProps[id]);
    const [data, setData] = useState(dataFromProps[id]);
    const [editingRow, setEditRow] = useState(-1);
    const [columns, setColumns] = useState([]);
    const [rowData, setRowData] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [filterColumn, setFilterColumn] = useState();
    const [selectedRows, setSelectedRows] = useState({});
    const [sortColumn, setSortColumn] = useState({});

    useEffect(() => {
        fetchTableDefinition({ api, id });
    }, []);

    useEffect(() => {
        // if (fetchDefinitionState === RESPONSE_STATE.SUCCESSS) {
            setStructure(structureFromProps[id]);
            refreshData();
            showSuccessMessage('Fetch table definition success!');
        // }
    }, [structureFromProps]);

    useEffect(() => {
        if (fetchDataState === RESPONSE_STATE.SUCCESSS || searchState === RESPONSE_STATE.SUCCESSS) {
            setData(dataFromProps[id]);
        }
    }, [fetchDataState, searchState]);

    useEffect(() => {
        if (structure && data) {
            initColumns();
        }
    }, [structure, data, editingRow, selectedRows]);

    useEffect(() => {
        if (
            updateDataState === RESPONSE_STATE.SUCCESSS ||
            addDataState === RESPONSE_STATE.SUCCESSS ||
            deleteDataState === RESPONSE_STATE.SUCCESSS
        ) {
            setSelectedRows({});
            refreshData();
            showSuccessMessage();
        }
    }, [updateDataState, addDataState, deleteDataState]);

    const initColumns = () => {
        const cols = [...getSelectionColumn(), ...getColumns(), ...getActionColumn()];
        setColumns(cols);
    };

    const getSelectionColumn = () => {
        const { optionDelete } = structure;
        const cols = [];
        // if support row selection
        if (optionDelete) {
            cols.push({
                id: 'selection',
                name: '',
                sortable: false,
                width: '3rem',
                cell: (row) => {
                    return (
                        <Input
                            type="checkbox"
                            checked={Boolean(selectedRows[row.id])}
                            onChange={() => onSelectionRow(row)}
                        />
                    );
                },
            });
        }
        return cols;
    };

    const getActionColumn = () => {
        return [
            {
                id: 'action',
                name: '',
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
                            <IconWrapper onClick={() => deleteRow(row)} color="#dc3544">
                                <FaTrashAlt />
                            </IconWrapper>
                        </>
                    );
                },
            },
        ];
    };

    const getColumns = () => {
        const { fields = [] } = structure;
        const columns = [];
        fields.forEach(({ type, name, caption, sortable, choices, listName, editable, show }) => {
            const isMultichoices = Boolean(listName && choices);
            const list = get(data, 'list', {})[listName];
            if (!show) {
                return;
            }
            columns.push({
                id: name,
                name: (
                    <ColmnName
                        value={caption}
                        type={type}
                        name={name}
                        list={list}
                        multichoices={isMultichoices}
                        sortable={sortable}
                        onSubmit={onSubmitFilter}
                        onSort={onColumnSort}
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
            });
        });
        return columns;
    };

    console.log('render table');

    const showSuccessMessage = (message) => {
        notification.success({
            message,
            placement: 'bottomRight',
        });
    };

    const showErrorMessage = (message) => {
        notification.error({
            message,
            placement: 'bottomRight',
        });
    };

    const refreshData = useCallback(() => {
        fetchTableData({ id, api, pageSize, pageIndex });
    }, [pageSize, pageIndex]);

    const onSelectionRow = (row) => {
        setSelectedRows((prev) => {
            const { id } = row;
            let newSelectedRows;
            if (prev[id]) {
                newSelectedRows = omit(prev, [id]);
            } else {
                newSelectedRows = { ...prev, [id]: row };
            }
            return newSelectedRows;
        });
    };

    const onSubmitEditedRow = useCallback(() => {
        setRowData((data) => {
            updateTableRow({ id, api, data });
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

    const onColumnSort = (name) => {
        setSortColumn((prev) => {
            const sortType = prev[name] != SORT_TYPE.ESC ? SORT_TYPE.ESC : SORT_TYPE.DES;
            const payload = {
                pageSize,
                pageIndex,
                sortInfo: JSON.stringify([{ name: name, type: sortType }]),
            };
            sortByColumn({ api, data: payload });
            return { [name]: sortType };
        });
    };

    const onSubmitFilter = (filter) => {
        const payload = {
            pageSize,
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
    }, [pageSize, pageIndex]);

    const onChangeStructure = useCallback((struct, isSave) => {
        setStructure(struct);
    }, []);

    const onSort = (column, sortDirection) => {
        console.log();
    };

    const onChangeRowsPerPage = (pageSize, currentPage) => {
        console.log(pageSize);
        console.log(currentPage);
        setPageSize(pageSize);
        setPageIndex(currentPage);
        fetchTableData({ id, api, pageSize, pageIndex: currentPage });
    };

    const onChangePage = (pageIndex, totalRows) => {
        console.log(pageIndex);
        console.log(totalRows);
        setPageIndex(pageIndex);
        fetchTableData({ id, api, pageSize, pageIndex });
    };

    if (loading) {
        return <TalbeLoadingSkeleton />;
    }

    if (structure && data) {
        console.log('done')
        return (
            <StyledDataTable
                title={<Title>{title}</Title>}
                striped
                actions={
                    <TableActions
                        id={id}
                        api={api}
                        structure={structure}
                        list={data.list}
                        filterColumn={filterColumn}
                        selectedRows={selectedRows}
                        refreshData={refreshData}
                        onDiscardFilter={onDiscardFilter}
                        onChangeStructure={onChangeStructure}
                    />
                }
                // highlightOnHover
                columns={columns}
                data={data.data}
                pagination
                paginationServer
                paginationPerPage={pageSize}
                paginationDefaultPage={pageIndex}
                paginationRowsPerPageOptions={PAGE_SIZE_SETTING}
                paginationTotalRows={data.total}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="26rem"
            />
        );
    }

    return null;
};

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
        deleteDataState,
    },
}) => {
    return {
        loading,
        structure,
        data,
        fetchDefinitionState,
        fetchDataState,
        updateDataState,
        addDataState,
        searchState,
        deleteDataState,
    };
};

const mapDispatchToProps = {
    fetchTableDefinition,
    fetchTableData,
    updateTableRow,
    deleteTableRow,
    searchInTable,
    showModal,
    sortByColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Table));
