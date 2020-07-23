import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Space } from 'antd';
import { Text } from 'rebass/styled-components';
import { FaUnlock, FaCriticalRole, FaShare, FaUsers, FaPuzzlePiece } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import Table from 'components/table/Table';
import { API_URL } from 'utils/constants';

const { TabPane } = Tabs;

export const RoleManagement = ({ loading }) => {
    const { t } = useTranslation();
    return (
        <Tabs defaultActiveKey="2">
            <TabPane
                tab={
                    <Space>
                        <FaUnlock />
                        <Text as="span">{t('roleManagement.permission.name')}</Text>
                    </Space>
                }
                key="1">
                <Table
                    id="permission-table"
                    api={`${API_URL}/api/form/user/permissions`}
                    title={t('roleManagement.permission.title')}
                />
            </TabPane>
            <TabPane
                tab={
                    <Space>
                        <FaCriticalRole />
                        <Text as="span">{t('roleManagement.role.name')}</Text>
                    </Space>
                }
                key="2">
                <Table id="role-table" api={`${API_URL}/api/form/user/roles`} title={t('roleManagement.role.title')} />
            </TabPane>
            <TabPane
                tab={
                    <Space>
                        <FaShare />
                        <Text as="span">{t('roleManagement.api.name')}</Text>
                    </Space>
                }
                key="3">
                <Table id="api-table" api={`${API_URL}/api/form/user/apis`} title={t('roleManagement.api.title')} />
            </TabPane>
            <TabPane
                tab={
                    <Space>
                        <FaUsers />
                        <Text as="span">{t('roleManagement.menuGroup.name')}</Text>
                    </Space>
                }
                key="4">
                <Table
                    id="menu-table"
                    api={`${API_URL}/api/form/user/menus`}
                    title={t('roleManagement.menuGroup.title')}
                />
            </TabPane>
            <TabPane
                tab={
                    <Space>
                        <FaPuzzlePiece />
                        <Text as="span">{t('roleManagement.module.name')}</Text>
                    </Space>
                }
                key="5">
                <Table
                    id="module-table"
                    api={`${API_URL}/api/form/user/modules`}
                    title={t('roleManagement.module.title')}
                />
            </TabPane>
        </Tabs>
    );
};

const mapStateToProps = ({ users: { loading, getDefinitionState, definition, getAllUsersState, users } }) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoleManagement);
