import React, { useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Modal, TextField, Button, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import { ContextCategories } from "../../../context/CategoriesProvider";
import ModalDelete from '../../../components/Modaldetele'
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
const intern = { nameCategory: '', description: '' };
function Categories(props) {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(intern);
    const [errors, setErrors] = useState(intern);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const categories = useContext(ContextCategories);
    const [openDelete, setOpenDelete] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);

    const handleAddCategory = async () => {
        if (!validate()) return; // Kiểm tra hợp lệ trước khi thêm
        try {
            await addDocument('Categories', category);
            setSnackbarMessage('Danh mục đã được thêm thành công!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setCategory(intern); // Reset lại form
            setOpen(false);
        } catch (error) {
            console.error("Error adding document: ", error);
            setSnackbarMessage('Có lỗi xảy ra khi thêm danh mục.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
    const handleDeleteOpen = (category) => {
        setCategoryToDelete(category);
        setOpenDelete(true);
    };
    const handleDeleteConfirm = async () => {
        if (categoryToDelete) {
            try {
                // Gọi deleteDocument với imgUrl nếu cần
                await deleteDocument("Categories", categoryToDelete.id, categoryToDelete.imgUrl); // Thêm imgUrl nếu có
                setSnackbarMessage('Danh mục đã được xóa thành công!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setOpenDelete(false);
                setCategoryToDelete(null); // Đặt lại danh mục cần xóa
            } catch (error) {
                console.error("Error deleting document: ", error); // Ghi lại lỗi nếu có
                setSnackbarMessage('Có lỗi xảy ra khi xóa danh mục.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (isEditing) {
                await updateDocument("Categories", editCategoryId, category);
                setSnackbarMessage('Danh mục đã được cập nhật thành công!');
            } else {
                await addDocument("Categories", category);
                setSnackbarMessage('Danh mục đã được thêm thành công!');
            }
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            handleClose();
        } catch (error) {
            console.error("Error:", error);
            setSnackbarMessage('Có lỗi xảy ra khi thực hiện thao tác.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
    const validate = () => {
        const newErrors = { ...errors };
        newErrors.nameCategory = category.nameCategory ? '' : ' name is reguired';
        newErrors.description = category.description ? '' : ' description name is reguired'
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '')
    }
    const handleInput = (event) => {
        const { name, value } = event.target
        setCategory({ ...category, [name]: value });
    }
    const handleOpenAdd = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleEditOpen = (category) => {
        setCategory({ nameCategory: category.nameCategory, description: category.description });
        setEditCategoryId(category.id);
        setIsEditing(true);
        setOpen(true);
    };

    return (

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: { xs: 4, md: 0 },
                        mr: { md: 4 },
                    }}
                >
                    Category
                </Typography>
                <div className='flex items-center mb-4 md:mb-0'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter keywords..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: '#999' }} />
                                </InputAdornment>
                            ),
                        }}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '4px 0 0 4px',
                            width: '100%',
                            maxWidth: '400px',
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#4186E0',
                            color: '#fff',
                            minWidth: '50px',
                            borderRadius: '0 4px 4px 0',
                            height: '56px',
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <div>
                    <Button onClick={handleOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
                        Add Category
                    </Button>
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                        <Box sx={style}>
                            <Typography id="modal-title" variant="h6" component="h2">
                                {isEditing ? 'Edit Category' : 'Add Category'}
                            </Typography>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                name='nameCategory'
                                value={category.nameCategory}
                                onChange={handleInput}
                                error={Boolean(errors.description)}
                                helperText={errors.description}

                            />
                            <TextField
                                label="Description"
                                fullWidth
                                margin="normal"
                                name='description'
                                value={category.description}
                                onChange={handleInput}
                                error={Boolean(errors.description)}
                                helperText={errors.description}
                            />
                            <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                                {isEditing ? 'Edit Category' : 'Add Category'}
                            </Button>
                        </Box>
                    </Modal>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table
                    sx={{
                        minWidth: 650,
                        '@media (max-width: 1024px)': {
                            minWidth: 400,
                            fontSize: '0.875rem',
                        },
                        '@media (max-width: 600px)': {
                            display: 'block',
                            overflowX: 'auto',
                        }
                    }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name Categories</TableCell>
                            <TableCell
                                sx={{
                                    display: { xs: 'none', sm: 'table-cell' },
                                }}
                            >
                                Description
                            </TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.nameCategory}</TableCell>
                                <TableCell
                                    sx={{
                                        display: { xs: 'none', sm: 'table-cell' },
                                    }}
                                >
                                    {row.description}
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} categoryName={categoryToDelete?.nameCategory} ></ModalDelete>
        </div>


    );
}

export default Categories;