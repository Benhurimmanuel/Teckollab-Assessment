import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../../../CONTEXT/themeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} variant={isDarkMode ? 'outline-light' : 'outline-dark'}>
            {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
            {isDarkMode ? ' Light Mode' : ' Dark Mode'}
        </Button>
    );
};

export default ThemeToggle;
