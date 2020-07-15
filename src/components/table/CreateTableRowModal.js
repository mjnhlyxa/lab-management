import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import get from 'lodash/get';
import { Text, Box, Flex } from 'rebass';
import { FaPlusCircle } from 'react-icons/fa';

import Button from 'components/button/Button';
import Input from 'components/input/Input';
import { Field } from 'components/table/Table';

export const CreateTableRowModal = memo(
    ({ Header, Body, Footer, data: { api, fields, list = {}, addTableRow }, onHide }) => {
        const [data, setData] = useState({});

        const onInputChange = useCallback((e, fieldName) => {
            const value = get(e, 'target.value', e);
            let newData = { ...data, [fieldName]: value };
            setData(newData);
        });

        const onSubmit = () => {
            addTableRow({ api, data });
            onHide();
        };

        return (
            <>
                <Header>
                    <FaPlusCircle />
                    <Box>Add new record</Box>
                </Header>
                <Body>
                    <Flex flexDirection="column">
                        {fields.map((field) => {
                            const { type, name, caption, update, required, choices, listName } = field;
                            const multichoices = Boolean(choices && listName);
                            return update ? (
                                <Flex key={name} flexDirection="row" p={2}>
                                    <Text as="p" width="6rem" fontWeight="bold">
                                        {caption}
                                        {required ? '*' : ''}
                                    </Text>
                                    <Field
                                        type={type}
                                        onChange={(e) => onInputChange(e, name)}
                                        list={list[listName]}
                                        multichoices={multichoices}
                                    />
                                </Flex>
                            ) : null;
                        })}
                    </Flex>
                </Body>
                <Footer>
                    <Flex flexDirection="row">
                        <Box onClick={onSubmit}>Create</Box>
                        <Box onClick={onHide}>Cancel</Box>
                    </Flex>
                </Footer>
            </>
        );
    },
);

export default CreateTableRowModal;
