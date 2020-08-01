import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import { Button } from 'antd';
import { Text, Box, Flex } from 'rebass';
import { Field } from 'components/table/Table';

const FooterButton = styled(Box).attrs(() => ({
    p: '1rem 2rem',
    textAlign: 'center',
    flexGrow: 1,
    color: 'white',
}))`
    :hover {
        background-color: ${({ hover }) => hover};
        cursor: pointer;
    }
`;

export const CreateTableRowModal = ({
    // Header,
    // Body,
    Footer,
    data: { id, api, fields = [], list = {}, addTableRow },
    onHide,
    t,
}) => {
    const [data, setData] = useState({});

    const onInputChange = useCallback((e, fieldName) => {
        const value = get(e, 'target.value', e);
        let newData = { ...data, [fieldName]: value };
        setData(newData);
    });

    const onSubmit = () => {
        addTableRow({ id, api, data });
        onHide();
    };

    return (
            <Flex flexDirection="column">
                {fields.map((field) => {
                    const { type, name, caption, update, required, choices, listName } = field;
                    const multichoices = Boolean(choices && listName);
                    return update ? (
                        <Flex key={name} flexDirection="row" m={2}>
                            <Text as="p" width="6rem" fontWeight="bold">
                                {caption}
                                {required ? '*' : ''}
                            </Text>
                            <Field
                                type={type}
                                onChange={(e) => onInputChange(e, name)}
                                list={list[listName]}
                                multichoices={multichoices}
                                height="2rem"
                            />
                        </Flex>
                    ) : null;
                })}
                <Footer>
                    <Button type="primary" onClick={onSubmit}>
                        {t('common.button.label.submit')}
                    </Button>
                    <Button onClick={onHide}>{t('common.button.label.cancel')}</Button>
                </Footer>
            </Flex>
    );
};

export default memo(CreateTableRowModal);
