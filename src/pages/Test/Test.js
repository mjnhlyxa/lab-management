import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Text } from 'rebass';
import axios from 'axios';
import forOwn from 'lodash/forOwn';
import forEach from 'lodash/forEach';
import DataTable from 'react-data-table-component';

import dataJ from 'pages/Test/data.json';
import columnsJ from 'pages/Test/columns.json';
import { login } from 'actions/actions';
import Button from 'components/Button';

const Input = styled.input`
    max-width: 50px;
`;

const EditBtn = styled(Button)``;

const ColmnName = ({ value }) => {
    return <div>{value}</div>;
};

export const Table = ({ structure, value = {} }) => {
    const [editRow, setEditRow] = useState(-1);

    const { selection, fields } = structure;
    const { data = [] } = value;
    let initColumns = [];
    if (selection) {
        initColumns = [
            ...initColumns,
            {
                name: <ColmnName />,
                sortable: false,
                cell: ({ checked = false }) => {
                    return <Input type="checkbox" checked={checked} onChange={() => {}} />;
                },
            },
            {
                name: 'Action',
                sortable: false,
                cell: ({ id, checked = false }) => {
                    return <EditBtn onClick={() => setEditRow(id)}>Edit</EditBtn>;
                },
            },
        ];
    }

    const columns = fields.reduce((acc, curr) => {
        const { show, name, caption, sortable } = curr;
        if (show) {
            acc.push({
                name: <ColmnName value={caption} />,
                sortable,
                cell: (row) => {
                    const value = row[name];
                    const { id } = row;
                    return id === editRow ? (
                        <Input type="text" value={value} />
                    ) : (
                        <Text>{value}</Text>
                    );
                },
            });
        }
        return acc;
    }, initColumns);

    return <DataTable columns={columns} data={data} />;
};

// <Table >

export const Test = ({ login }) => {
    return <Table structure={columnsJ} value={dataJ} />;
};

const mapStateToProps = ({
    crs1: { loading, captureCrsSuccess, pullIdvSuccess, idvResult, pullIdvAttempt },
}) => ({
    loading,
    captureCrsSuccess,
    pullIdvSuccess,
    idvResult,
    pullIdvAttempt,
});

const mapDispatchToProps = {
    login,
};

export default connect(null, mapDispatchToProps)(Test);
