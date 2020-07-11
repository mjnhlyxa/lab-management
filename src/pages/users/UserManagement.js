import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import forOwn from 'lodash/forOwn';
import forEach from 'lodash/forEach';

import dataJ from 'pages/Test/data.json';
import columnsJ from 'pages/Test/columns.json';
import { getUserDefinition, getAllUsers } from 'actions/actions';
import { LANGUAGE_SUPPORTED, RESPONSE_STATE } from 'utils/constants';
import Table from 'components/table/Table';

export const UserManagement = ({
    loading,
    getDefinitionState,
    definition,
    getUserDefinition,
    getAllUsersState,
    users,
    getAllUsers,
}) => {
    const [structure, setStruture] = useState();
    const [data, setData] = useState();
    useEffect(() => {
        getUserDefinition();
    }, []);

    useEffect(() => {
        if (getDefinitionState === RESPONSE_STATE.SUCCESSS) {
            setStruture(definition);
            getAllUsers();
        }
    }, [getDefinitionState]);

    useEffect(() => {
        if (getAllUsersState === RESPONSE_STATE.SUCCESSS) {
            setData(users);
        }
    }, [getAllUsersState]);

    const onDeleteRow = (row) => {
        console.log(row);
    }

    return structure && data ? <Table structure={structure} data={data} onDelete={onDeleteRow}/> : null;
};

const mapStateToProps = ({ users: { loading, getDefinitionState, definition, getAllUsersState, users } }) => ({
    loading,
    getDefinitionState,
    definition,
    getAllUsersState,
    users,
});

const mapDispatchToProps = {
    getUserDefinition,
    getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
