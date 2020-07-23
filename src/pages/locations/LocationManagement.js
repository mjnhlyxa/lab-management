import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Space } from 'antd';
import { Text } from 'rebass/styled-components';
import { FaGlobe, FaMapMarker, FaMapSigns, FaStreetView } from 'react-icons/fa';

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
                            <FaGlobe />
                            <Text as="span">{t('locationManagement.country.name')}</Text>
                        </Space>
                    }
                    key="1">
                    <Table
                        id="location-country-table"
                        api={`${API_URL}/api/form/location/country`}
                        title={t('locationManagement.country.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaMapMarker />
                            <Text as="span">{t('locationManagement.province.name')}</Text>
                        </Space>
                    }
                    key="2">
                    <Table
                        id="location-province-table"
                        api={`${API_URL}/api/form/location/province`}
                        title={t('locationManagement.province.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaMapSigns />
                            <Text as="span">{t('locationManagement.district.name')}</Text>
                        </Space>
                    }
                    key="3">
                    <Table
                        id="location-district-table"
                        api={`${API_URL}/api/form/location/district`}
                        title={t('locationManagement.district.title')}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <FaStreetView />
                            <Text as="span">{t('locationManagement.ward.name')}</Text>
                        </Space>
                    }
                    key="4">
                    <Table
                        id="location-ward-table"
                        api={`${API_URL}/api/form/location/ward`}
                        title={t('locationManagement.ward.title')}
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
