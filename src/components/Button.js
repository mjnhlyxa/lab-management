import React, { useState, memo } from 'react';
import { CButton } from '@coreui/react';

export const Button = ({ children, color = 'primary', ...rest }) => {
    return (
        <CButton block color={color} {...rest}>
            {children}
        </CButton>
    );
};

export default memo(Button);
