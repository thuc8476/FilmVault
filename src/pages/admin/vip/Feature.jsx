import React, { useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Modal, TextField, Button, InputAdornment, TablePagination, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import ModalDelete from '../../../components/Modaldetele';
import { useNotification } from "../../../context/NotificationProvider";
import { ContextFeatures } from "../../../context/FeaturesProvider";
import { ContextPlans } from "../../../context/PlansProvider";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Feature() {
    const initialFeature = { planId: '', text: '', available: false };
    const [open, setOpen] = useState(false);
    const [feature, setFeature] = useState(initialFeature);
    const [errors, setErrors] = useState(initialFeature);
    const [openDelete, setOpenDelete] = useState(false);
    const [featureToDelete, setFeatureToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const showNotification = useNotification();
    const features = useContext(ContextFeatures); // Dữ liệu từ context
    const plans = useContext(ContextPlans); // ContextPlans để lấy các kế hoạch

    // Pagination và tìm kiếm
    const filteredFeatures = features.filter(f =>
        f.planId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentRows = filteredFeatures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteOpen = (feature) => {
        setFeatureToDelete(feature);
        setOpenDelete(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteDocument("Features", featureToDelete.id);
            showNotification('Feature deleted successfully!', "error");
            setOpenDelete(false);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (feature.id) {
                await updateDocument("Features", feature);
                showNotification('Feature updated successfully!', "info");
            } else {
                await addDocument("Features", feature);
                showNotification('Feature added successfully!', "success");
            }
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const validate = () => {
        const newErrors = { ...errors };
        newErrors.planId = feature.planId ? '' : 'Plan ID is required';
        newErrors.text = feature.text ? '' : 'Text is required';
        newErrors.available = feature.available !== null ? '' : 'Available is required';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleInput = (event) => {
        const { name, value, type, checked } = event.target;
        setFeature({ ...feature, [name]: type === 'checkbox' ? checked : value });
    };

    const handleOpenAdd = () => {
        setFeature(initialFeature);
        setErrors(initialFeature);
        setOpen(true);
    };

    const handleClose = () => {
        setFeature(initialFeature);
        setErrors(initialFeature);
        setOpen(false);
    };

    const handleEditOpen = (feature) => {
        setFeature(feature);
        setOpen(true);
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 'bold', color: 'primary.main', mb: { xs: 4, md: 0 }, mr: { md: 4 } }}
                >
                    Features
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Search by Plan ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: '#999' }} />
                            </InputAdornment>
                        )
                    }}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        maxWidth: '250px'
                    }}
                />
                <Button onClick={handleOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add Feature
                </Button>
            </div>
            <div className='backdrop:'></div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Plan ID</TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>Available</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.length > 0 ? (
                            currentRows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.planId}</TableCell>
                                    <TableCell>{row.text}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full font-semibold text-sm transition duration-200 ease-in-out 
                                                ${row.available ?
                                                    "bg-green-200 text-green-700 hover:bg-green-300" :
                                                    "bg-red-200 text-red-700 hover:bg-red-300"}`}
                                        >
                                            {row.available ? 'Yes' : 'No'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditOpen(row)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteOpen(row)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No features found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredFeatures.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                onDeleteConfirm={handleDeleteConfirm}
                categoryName={featureToDelete?.planId}
            />

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6">{feature.id ? 'Edit Feature' : 'Add Feature'}</Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="plan-select-label">Plan</InputLabel>
                        <Select
                            label="Plan"
                            labelId="plan-select-label"
                            name="planId"
                            value={feature.planId}
                            onChange={handleInput}
                            error={!!errors.planId}
                        >
                            {plans.map((plan) => (
                                <MenuItem key={plan.id} value={plan.id}>
                                    {plan.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Text"
                        fullWidth
                        margin="normal"
                        name="text"
                        value={feature.text}
                        onChange={handleInput}
                        error={!!errors.text}
                        helperText={errors.text}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={feature.available}
                                onChange={handleInput}
                                name="available"
                                color="primary"
                            />
                        }
                        label="Available"
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                        {feature.id ? 'Edit Feature' : 'Add Feature'}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default Feature;
