import React, { useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Modal, TextField, Button, InputAdornment, TablePagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import { ContextPlans } from "../../../context/PlansProvider";
import ModalDelete from '../../../components/Modaldetele';
import { useNotification } from "../../../context/NotificationProvider";
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
function Plans(props) {
    const initialPlan = { title: '', level: '', pricePerMonth: '' };
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState(initialPlan);
    const [errors, setErrors] = useState(initialPlan);
    const plans = useContext(ContextPlans);
    const [openDelete, setOpenDelete] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const showNotification = useNotification();
    const filteredPlans = plans.filter(plan =>
        (plan.title && plan.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (plan.level && plan.level.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteOpen = (plan) => {
        setPlanToDelete(plan);
        setOpenDelete(true);
    };

    const handleDeleteConfirm = async () => {
        if (planToDelete) {
            try {
                await deleteDocument("Plans", planToDelete.id);
                showNotification('Plan deleted successfully!', "error");
                setOpenDelete(false);
                setPlanToDelete(null);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            if (plan.id) {
                await updateDocument("Plans", plan);
                showNotification('Plan updated successfully!', "info");
            } else {
                await addDocument("Plans", plan);
                showNotification('Plan added successfully!', "success");
            }
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const validate = () => {
        const newErrors = { ...errors };
        newErrors.title = plan.title ? '' : 'Title is required';
        newErrors.level = plan.level ? '' : 'Level is required';
        newErrors.pricePerMonth = plan.pricePerMonth ? '' : 'Price per month is required';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPlan({ ...plan, [name]: value });
    };

    const handleOpenAdd = () => {
        setPlan(initialPlan);
        setErrors(initialPlan);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditOpen = (plan) => {
        setPlan(plan);
        setOpen(true);
    };

    const currentRows = filteredPlans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 'bold', color: 'primary.main', mb: { xs: 4, md: 0 }, mr: { md: 4 } }}
                >
                    Plans
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
                    Add Plan
                </Button>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <Typography variant="h6">{plan.id ? 'Edit Plan' : 'Add Plan'}</Typography>
                        <TextField
                            label="Title"
                            fullWidth
                            margin="normal"
                            name="title"
                            value={plan.title}
                            onChange={handleInput}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                        <TextField
                            label="Level"
                            fullWidth
                            margin="normal"
                            name="level"
                            value={plan.level}
                            onChange={handleInput}
                            error={!!errors.level}
                            helperText={errors.level}
                        />
                        <TextField
                            label="Price per Month"
                            fullWidth
                            margin="normal"
                            name="pricePerMonth"
                            value={plan.pricePerMonth}
                            onChange={handleInput}
                            error={!!errors.pricePerMonth}
                            helperText={errors.pricePerMonth}
                        />
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                            {plan.id ? 'Edit Plan' : 'Add Plan'}
                        </Button>
                    </Box>
                </Modal>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Price per Month</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.level}</TableCell>
                                <TableCell>{row.pricePerMonth}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditOpen(row)} color="primary"><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeleteOpen(row)} color="secondary"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={plans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} categoryName={planToDelete?.title} />
        </div>
    );
}

export default Plans;
