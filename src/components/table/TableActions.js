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
    margin-right: 8px;
    padding: 0.3rem 0.4rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
`;

const Tag = styled(Box)`
    background-color: rgb(255, 85, 0);
    border-radius: 0.4rem;
    font-size: 0.8rem;
    padding: 0.1rem 0.4rem;
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

export const Filtered = memo(({ filterColumn, onDiscard, t }) => {
    return (
        <>
            <FilteredWrapper flexDirection="row" alignItems="center">
                <Text mr={2} fontSize="0.8rem">
                    {t('components.table.label.filteredBy')}
                </Text>
                <Tag>
                    <Space>
                        {filterColumn}
                        <FaTimes onClick={onDiscard} />
                    </Space>
                </Tag>
            </FilteredWrapper>
        </>
    );
});

const popoverStyles = {
    background: 'red',
};

export const TableActions = memo(
    ({
        id,
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
                    id,
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
                deleteTableRow({ id, api, data: Object.values(selectedRows) });
            }
        };

        const saveColumnsSetting = (data) => {
            saveVisibleColumns({ id, api, data });
        };

        const handlePopoverVisibleChange = (visible) => {
            setShowPopover(visible);
        };

        return (
            <Flex flexDirection="row">
                <Space>
                    {filterColumn && <Filtered filterColumn={filterColumn} onDiscard={onDiscardFilter} t={t} />}
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
                        title={t('components.table.label.filteredBy')}
                        trigger="click"
                        visible={showPopover}
                        onVisibleChange={handlePopoverVisibleChange}
                        placement="leftTop"
                        autoAdjustOverflow>
                        <Button type="primary" icon={<FaCog />} />
                    </Popover>
                </Space>
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
