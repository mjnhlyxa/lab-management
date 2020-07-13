import React, { useState, memo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Box } from 'rebass';
import get from 'lodash/get';
import remove from 'lodash/remove';
import { space, color, layout, borderRadius } from 'styled-system';

const Wrapper = styled.ul`
    position: relative;
    background: white;
`;

const Item = styled.li`
    padding: 0.4rem;
    :hover {
        background: #dadada;
    }
    background-color: ${(selected) => (selected ? '#70abf9' : 'white')};
`;

const ListSelect = ({ items = [], selected = [], onChange }) => {
    const [selectedList, setSelectedList] = useState(selected);

    const selectItem = (item) => {
        const newSelected = selectedList.includes(item)
            ? remove(selectedList, (n) => n === item)
            : [...selectedList, item];
        setSelectedList(newSelected);
        onChange(newSelected);
    };

    return (
        <Wrapper>
            {items.map((item) => {
                const [key, value] = item;
                const isSelect = selected.includes(key);
                return (
                    <Item key={key} selected={isSelect} onClick={() => selectItem(key)}>
                        {value}
                    </Item>
                );
            })}
        </Wrapper>
    );
};

export default styled(memo(ListSelect))(space, color, layout, borderRadius);
