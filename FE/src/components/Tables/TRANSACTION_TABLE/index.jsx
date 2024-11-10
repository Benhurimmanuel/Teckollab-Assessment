import React, { useState, useMemo, useEffect } from 'react';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Box, Paper, Grid } from '@mui/material';
import CustomPagination from '../../Pagination';
import CustomChip from '../../Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEdit, faSort, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import TableHeader from './tableHeader';
import { useTheme } from '@mui/material/styles';
import styles from './transactionTable.module.css';
import { axiosGet } from '../../../UTILS/axios';
import { TRANSACTION_URL } from '../../../CONSTANTS/apis';
import TransactionModal from '../../MODALS/transactionModal';

const columns = [
    { header: 'tracking_id', label: 'Tracking Id' },
    { header: 'product', label: 'Product' },
    { header: 'customer', label: 'Customer' },
    { header: 'date', label: 'Date' },
    { header: 'amount', label: 'Amount' },
    { header: 'payment_mode', label: 'Payment Mode' },
    { header: 'status', label: 'Status' },
    { header: 'action', label: 'Action' },
];

const getChipDetails = (status) => {
    switch (status) {
        case 'Pending':
            return { bgColor: '#FFF3E6', textColor: '#FFA500', label: 'Pending' };
        case 'Completed':
            return { bgColor: '#EBF9F1', textColor: '#006400', label: 'Completed' };
        case 'Canceled':
            return { bgColor: '#FFCDD2', textColor: '#D32F2F', label: 'Canceled' };
        default:
            return { bgColor: '#e0e0e0', textColor: '#000000', label: 'Unknown' };
    }
};

const TransactionsTable = () => {
    const { palette } = useTheme();

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [transactions, setTransactions] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // States for modal visibility
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);

    const [editData, setEditData] = useState({
        tracking_id: '',
        product: '',
        customer: '',
        date: '',
        amount: '',
        payment_mode: '',
        status: '',
    });

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1);
    };

    const buildAPIURL = (query, page) => {
        let url = `${TRANSACTION_URL}?pagesize=${rowsPerPage}&pagenumber=${page - 1}`;
        if (query) {
            url += `&searchquery=${encodeURIComponent(query)}`;
        }
        return url;
    };

    const fetchTransactions = async (page, query) => {
        setLoading(true);
        try {
            const APIURL = buildAPIURL(query, page);
            const response = await axiosGet(APIURL);

            if (response && response.payload) {
                setTransactions(response.payload.rows);
                setTotalCount(response.payload.count);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newData, page) => {
        setTransactions(newData.rows);
        setTotalCount(newData.count);
        setCurrentPage(page);
    };

    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState('tracking_id');

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedData = useMemo(() => {
        return [...transactions].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortColumn, sortDirection, transactions]);

    useEffect(() => {
        fetchTransactions(currentPage, searchQuery);
    }, [currentPage, rowsPerPage, searchQuery]);

    const handleDelete = () => {
        // Handle the actual deletion logic
        setOpenDeleteModal(false);
        alert('Transaction deleted'); // Replace with actual delete API call
    };

    const handleEdit = (transaction) => {
        setEditData({ ...transaction });
        setOpenEditModal(true);
    };

    const handleSaveEdit = (data) => {
        // Handle save logic (API call for updating transaction)
        setOpenEditModal(false);
        alert('Transaction updated'); // Replace with actual update API call
    };

    const handleAddCustomer = () => {
        setEditData({
            tracking_id: '',
            product: '',
            customer: '',
            date: '',
            amount: '',
            payment_mode: '',
            status: '',
        });
        setOpenAddCustomerModal(true);
    };

    const handleSaveAddCustomer = (data) => {
        // Handle adding new customer logic
        setOpenAddCustomerModal(false);
        alert('Customer added'); // Replace with actual add customer API call
    };

    return (
        <Box className={styles.transitionTable}>
            <TableHeader
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                onAddCustomer={handleAddCustomer}
            />
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.header}>
                                    <strong>{column.label}</strong>
                                    {column.header !== 'action' && (
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            className={styles.sortIcon}
                                            onClick={() => handleSort(column.header)}
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((transaction, index) => (
                                <TableRow
                                    key={transaction.tracking_id}
                                    sx={{
                                        backgroundColor: palette.mode === 'dark'
                                            ? (index % 2 === 0 ? '#333' : '#444')
                                            : (index % 2 === 0 ? '#F7F6FE' : '#ffffff'),
                                        '&:hover': {
                                            backgroundColor: palette.mode === 'dark' ? '#555' : '#eee',
                                        },
                                    }}
                                >
                                    {columns.map((column) => (
                                        column.header === 'status' ? (
                                            <TableCell key={column.header}>
                                                <CustomChip
                                                    label={getChipDetails(transaction.status).label}
                                                    bgColor={getChipDetails(transaction.status).bgColor}
                                                    textColor={getChipDetails(transaction.status).textColor}
                                                />
                                            </TableCell>
                                        ) : column.header === 'action' ? (
                                            <TableCell key={column.header}>
                                                <div className={styles.actionCellItems}>
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className={styles.editIcon}
                                                        onClick={() => handleEdit(transaction)}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrashCan}
                                                        className={styles.deleteIcon}
                                                        onClick={() => {
                                                            setSelectedTransaction(transaction);
                                                            setOpenDeleteModal(true);
                                                        }}
                                                    />
                                                </div>
                                            </TableCell>
                                        ) : column.header === 'product' ? (
                                            <TableCell key={column.header}>
                                                <Grid container direction="row" alignItems="center" spacing={1}>
                                                    <Grid item>
                                                        <img
                                                            src={transaction.image_url}
                                                            alt={transaction.product}
                                                            style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '8px',
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>{transaction.product}</Grid>
                                                </Grid>
                                            </TableCell>
                                        ) : column.header === 'amount' ? (
                                            <TableCell key={column.header}>
                                                <FontAwesomeIcon icon={faDollarSign} />
                                                {parseFloat(transaction.amount).toFixed(2)}
                                            </TableCell>
                                        ) : (
                                            <TableCell key={column.header}>{transaction[column.header]}</TableCell>
                                        )
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <CustomPagination
                currentPage={currentPage}
                totalItems={totalCount}
                itemsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                apiUrl={buildAPIURL(searchQuery, currentPage)}
            />

            {/* Modals */}
            <TransactionModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onDelete={handleDelete}
                modalType="delete"
            />
            <TransactionModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSave={handleSaveEdit}
                modalType="edit"
                transactionData={editData}
            />
            <TransactionModal
                open={openAddCustomerModal}
                onClose={() => setOpenAddCustomerModal(false)}
                onSave={handleSaveAddCustomer}
                modalType="add"
                transactionData={editData}
            />
        </Box>
    );
};

export default TransactionsTable;
