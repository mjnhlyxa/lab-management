import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass/styled-components';
import { Skeleton } from 'antd';

export const ListSkeleton = () => {
    return (
        <Box width="20rem">
            <Skeleton active />
        </Box>
    );
};

export default ListSkeleton;
