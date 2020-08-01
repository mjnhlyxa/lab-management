import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, Input, Tabs, Space } from 'antd';
import styled from 'styled-components';
import { Box, Flex, Text } from 'rebass/styled-components';
import get from 'lodash/get';
import { FaFlask } from 'react-icons/fa';

import dataJ from 'pages/Test/data.json';
import columnsJ from 'pages/Test/columns.json';
import {
    getUserDefinition,
    getAllUsers,
    showModal,
    changePassword,
    deactivateTable,
    activateTable,
} from 'actions/actions';
import { LANGUAGE_SUPPORTED, RESPONSE_STATE, API_URL, MODAL_ID } from 'utils/constants';
import Table from 'components/table/Table';
import TalbeLoadingSkeleton from 'components/skeleton/TableSkeleton';
import ListSkeleton from 'components/skeleton/ListSkeleton';

const analyzeApi = `${API_URL}/api/form/gen/compound_analyte`;
const methodApi = `${API_URL}/api/form/gen/compound_method`;

const ANALYZE_TABLE_ID = 'compound-analyze-table';
const METHOD_TABLE_ID = 'compound-method-table';

const { TabPane } = Tabs;

export const CompoundDetailModal = ({ data: { id }, t, deactivateTable, activateTable }) => {
    useEffect(() => {
        deactivateTable('compound-table');
        return () => activateTable('compound-table');
    }, []);
    return (
        // <Flex flexDirection="column">
        //     <ListSkeleton />
        //     <TalbeLoadingSkeleton />
        // </Flex>
        <Flex flexDirection="column">
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <Space>
                            <FaFlask />
                            <Text as="span">{t('laboratoryMngt.compound.name')}</Text>
                        </Space>
                    }
                    key="1">
                    <Table
                        id={ANALYZE_TABLE_ID}
                        api={`${analyzeApi}/${id}`}
                        title={t('laboratoryMngt.compound.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaFlask />
                            <Text as="span">{t('laboratoryMngt.compound.name')}</Text>
                        </Space>
                    }
                    key="2">
                    <Table
                        id={METHOD_TABLE_ID}
                        api={`${methodApi}/${id}`}
                        title={t('laboratoryMngt.compound.title')}
                    />
                </TabPane>
                {/* <TabPane
                    tab={
                        <Space>
                            <FaFlask />
                            <Text as="span">{t('laboratoryMngt.compound.name')}</Text>
                        </Space>
                    }
                    key="1">
                    <Table id="compound-table" api={`${methodApi}/${id}`} title={t('laboratoryMngt.compound.title')} />
                </TabPane> */}
            </Tabs>
        </Flex>
    );
};

const mapStateToProps = ({ users: { loading, getDefinitionState, definition, getAllUsersState, users } }) => ({});

const mapDispatchToProps = {
    showModal,
    deactivateTable,
    activateTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CompoundDetailModal));
