import React from 'react';
import { Grid, Box, MenuItem, Select, FormControl, Typography } from '@mui/material';
import SearchBar from '../../SEARCH';
import CustomButton from '../../BUTTONS/CUSTOM_BUTTON';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './tableHeader.module.css';

const TableHeader = ({ searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, onAddCustomer }) => {
    return (
        <Box>
            <Grid container spacing={2} className={styles.transactionHeaderSection}>
                {/* Left Section: Show, Rows Per Page, Search Bar */}
                <Grid item xs={12} sm={8} lg={9} container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography variant="body2" className={styles.showText}>
                            Show
                        </Typography>
                    </Grid>

                    {/* Select for Rows Per Page */}
                    <Grid item>
                        <FormControl variant="outlined" className={styles.selectFormControl}>
                            <Select
                                value={rowsPerPage}
                                onChange={(e) => onRowsPerPageChange(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Entries Text */}
                    <Grid item>
                        <Typography variant="body2" className={styles.entriesText}>
                            entries
                        </Typography>
                    </Grid>

                    {/* Search Bar */}
                    <Grid item xs={12} sm={6} md={3}>
                        <SearchBar
                            searchQuery={searchQuery}
                            onSearchChange={onSearchChange}
                        />
                    </Grid>
                </Grid>

                {/* Right Section: Add Customer Button */}
                <Grid item xs={12} sm={4} md={3} lg={3} container justifyContent="flex-end" alignItems="center">
                    <CustomButton
                        onClick={onAddCustomer}
                        className={styles.addButton}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add Customer
                    </CustomButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TableHeader;
