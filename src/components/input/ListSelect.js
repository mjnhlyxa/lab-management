import React, { useState, memo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Box } from 'rebass';
import get from 'lodash/get';
import remove from 'lodash/remove';
import { space, color, layout, borderRadius } from 'styled-system';

const Wrapper = styled.ul`
    position: relative;
    background: white;
    list-style-type: none;
    padding-left: 0;
`;

const Item = styled.li`
    padding: 0.4rem;
    margin: 0.15rem;
    border-radius: 0.3rem;
    :hover {
        background: ${({ selected }) => (selected ? 'black' : '#dadada')};
        cursor: pointer;
    }
    background-color: ${({ selected }) => (selected ? 'black' : 'white')};
    color: ${({ selected }) => (selected ? 'white' : '#bebaba')};
`;

const ListSelect = ({ items = [], selected = [], onChange }) => {
    const [selectedList, setSelectedList] = useState(selected);

    const selectItem = (item) => {
        const isExist = selectedList.includes(item);
        let newSelectedList;
        if (isExist) {
            remove(selectedList, (n) => n === item);
            newSelectedList = [...selectedList];
        } else {
            newSelectedList = [...selectedList, item];
        }
        setSelectedList(newSelectedList);
        onChange(newSelectedList);
    };

    return (
        <Wrapper>
            {items.map((item) => {
                const [key, value] = item;
                const isSelect = selectedList.includes(key);
                return (
                    <Item key={key} selected={isSelect} onClick={() => selectItem(key)}>
                        {value}
                    </Item>
                );
            })}
        </Wrapper>
    );
};

export default memo(styled(ListSelect)(space, color, layout, borderRadius));
