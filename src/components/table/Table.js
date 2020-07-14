import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { Text, Box, Flex } from 'rebass';
import { FaPencilAlt, FaBan, FaTrash, FaCheck, FaFilter, FaTimes, FaPlus } from 'react-icons/fa';
import { Popover, OverlayTrigger, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import { fetchTableDefinition, fetchTableData, updateTableRow, deleteTableRow, searchInTable } from 'actions/actions';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import ListSelect from 'components/input/ListSelect';
import { FIELD_TYPE, FILTER_ID, RESPONSE_STATE } from 'utils/constants';
import { TextFilter, ListFilter } from 'components/table/columnFilters';

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

const ColmnName = memo(({ name, value, list, type, onSubmit, multichoices }) => {
    return (
        <ColumnNameWrapper>
            <Text as="span" color="white">{value}</Text>
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

const Filtered = memo(({ filterColumn, onDiscard }) => {
    return (
        <>
            <Flex flexDirection="row">
                <Text>Filtered by:</Text>
                <Box>{filterColumn}</Box>
                <FaTimes onClick={onDiscard} />
            </Flex>
        </>
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
            minHeight: '56px',
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
            '&:not(:last-of-type)': {
                borderRight: '1px solid #c5c5c5',
            },
        },
    },
    cells: {
        style: {
            borderBottom: '1px solid #c5c5c5',
            color: '#474747',
            '&:not(:last-of-type)': {
                borderRight: '1px solid #c5c5c5',
            },
        },
    },
};

const PAGE_SIZE = 5;
const PAGE_SIZE_SETTING = [5, 10];

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
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [filterColumn, setFilterColumn] = useState('qweqwe');

    useEffect(() => {
        // fetchTableDefinition(api);
    }, []);

    useEffect(() => {
        if (fetchDefinitionState === RESPONSE_STATE.SUCCESSS) {
            refreshData();
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
            refreshData();
        }
    }, [updateDataState]);

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
            const isMultichoices = Boolean(listName && choices);
            const list = get(data, 'list', {})[listName];
            return {
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
                                multichoices={isMultichoices}
                            />
                        );
                    }
                    if (isMultichoices) {
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
        setFilterColumn(Object.keys(filter)[0]);
        searchInTable({ api, data: payload });
    };

    const onDiscardFilter = () => {
        refreshData();
    };

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
            {filterColumn && <Filtered filterColumn={filterColumn} onDiscard={onDiscardFilter} />}
            <DataTable
                title="ádsdadas"
                striped
                actions={<TableActions />}
                highlightOnHover
                responsive
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
                // fixedHeaderScrollHeight="300px"
            />
        </>
    ) : null;
};

const TableActions = memo(() => {
    return (
        <Box>
            <FaPlus />
            <Filtered />
        </Box>
    )
})

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
