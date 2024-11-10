import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTheme } from '../CONTEXT/ThemeContext';

const Layout = ({ children }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="sticky" sx={{ backgroundColor: isDarkMode ? '#333' : '#3f51b5' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Button color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, padding: 2 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
