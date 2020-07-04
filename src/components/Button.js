import React, { useState, memo } from 'react';
import { CButton } from '@coreui/react';

export const Button = ({ children, color = 'primary' }) => {
    return (
        <CButton block color={color}>
            {children}
        </CButton>
    );
};

export default memo(Button);
