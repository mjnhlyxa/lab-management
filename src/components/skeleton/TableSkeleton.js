import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass/styled-components';
import { Skeleton, Space } from 'antd';

const ActionsWrapper = styled(Box)`
    position: absolute;
    right: 1rem;
`;

export const TalbeLoadingSkeleton = () => {
    return (
        <>
            <Flex flexDirection="row" mt={4}>
                <Skeleton.Input style={{ width: 200 }} active />
                <ActionsWrapper>
                    <Space>
                        <Skeleton.Button shape="round" />
                        <Skeleton.Button shape="round" />
                        <Skeleton.Button shape="round" />
                        <Skeleton.Button shape="round" />
                    </Space>
                </ActionsWrapper>
            </Flex>
            <br />
            <br />
            <Skeleton
                title={false}
                round
                paragraph={{ rows: 6, width: ['100%', '100%', '100%', '100%', '100%', '100%'] }}
            />
        </>
    );
};

export default TalbeLoadingSkeleton;
