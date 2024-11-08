import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightModeColors = {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#3f51b5',
    secondary: '#f50057',
    tableRowOdd: '#ffffff',
    tableRowEven: '#F7F6FE',
    hover: '#e1e1e1',
};

const darkModeColors = {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#bb86fc',
    secondary: '#03dac6',
    tableRowOdd: '#1D1E42',
    tableRowEven: '#26264F',
    hover: '#262641',
};

export const ThemeProviderWrapper = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: isDarkMode ? darkModeColors.primary : lightModeColors.primary,
            },
            secondary: {
                main: isDarkMode ? darkModeColors.secondary : lightModeColors.secondary,
            },
            background: {
                default: isDarkMode ? darkModeColors.background : lightModeColors.background,
            },
            text: {
                primary: isDarkMode ? darkModeColors.text : lightModeColors.text,
            },
        },
        components: {
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        '&:nth-of-type(even)': {
                            backgroundColor: isDarkMode ? darkModeColors.tableRowEven : lightModeColors.tableRowEven,
                        },
                        '&:nth-of-type(odd)': {
                            backgroundColor: isDarkMode ? darkModeColors.tableRowOdd : lightModeColors.tableRowOdd,
                        },

                        '&:hover': {
                            backgroundColor: isDarkMode ? darkModeColors.hover : lightModeColors.hover,
                        },
                    },
                },
            },
            MuiTableBody: {
                styleOverrides: {
                    root: {
                        '& tr:hover': {
                            backgroundColor: isDarkMode ? darkModeColors.hover : lightModeColors.hover,
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
