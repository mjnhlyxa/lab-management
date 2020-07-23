import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
// import Modal from 'react-bootstrap/Modal';
import { Flex, Box, Button, Text } from 'rebass/styled-components';
import styled from 'styled-components';
import get from 'lodash/get';
import { hideModal } from 'actions/actions';

// export const StyledModal = styled(Modal)`
//     .modal-content {
//         overflow: hidden;
//         border: none;
//         width: fit-content;
//     }
// `;

// const StyledHeader = styled(Modal.Header)`
//     padding: 1rem 1.5rem;
//     border-bottom: none;
//     background-color: #6e7a8e;
//     align-items: center;
//     color: white;
//     font-size: 1.3rem;
//     margin: 0;
//     justify-content: left;
//     svg {
//         min-width: 2.5rem;
//         height: 2.5rem;
//         margin-right: 1rem;
//     }
// `;

// const StyledBody = styled(Modal.Body)`
//     padding: 1rem 1.5rem;
// `;

// const StyledFooter = styled(Modal.Footer)`
//     padding: unset;
//     border-top: none;
//     text-align: left;
// `;

// const StyledFlex = styled(Flex).attrs(() => ({
//     flexDirection: ['column-reverse', 'row'],
//     justifyContent: 'center',
// }))``;

// const Redirect = styled.a``;

// const CenterBox = styled(Box)`
//     margin: auto;
//     width: fit-content;
// `;

// const ErrorCode = styled(Text)`
//     display: block;
//     color: red;
//     margin-top: 12px;
// `;

// const CloseButton = styled(Button)`
//     margin-top: 0px;
// `;

// const ContinueButton = styled(Button)`
//     margin: 0 20px;
// `;

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
        <Modal id={id} title="Basic Modal" visible={show} onOk={hideModal} onCancel={hideModal}>
            {RenderedComponent && (
                <RenderedComponent onHide={onModalHide} data={data} saveCache={saveCache} getCache={getCache} t={t} />
            )}
        </Modal>
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
