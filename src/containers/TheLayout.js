import React from 'react';
import { Box } from 'rebass/styled-components';

import { TheContent, TheSidebar, TheFooter, TheHeader } from './index';

const TheLayout = () => {
    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">
                <TheHeader />
                <Box className="c-body" backgroundColor="white">
                    <TheContent />
                </Box>
                <TheFooter />
            </div>
        </div>
    );
};

export default TheLayout;
