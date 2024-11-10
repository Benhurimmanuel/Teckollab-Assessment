import React from 'react';
import { Button } from '@mui/material';
import styles from './customButton.module.css';

const CustomButton = ({ children, onClick, variant = "contained", color = "primary", size = "medium" }) => {
    return (
        <Button
            className={styles.customBtn}
            variant={variant}
            color={color}
            size={size}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
