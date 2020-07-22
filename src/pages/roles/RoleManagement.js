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
            <TabPane
                tab={
                    <span>
                        Tab 1
                    </span>
                }
                key="1">
                {/* <Table api="http://cenlab.nlsoft.vn/api/form/user/permissions" title="asd" /> */}
            </TabPane>
            <TabPane
                tab={
                    <span>
                        Tab 2
                    </span>
                }
                key="2">
                {/* <Table id="qweqwewq" api="http://cenlab.nlsoft.vn/api/form/user/roles" title="qqq" /> */}
                <Table id="qweqwewq" api="http://localhost:3001/test1" title="qqq" />
            </TabPane>
        </Tabs>
    );
};

const mapStateToProps = ({ users: { loading, getDefinitionState, definition, getAllUsersState, users } }) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoleManagement);
