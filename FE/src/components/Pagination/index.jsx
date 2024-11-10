import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, Button, Box, useTheme, CircularProgress } from '@mui/material';
import styles from './customPagination.module.css';
import { axiosGet } from '../../UTILS/axios';

const CustomPagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    apiUrl,
}) => {
    const { palette } = useTheme();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handlePageChange = async (event, page) => {

        setLoading(true);
        setError(null);
        try {
            const response = await axiosGet(`${apiUrl}`);
            if (response && response.payload) {
                onPageChange(response.payload, page);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const paginationButtonStyles = {
        backgroundColor: palette.mode === 'dark' ? '#333' : '#E0E0E0',
        borderColor: palette.mode === 'dark' ? '#333' : '#E0E0E0',
        color: palette.mode === 'dark' ? '#FFF' : '#000',
    };

    const activePaginationButtonStyles = {
        backgroundColor: palette.mode === 'dark' ? '#bb86fc' : '#624DE3',
        color: '#FFF',
        borderColor: palette.mode === 'dark' ? '#bb86fc' : '#624DE3',
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(null, currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(null, currentPage + 1);
        }
    };

    return (
        <Box className={styles.paginationContainer}>
            <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentPage === 1 || loading}
                sx={{
                    color: palette.mode === 'dark' ? '#bbb' : '#5b5858',
                    border: 0,
                    backgroundColor: 'transparent',
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Previous'}
            </Button>

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                hidePrevButton
                hideNextButton
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        className={`${styles.paginationItem} ${item.page === currentPage ? styles.active : ''}`}
                        sx={{
                            ...paginationButtonStyles,
                            ...(item.page === currentPage && activePaginationButtonStyles),
                        }}
                    />
                )}
            />

            <Button
                variant="outlined"
                onClick={handleNext}
                disabled={currentPage === totalPages || loading}
                sx={{
                    color: palette.mode === 'dark' ? '#bbb' : '#5b5858',
                    border: 0,
                    backgroundColor: 'transparent',
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Next'}
            </Button>
            {error && <Box color="error.main" sx={{ mt: 2 }}>{error}</Box>}
        </Box>
    );
};

export default CustomPagination;
