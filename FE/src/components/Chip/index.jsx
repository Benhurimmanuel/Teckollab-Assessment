import React from 'react';
import { Chip } from '@mui/material';

const CustomChip = ({ label, bgColor = '#f0f0f0', textColor = '#000000', icon = null, variant = 'filled', ...props }) => {
    return (
        <Chip
            label={label}
            style={{
                backgroundColor: bgColor,
                color: textColor,
            }}
            icon={icon}
            variant={variant}
            clickable={false}
            {...props}
        />
    );
};

export default CustomChip;
