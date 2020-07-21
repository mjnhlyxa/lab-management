import React, { Suspense } from 'react';
import { Box } from 'rebass/styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';
import Routing from 'routes/routes';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

const TheContent = () => {
    return (
        <Box className="c-main" pt={[1, 3]}>
            <Box pl={[1, 3]} pr={[1, 3]}>
                <Suspense fallback={loading}>
                    <Routing />
                </Suspense>
            </Box>
        </Box>
    );
};

export default React.memo(TheContent);
