import React, { useState } from 'react';
import { OutlinedInput, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './searchBar.module.css';

const SearchBox = ({ onSearchChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        onSearchChange(value);
    };

    return (
        <div className={styles.searchContainer}>
            <OutlinedInput
                fullWidth
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                startAdornment={
                    <InputAdornment position="start">
                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                    </InputAdornment>
                }
                className={styles.searchInput}
            />
        </div>
    );
};

export default SearchBox;
