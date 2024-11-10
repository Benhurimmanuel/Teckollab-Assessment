import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../../CONTEXT';

const Custom_Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg">
            <Navbar.Brand href="#">My App</Navbar.Brand>
            <Nav className="ms-auto">  <Button
                onClick={toggleTheme}
                variant={isDarkMode ? 'outline-light' : 'outline-dark'}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}  >
                {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                {isDarkMode ? ' Light Mode' : ' Dark Mode'}
            </Button>
            </Nav>
        </Navbar>
    );
};

export default Custom_Navbar;
