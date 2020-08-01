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

const Row = styled(Flex).attrs(() => ({
    flexDirection: 'row',
    mb: 3,
}))``;

const Label = styled(Text).attrs(() => ({
    width: '10rem',
    fontSize: '0.9rem',
    fontWeight: 'bold',
}))``;

const StyledInput = styled(Input).attrs(() => ({
    type: 'password',
}))`
    width: 15rem;
`;

const api = `${API_URL}/api/form/sys/users`;

const ChangePasswordModal = memo(({ Footer, data, onHide, t }) => {
    const { name, changePassword, ...rest } = data;
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const onPasswordChange = (e) => {
        const value = get(e, 'target.value', '');
        setPassword(value);
    };

    const onConfirmPwChange = (e) => {
        const value = get(e, 'target.value', '');
        setConfirmPw(value);
    };

    const onSubmit = () => {
        changePassword({ ...rest, name, password, confirmPw });
        onHide();
    };

    return (
        <Flex flexDirection="column">
            <Row>
                <Label>{t('userManagement.label.username')}</Label>
                <Label>{name}</Label>
            </Row>
            <Row>
                <Label>{t('userManagement.label.password')}</Label>
                <StyledInput placeholder={t('userManagement.label.enterPassword')} onChange={onPasswordChange} />
            </Row>
            <Row>
                <Label>{t('userManagement.label.confirmPassword')}</Label>
                <StyledInput placeholder={t('userManagement.label.enterConfirmPw')} onChange={onConfirmPwChange} />
            </Row>
            <Footer>
                <Button type="primary" onClick={onSubmit}>
                    {t('common.button.label.submit')}
                </Button>
                <Button onClick={onHide}>{t('common.button.label.cancel')}</Button>
            </Footer>
        </Flex>
    );
});

export const UserManagement = ({ loading, showModal, changePassword }) => {
    const { t } = useTranslation();

    const changePw = (data) => {
        changePassword({ api, data });
    };

    const onChangePassword = (row) => {
        showModal({
            id: MODAL_ID.CHANGE_PASSWORD_MODAL,
            title: t('userManagement.label.changePassword'),
            render: ChangePasswordModal,
            data: {
                ...row,
                changePassword: changePw,
            },
        });
    };

    const customChangePasswordCell = (row) => {
        const { id } = row;
        return <Button onClick={() => onChangePassword(row)}>{t('userManagement.label.changePassword')}</Button>;
    };

    return (
        <>
            <Table
                id="table1"
                api={api}
                title={t('userManagement.title')}
                customColumns={[
                    {
                        center: true,
                        customCell: customChangePasswordCell,
                    },
                ]}
            />
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
    showModal,
    changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
