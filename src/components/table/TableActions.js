import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Text, Box, Flex } from 'rebass';
import { FaTrash, FaTimes, FaPlus, FaCog } from 'react-icons/fa';
import { IoIosRefresh } from 'react-icons/io';
import { OverlayTrigger, Dropdown } from 'react-bootstrap';
import { Button, Space, Popover } from 'antd';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';
import omit from 'lodash/omit';

import { deleteTableRow, addTableRow, showModal, saveVisibleColumns } from 'actions/actions';
import Input from 'components/input/Input';
// import { IconButton, Button } from 'components/button/Button';

import ListSelect from 'components/input/ListSelect';

import { MODAL_ID } from 'utils/constants';
import CreateTableRowModal from 'components/table/CreateTableRowModal';

const FilteredWrapper = styled(Flex)`
    border-radius: 0.4rem;
    margin-left: 1rem;
`;

const TagName = styled(Box)`
    background-color: #6e798e;
    padding: 0.1rem 0.3rem;
    border-radius: 0.3rem;
    color: white;
`;

export const SettingPopover = memo(({ structure, onChangeStructure, setVisibility, onSave }) => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        const { fields = [] } = structure;
        const ops = [];
        const selected = [];
        fields.forEach(({ name, caption, show }) => {
            ops.push([name, caption]);
            if (!!show) {
                selected.push(name);
            }
        });
        setOptions(ops);
        setSelectedOptions(selected);
    }, [structure]);

    const onChangeSelection = (selected) => {
        setSelectedOptions(selected);
    };

    const applyChange = () => {
        const { fields } = structure;
        const newFields = fields.map((field) => {
            const { name } = field;
            return {
                ...field,
                show: selectedOptions.includes(name),
            };
        });
        const newStruct = {
            ...structure,
            fields: newFields,
        };
        onChangeStructure(newStruct, false);
        setVisibility(false);
    };

    const saveChange = () => {
        onSave({ show_fields: selectedOptions.join(',') });
        applyChange();
        setVisibility(false);
    };

    const onClose = () => {
        setVisibility(false);
    };

    return (
        <Box>
            {options.length && <ListSelect items={options} selected={selectedOptions} onChange={onChangeSelection} />}
            <Box>
                <Button onClick={applyChange}>{t('common.button.label.apply')}</Button>
                <Button onClick={saveChange}>{t('common.button.label.save')}</Button>
                <Button onClick={onClose}>{t('common.button.label.cancel')}</Button>
            </Box>
        </Box>
    );
});

// export const getPopover = (structure, onChangeStructure, saveColumnsSetting, title) => (
//     <Popover>
//         <Popover.Title as="h3">{title}</Popover.Title>
//         <Popover.Content>
//             <SettingPopover structure={structure} onChangeStructure={onChangeStructure} onSave={saveColumnsSetting} />
//         </Popover.Content>
//     </Popover>
// );

export const Filtered = memo(({ filterColumn, onDiscard }) => {
    return (
        <>
            <FilteredWrapper flexDirection="row" fontSize="0.8rem" p="0.3rem 0.5rem" backgroundColor="#dadada">
                <Text mr={2}>Filtered by:</Text>
                <TagName>
                    {filterColumn}
                    <FaTimes onClick={onDiscard} />
                </TagName>
            </FilteredWrapper>
        </>
    );
});

const popoverStyles = {
    background: 'red',
};

export const TableActions = memo(
    ({
        api,
        structure,
        list,
        filterColumn,
        showModal,
        addTableRow,
        selectedRows,
        deleteTableRow,
        refreshData,
        onDiscardFilter,
        onChangeStructure,
        saveVisibleColumns,
    }) => {
        const [showPopover, setShowPopover] = useState(false);

        const { t } = useTranslation();
        const onCreateData = () => {
            showModal({
                id: MODAL_ID.CREATE_TABLE_DATA_MODAL,
                render: CreateTableRowModal,
                data: {
                    api,
                    fields: structure.fields,
                    list,
                    addTableRow,
                },
            });
        };

        const isSelecting = () => {
            return Object.keys(selectedRows).length > 0;
        };

        const deleteSelectedRow = () => {
            if (isSelecting()) {
                deleteTableRow({ api, data: Object.values(selectedRows) });
            }
        };

        const saveColumnsSetting = (data) => {
            saveVisibleColumns({ api, data });
        };

        const handlePopoverVisibleChange = (visible) => {
            setShowPopover(visible);
        };

        return (
            <Flex flexDirection="row">
                <Space>
                    <Button type="primary" onClick={refreshData} icon={<IoIosRefresh />} />
                    <Button type="primary" onClick={onCreateData} icon={<FaPlus />} />
                    <Button type="primary" onClick={deleteSelectedRow} disabled={!isSelecting()} icon={<FaTrash />} />
                    <Popover
                        content={
                            <SettingPopover
                                setVisibility={setShowPopover}
                                structure={structure}
                                onChangeStructure={onChangeStructure}
                                onSave={saveColumnsSetting}
                            />
                        }
                        title={t('components.table.filterdBy')}
                        trigger="click"
                        visible={showPopover}
                        onVisibleChange={handlePopoverVisibleChange}
                        placement="leftTop"
                        autoAdjustOverflow>
                        <Button type="primary" icon={<FaCog />} />
                    </Popover>
                </Space>
                {filterColumn && <Filtered filterColumn={filterColumn} onDiscard={onDiscardFilter} />}
            </Flex>
        );
    },
);

const mapDispatchToProps = {
    showModal,
    addTableRow,
    deleteTableRow,
    saveVisibleColumns,
};

export default connect(null, mapDispatchToProps)(TableActions);
