import React, { useState, memo } from 'react';
import { connect } from 'react-redux';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import forOwn from 'lodash/forOwn';
import forEach from 'lodash/forEach';

import dataJ from 'pages/Test/data.json';
import columnsJ from 'pages/Test/columns.json';
import { login } from 'actions/actions';
import { LANGUAGE_SUPPORTED } from 'utils/constants';
import Table from 'components/Table';

// <Table >
const A = () => {
    const { t, i18n } = useTranslation();
    const onClick = () => {
        // login({user: 1, password: 'gacoi'}
        if (i18n.language === LANGUAGE_SUPPORTED.VIE) {
            i18n.changeLanguage(LANGUAGE_SUPPORTED.ENG);
        } else {
            i18n.changeLanguage(LANGUAGE_SUPPORTED.VIE);
        }
    };
    return <button onClick={onClick}>{i18n.t('test.test1')}</button>;
};

export const Test = ({ login }) => {
    // const { t, i18n } = useTranslation();
    // return (
    //     <>
    //         <A />
    //         <p>{i18n.t('test.test1')}</p>
    //         <button onClick={() => login({user: 1, password: 'gacoi'})}>sdas</button>
    //     </>
    // )
    return <Table structure={columnsJ} data={dataJ.data} />;
};

const mapStateToProps = ({
    crs1: { loading, captureCrsSuccess, pullIdvSuccess, idvResult, pullIdvAttempt },
}) => ({
    loading,
    captureCrsSuccess,
    pullIdvSuccess,
    idvResult,
    pullIdvAttempt,
});

const mapDispatchToProps = {
    login,
};

export default connect(null, mapDispatchToProps)(Test);
