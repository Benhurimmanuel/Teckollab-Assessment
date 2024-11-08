import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const TransactionModal = ({ open, onClose, onSave, onDelete, modalType, transactionData }) => {
    const [formData, setFormData] = useState(transactionData);

    useEffect(() => {
        if (modalType === 'edit' && transactionData) {
            setFormData(transactionData); // Pre-fill the form when editing
        } else if (modalType === 'add') {
            setFormData({
                tracking_id: '',
                product: '',
                customer: '',
                date: '',
                amount: '',
                payment_mode: '',
                status: '',
            }); // Empty fields for add new customer
        }
    }, [modalType, transactionData]);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData); // Pass form data back to the parent
    };

    const handleDelete = () => {
        onDelete(); // Trigger delete action
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{modalType === 'edit' ? 'Edit Transaction' : modalType === 'add' ? 'Add New Customer' : 'Confirm Delete'}</DialogTitle>
            <DialogContent>
                {modalType === 'delete' ? (
                    <p>Are you sure you want to delete this transaction?</p>
                ) : (
                    <>
                        {['tracking_id', 'product', 'customer', 'date', 'amount', 'payment_mode', 'status'].map((field) => (
                            <TextField
                                key={field}
                                label={field.replace('_', ' ').toUpperCase()}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name={field}
                                value={formData[field] || ''}
                                onChange={handleFieldChange}
                                disabled={modalType === 'view'} // Disable editing in view mode
                            />
                        ))}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                {modalType === 'delete' ? (
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                ) : (
                    <Button onClick={handleSave} color="secondary">
                        Save
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default TransactionModal;
