import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import { Box, Flex, Text } from 'rebass/styled-components';
import axios from 'axios';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

import dataJ from 'pages/Test/data.json';
import columnsJ from 'pages/Test/columns.json';
import { getUserDefinition, getAllUsers, showModal, changePassword } from 'actions/actions';
import { LANGUAGE_SUPPORTED, RESPONSE_STATE, API_URL, MODAL_ID } from 'utils/constants';
import Table from 'components/table/Table';
import CompoundDetailModal from 'pages/compound/CompoundDetailModal';

const api = `${API_URL}/api/form/gen/compound`;

export const CompoundManagement = ({ loading, showModal, changePassword }) => {
    const { t } = useTranslation();

    const onRowClicked = (row) => {
        const { name } = row;
        showModal({
            id: MODAL_ID.CHANGE_PASSWORD_MODAL,
            title: `${t('compound.name')} ${name}`,
            render: CompoundDetailModal,
            width: 1200,
            data: {
                ...row,
            },
        });
    };

    return (
            <Table
                id="compound-table"
                api={api}
                title={t('compound.title')}
                highlightOnHover
                pointerOnHover
                onRowClicked={onRowClicked}
                // customColumns={[
                //     {
                //         center: true,
                //         customCell: customChangePasswordCell,
                //     },
                // ]}
            />
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
    showModal,
    changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompoundManagement);
