import React, { useState } from 'react';
import { OutlinedInput, InputAdornment, Grid } from '@mui/material';
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
        <Grid >
            <Grid item xs={12} sm={8} md={6} lg={4}>
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
            </Grid>
        </Grid>
    );
};

export default SearchBox;
