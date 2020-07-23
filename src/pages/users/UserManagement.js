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
    // const [structure, setStruture] = useState();
    // const [data, setData] = useState();
    // useEffect(() => {
    //     getUserDefinition();
    // }, []);

    // useEffect(() => {
    //     if (getDefinitionState === RESPONSE_STATE.SUCCESSS) {
    //         setStruture(definition);
    //         getAllUsers();
    //     }
    // }, [getDefinitionState]);

    // useEffect(() => {
    //     if (getAllUsersState === RESPONSE_STATE.SUCCESSS) {
    //         setData(users);
    //     }
    // }, [getAllUsersState]);
    const { t } = useTranslation();

    return (
        <>
            <Table id="table1" api="http://cenlab.nlsoft.vn/api/common/form/general/users" title={t('userManagement.title')} />
            {/* <Table key={123} id="table1" api="http://localhost:3001/test" title={t('userManagement.title')} />
            <Table key={232} id="table2" api="http://localhost:3001/test1" title={t('userManagement.title')} /> */}
            {/* <Table id="table2" api="http://cenlab.nlsoft.vn/api/form/user/permissions" title="qqq" /> */}
        </>
    );
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