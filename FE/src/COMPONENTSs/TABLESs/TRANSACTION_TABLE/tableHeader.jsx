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
            <Grid container className={styles.transactionHeaderSection}>
                <Grid item xs={12} sm={8} md={8} container className={styles.transactionSortSection}>
                    <Grid item>
                        <Typography variant="body2" className={styles.showText}>
                            Show
                        </Typography>
                    </Grid>

                    <Grid item>
                        <FormControl variant="outlined" className={styles.selectFormControl}>
                            <Select
                                value={rowsPerPage}
                                onChange={(e) => onRowsPerPageChange(e.target.value)}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Typography variant="body2" className={styles.entriesText}>
                            entries
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <SearchBar
                            searchQuery={searchQuery}
                            onSearchChange={onSearchChange} />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={4} md={4} container justifyContent="flex-end">
                    <CustomButton
                        onClick={onAddCustomer}
                        className={styles.addButton}
                        variant="contained"
                        color="primary"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add Customer
                    </CustomButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TableHeader;
