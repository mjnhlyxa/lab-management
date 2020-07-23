import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Space } from 'antd';
import { FaBolt, FaFlask, FaCalculator, FaObjectGroup, FaDollarSign, FaChartPie } from 'react-icons/fa';
import { Box, Text } from 'rebass/styled-components';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import { getUserDefinition, getAllUsers } from 'actions/actions';
import { LANGUAGE_SUPPORTED, RESPONSE_STATE, API_URL } from 'utils/constants';
import Table from 'components/table/Table';

const { TabPane } = Tabs;

export const UserManagement = ({}) => {
    const { t } = useTranslation();

    return (
        <>
            <Tabs defaultActiveKey="2">
                <TabPane
                    tab={
                        <Space>
                            <FaFlask />
                            <Text as="span">{t('laboratoryMngt.compound.name')}</Text>
                        </Space>
                    }
                    key="1">
                    <Table
                        id="compound-table"
                        api={`${API_URL}/api/form/gen/compound`}
                        title={t('laboratoryMngt.compound.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaChartPie />
                            <Text as="span">{t('laboratoryMngt.analyte.name')}</Text>
                        </Space>
                    }
                    key="2">
                    <Table
                        id="analyte-table"
                        api={`${API_URL}/api/form/gen/analyte`}
                        title={t('laboratoryMngt.analyte.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaBolt />
                            <Text as="span">{t('laboratoryMngt.boa.name')}</Text>
                        </Space>
                    }
                    key="3">
                    <Table id="boa-table" api={`${API_URL}/api/form/gen/boa`} title={t('laboratoryMngt.boa.title')} />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaObjectGroup />
                            <Text as="span">{t('laboratoryMngt.matrix.name')}</Text>
                        </Space>
                    }
                    key="4">
                    <Table
                        id="matrix-table"
                        api={`${API_URL}/api/form/gen/matrix`}
                        title={t('laboratoryMngt.matrix.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaCalculator />
                            <Text as="span">{t('laboratoryMngt.technical.name')}</Text>
                        </Space>
                    }
                    key="5">
                    <Table
                        id="technical-table"
                        api={`${API_URL}/api/form/gen/technical`}
                        title={t('laboratoryMngt.technical.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaDollarSign />
                            <Text as="span">{t('laboratoryMngt.unit.name')}</Text>
                        </Space>
                    }
                    key="6">
                    <Table
                        id="unit-table"
                        api={`${API_URL}/api/form/gen/unit`}
                        title={t('laboratoryMngt.unit.title')}
                    />
                </TabPane>
            </Tabs>
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
