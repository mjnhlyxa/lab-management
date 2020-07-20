import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { Flex, Box, Button, Text } from 'rebass/styled-components';
import styled from 'styled-components';
import get from 'lodash/get';
import { hideModal } from 'actions/actions';

export const StyledModal = styled(Modal)`
    .modal-content {
        overflow: hidden;
        border: none;
    }
`;

const StyledHeader = styled(Modal.Header)`
    padding: 30px 50px;
    border-bottom: none;
    background-color: black;
    display: flex;
    align-items: center;
    p {
        color: white;
        font-size: 25px;
        font-weight: 300;
        margin: 0;
    }
    svg {
        min-width: 72px;
        height: 72px;
        margin-right: 20px;
    }
`;

const StyledBody = styled(Modal.Body)`
    padding: 30px 50px;
`;

const StyledFooter = styled(Modal.Footer)`
    padding: unset;
    border-top: none;
    text-align: left;
`;

const StyledFlex = styled(Flex).attrs(() => ({
    flexDirection: ['column-reverse', 'row'],
    justifyContent: 'center',
}))``;

const Redirect = styled.a``;

const CenterBox = styled(Box)`
    margin: auto;
    width: fit-content;
`;

const ErrorCode = styled(Text)`
    display: block;
    color: red;
    margin-top: 12px;
`;

const CloseButton = styled(Button)`
    margin-top: 0px;
`;

const ContinueButton = styled(Button)`
    margin: 0 20px;
`;

export const AppModal = ({ show, onHide, id, allowHide = true, data, render, errorCode, ...rest }) => {
    const cache = useRef({});
    const { t } = useTranslation();
    const RenderedComponent = render;

    const saveCache = useCallback((data) => {
        cache.current = { ...cache.current, ...data };
    }, []);

    const getCache = useCallback((key) => (key ? cache.current[key] : cache.current), []);

    const hideModal = useCallback(() => {
        if (allowHide) {
            onHide();
        }
    }, [allowHide]);

    const onModalHide = useCallback(() => {
        onHide();
    }, []);

    return (
        <StyledModal id={id} show={show} onHide={hideModal} centered>
            {RenderedComponent && (
                <RenderedComponent
                    Header={StyledHeader}
                    Body={StyledBody}
                    Footer={StyledFooter}
                    onHide={onModalHide}
                    data={data}
                    saveCache={saveCache}
                    getCache={getCache}
                    t={t}
                />
            )}
        </StyledModal>
    );
};

const mapStateToProps = ({
    modalState: {
        show,
        modal: { tracking, trackingLabel, id, allowHide, data, render, errorCode },
    },
}) => ({
    show,
    tracking,
    trackingLabel,
    id,
    allowHide,
    data,
    errorCode,
    render,
    data,
});

const mapDispatchToProp = {
    onHide: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(AppModal);
