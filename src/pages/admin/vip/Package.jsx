import React, { useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Modal, TextField, Button, InputAdornment, TablePagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import { ContextPackages } from "../../../context/PackageProvider";
import ModalDelete from '../../../components/Modaldetele';
import { useNotification } from "../../../context/NotificationProvider";
import { ContextPlans } from "../../../context/PlansProvider";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

function Package(props) {
    const initialPackage = { discount: '', planID: '', time: '' };  // Thêm các trường discount, planID, time
    const [open, setOpen] = useState(false);
    const [Package, setPackage] = useState(initialPackage);
    const [errors, setErrors] = useState(initialPackage);
    const packages = useContext(ContextPackages);
    const [openDelete, setOpenDelete] = useState(false);
    const [PackageToDelete, setPackageToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const showNotification = useNotification();
    const plans = useContext(ContextPlans);

    const filteredPackages = packages.filter(Package =>
        (Package.discount && Package.discount.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteOpen = (Package) => {
        setPackageToDelete(Package);
        setOpenDelete(true);
    };

    const handleDeleteConfirm = async () => {
        if (PackageToDelete) {
            try {
                await deleteDocument("Packages", PackageToDelete.id);
                showNotification('Package deleted successfully!', "error");
                setOpenDelete(false);
                setPackageToDelete(null);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            if (Package.id) {
                await updateDocument("Packages", Package);
                showNotification('Package updated successfully!', "info");
            } else {
                await addDocument("Packages", Package);
                showNotification('Package added successfully!', "success");
            }
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const validate = () => {
        const newErrors = { ...errors };
        newErrors.discount = Package.discount ? '' : 'Discount is required';
        newErrors.planID = Package.planID ? '' : 'Plan is required';
        newErrors.time = Package.time ? '' : 'Time is required';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPackage({ ...Package, [name]: value });
    };

    const handleOpenAdd = () => {
        setPackage(initialPackage);
        setErrors(initialPackage);
        setOpen(true);
    };

    const handleClose = () => {
        setPackage(initialPackage);
        setErrors(initialPackage);
        setOpen(false);
    };

    const handleEditOpen = (Package) => {
        setPackage(Package);
        setOpen(true);
    };

    const currentRows = filteredPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 'bold', color: 'primary.main', mb: { xs: 4, md: 0 }, mr: { md: 4 } }}
                >
                    Packages
                </Typography>
                <div className='flex items-center mb-4 md:mb-0'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: '#999' }} />
                                </InputAdornment>
                            ),
                            style: { height: '40px' }
                        }}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '4px 0 0 4px',
                            width: '100%',
                            maxWidth: '250px',
                            height: '40px'
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#4186E0', color: '#fff', minWidth: '50px', borderRadius: '0 4px 4px 0', height: '40px' }}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <Button onClick={handleOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add Package
                </Button>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <Typography variant="h6">{Package.id ? 'Edit Package' : 'Add Package'}</Typography>
                        <TextField
                            label="Discount"
                            fullWidth
                            margin="normal"
                            name="discount"
                            value={Package.discount}
                            onChange={handleInput}
                            error={!!errors.discount}
                            helperText={errors.discount}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="plan-select-label">Plan</InputLabel>
                            <Select
                                label="Plan"
                                labelId="plan-select-label"
                                name="planID"
                                value={Package.planID}
                                onChange={(e) => setPackage({ ...Package, planID: e.target.value })}
                            >
                                {plans.map((plan) => (
                                    <MenuItem key={plan.id} value={plan.id}>
                                        {plan.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Time"
                            fullWidth
                            margin="normal"
                            name="time"
                            value={Package.time}
                            onChange={handleInput}
                            error={!!errors.time}
                            helperText={errors.time}
                        />
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                            {Package.id ? 'Edit Package' : 'Add Package'}
                        </Button>
                    </Box>
                </Modal>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.length > 0 ? (
                            currentRows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.discount}</TableCell>
                                    <TableCell>{row.planID}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditOpen(row)} color="primary"><EditIcon /></IconButton>
                                        <IconButton onClick={() => handleDeleteOpen(row)} color="secondary"><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No packages found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={packages.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} categoryName={PackageToDelete?.discount} />
        </div>
    );
}

export default Package;
