import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import { useTranslation } from 'react-i18next';
import Table from 'components/table/Table';

const { TabPane } = Tabs;

export const RoleManagement = ({ loading }) => {
    const { t } = useTranslation();
    return (
        <Tabs defaultActiveKey="2">
            <TabPane tab={<span>{t('roleManagement.permission.name')}</span>} key="1">
                <Table id="permission-table" api="http://cenlab.nlsoft.vn/api/form/user/permissions" title={t('roleManagement.permission.title')} />
            </TabPane>
            <TabPane tab={<span>{t('roleManagement.role.name')}</span>} key="2">
                <Table id="role-table" api="http://cenlab.nlsoft.vn/api/form/user/roles" title={t('roleManagement.role.title')} />
            </TabPane>
            <TabPane tab={<span>{t('roleManagement.api.name')}</span>} key="3">
                <Table id="api-table" api="http://cenlab.nlsoft.vn/api/form/user/apis" title={t('roleManagement.api.title')} />
            </TabPane>
            <TabPane tab={<span>{t('roleManagement.menuGroup.name')}</span>} key="4">
                <Table id="menu-table" api="http://cenlab.nlsoft.vn/api/form/user/menus" title={t('roleManagement.menuGroup.title')} />
            </TabPane>
            <TabPane tab={<span>{t('roleManagement.module.name')}</span>} key="5">
                <Table id="module-table" api="http://cenlab.nlsoft.vn/api/form/user/modules" title={t('roleManagement.module.title')} />
            </TabPane>
        </Tabs>
    );
};

const mapStateToProps = ({ users: { loading, getDefinitionState, definition, getAllUsersState, users } }) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoleManagement);
