import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Divider, Space } from 'antd';
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

const FooterBox = styled(Box)`
    position: relative;
`;
const ActionBox = styled(Box)`
    position: absolute;
    right: 0;
`;

const Footer = ({ children }) => {
    return (
        <FooterBox height="5rem">
            <Divider />
            <ActionBox>
                <Space>{children}</Space>
            </ActionBox>
        </FooterBox>
    );
};

export const AppModal = ({
    show,
    title = 'Basic modal',
    onHide,
    id,
    allowHide = true,
    data,
    render,
    errorCode,
    width = 416,
    ...rest
}) => {
    const cache = useRef({});
    const { t } = useTranslation();
    const [Render, setRender] = useState(render);

    useEffect(() => {
        if (show) {
            setRender(render);
            return;
        }
        setRender(null);
    }, [show, id]);

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

    const getModalBody = () => {
        if (Render) {
            return (
                <Render
                    Footer={Footer}
                    onHide={onModalHide}
                    data={data}
                    saveCache={saveCache}
                    getCache={getCache}
                    t={t}
                />
            );
        }
        return null;
    };

    return (
        <Modal id={id} title={title} width={width} zIndex={1031} footer={null} visible={show} onOk={hideModal} onCancel={hideModal}>
            {getModalBody()}
        </Modal>
    );
};

const mapStateToProps = ({
    modalState: {
        show,
        modal: { tracking, title, trackingLabel, id, allowHide, data, render, errorCode, width },
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
    title,
    width,
});

const mapDispatchToProp = {
    onHide: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(AppModal);
